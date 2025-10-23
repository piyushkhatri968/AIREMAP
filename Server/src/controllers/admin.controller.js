import Auth from "../models/auth.model.js";
import EcuFile from "../models/ecuFile.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import PaymentHistory from "../models/paymentHistory.model.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({ onBoarded: true, verified: true })
      .select(
        "firstName lastName email credits role createdAt totalMoneySpent totalFilesSubmitted"
      )
      .sort({
        createdAt: -1,
      })
      .lean();
    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error) {
    console.error("Error in Admin-GetAllUsers controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const GetAllUnverifiedUsers = async (req, res) => {
  try {
    const users = await Auth.find({
      $or: [{ onBoarded: false }, { verified: false }],
    })
      .select(
        "firstName lastName email role country city verified onBoarded createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .lean();
    return sendResponse(
      res,
      200,
      true,
      "Unverified users fetched successfully",
      users
    );
  } catch (error) {
    console.error("Error in Admin-GetAllUnverifiedUsers controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const UpdateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    if (!userId || !role) {
      return sendResponse(res, 400, false, "User and role is required", null);
    }
    if (!["admin", "user"].includes(role)) {
      return sendResponse(res, 400, false, "Invalid role", null);
    }

    if (userId === req.user._id.toString()) {
      return sendResponse(
        res,
        403,
        false,
        "You can't update your own role",
        null
      );
    }
    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 404, false, "User not found", null);
    }
    return sendResponse(res, 200, true, "Role updated successfully", null);
  } catch (error) {
    console.error("Error in Admin-UpdateUserRole controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const GetAllTransactionHistory = async (req, res) => {
  try {
    const transactionHistory = await PaymentHistory.find()
      .select("userId serialNo credits amount status createdAt")
      .populate("userId", "firstName lastName email")
      .sort({
        createdAt: -1,
      })
      .lean();
    return sendResponse(
      res,
      200,
      true,
      "Payment history fetched successfully",
      transactionHistory
    );
  } catch (error) {
    console.error("Error in Admin-GetAllTransactionHistory controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const UpdateUserCredits = async (req, res) => {
  try {
    const { userId, credits } = req.body;

    if (!userId || credits === undefined) {
      return sendResponse(
        res,
        400,
        false,
        "User and credits value are required",
        null
      );
    }

    const user = await Auth.findById(userId);
    if (!user) {
      return sendResponse(res, 400, false, "User not found", null);
    }

    let newCredits;
    if (credits === "reset") {
      newCredits = 0;
    } else {
      const numCredits = Number(credits);
      if (isNaN(numCredits)) {
        return sendResponse(res, 400, false, "Invalid credits value", null);
      }
      // prevent negative credits
      newCredits = Math.max(user.credits + numCredits, 0);
    }

    user.credits = newCredits;
    await user.save();

    return sendResponse(
      res,
      200,
      true,
      "User credits updated successfully",
      null
    );
  } catch (error) {
    console.error("Error in Admin-UpdateUserCredits controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const GetAllEcuFiles = async (req, res) => {
  try {
    const response = await EcuFile.find()
      .select("userId status createdAt ticketNumber make model")
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();
    return sendResponse(
      res,
      200,
      true,
      "Ecu Files fetched Successfully",
      response
    );
  } catch (error) {
    console.error("Error in Admin-GetAllEcuFiles controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const UpdateEcuFileStatus = async (req, res) => {
  const { fileId, status } = req.body;
  try {
    if (!fileId || !status) {
      return sendResponse(res, 400, false, "File Id and status is required");
    }
    const updatedEcuFile = await EcuFile.findByIdAndUpdate(
      fileId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedEcuFile) {
      return sendResponse(res, 404, false, "Failed to update status", null);
    }

    return sendResponse(res, 200, true, "Status updated successfully", null);
  } catch (error) {
    console.error("Error in Admin-UpdateEcuFileStatus controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};
