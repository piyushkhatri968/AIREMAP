import crypto from "crypto";
import { squareClient, squareLocationId } from "../config/square.config.js";
import { sendResponse } from "../utils/sendResponse.js";
import PaymentHistory from "../models/paymentHistory.model.js";
import Auth from "../models/auth.model.js";

export const CreatePayment = async (req, res) => {
  try {
    const { sourceId, amount, email, cardHolderName, packageId } = req.body;
    const userId = req.user?._id;
    if (!sourceId || !amount || !email)
      return sendResponse(res, 400, false, "Missing payment info", null);

    const idempotencyKey = crypto.randomUUID();

    const response = await squareClient.post("/payments", {
      idempotency_key: idempotencyKey,
      source_id: sourceId,
      amount_money: {
        amount: Math.round(amount * 100), // convert GBP to pence
        currency: "GBP",
      },
      location_id: squareLocationId,
      autocomplete: true,
      buyer_email_address: email || null,
      note: "AIREMAP Tuning Payment",
    });

    // if payment succesfull

    // generate serial number (e.g., P00012345)
    const serialNo = `P000${Math.floor(100000 + Math.random() * 900000)}`;

    // extract number from packageId (like "48credits" → 48)
    const credits = parseInt(packageId.match(/\d+/)?.[0] || 0);

    const paymentStatus = await PaymentHistory.create({
      userId,
      serialNo,
      packageType: packageId,
      credits,
      amount,
      status: "Completed",
    });

    await Auth.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: Number(credits), totalMoneySpent: Number(amount) },
      },
      { new: true }
    );

    return sendResponse(
      res,
      200,
      true,
      "Payment Successful",
      response.data.payment
    );
  } catch (error) {
    console.error("Error in CreatePayment Controler:", error);

    if (req.user?._id) {
      const serialNo = `P000${Math.floor(100000 + Math.random() * 900000)}`;
      const credits = parseInt(req.body.packageId.match(/\d+/)?.[0] || 0);

      await PaymentHistory.create({
        userId: req.user._id,
        serialNo,
        packageType: req.body.packageId,
        credits,
        amount: req.body.amount,
        status: "Failed",
      });
    }

    const errData = error.response?.data?.errors?.[0];
    const userMessage = getFriendlyErrorMessage(errData);
    return sendResponse(res, 400, false, userMessage, null);
  }
};

export const GetPaymentHistory = async (req, res) => {
  try {
    let userId = req.user._id;

    const paymentHistory = await PaymentHistory.find({ userId }).sort({
      createdAt: -1,
    });
    return sendResponse(
      res,
      200,
      true,
      "History fetched successfull",
      paymentHistory
    );
  } catch (error) {
    console.error("Error in PaymentHistory controller", error);
    sendResponse(res, 400, false, error.message, null);
  }
};

const getFriendlyErrorMessage = (error) => {
  const code = error?.code;

  const map = {
    INVALID_EXPIRATION: "Please check your card’s expiry date.",
    INVALID_CARD: "The card number you entered is invalid.",
    INVALID_CVV: "Please check your CVV code.",
    CARD_DECLINED:
      "Your card was declined. Please try another card or contact your bank.",
    INSUFFICIENT_FUNDS: "Insufficient funds on your card.",
    CVV_FAILURE: "The CVV number didn’t match. Please try again.",
    ADDRESS_VERIFICATION_FAILURE:
      "Your billing address didn’t match your card details.",
    GENERIC_DECLINE:
      "Your payment couldn’t be processed. Please try another card.",
    INVALID_POSTAL_CODE: "Please check your billing ZIP or postal code.",
    PAYMENT_LIMIT_EXCEEDED: "Your card has reached its transaction limit.",
    INVALID_EXPIRATION_DATE: "Please check your card expiry date format.",
  };

  return map[code] || error?.detail || "Payment failed. Please try again.";
};
