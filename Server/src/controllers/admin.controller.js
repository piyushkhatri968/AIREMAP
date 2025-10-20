import Auth from "../models/auth.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import PaymentHistory from "../models/paymentHistory.model.js";

export const GetAllUser = async (req, res) => {
  try {
    const users = await Auth.find({ onBoarded: true, verified: true })
      .select("firstName lastName email credits role createdAt totalMoneySpent")
      .sort({
        createdAt: -1,
      });
    return sendResponse(res, 200, true, "User fetched successfully", users);
  } catch (error) {
    console.error("Error in Admin-GetAllUser controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const UpdateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    if (!userId || !role) {
      return sendResponse(res, 400, false, "User and role is required", null);
    }
    if (userId === req.user._id.toString()) {
      return sendResponse(res, 400, false, "You can't update your role", null);
    }
    console.log(req.user._id);
    console.log(userId);

    const updatedUser = await Auth.findByIdAndUpdate(
      { _id: userId },
      { role: role },
      { new: true }
    );

    if (!updatedUser) {
      return sendResponse(res, 400, false, "User not found", null);
    }
    return sendResponse(res, 200, true, "Updated successfully", null);
  } catch (error) {
    console.error("Error in Admin-UpdateUserRole controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

export const GetAllTransactionHistory = async (req, res) => {
  try {
    const transactionHistory = await PaymentHistory.find()
      .select("userId serialNo credits status createdAt")
      .populate("userId", "firstName lastName email")
      .sort({
        createdAt: -1,
      });
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
    console.log(req.body);
  } catch (error) {
    console.error("Error in Admin-UpdateUserCredits controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};
