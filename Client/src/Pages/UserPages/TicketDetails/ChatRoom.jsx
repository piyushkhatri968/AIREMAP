import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import useAuthUser from "../../../hooks/useAuthUser";
import { toast } from "react-toastify";

const socket = io(
  import.meta.env.VITE_API_BASE_URL || "https://api.airemap.co.uk",
  {
    withCredentials: true,
  }
);

const ChatRoom = ({ ecuFileId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatPartner, setChatPartner] = useState(null);
  const [activeParticipants, setActiveParticipants] = useState([]);
  const messagesEndRef = useRef(null);
  const chatScrollRef = useRef(null);
  const { authUser } = useAuthUser();

  useEffect(() => {
    if (!ecuFileId) return toast.error("Invalid ECU file");

    socket.emit("join_chat", { ecuFileId, userId: authUser._id });

    socket.on("load_messages", (data) => {
      setMessages(data.messages || []);
      setChatPartner(data.chatPartner);
      setActiveParticipants(data.activeParticipants || []);
    });

    socket.on("receive_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );
    socket.on("participant_joined", (p) =>
      setActiveParticipants((prev) => [...prev, p])
    );
    socket.on("participant_left", ({ userId }) =>
      setActiveParticipants((prev) => prev.filter((p) => p.userId !== userId))
    );

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
      socket.off("participant_joined");
      socket.off("participant_left");
    };
  }, [ecuFileId, authUser._id]);

  // Only scrolls the chat container — not the entire page
  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("send_message", { ecuFileId, senderId: authUser._id, message });
    setMessage("");
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const grouped = messages.reduce((acc, msg) => {
    const key = formatDate(msg.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-[65vh] bg-zinc-50 dark:bg-[#242526]/90 border border-zinc-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-gray-700 bg-zinc-50 dark:bg-[#242526]/90">
        <div>
          <h1 className="font-semibold text-gray-900 dark:text-white text-base">
            {chatPartner
              ? `${chatPartner.firstName} ${chatPartner.lastName}`
              : "Support Chat"}
          </h1>
          {authUser?.role === "admin" && (
            <p className="text-xs text-gray-400">{chatPartner?.email}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-zinc-50 dark:bg-[#242526]/90 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
      >
        {Object.keys(grouped).map((date) => (
          <div key={date}>
            <div className="text-center text-[11px] text-gray-500 mb-2">
              {date}
            </div>
            {grouped[date].map((msg) => {
              const isMe = msg.sender?._id === authUser._id;
              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 mb-1 rounded-2xl break-words whitespace-pre-wrap ${
                      isMe
                        ? "bg-orange-600 text-gray-900 dark:text-white rounded-br-none"
                        : "bg-[#3A3B3C] text-gray-900 dark:text-white rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-[10px] text-gray-300 mt-1 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-200 dark:border-gray-700 flex gap-2 bg-zinc-50 dark:bg-[#242526]/90">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-zinc-200 dark:border-gray-700 bg-zinc-50 dark:bg-[#242526]/90 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-orange-600 hover:bg-orange-700 text-gray-900 dark:text-white p-3 rounded-full transition"
        >
          <Send size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
