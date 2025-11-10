import { useQuery } from "@tanstack/react-query";
import { GetAllUnverifiedUsers } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import useApproveUser from "../../../hooks/Adminhooks/useApproveUser";
import RejectUserPopup from "../../../components/RejectUserPopup";
import useRejectUser from "../../../hooks/Adminhooks/useRejectUser";

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
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const [approvingUserId, setApprovingUserId] = useState(null);
  const [rejectingUserId, setRejectingUserId] = useState(null);

  const [rejectUserIdForPopup, setRejectUserIdForPopup] = useState(null);
  const [rejectUserPopup, setRejectUserPopup] = useState(false);
  const [reason, setReason] = useState("");

  const { approveUserMutation, isApprovingUser } = useApproveUser({
    setApprovingUserId,
  });

  const { isRejectingUser, rejectUserMutation } = useRejectUser({
    setRejectingUserId,
    setRejectUserPopup
  });

  const handleRejectUser = (userId) => {
    setRejectUserPopup(true);
    setRejectUserIdForPopup(userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    rejectUserMutation({ userId: rejectUserIdForPopup, reason: reason });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl my-3 sm:my-0 font-bold text-zinc-900 dark:text-white">
            Unverified Users Management
          </h2>
          <Input
            placeholder="Search users by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Table Container */}
        <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full w-full text-sm text-center">
              <thead>
                <tr className="font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-10 text-zinc-500 dark:text-gray-400"
                    >
                      <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Fetching Unverified Users...
                      </div>
                    </td>
                  </tr>
                ) : filteredUser?.length > 0 ? (
                  filteredUser.map((row) => (
                    <tr key={row._id} className="whitespace-nowrap">
                      <td className="py-3 px-4 text-zinc-900 dark:text-white">
                        {row?.firstName || "N/A"} {row?.lastName || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-zinc-900 dark:text-white">
                        {row?.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-zinc-900 dark:text-white">
                        {row?.country || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-zinc-900 dark:text-white">
                        {row?.city || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-zinc-900 dark:text-white">
                        {formatDateTime(row?.createdAt)}
                      </td>
                      <td className="px-2 py-3 text-center flex justify-center items-center gap-1">
                        {rejectingUserId === row._id && isRejectingUser ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Reject"
                            onClick={() => handleRejectUser(row._id)}
                            size="xs"
                            className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                        {approvingUserId === row._id && isApprovingUser ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Approve"
                            size="xs"
                            onClick={() =>
                              approveUserMutation({ userId: row._id })
                            }
                            className="bg-blue-600 hover:bg-blue-700 border-blue-500 text-white"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-zinc-500 dark:text-gray-400"
                    >
                      No unverified users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      {rejectUserPopup && (
        <div className="fixed inset-0 z-[9999]">
          <RejectUserPopup
            isRejectingUser={isRejectingUser}
            reason={reason}
            setReason={setReason}
            setRejectUserPopup={setRejectUserPopup}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default AdminUnverifiedUsers;
