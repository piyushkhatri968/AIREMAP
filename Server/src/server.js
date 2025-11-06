import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import { socketHandler } from "./socket/socketHandler.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://files.airemap.co.uk",
    ],
    credentials: true,
  })
);

import authRoutes from "./routes/auth.route.js";
import paymentRoutes from "./routes/payment.route.js";
import ecuFileRoutes from "./routes/ecuFile.route.js";
import adminRoutes from "./routes/admin.route.js";

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ecuFile", ecuFileRoutes);
app.use("/api/admin", adminRoutes);

// http server for socket.io
const server = http.createServer(app);

// Initialize socket
const io = new Server(server, {
  cors: {
    origin: ["https://files.airemap.co.uk", "http://localhost:5174"],
    methods: ["Get", "Post"],
    credentials: true,
  },
});

// Socket logic
socketHandler(io);

server.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
  connectDB();
});
