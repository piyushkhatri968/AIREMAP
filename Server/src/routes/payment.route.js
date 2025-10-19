import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  CreatePayment,
  GetPaymentHistory,
} from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/create-payment", isFullyAuthenticated, CreatePayment);
router.get(
  "/payment-history",
  isFullyAuthenticated,
  isAuthorized("user"),
  GetPaymentHistory
);

export default router;
