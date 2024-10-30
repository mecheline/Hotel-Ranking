import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

interface Hotel {
  id: string;
  name: string;
  country: string;
  address: string;
  category: string;
}

interface HotelFormProps {
  hotelToEdit?: Hotel | null;
}

const HotelForm: FC<HotelFormProps> = ({ hotelToEdit = null }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);
  const [hotel, setHotel] = useState<Hotel>({
    id: "",
    name: "",
    country: "",
    address: "",
    category: "",
  });
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    if (hotelToEdit) {
      setHotel(hotelToEdit);
    }
    fetchCountries();
  }, [hotelToEdit]);

  const fetchCountries = async (): Promise<void> => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(
      data
        .map((country: { name: { common: string } }) => country.name.common)
        .sort()
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (hotel.id) {
      dispatch({ type: "UPDATE_HOTEL", payload: hotel });
    } else {
      dispatch({
        type: "ADD_HOTEL",
        payload: { ...hotel, id: Date.now().toString() },
      });
    }
    setHotel({ id: "", name: "", country: "", address: "", category: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        width: { xs: "100%", sm: "90%", md: "100%" },
        gap: 2,
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "30%" } }}>
        <TextField
          size="small"
          fullWidth
          label="Hotel Name"
          value={hotel.name}
          onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
          required
        />
      </Box>
      <Box sx={{ width: { xs: "100%", md: "30%" } }}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            size="small"
            value={hotel.country}
            onChange={(e) => setHotel({ ...hotel, country: e.target.value })}
            required
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "30%" } }}>
        <TextField
          size="small"
          fullWidth
          label="Address"
          value={hotel.address}
          onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
          required
        />
      </Box>
      <Box sx={{ width: { xs: "100%", md: "25%" } }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            size="small"
            value={hotel.category}
            onChange={(e) => setHotel({ ...hotel, category: e.target.value })}
            required
          >
            {categories.map((category: { id: string; name: string }) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "15%" } }}>
        <Button type="submit" variant="contained" color="primary">
          {hotel.id ? "Update" : "Add Hotel"}
        </Button>
      </Box>
    </Box>
  );
};

export default HotelForm;
