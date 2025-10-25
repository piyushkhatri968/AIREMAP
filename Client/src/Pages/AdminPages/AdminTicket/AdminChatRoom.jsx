import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { Dot, Send } from "lucide-react";
import useAuthUser from "../../../hooks/useAuthUser";
import { toast } from "react-toastify";

// connect socket
const socket = io("http://localhost:8080", {
  withCredentials: true,
});

const AdminChatRoom = ({ ecuFileId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [unreadIndex, setUnreadIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const [chatPartner, setChatPartner] = useState(null);

  const { authUser } = useAuthUser();

  useEffect(() => {
    if (!ecuFileId) return toast.error("Failed to load chat");

    socket.emit("join_chat", { ecuFileId, userId: authUser._id });

    socket.on("load_messages", (data) => {
      setMessages(data.messages || []);
      setUnreadIndex(data.unreadIndex);
      setChatPartner(data.chatPartner);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
    };
  }, [ecuFileId, authUser._id]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      ecuFileId,
      senderId: authUser._id,
      message,
    });
    setMessage("");
  };

  // format date heading like “24 Oct 2025”
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = formatDate(msg.createdAt);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
    return groups;
  }, {});

  const allDates = Object.keys(groupedMessages);

  return (
    <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 flex flex-col overflow-hidden max-h-[560px] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-gray-700">
        <div>
          <h1 className="font-semibold text-gray-900 dark:text-white">
            {chatPartner
              ? `${chatPartner.firstName || ""} ${chatPartner.lastName || ""}`
              : "Support Chat"}
          </h1>
          {chatPartner && (
            <p className="text-xs text-gray-500">
              {chatPartner.role === "admin"
                ? "Support Team"
                : chatPartner.email}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1C1C1C] p-6 text-gray-900 dark:text-white space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm italic text-center my-10">
            No messages yet
          </p>
        ) : (
          allDates.map((date, dateIndex) => (
            <div key={date}>
              {/*  Date Heading */}
              <div className="text-center text-xs text-gray-500 mb-3">
                {date}
              </div>

              {/* Messages under that date */}
              {groupedMessages[date].map((msg, i) => {
                const globalIndex = messages.findIndex(
                  (m) => m._id === msg._id
                );
                const showUnreadDivider =
                  unreadIndex !== null && globalIndex === unreadIndex;

                const isMe = msg.sender?._id === authUser._id;

                return (
                  <React.Fragment key={msg._id}>
                    {/* Unread Divider */}
                    {showUnreadDivider && (
                      <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-500/40"></div>
                        <span className="px-3 text-xs text-orange-500 font-semibold">
                          Unread messages
                        </span>
                        <div className="flex-1 h-px bg-gray-500/40"></div>
                      </div>
                    )}

                    {/*  Message Bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      } w-full`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 mb-2 rounded-2xl ${
                          isMe
                            ? "bg-orange-600 text-white rounded-br-none"
                            : "bg-zinc-700 text-white rounded-bl-none"
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
                  </React.Fragment>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-200 dark:border-gray-700 flex items-center gap-3 bg-zinc-50 dark:bg-[#242526]/90">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full rounded-full bg-zinc-200 dark:bg-zinc-700 py-3 px-5 text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none"
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-orange-600 rounded-full text-white p-3 hover:bg-orange-700 transition"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AdminChatRoom;
