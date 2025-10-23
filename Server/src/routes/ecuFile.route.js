import express from "express";
import {
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  CreateEcuFile,
  GetEcuFiles,
  GetTicketDetails,
} from "../controllers/ecuFile.controller.js";
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

export default router;
