import axiosInstance from "./axios";

export const getOverallSummary = async () => {
  const response = await axiosInstance.get("/summary");
  return response.data;
};

export const getWeeklySummary = async () => {
  const response = await axiosInstance.get("/summary/weekly");
  return response.data;
};

export const getMonthlySummary = async () => {
  const response = await axiosInstance.get("/summary/monthly");
  return response.data;
};
