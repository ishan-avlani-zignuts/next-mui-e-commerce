"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import DangerousIcon from '@mui/icons-material/Dangerous';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories:", error)
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching products:", error)
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const renderCards = () => {
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {products.map((product) => (
          <Box key={product.id} width={250} marginBottom={2}>
            <Box
              boxShadow={3}
              borderRadius={8}
              overflow="hidden"
              width="100%"
              maxWidth={250}
            >
              <img
                src={product.image}
                alt="Product"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Box p={2}>
                <Typography variant="h6" noWrap>
                  {product.title.split(' ').slice(0, 7).join(' ')}
                </Typography>
                <Typography variant="body1" color="textSecondary">${product.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  endIcon={<AddShoppingCartIcon/>}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Container>
        <Box my={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label" endIcon={<CategoryIcon/>}>Select Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">All categories</MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {loading ? <CircularProgress /> : renderCards()}
      </Container>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Login Required <DangerousIcon/></DialogTitle>
        <DialogContent>
          You need to login first 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
