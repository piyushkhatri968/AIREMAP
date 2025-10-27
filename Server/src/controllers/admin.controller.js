import Auth from "../models/auth.model.js";
import EcuFile from "../models/ecuFile.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import PaymentHistory from "../models/paymentHistory.model.js";
import { uploadToCloudinary } from "../utils/Cloudinary/uploadDataToCloudinary.js";
import fs from "fs/promises";
import { deleteFromCloudinary } from "../utils/Cloudinary/deleteDataFromCloudinary.js";
import Chat from "../models/chat.model.js";
import mongoose from "mongoose";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await Auth.find({
      onBoarded: true,
      verified: true,
      disabled: false,
    })
      .select(
        "firstName lastName email credits role createdAt totalMoneySpent totalFilesSubmitted perCreditPrice"
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
export const GetAllDisabledUsers = async (req, res) => {
  try {
    const users = await Auth.find({
      disabled: true,
    })
      .select(
        "firstName lastName email credits role createdAt totalMoneySpent totalFilesSubmitted perCreditPrice"
      )
      .sort({
        createdAt: -1,
      })
      .lean();
    return sendResponse(
      res,
      200,
      true,
      "Disabled users fetched successfully",
      users
    );
  } catch (error) {
    console.error("Error in Admin-GetAllDisabledUsers controller", error);
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

export const UploadTunedFile = async (req, res) => {
  try {
    const { ticketNumber } = req.body;
    if (!ticketNumber) {
      return sendResponse(res, 400, false, "Ticket number is required", null);
    }
    const file = req.files?.tunedFile?.[0];
    if (!file)
      return sendResponse(res, 400, false, "Tuned file is required", null);

    const ecuFile = await EcuFile.findOne({ ticketNumber });
    if (!ecuFile) {
      return sendResponse(res, 400, false, "Ticket not found", null);
    }

    // Upload file to cloudinary
    let tunedFileUrl = null;
    const filePath = file.path;

    try {
      tunedFileUrl = await uploadToCloudinary(filePath);
      if (tunedFileUrl && ecuFile.tunedFile) {
        await deleteFromCloudinary(ecuFile.tunedFile);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return sendResponse(res, 500, false, "Cloud upload failed", null);
    } finally {
      await fs.unlink(filePath).catch(() => {}); // always remove local file
    }

    await EcuFile.findOneAndUpdate(
      { ticketNumber },
      { tunedFile: tunedFileUrl },
      { new: true }
    );

    return sendResponse(
      res,
      200,
      true,
      "Tuned file uploaded successfully",
      null
    );
  } catch (error) {
    console.error("Error in Admin-UploadTunedFile controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const UpdatePerCreditPrice = async (req, res) => {
  try {
    const { creditPrice, userId } = req.body;
    if (!userId) {
      return sendResponse(res, 400, false, "User  is required", null);
    }
    if (!creditPrice) {
      return sendResponse(res, 400, false, "Credit price is required", null);
    }
    const updatedCreditPrice = await Auth.findByIdAndUpdate(
      userId,
      {
        perCreditPrice: creditPrice,
      },
      { new: true }
    );
    if (!updatedCreditPrice) {
      return sendResponse(
        res,
        400,
        false,
        "Failed to update credit price",
        null
      );
    }
    return sendResponse(
      res,
      200,
      true,
      `Credit price updated successfully for ${updatedCreditPrice.firstName}`,
      null
    );
  } catch (error) {
    console.error("Error in Admin-UpdatePerCreditPrice controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const DisableUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return sendResponse(res, 400, false, "User  is required", null);
    }

    if (userId === req.user._id.toString()) {
      return sendResponse(res, 400, false, "You can't disable yourself", null);
    }

    const disableUser = await Auth.findByIdAndUpdate(
      userId,
      {
        disabled: true,
      },
      { new: true }
    );
    if (!disableUser) {
      return sendResponse(res, 400, false, "Failed to disable user", null);
    }
    return sendResponse(res, 200, true, `User disabled successfull`, null);
  } catch (error) {
    console.error("Error in Admin-DisableUser controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};
export const ActiveUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return sendResponse(res, 400, false, "User  is required", null);
    }

    if (userId === req.user._id.toString()) {
      return sendResponse(res, 400, false, "You can't active yourself", null);
    }

    const activatedUser = await Auth.findByIdAndUpdate(
      userId,
      {
        disabled: false,
      },
      { new: true }
    );
    if (!activatedUser) {
      return sendResponse(res, 400, false, "Failed to activate user", null);
    }
    return sendResponse(res, 200, true, `User activated successfull`, null);
  } catch (error) {
    console.error("Error in Admin-ActiveUser controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const DeleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.body;
    if (!userId) {
      return sendResponse(res, 400, false, "User ID is required", null);
    }

    if (userId === req.user._id.toString()) {
      return sendResponse(res, 400, false, "You can't delete yourself", null);
    }

    // Check user existence
    const user = await Auth.findById(userId).session(session);
    if (!user) {
      return sendResponse(res, 404, false, "User not found", null);
    }

    //  Get all ECU files of this user
    const ecuFiles = await EcuFile.find({ userId }).session(session);

    // Delete all chats related to this user’s ECU files
    const ecuFileIds = ecuFiles.map((file) => file._id);
    await Chat.deleteMany({
      $or: [{ sender: userId }, { ecuFile: { $in: ecuFileIds } }],
    }).session(session);

    // Delete ECU files (and optionally delete from Cloudinary)
    for (const file of ecuFiles) {
      try {
        // Optional: delete Cloudinary files
        if (file.originalFile) await deleteFromCloudinary(file.originalFile);
        if (file.tunedFile) await deleteFromCloudinary(file.tunedFile);
        if (file.additionalFiles?.length) {
          for (const f of file.additionalFiles) {
            await deleteFromCloudinary(f);
          }
        }
      } catch (cloudErr) {
        console.warn("Cloudinary delete error:", cloudErr.message);
      }
    }
    await EcuFile.deleteMany({ userId }).session(session);

    // Delete payment history
    await PaymentHistory.deleteMany({ userId }).session(session);

    // Finally delete the user
    await Auth.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();
    session.endSession();

    return sendResponse(
      res,
      200,
      true,
      "User and all related data deleted successfully",
      null
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in Admin-DeleteUser:", error);
    return sendResponse(res, 500, false, error.message, null);
  }
};
