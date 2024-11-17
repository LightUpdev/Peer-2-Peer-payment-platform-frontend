// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://peer-2-peer-payment-platfrom-backend.onrender.com", // Replace with your backend URL
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or get from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
