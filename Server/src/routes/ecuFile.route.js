import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  CreateEcuFile,
  EligibleToDownload,
  GetEcuFiles,
  GetTicketDetails,
} from "../controllers/ecuFile.controller.js";
const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";

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

router.post(
  "/create-ecuFile",
  isFullyAuthenticated,
  isAuthorized("user"),
  upload.fields([
    { name: "ecuFile", maxCount: 1 },
    { name: "commonFiles", maxCount: 10 },
  ]),
  CreateEcuFile
);

router.get(
  "/my-files",
  isFullyAuthenticated,
  isAuthorized("user"),
  GetEcuFiles
);

router.get(
  "/getTicketDetails/:ticketNumber",
  isFullyAuthenticated,
  GetTicketDetails
);

router.post(
  "/isEligibleToDownload",
  isFullyAuthenticated,
  isAuthorized("user"),
  EligibleToDownload
);

export default router;
