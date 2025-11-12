import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  month: {
    type: Number, // 1–12
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalFilesSubmitted: {
    type: Number,
    default: 0,
  },
  totalMoneySpent: {
    type: Number,
    default: 0,
  },
});

statsSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
