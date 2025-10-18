import mongoose from "mongoose";

const ecuFileSchema = new mongoose.Schema(
  {
    // Vehicle Details
    ticketNumber: {
      type: String,
      required,
    },
    make: {
      type: String,
      required,
    },
    model: {
      type: String,
      required,
    },
    year: {
      type: String,
      required,
    },
    registration: {
      type: String,
      required,
    },
    ecuId: {
      type: String,
      required,
    },
    transmission: {
      type: String,
      required,
    },
    readType: {
      type: String,
      required,
    },
    readTool: {
      type: String,
      required,
    },
    masterSlave: {
      type: String,
      required,
    },
    autoManual: {
      type: String,
    },

    // Tuning Details
    stage: {
      type: String,
      required,
    },
    notes: {
      type: String,
      required,
    },
    modificationOptions: [
      {
        type: String,
        required,
      },
    ],

    // File Paths
    originalFile: {
      type: String,
      required,
    },
    TunedFilePath: {
      type: String,
      required,
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
    unlockedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const EcuFile = mongoose.model("EcuFile", ecuFileSchema);

export default EcuFile;
