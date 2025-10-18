import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    serialNo: String,
    packageType: String,
    credits: Number,
    amount: String,
    status: {
      type: String,
      enum: ["Pending", "Failed", "Completed"],
    },
  },
  { timestamps: true }
);

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);

export default PaymentHistory;
