import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  GetAllEcuFiles,
  GetAllTransactionHistory,
  GetAllUnverifiedUsers,
  GetAllUsers,
  UpdateEcuFileStatus,
  UpdateUserCredits,
  UpdateUserRole,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get(
  "/getAllUsers",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllUsers
);
router.get(
  "/getAllUnverifiedUsers",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllUnverifiedUsers
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

router.get(
  "/getAllEcuFiles",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllEcuFiles
);

router.put(
  "/updateEcuFileStatus",
  isFullyAuthenticated,
  isAuthorized("admin"),
  UpdateEcuFileStatus
);

export default router;
