"use client";

import React from "react";
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
  Typography,
  Stack,
} from "@mui/material";
import { remove, increaseQuantity, decreaseQuantity } from "@/Redux/cartSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });

    return Math.round(total * 100) / 100;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px" }}>Image </TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Title</TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Price</TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Quantity</TableCell>
              <TableCell sx={{ fontSize: "20px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.image} alt="Product" style={{ width: 100 }} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <AddCircleOutlineIcon />
                  </Button>

                  {item.quantity}

                  <Button
                    variant="contained"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <RemoveCircleIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    endIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Total : ${calculateTotal()}
          <Link href="/checkout">
            {" "}
            <Button
              width="50px"
              endIcon={<ShoppingCartCheckoutIcon />}
              variant="contained"
              to="/checkout"
            >
              Checkout{" "}
            </Button>
          </Link>
        </Typography>
      </Stack>
    </>
  );
}

export default Cart;
