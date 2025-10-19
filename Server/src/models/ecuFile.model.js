import mongoose from "mongoose";

const ecuFileSchema = new mongoose.Schema(
  {
    // user details
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    // Vehicle Details
    ticketNumber: {
      type: String,
      unique: true,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    registration: {
      type: String,
      unique: true,
      required: true,
    },
    ecuId: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    readType: {
      type: String,
      required: true,
    },
    readTool: {
      type: String,
      required: true,
    },
    masterSlave: {
      type: String,
      required: true,
    },

    // Tuning Details
    stage: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    modificationOptions: [
      {
        type: String,
      },
    ],

    // File Paths
    originalFile: {
      type: String,
      required: true,
    },
    TunedFilePath: {
      type: String,
    },
    additionalFiles: [
      {
        type: String,
      },
    ],

    // Status and Credits
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Failed", "Unlocked"],
      default: "Pending",
    },

    creditsUsed: {
      type: Number,
    },
    creditsNeed: {
      type: Number,
    },
    unlockedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const EcuFile = mongoose.model("EcuFile", ecuFileSchema);

export default EcuFile;
