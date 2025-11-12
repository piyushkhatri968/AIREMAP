import mongoose from "mongoose";

const fileHistorySchema = new mongoose.Schema(
  {
    ecuFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EcuFile",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    actionType: {
      type: String,
      enum: ["upload", "download"],
      required: true,
    },
  },
  { timestamps: true }
);

const FileHistory = mongoose.model("FileHistory", fileHistorySchema);

export default FileHistory;
