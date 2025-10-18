import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const squareClient = axios.create({
  baseURL: "https://connect.squareupsandbox.com/v2",
  headers: {
    "Square-Version": "2025-03-20",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  },
});

export const squareLocationId = process.env.SQUARE_LOCATION_ID;
