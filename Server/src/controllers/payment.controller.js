import crypto from "crypto";
import { squareClient, squareLocationId } from "../config/square.config.js";
import { sendResponse } from "../utils/sendResponse.js";
import PaymentHistory from "../models/paymentHistory.model.js";
import Auth from "../models/auth.model.js";
import { sendCreditsBoughtEmailConfirmation } from "../utils/EmailTemplates/sendCreditsBoughtEmailConfirmation.js";
import { sendEmail } from "../utils/SendEmails/sendEmail.js";
import { updateStats } from "./stats.controller.js";

export const CreatePayment = async (req, res) => {
  try {
    const { sourceId, amount, email, packageId } = req.body;
    const userId = req.user._id;
    if (!sourceId || !amount || !email)
      return sendResponse(res, 400, false, "Please provide all required payment information.", null);

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

    await updateStats(userId, { moneySpent: amount });

    const htmlTemplate = sendCreditsBoughtEmailConfirmation({
      amount,
      credits,
      serialNo,
      dateTime: paymentStatus.createdAt,
      firstName: req.user.firstName,
    });

    // Send email in background to user (non-blocking)
    setImmediate(() => {
      sendEmail({
        to: req.user.email,
        html: htmlTemplate,
        subject: "AIREMAP Payment Receipt — Credits Purchase Successful",
      }).catch(() => { });
    });

    return sendResponse(
      res,
      200,
      true,
      "Payment successful! Your credits have been added to your account.",
      response.data.payment
    );
  } catch (error) {
    console.error("Error in CreatePayment Controller:", error);

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
    const userMessage = getFriendlyErrorMessage(
      errData || "Payment failed. Please try again."
    );
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
      "Payment history retrieved successfully.",
      paymentHistory
    );
  } catch (error) {
    console.error("Error in GetPaymentHistory Controller:", error);
    sendResponse(res, 400, false, "Unable to retrieve payment history. Please try again.", null);
  }
};

const getFriendlyErrorMessage = (error) => {
  const code = error?.code;

  const map = {
    // Card validation errors
    INVALID_CARD: "The card number you entered is invalid. Please check and try again.",
    INVALID_CARD_DATA: "The card details you entered are invalid. Please check and try again.",
    CARD_NOT_SUPPORTED: "This card type is not supported. Please try a different card.",
    INVALID_EXPIRATION: "The expiry date is invalid. Please check your card.",
    INVALID_EXPIRATION_DATE: "The expiry date format is incorrect. Please use MM/YY.",
    EXPIRATION_FAILURE: "Your card has expired. Please use a different card.",
    INVALID_CVV: "The security code (CVV) is invalid. Please check the 3-digit code on the back of your card.",
    VERIFY_CVV_FAILURE: "The security code (CVV) could not be verified. Please check and try again.",
    CVV_FAILURE: "The security code (CVV) didn't match. Please check and try again.",

    // Card declined errors
    CARD_DECLINED: "Your card was declined. Please try a different card or contact your bank.",
    CARD_DECLINED_CALL_ISSUER: "Your card was declined. Please contact your bank for assistance.",
    CARD_DECLINED_VERIFICATION_REQUIRED: "Additional verification is required. Please contact your bank.",
    GENERIC_DECLINE: "Your payment couldn't be processed. Please try a different card.",
    VOICE_FAILURE: "Your bank requires voice authorization. Please contact your card issuer.",

    // Funds and limits
    INSUFFICIENT_FUNDS: "Insufficient funds available. Please try a different card.",
    AMOUNT_TOO_HIGH: "The payment amount exceeds your card limit. Please try a different card.",
    AMOUNT_TOO_LOW: "The payment amount is below the minimum allowed.",
    PAYMENT_LIMIT_EXCEEDED: "This payment exceeds the processing limit. Please try a smaller amount or different card.",

    // Address verification
    VERIFY_AVS_FAILURE: "Your billing address could not be verified. Please check your details.",
    ADDRESS_VERIFICATION_FAILURE: "Your billing address didn't match your card details. Please check and try again.",
    INVALID_POSTAL_CODE: "The postal code is invalid. Please check your billing address.",

    // Token errors
    CARD_TOKEN_EXPIRED: "Your session has expired. Please refresh the page and try again.",
    CARD_TOKEN_USED: "This payment was already processed. Please refresh the page if you need to try again.",

    // PIN errors
    INVALID_PIN: "The PIN entered is incorrect. Please try again.",
    ALLOWABLE_PIN_TRIES_EXCEEDED: "Too many incorrect PIN attempts. Please contact your bank.",

    // Other errors
    CHIP_INSERTION_REQUIRED: "Your card requires chip insertion. Please use a different card for online payments.",
    INVALID_EMAIL_ADDRESS: "The email address provided is invalid. Please check and try again.",
    IDEMPOTENCY_KEY_REUSED: "This payment may have already been processed. Please check your account before trying again.",
  };

  return map[code] || error?.detail || "Payment failed. Please try again or use a different card.";
};
