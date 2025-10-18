import crypto from "crypto";
import { squareClient, squareLocationId } from "../config/square.config.js";
import { sendResponse } from "../utils/sendResponse.js";

export const CreatePayment = async (req, res) => {
  try {
    const { sourceId, amount, email } = req.body;
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

    return sendResponse(
      res,
      200,
      true,
      "Payment Successful",
      response.data.payment
    );
  } catch (error) {
    console.error("Error in CreatePayment Controler:", error);
    return sendResponse(
      res,
      400,
      false,
      error.response?.data?.errors?.[0]?.detail || "Payment failed",
      null
    );
  }
};
