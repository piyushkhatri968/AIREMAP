import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  ActiveUser,
  CreateAgent,
  CreateAdmin,
  DeleteUser,
  DisableUser,
  GetAllAdmins,
  GetAllAgents,
  GetAllDisabledUsers,
  GetAllEcuFiles,
  GetAllTransactionHistory,
  GetAllUnverifiedUsers,
  GetAllUsers,
  UpdateEcuFileStatus,
  UpdatePerCreditPrice,
  UpdateUserCredits,
  UpdateUserRole,
  UpdateUserVAT,
  UploadTunedFile,
} from "../controllers/admin.controller.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");

// ensure upload folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get(
  "/getAllUsers",
  isFullyAuthenticated,
  isAuthorized("admin", "agent"),
  GetAllUsers
);
router.get(
  "/getAllAgents",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllAgents
);
router.get(
  "/getAllAdmins",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllAdmins
);
router.get(
  "/getAllDisabledUsers",
  isFullyAuthenticated,
  isAuthorized("admin"),
  GetAllDisabledUsers
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
router.put(
  "/updateUserVAT",
  isFullyAuthenticated,
  isAuthorized("admin"),
  UpdateUserVAT
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
  isAuthorized("admin", "agent"),
  UpdateUserCredits
);

router.get(
  "/getAllEcuFiles",
  isFullyAuthenticated,
  isAuthorized("admin", "agent"),
  GetAllEcuFiles
);

router.put(
  "/updateEcuFileStatus",
  isFullyAuthenticated,
  isAuthorized("admin", "agent"),
  UpdateEcuFileStatus
);

router.put(
  "/uploadTunedFile",
  isFullyAuthenticated,
  isAuthorized("admin", "agent"),
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
  "/activeUser",
  isFullyAuthenticated,
  isAuthorized("admin"),
  ActiveUser
);
router.post(
  "/deleteUser",
  isFullyAuthenticated,
  isAuthorized("admin"),
  DeleteUser
);

router.post(
  "/createAgent",
  isFullyAuthenticated,
  isAuthorized("admin"),
  CreateAgent
);
router.post(
  "/createAdmin",
  isFullyAuthenticated,
  isAuthorized("admin"),
  CreateAdmin
);

export default router;
