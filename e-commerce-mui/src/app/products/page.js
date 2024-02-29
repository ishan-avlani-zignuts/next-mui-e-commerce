"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../../Redux/cartSlice";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, page, limit]);

  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const response = await axios.get(url);
      const start = (page - 1) * limit;
      const end = page * limit;
      const slicedProducts = response.data.slice(start, end);
      setProducts(slicedProducts);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
                  {product.title.split(" ").slice(0, 7).join(" ")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(add(product))}
                  fullWidth
                  endIcon={<AddShoppingCartIcon />}
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
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">All categories</MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {loading ? <CircularProgress /> : renderCards()}

        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ margin: "0 10px" }}>
            Page {page}
          </Typography>
          <Button
            variant="outlined"
            disabled={products.length < limit}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Products;
