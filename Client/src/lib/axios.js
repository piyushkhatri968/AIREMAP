import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.airemap.co.uk/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
});
