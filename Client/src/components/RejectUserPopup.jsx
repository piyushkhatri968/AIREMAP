import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const RejectUserPopup = ({
  setRejectUserPopup,
  handleSubmit,
  reason,
  setReason,
  isRejectingUser,
}) => {
  const handleClose = () => {
    setReason("");
    setRejectUserPopup(false);
  };
  return (
    <div className="w-full min-h-screen bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-2xl rounded-2xl w-[90%] sm:w-[420px] max-w-[90vw] p-8"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
        >
          <X />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white text-center mb-2">
          Reject User
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 text-sm text-center mb-6">
          Add a reason to reject the user (optional)
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <Label
              htmlFor="reason"
              className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
            >
              Reason
            </Label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
              className="w-full px-4 py-3 h-24 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isRejectingUser}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isRejectingUser ? "Rejecting..." : "Reject User"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default RejectUserPopup;
