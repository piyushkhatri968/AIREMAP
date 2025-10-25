import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  DeleteUser,
  DisableUser,
  GetAllEcuFiles,
  GetAllTransactionHistory,
  GetAllUnverifiedUsers,
  GetAllUsers,
  UpdateEcuFileStatus,
  UpdatePerCreditPrice,
  UpdateUserCredits,
  UpdateUserRole,
  UploadTunedFile,
} from "../controllers/admin.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

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

router.put(
  "/uploadTunedFile",
  isFullyAuthenticated,
  isAuthorized("admin"),
  upload.fields([{ name: "tunedFile", maxCount: 1 }]),
  UploadTunedFile
);

router.put(
  "/updatePerCreditPrice",
  isFullyAuthenticated,
  isAuthorized("admin"),
  UpdatePerCreditPrice
);

router.post(
  "/disableUser",
  isFullyAuthenticated,
  isAuthorized("admin"),
  DisableUser
);
router.post(
  "/deleteUser",
  isFullyAuthenticated,
  isAuthorized("admin"),
  DeleteUser
);

export default router;
