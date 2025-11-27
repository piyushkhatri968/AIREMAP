import express from "express";
import {
  GetMe,
  Login,
  Logout,
  Onboarding,
  ResendEmailVerification,
  SendForgotPasswordEmail,
  Signup,
  SignupEmailVerify,
  UpdateLangPreference,
  UpdatePassword,
  UpdateProfile,
  UserStats,
} from "../controllers/auth.controller.js";
import {
  isAuthenticated,
  isAuthorized,
  isFullyAuthenticated,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/onboarding", isAuthenticated, Onboarding);
router.post("/signup-verify", isAuthenticated, SignupEmailVerify);
router.post("/signup-verify-resend", isAuthenticated, ResendEmailVerification);
router.post("/login", Login);
router.get("/getMe", isAuthenticated, GetMe);
router.post("/logout", Logout);
router.put(
  "/updateProfile",
  isFullyAuthenticated,
  isAuthorized("user"),
  UpdateProfile
);
router.get("/stats", isFullyAuthenticated, isAuthorized("user"), UserStats);

router.post("/resetPassword", SendForgotPasswordEmail);
router.post("/updatePassword", UpdatePassword);
router.put("/updateLangPreference", isFullyAuthenticated, UpdateLangPreference)

export default router;
