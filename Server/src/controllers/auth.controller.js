import Auth from "../models/auth.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export const Signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (!email || !password || !confirmPassword) {
      return sendResponse(res, 400, false, "All fields are required", null);
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregex.test(email)) {
      return sendResponse(res, 400, false, "Invalid Email", null);
    }

    if (password !== confirmPassword) {
      return sendResponse(res, 400, false, "Passwords do no match", null);
    }
    if (password.length < 6) {
      return sendResponse(
        res,
        400,
        false,
        "Password must be atleast 6 characters long"
      );
    }
    const isEmailUsed = await Auth.findOne({ email });
    if (isEmailUsed) {
      return sendResponse(res, 400, false, "Email is already used");
    }

    const user = await Auth.create({
      email,
      password,
    });

    sendToken(
      user,
      201,
      "Signup successful. Please complete onboarding process",
      res,
      req
    );
  } catch (error) {
    console.error("Error in Signup controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const Onboarding = async (req, res) => {
  const { firstName, lastName, country, city, address, postalCode } = req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !country ||
      !city ||
      !address ||
      !postalCode
    ) {
      return sendResponse(res, 400, false, "All fields are required", null);
    }

    const updateData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      country: country.trim(),
      city: city.trim(),
      address: address.trim(),
      postalCode,
      onBoarded: true,
    };

    const user = await Auth.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });

    if (!user) {
      return sendResponse(res, 404, false, "User not found", null);
    }

    //create verificatin token and save in database
    const token = crypto.randomBytes(32).toString("hex");
    user.emailVerificationCode = token;
    user.emailVerificationExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await user.save();

    //send verification Email
    await sendVerificationEmail({
      to: user.email,
      token,
      firstName: user.firstName,
    });

    return sendResponse(
      res,
      200,
      true,
      "Onboarding completed. Please verify your account",
      user
    );
  } catch (error) {
    console.error("Error in Onboarding controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const SignupEmailVerify = async (req, res) => {
  const { email, token } = req.body;
  const decodedEmail = decodeURIComponent(email);
  try {
    if (!email || !token) {
      return sendResponse(res, 400, false, "Invalid verification link", null);
    }

    const user = await Auth.findOne({
      email: decodedEmail,
      emailVerificationCode: token,
      emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, 400, false, "Invalid or expired token", null);
    }

    user.verified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    return sendResponse(res, 200, true, "Email verification successfull", user);
  } catch (error) {
    console.error("Error in SignupEmailVerify controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const ResendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendResponse(res, 400, false, "Email required", null);

    const user = await Auth.findOne({ email: email.toLowerCase().trim() });
    if (!user) return sendResponse(res, 404, false, "User not found", null);
    if (user.verified)
      return sendResponse(res, 400, false, "User already verified", null);

    const token = crypto.randomBytes(32).toString("hex");
    user.emailVerificationCode = token;
    user.emailVerificationExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendVerificationEmail({
      to: user.email,
      token,
      firstName: user.firstName,
    });
    return sendResponse(res, 200, true, "Verification email resent", null);
  } catch (error) {
    console.error("Error in ResendEmailVerification controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return sendResponse(res, 400, false, "Email and password is required");
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregex.test(email)) {
      return sendResponse(res, 400, false, "Invalid Email", null);
    }

    const isUserExist = await Auth.findOne({ email });
    if (!isUserExist) {
      return sendResponse(res, 400, false, "Email or password is wrong");
    }

    const isPasswordMatched = await isUserExist.comparePassword(password);
    if (!isPasswordMatched) {
      return sendResponse(res, 400, false, "Email or password is wrong");
    }
    sendToken(isUserExist, 200, "Login successful", res, req);
  } catch (error) {
    console.error("Error in Login controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const GetMe = (req, res) => {
  try {
    return sendResponse(res, 200, true, "User fetched successfully", req.user);
  } catch (error) {
    console.error("Error in GetMe controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const Logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("airemapToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json({ success: true, message: "Logout successful" });
};

export const SendForgotPasswordOTP = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return sendResponse(res, 400, false, "Email is required", null);
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailregex.test(email)) {
      return sendResponse(res, 400, false, "Invalid Email", null);
    }
    const isUserExist = await Auth.findOne({ email });
    if (!isUserExist) {
      return sendResponse(res, 404, false, "User not found", null);
    }
    SendForgotPasswordOTP(email);
  } catch (error) {
    console.error("Error in Login controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};
