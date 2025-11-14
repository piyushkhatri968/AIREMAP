import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { X, Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAssignedUsersToAgent } from "../../../lib/APIs/adminAPIs";

const AgentUsersSelectorModal = ({
  usersData,
  setShowModal,
  agentId,
  onSave,
  isAssigningUsersToAgent,
}) => {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryFn: () => GetAssignedUsersToAgent(agentId),
    queryKey: ["assignedUsersToAgent", agentId],
  });

  useEffect(() => {
    if (data?.data?.assignedUsersToAgent) {
      const ids = data.data.assignedUsersToAgent.map((u) => u);
      setSelectedUsers(ids);
    }
  }, [data, agentId]);

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    return usersData?.data?.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, usersData]);

  const handleSave = () => {
    onSave(selectedUsers);
  };

  const handleCheckboxChange = (checked, userId) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
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
        {/* Loader while fetching */}
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-6 w-6 text-zinc-500 dark:text-gray-400 mb-3" />
            <p className="text-sm text-zinc-500 dark:text-gray-400">
              Fetching assigned users...
            </p>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to fetch users</p>
        ) : (
          <>
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
                className="w-full pl-9 pr-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600"
              />
            </div>

            {/* User List */}
            <div className="max-h-[250px] overflow-y-auto space-y-2 custom-scrollbar">
              {filteredUsers?.length ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 bg-zinc-50 dark:bg-[#2e2e2e] hover:bg-zinc-100 dark:hover:bg-[#3a3a3a] transition-colors rounded-lg px-3 py-2"
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user._id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(checked, user._id)
                      }
                      className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <span className="text-sm text-zinc-800 dark:text-white">
                      {user.firstName} {user.lastName}{" "}
                      <span className="text-xs opacity-60"> ( {user.email} )</span>
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
                disabled={isAssigningUsersToAgent}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg disabled:bg-zinc-300 dark:disabled:bg-gray-700"
              >
                Save Selection ({selectedUsers.length})
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AgentUsersSelectorModal;
