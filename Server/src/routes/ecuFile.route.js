import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";
import { CreateEcuFile } from "../controllers/ecuFile.controller.js";

const router = express.Router();

router.post(
  "/create-ecuFile",
  isAuthenticated,
  isAuthorized("user"),
  CreateEcuFile
);

export default router;
