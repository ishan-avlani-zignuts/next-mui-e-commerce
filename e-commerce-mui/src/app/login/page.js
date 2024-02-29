"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Link,
  Box,
} from "@mui/material";
import Image from "next/image";
import KeyIcon from "@mui/icons-material/Key";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User State:", user);
    console.log("Form Data:", formData);

    if (
      user &&
      user.email === formData.email &&
      user.password === formData.password
    ) {
      dispatch(loginUser(user));
      router.push("/products");
      console.log("Login successful");
      toast.success("logged in successfully");
    } else {
      console.log("Invalid credentials");
      toast.error("invalid credentials");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={{ Width: 1200 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Login{" "}
                <AccountCircleIcon
                  sx={{ fontSize: "inherit", marginLeft: "0.5em" }}
                />
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Box display="flex" justifyContent="center" >
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    width="100px"
                    startIcon={<KeyIcon />}
                    sx={{ marginRight: '10px' }} 
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    width="100px"
                    startIcon={<AddCircleIcon />}
                    href="/signup"
                  >
                    New Account
                  </Button>
                </Box>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <Image
                  src="/images/login.jpg"
                  alt="Image"
                  width={500}
                  height={500}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default LoginPage;
