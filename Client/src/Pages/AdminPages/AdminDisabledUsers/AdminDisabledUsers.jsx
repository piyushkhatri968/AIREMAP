import { useQuery } from "@tanstack/react-query";
import { GetAllDisabledUsers } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Loader2, UserCheck, UserX } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../../../components/ui/select";
import useUpdateRole from "../../../hooks/Adminhooks/useUpdateRole";
import useDeleteUser from "../../../hooks/Adminhooks/useDeleteUser";
import UpdatePerCreditPrice from "../AdminUsers/UpdatePerCreditPrice";
import useActiveUser from "../../../hooks/Adminhooks/useActiveUser";

const AdminDisabledUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [enablingUserId, setEnablingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const { isUpdatingRole, updateUserRoleMutation } = useUpdateRole({
    setUpdatingUserId,
  });

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllDisabledUsers,
    queryKey: ["allDisableUsers"],
  });

  if (isError) toast.error("Failed to load users");

  const filteredUser = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.email?.toLowerCase().includes(query) ||
      item.firstName?.toLowerCase().includes(query) ||
      item.lastName?.toLowerCase().includes(query) ||
      item.role?.toLowerCase().includes(query)
    );
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

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const { enablePending, enableUserMutation } = useActiveUser({
    setEnablingUserId,
  });
  const { deleteUserMutation, deletePending } = useDeleteUser({
    setDeletingUserId,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Disabled User Management
        </h2>
        <Input
          placeholder="Search users by name, email, role"
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
              <tr className="font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700 bg-zinc-100 dark:bg-[#1c1d1e] whitespace-nowrap">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Money Spent</th>
                <th className="py-3 px-4">Credit Price</th>
                <th className="py-3 px-4">Files</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
              {isLoading ? (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td
                    colSpan="8"
                    className="py-10 text-zinc-500 dark:text-gray-400"
                  >
                    <div className="flex justify-center items-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Fetching Users...
                    </div>
                  </td>
                </motion.tr>
              ) : filteredUser?.length > 0 ? (
                filteredUser.map((row, index) => (
                  <motion.tr
                    key={row._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="whitespace-nowrap  text-xs sm:text-sm"
                  >
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.firstName + " " + row?.lastName}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.email}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {formatCurrency(row?.totalMoneySpent)}
                    </td>
                    <td className="py-3 px-4">
                      <UpdatePerCreditPrice
                        perCreditPrice={row?.perCreditPrice}
                        userId={row?._id}
                      />
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.totalFilesSubmitted || 0}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.role.toUpperCase()}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {formatDateTime(row?.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        {deletingUserId === row._id && deletePending ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Delete"
                            onClick={() =>
                              deleteUserMutation({ userId: row?._id })
                            }
                            size="xs"
                            className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        )}

                        {enablingUserId === row._id && enablePending ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Activate"
                            size="xs"
                            onClick={() =>
                              enableUserMutation({ userId: row?._id })
                            }
                            className="bg-blue-600 hover:bg-blue-700 border-blue-500 text-white"
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-zinc-500 dark:text-gray-400"
                  >
                    No disabled users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDisabledUsers;
