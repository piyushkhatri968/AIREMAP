import Chat from "../models/chat.model.js";
import EcuFile from "../models/ecuFile.model.js";
import Auth from "../models/auth.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_chat", async ({ ecuFileId, userId }) => {
      socket.join(ecuFileId);

      // load messages
      const oldMessages = await Chat.find({ ecuFile: ecuFileId })
        .populate("sender", "firstName lastName role")
        .sort({ createdAt: 1 });

      // fetch ecu file + chat partner
      const ecuFile = await EcuFile.findById(ecuFileId).populate(
        "userId",
        "firstName lastName email role"
      );

      // find the chat partner (admin <-> user)
      let chatPartner = null;
      if (ecuFile?.userId?._id?.toString() === userId) {
        // user is chatting, so partner = admin
        chatPartner = await Auth.findOne({ role: "admin" }).select(
          "firstName lastName email role"
        );
      } else {
        // admin opened chat, so partner = user of that file
        chatPartner = ecuFile.userId;
      }

      socket.emit("load_messages", {
        messages: oldMessages,
        chatPartner,
      });

      await Chat.updateMany(
        { ecuFile: ecuFileId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      );
    });

    socket.on("send_message", async (data) => {
      const { ecuFileId, senderId, message } = data;
      if (!message || !ecuFileId) return;

      const newMsg = await Chat.create({
        ecuFile: ecuFileId,
        sender: senderId,
        message,
        readBy: [senderId],
      });

      const populatedMsg = await newMsg.populate(
        "sender",
        "firstName lastName role"
      );
      io.to(ecuFileId).emit("receive_message", populatedMsg);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
