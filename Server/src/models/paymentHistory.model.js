import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    serialNo: {
      type: String,
      required: true,
    },
    packageType: String,
    credits: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Failed", "Completed"],
    },
  },
  { timestamps: true }
);

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);

export default PaymentHistory;
