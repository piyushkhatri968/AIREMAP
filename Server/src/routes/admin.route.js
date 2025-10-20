import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  GetAllTransactionHistory,
  GetAllUser,
  UpdateUserCredits,
  UpdateUserRole,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get(
  "/getAllUsers",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllUser
);

router.put(
  "/updateUserRole",
  isFullyAuthenticated,
  isAuthorized("admin"),
  UpdateUserRole
);

router.get(
  "/getAllTransactionHistory",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllTransactionHistory
);

router.put(
  "/updateUserCredits",
  isFullyAuthenticated,
  isAuthorized("admin"),
  UpdateUserCredits
);

export default router;
