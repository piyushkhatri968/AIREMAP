import Auth from "../models/auth.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendToken } from "../utils/sendToken.js";

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

    const user = Auth.create({
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

    sendToken(
      user,
      200,
      "Onboarding completed. Please verify your account",
      res,
      req
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

export const SignupVerify = (req, res) => {
  const { emailVerificationCode } = req.body;
  try {
    if (!emailVerificationCode) {
      return sendResponse(
        res,
        400,
        false,
        "Verification code is required",
        null
      );
    }
  } catch (error) {}
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
    return sendResponse(
      res,
      200,
      success,
      "User fetched successfully",
      req.user
    );
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
