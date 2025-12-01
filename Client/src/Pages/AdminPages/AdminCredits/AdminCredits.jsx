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
  const [loadingAction, setLoadingAction] = useState(null);

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
    const key = `${userId}_${credits}`;
    setLoadingAction(key);
    updateUserCreditsMutation(
      { userId, credits },
      {
        onSettled: () => setLoadingAction(null),
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl sm:text-2xl mt-2 sm:my-0 font-bold text-zinc-900 dark:text-white">
          Credits Management
        </h2>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-zinc-100 dark:bg-[#1c1d1e] border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap">
            <tr>
              <th className="px-4 py-3 text-center font-medium">User</th>
              <th className="px-4 py-3 text-center font-medium">Email</th>
              <th className="px-4 py-3 text-center font-medium">
                Current Credits
              </th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td
                  colSpan={4}
                  className="text-center py-10 text-zinc-500 dark:text-gray-400"
                >
                  <Loader2 className="animate-spin h-5 w-5 inline-block mr-2" />
                  Fetching Users...
                </td>
              </motion.tr>
            ) : filteredUsers?.length > 0 ? (
              filteredUsers.map((row, index) => (
                <motion.tr
                  key={row._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-zinc-200 dark:border-gray-700  transition-colors whitespace-nowrap text-xs sm:text-sm"
                >
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {row?.firstName + " " + row?.lastName}
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white break-all">
                    {row?.email}
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {row?.credits}.00 CRD
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-green-600 hover:bg-green-700 border-green-500 text-white"
                        disabled={loadingAction === `${row._id}_1`}
                        onClick={() => handleCredits(row._id, 1)}
                      >
                        {loadingAction === `${row._id}_1` ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 inline-block mr-2" />                          </>
                        ) : (
                          "+1"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-green-600 hover:bg-green-700 border-green-500 text-white"
                        disabled={loadingAction === `${row._id}_5`}
                        onClick={() => handleCredits(row._id, 5)}
                      >
                        {loadingAction === `${row._id}_5` ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 inline-block mr-2" />
                          </>
                        ) : (
                          "+5"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                        disabled={loadingAction === `${row._id}_-1`}
                        onClick={() => handleCredits(row._id, -1)}
                      >
                        {loadingAction === `${row._id}_-1` ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 inline-block mr-2" />
                          </>
                        ) : (
                          "-1"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        className="bg-gray-600 hover:bg-gray-700 border-gray-500 text-white"
                        disabled={loadingAction === `${row._id}_reset`}
                        onClick={() => handleCredits(row._id, "reset")}
                      >
                        {loadingAction === `${row._id}_reset` ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 inline-block mr-2" />
                          </>
                        ) : (
                          "Reset"
                        )}
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td
                  colSpan={4}
                  className="text-center py-10 text-zinc-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>

      </div>
    </motion.div>
  );
};

export default AdminCredits;
