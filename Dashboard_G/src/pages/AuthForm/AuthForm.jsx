import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useLoginMutation ,useRegisterMutation,useGetMyProfileQuery} from '../../redux/services/users';


import { Link ,useNavigate } from "react-router-dom";

function AuthForm({onLogin}) {

  const [login, { isLoading, error }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const [tab, setTab] = useState("signin");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await login(loginData).unwrap();

      console.log(response);


      localStorage.setItem("token", response.token);
      localStorage.setItem("userLoggedIn",'true');

      console.log("navigate");

      onLogin();

      navigate("/");

        // console.log(loginData);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Register state and hooks
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "SUPPLIER",
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerData).unwrap();
      // console.log(registerData);
      console.log("User registered successfully:", response);
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        width: "500px",
        height: "auto",
        mx: "auto",
        my: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        {tab === "signin" ? "Sign In" : "Sign Up"}
      </Typography>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Sign In" value="signin" />
        <Tab label="Sign Up" value="signup" />
      </Tabs>
      <Paper elevation={3} sx={{ p: 3 }}>
        {tab === "signin" ? (
          <form onSubmit={handleLoginSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="login-email"
                name="email"
                label="Email"
                variant="outlined"
                required
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="login-password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                required
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#FF919D",
                "&:hover": {
                  backgroundColor: "#FF5C6C",
                },
              }}
            >
              Sign In
            </Button>
            <Box mt={2} textAlign="center">
              <Link
                to="/forgot-password"
                variant="body2"
                sx={{
                  border: "none",
                }}
              >
                Forgot Password?
              </Link>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <Box mb={2}>
              <TextField
                id="register-fullname"
                name="fullname"
                fullWidth
                label="Full Name"
                variant="outlined"
                required
                value={registerData.fullname}
                onChange={handleRegisterChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="register-email"
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                required
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="register-password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                required
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="register-confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                type="password"
                variant="outlined"
                required
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#FF919D",
                "&:hover": {
                  backgroundColor: "#FF5C6C",
                },
              }}
            >
              Sign Up
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}

export default AuthForm;
