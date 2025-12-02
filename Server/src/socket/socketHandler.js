import Chat from "../models/chat.model.js";
import EcuFile from "../models/ecuFile.model.js";
import Auth from "../models/auth.model.js";

export const socketHandler = (io) => {
  const activeChatSessions = new Map();

  io.on("connection", (socket) => {
    // JOIN CHAT
    socket.on("join_chat", async ({ ecuFileId, userId }) => {
      socket.join(ecuFileId);
      socket.userId = userId;
      socket.ecuFileId = ecuFileId;

      const [messages, ecuFile, currentUser] = await Promise.all([
        Chat.find({ ecuFile: ecuFileId })
          .populate("sender", "firstName lastName role")
          .sort({ createdAt: 1 }),

        EcuFile.findById(ecuFileId).populate(
          "userId",
          "firstName lastName email role"
        ),

        Auth.findById(userId).select("firstName lastName email role"),
      ]);

      socket.participantRole = currentUser.role;

      if (!activeChatSessions.has(ecuFileId)) {
        activeChatSessions.set(ecuFileId, new Set());
      }
      activeChatSessions.get(ecuFileId).add({ userId, role: currentUser.role });

      // CHAT PARTNER NAME
      let chatPartner = null;
      if (currentUser.role === "user") {
        chatPartner = {
          firstName: "Support",
          lastName: "Team",
          role: "support",
        };
      } else {
        chatPartner = ecuFile.userId;
      }

      // FORMAT OLD MESSAGES PROPERLY
      const formattedMessages = messages.map((msg) => {
        const senderRole = msg.sender?.role;

        // USER VIEW
        if (currentUser.role === "user") {
          if (senderRole === "user") {
            return msg;
          }
          return {
            ...msg.toObject(),
            sender: {
              _id: "support",
              firstName: "Support",
              lastName: "Team",
              role: "support",
            },
          };
        }

        // ADMIN VIEW
        if (currentUser.role === "admin") {
          if (senderRole === "user") {
            return msg;
          }
          return {
            ...msg.toObject(),
            sender: {
              _id: userId,
              firstName: "Me",
              lastName: "",
              role: "admin",
            },
          };
        }

        // AGENT VIEW
        if (currentUser.role === "agent") {
          if (senderRole === "user") {
            return msg;
          }
          return {
            ...msg.toObject(),
            sender: {
              _id: userId,
              firstName: "Me",
              lastName: "",
              role: "agent",
            },
          };
        }

        return msg;
      });

      // SEND OLD MESSAGES
      socket.emit("load_messages", {
        messages: formattedMessages,
        chatPartner,
        activeParticipants: Array.from(activeChatSessions.get(ecuFileId)),
      });

      // MARK AS READ
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

    // SEND MESSAGE
    socket.on("send_message", async ({ ecuFileId, senderId, message }) => {
      if (!message?.trim() || !ecuFileId) return;

      const sender = await Auth.findById(senderId).select(
        "role firstName lastName"
      );

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
      const originalMessage = populatedMsg.toObject();

      const socketsInRoom = await io.in(ecuFileId).fetchSockets();

      for (const s of socketsInRoom) {
        const receiverRole = s.participantRole;
        const receiverId = s.userId;

        let finalMessage = { ...originalMessage };

        // USER VIEW
        if (receiverRole === "user") {
          if (sender.role !== "user") {
            finalMessage.sender = {
              _id: "support",
              firstName: "Support",
              lastName: "Team",
              role: "support",
            };
          }
        }

        // ADMIN VIEW
        if (receiverRole === "admin") {
          if (sender.role !== "user") {
            finalMessage.sender = {
              _id: receiverId,
              firstName: "Me",
              lastName: "",
              role: "admin",
            };
          }
        }

        // AGENT VIEW
        if (receiverRole === "agent") {
          if (sender.role !== "user") {
            finalMessage.sender = {
              _id: receiverId,
              firstName: "Me",
              lastName: "",
              role: "agent",
            };
          }
        }

        s.emit("receive_message", finalMessage);
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      if (socket.ecuFileId && socket.userId) {
        const chatSession = activeChatSessions.get(socket.ecuFileId);
        if (chatSession) {
          chatSession.forEach((p) => {
            if (p.userId === socket.userId) chatSession.delete(p);
          });
          socket
            .to(socket.ecuFileId)
            .emit("participant_left", { userId: socket.userId });

          if (chatSession.size === 0)
            activeChatSessions.delete(socket.ecuFileId);
        }
      }
    });
  });
};
