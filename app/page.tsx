"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import HotelForm from "@/src/components/HotelForm";
import HotelList from "@/src/components/HotelList";
import CategoryForm from "@/src/components/CategoryForm";
import CategoryList from "@/src/components/CategoryList";
import { Button } from "@mui/material";

const theme = createTheme();

export default function Home() {
  const [activeTab, setActiveTab] = useState("hotels");

  useEffect(() => {
    // Load data from localStorage
    const savedHotels = localStorage.getItem("hotels");
    const savedCategories = localStorage.getItem("categories");
    if (savedHotels) {
      store.dispatch({ type: "SET_HOTELS", payload: JSON.parse(savedHotels) });
    }
    if (savedCategories) {
      store.dispatch({
        type: "SET_CATEGORIES",
        payload: JSON.parse(savedCategories),
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Hotels Ranking
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button onClick={() => setActiveTab("hotels")}>Hotels</Button>
              <Button onClick={() => setActiveTab("categories")}>
                Categories
              </Button>
            </Box>
            {activeTab === "hotels" ? (
              <>
                <HotelForm />
                <HotelList />
              </>
            ) : (
              <>
                <CategoryForm />
                <CategoryList />
              </>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
