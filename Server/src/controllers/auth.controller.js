import Auth from "../models/auth.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/SendEmails/sendVerificationEmail.js";
import { sendEmail } from "../utils/SendEmails/sendEmail.js";
import { sendAccountVerifiedEmailTemplate } from "../utils/EmailTemplates/sendAccountVerifiedEmailTemplate.js";
import { StatsData } from "./stats.controller.js";

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
      return sendResponse(res, 400, false, "Passwords do not match", null);
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

    try {
      //send verification Email
      await sendVerificationEmail({
        to: user.email,
        token,
        firstName: user.firstName,
      });
    } catch (error) {
      return sendResponse(res, 500, false, error.message, null);
    }

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

    const htmlTemplate = sendAccountVerifiedEmailTemplate({
      firstName: user.firstName,
    });

    try {
      await sendEmail({
        subject: "Account Verified at AIREMAP",
        to: user.email,
        html: htmlTemplate,
      });
    } catch (error) {
      sendResponse(res, 500, false, error.message, null);
    }

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

    try {
      //send verification Email
      await sendVerificationEmail({
        to: user.email,
        token,
        firstName: user.firstName,
      });
    } catch (error) {
      return sendResponse(res, 500, false, error.message, null);
    }
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

    isUserExist.lastLoginTime = new Date();
    await isUserExist.save();

    let message;

    if (!isUserExist.onBoarded) {
      message = "Please complete the onboarding process";
    } else if (isUserExist.onBoarded && !isUserExist.verified) {
      message = "Please verify your account";
    } else {
      message = "Login successful";
    }

    sendToken(isUserExist, 200, message, res, req);
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

export const GetMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Auth.findById(_id).select(
      "email credits role firstName lastName verified onBoarded disabled address city country postalCode profileImageUrl totalMoneySpent totalFilesSubmitted perCreditPrice VAT lastLoginTime"
    );
    return sendResponse(res, 200, true, "User fetched successfully", user);
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

export const UpdateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      city,
      address,
      postalCode,
      isUpdatePassword,
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Validate mandatory profile fields
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

    const user = await Auth.findById(req.user._id);
    if (!user) return sendResponse(res, 404, false, "User not found", null);

    // Handle password update
    if (isUpdatePassword) {
      const isCurrentPassMatched = await user.comparePassword(currentPassword);
      if (!isCurrentPassMatched) {
        return sendResponse(
          res,
          403,
          false,
          "Current password is incorrect",
          null
        );
      }
      if (newPassword !== confirmPassword) {
        return sendResponse(res, 400, false, "Passwords do not match", null);
      }
      if (newPassword.length < 6) {
        return sendResponse(
          res,
          400,
          false,
          "Password must be at least 6 characters long",
          null
        );
      }
      user.password = newPassword;
    }

    // Update profile fields
    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.country = country.trim();
    user.city = city.trim();
    user.address = address.trim();
    user.postalCode = postalCode.toString().trim();

    await user.save();

    return sendResponse(res, 200, true, "Profile updated successfully", null);
  } catch (error) {
    console.error("Error in UpdateProfile controller:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const UserStats = async (req, res) => {
  try {
    const data = await StatsData(req.user._id);
    return sendResponse(res, 200, true, "Stats fetched successfully", data);
  } catch (error) {
    console.error("Error in UserStats controller:", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};
