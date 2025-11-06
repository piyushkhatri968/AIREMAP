import Chat from "../models/chat.model.js";
import EcuFile from "../models/ecuFile.model.js";
import Auth from "../models/auth.model.js";

export const socketHandler = (io) => {
  const activeChatSessions = new Map(); // Map<ecuFileId, Set<{userId, role}>>

  io.on("connection", (socket) => {
    socket.on("join_chat", async ({ ecuFileId, userId }) => {
      socket.join(ecuFileId);
      socket.userId = userId;
      socket.ecuFileId = ecuFileId;

      const [messages, ecuFile, currentUser] = await Promise.all([
        Chat.find({ ecuFile: ecuFileId })
          .populate("sender", "firstName lastName role")
          .sort({ createdAt: 1 }),
        EcuFile.findById(ecuFileId).populate("userId", "firstName lastName email role"),
        Auth.findById(userId).select("firstName lastName email role"),
      ]);

      if (!activeChatSessions.has(ecuFileId)) {
        activeChatSessions.set(ecuFileId, new Set());
      }
      activeChatSessions.get(ecuFileId).add({ userId, role: currentUser.role });

      let chatPartner = null;
      if (currentUser.role === "user") {
        chatPartner = { firstName: "Support", lastName: "Team", role: "support" };
      } else {
        chatPartner = ecuFile.userId;
      }

      socket.emit("load_messages", {
        messages,
        chatPartner,
        activeParticipants: Array.from(activeChatSessions.get(ecuFileId)),
      });

      await Chat.updateMany(
        { ecuFile: ecuFileId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      );

      socket.to(ecuFileId).emit("participant_joined", {
        userId,
        role: currentUser.role,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      });
    });

    socket.on("send_message", async ({ ecuFileId, senderId, message }) => {
      if (!message?.trim() || !ecuFileId) return;

      const sender = await Auth.findById(senderId).select("role firstName lastName");

      const newMsg = await Chat.create({
        ecuFile: ecuFileId,
        sender: senderId,
        message,
        readBy: [senderId],
      });

      const populatedMsg = await newMsg.populate("sender", "firstName lastName role");
      const originalMessage = populatedMsg.toObject();

      const socketsInRoom = await io.in(ecuFileId).fetchSockets();

      const supportMsg = {
        ...originalMessage,
        sender: {
          _id: "support_team",
          firstName: "Support",
          lastName: "Team",
          role: "support",
        },
      };

      for (const s of socketsInRoom) {
        const participant = Array.from(activeChatSessions.get(ecuFileId) || []).find(
          (p) => p.userId === s.userId
        );
        if (!participant) continue;

        if (participant.role === "user") {
          if (sender._id.toString() === participant.userId.toString()) {
            s.emit("receive_message", originalMessage);
          } else {
            s.emit("receive_message", supportMsg);
          }
        } else {
          if (sender.role === "user") {
            s.emit("receive_message", originalMessage);
          } else {
            s.emit("receive_message", {
              ...originalMessage,
              sender: {
                _id: participant.userId,
                firstName: "Support",
                lastName: "Team",
                role: participant.role,
              },
            });
          }
        }
      }
    });

    socket.on("disconnect", () => {
      if (socket.ecuFileId && socket.userId) {
        const chatSession = activeChatSessions.get(socket.ecuFileId);
        if (chatSession) {
          chatSession.forEach((p) => {
            if (p.userId === socket.userId) chatSession.delete(p);
          });
          socket.to(socket.ecuFileId).emit("participant_left", { userId: socket.userId });
          if (chatSession.size === 0) activeChatSessions.delete(socket.ecuFileId);
        }
      }
    });
  });
};
