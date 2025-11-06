import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { X, Search } from "lucide-react";

const AgentUsersSelectorModal = ({ usersData, setShowModal, onSave }) => {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    return usersData?.data?.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, usersData]);

  const handleToggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = () => {
    onSave(selectedUsers);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-2xl rounded-2xl w-[90%] sm:w-[420px] max-w-[90vw] p-6"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white text-center mb-2">
          Select Users
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 text-sm text-center mb-5">
          Choose one or multiple users to assign
        </p>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-gray-400"
          />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* User List */}
        <div className="max-h-[250px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {filteredUsers?.length ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 bg-zinc-50 dark:bg-[#2e2e2e] hover:bg-zinc-100 dark:hover:bg-[#3a3a3a] transition-colors rounded-lg px-3 py-2"
              >
                <Checkbox
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={() => handleToggleUser(user._id)}
                  className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <span className="text-sm text-zinc-800 dark:text-white">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-zinc-500 dark:text-gray-400">
              No users found
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSave}
            disabled={selectedUsers.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors duration-200 disabled:bg-zinc-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            Save Selection ({selectedUsers.length})
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentUsersSelectorModal;
