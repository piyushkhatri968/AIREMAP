import express from "express";
import {
  GetMe,
  Login,
  Logout,
  Onboarding,
  ResendEmailVerification,
  Signup,
  SignupEmailVerify,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/onboarding", isAuthenticated, Onboarding);
router.post("/signup-verify", isAuthenticated, SignupEmailVerify);
router.post("/signup-verify-resend", isAuthenticated, ResendEmailVerification);
router.post("/login", Login);
router.get("/getMe", isAuthenticated, GetMe);
router.post("/logout", isAuthenticated, Logout);

export default router;
