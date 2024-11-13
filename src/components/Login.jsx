// src/components/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { transactionHistory } from "../features/wallet/walletSlice";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(transactionHistory());
  }, [dispatch]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {status === "loading" && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Don't have an account <Link to={"/register"}>Register </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
