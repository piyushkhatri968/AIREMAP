import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    ecuFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EcuFile", // chat belongs to this tuning file
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // user or admin
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth", // jinhone message dekh liya
      },
    ],
    attachments: [
      {
        url: String, // file/image link
        type: {
          type: String,
          enum: ["image", "file", "video", "other"],
          default: "file",
        },
      },
    ],
  },
  { timestamps: true }
);

chatSchema.index({ ecuFile: 1 });
chatSchema.index({ createdAt: 1 });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
