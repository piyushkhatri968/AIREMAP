import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../../../lib/APIs/adminAPIs";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
import useUpdateUserCredits from "../../../hooks/Adminhooks/useUpdateUserCredits";

const AdminCredits = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllUsers,
    queryKey: ["allUsers"],
  });

  if (isError) toast.error("Failed to load credits data");

  const filteredUsers = data?.data.filter((item) => {
    const query = searchQuery.toLowerCase();

    const emailMatch = item.email?.toLowerCase().includes(query);
    const firstNameMatch = item.firstName?.toLowerCase().includes(query);
    const lastNameMatch = item.lastName?.toLowerCase().includes(query);

    return emailMatch || firstNameMatch || lastNameMatch;
  });

  const { isUpdatingCredits, updateUserCreditsMutation } =
    useUpdateUserCredits();

  const handleCredits = (userId, credits) => {
    updateUserCreditsMutation({ userId, credits });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Credits Management</h2>
      </div>
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="p-6 flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-white">User Credits</h2>
          <p className="text-zinc-900 dark:text-zinc-400 text-sm">
            Add or remove credits for users
          </p>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-3 py-4 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
            data-testid="input-search-users"
          />
        </div>
        {/* Transactions Table */}
        <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 py-3 text-sm font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
              <div className="text-center">User</div>
              <div className="text-center">Email</div>
              <div className="text-center">Current Credits</div>
              <div className="text-center">Actions</div>
            </div>
            {/* Content */}
            <div className="divide-y divide-zinc-200 dark:divide-gray-700">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                  Users...
                </div>
              ) : filteredUsers?.length > 0 ? (
                filteredUsers.map((row) => (
                  <div
                    key={row._id}
                    className="grid grid-cols-4 items-center gap-4 py-4 text-sm"
                  >
                    <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                      {row?.firstName + " " + row?.lastName}
                    </div>
                    <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                      {row?.email}
                    </div>
                    <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                      {row?.credits}
                    </div>
                    <div className="col-span-1 text-center space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-green-600 hover:bg-green-700 border-green-500 text-white"
                        disable={isUpdatingCredits}
                        data-testid={`button-add-credit-${row._id}`}
                        onClick={() => handleCredits(row._id, 1)}
                      >
                        +1
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-green-600 hover:bg-green-700 border-green-500 text-white"
                        data-testid={`button-add-credit-${row._id}`}
                        onClick={() => handleCredits(row._id, 5)}
                      >
                        +5
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                        data-testid={`button-add-credit-${row._id}`}
                        onClick={() => handleCredits(row._id, -1)}
                      >
                        -1
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-gray-600 hover:bg-gray-700 border-gray-500 text-white"
                        data-testid={`button-add-credit-${row._id}`}
                        onClick={() => handleCredits(row._id, "reset")}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-zinc-500 dark:text-gray-400">
                  No users found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminCredits;
