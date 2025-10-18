import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { CreatePayment } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/create-payment", isAuthenticated, CreatePayment);

export default router;
