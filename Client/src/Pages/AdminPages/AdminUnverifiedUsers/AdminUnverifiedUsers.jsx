import { useQuery } from "@tanstack/react-query";
import { GetAllUnverifiedUsers } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AdminUnverifiedUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllUnverifiedUsers,
    queryKey: ["allUnverifiedUsers"],
  });

  if (isError) toast.error("Failed to load users");

  const filteredUser = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();

    const emailMatch = item.email?.toLowerCase().includes(query);
    const firstNameMatch = item.firstName?.toLowerCase().includes(query);
    const lastNameMatch = item.lastName?.toLowerCase().includes(query);

    return emailMatch || firstNameMatch || lastNameMatch;
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      month: "short", // e.g. Aug
      day: "2-digit", // e.g. 30
      year: "numeric", // e.g. 2025
      hour: "2-digit", // e.g. 09
      minute: "2-digit", // e.g. 53
      hour12: false, // 24-hour format (set true for AM/PM)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Unverified Users Management
        </h2>
        <Input
          placeholder="Search users by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          data-testid="input-search-users"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 py-3 text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
            <div className="text-center">User</div>
            <div className="text-center">Email</div>
            <div className="text-center">Country</div>
            <div className="text-center">City</div>
            <div className="text-center">Joined</div>
            {/* <div className="text-center">Actions</div> */}
          </div>

          {/* Content */}
          <div className="divide-y divide-zinc-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                Unverified Users...
              </div>
            ) : filteredUser?.length > 0 ? (
              filteredUser.map((row) => (
                <div
                  key={row._id}
                  className="grid grid-cols-5 items-center gap-4 py-4 text-sm"
                >
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.firstName || "N/A"} {row?.lastName || "N/A"}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.email}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.country || "N/A"}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.city || "N/A"}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row?.createdAt)}
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
    </motion.div>
  );
};

export default AdminUnverifiedUsers;
