"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    dispatch(setUser(formData));

    router.push("/login");
    toast.success("data added successfully");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 1200 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  Sign Up <AccountCircleIcon sx={{ fontSize: 'inherit', marginLeft: '0.5em' }} />
</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
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
                  id="number"
                  label="Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.number}
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
                <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  width="100px"
                  startIcon={<AccountCircleIcon />}
                  align="center"
                >
                  Submit
                </Button>
                </Box>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <Image
                  src="/images/signup1.avif"
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

export default Signup;
