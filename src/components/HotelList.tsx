import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import HotelForm from "./HotelForm";

// Define the structure of a Hotel
interface Hotel {
  id: string;
  name: string;
  country: string;
  address: string;
  category: string;
}

// Define the structure of a Category
interface Category {
  id: string;
  name: string;
}

export default function HotelList() {
  const dispatch = useDispatch();
  // Define the types for the Redux state
  const hotels = useSelector((state: { hotels: Hotel[] }) => state.hotels);
  const categories = useSelector(
    (state: { categories: Category[] }) => state.categories
  );

  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "country" | "category">("name");

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_HOTEL", payload: id });
  };

  const filteredHotels = hotels
    .filter((hotel) => !filterCategory || hotel.category === filterCategory)
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div>
      <Box sx={{ marginY: 2 }}>
        <Select
          size="small"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          displayEmpty
          className="mr-4"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ ml: 2 }}
          size="small"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "country" | "category")
          }
          displayEmpty
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="country">Sort by Country</MenuItem>
          <MenuItem value="category">Sort by Category</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.country}</TableCell>
                <TableCell>{hotel.address}</TableCell>
                <TableCell>{hotel.category}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditingHotel(hotel)}>Edit</Button>
                  <Button onClick={() => handleDelete(hotel.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editingHotel && (
        <div className="mt-4">
          <h2>Edit Hotel</h2>
          <HotelForm hotelToEdit={editingHotel} />
          <Button onClick={() => setEditingHotel(null)}>Cancel</Button>
        </div>
      )}
    </div>
  );
}
