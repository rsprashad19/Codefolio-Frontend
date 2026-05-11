import api from "./axios";

export const registerUser = async (payload) => {
  // Function to register a new user
  const response = await api.post("/auth/register", payload); // API call to register the user with the provided payload
  return response.data;
};

export const loginUser = async (payload) => {
  // Function to login a user
  const response = await api.post("/auth/login", payload); // API call to login the user with the provided payload
  return response.data;
};
