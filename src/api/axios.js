// src/api/axios.js
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  // Create an Axios instance with default configuration
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Add an interceptor to include the authentication token in the request headers
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
