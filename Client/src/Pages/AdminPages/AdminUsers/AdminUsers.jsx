import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Loader2, UserLock, UserX } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../../../components/ui/select";
import useUpdateRole from "../../../hooks/Adminhooks/useUpdateRole";
import UpdatePerCreditPrice from "./UpdatePerCreditPrice";
import useDisableUser from "../../../hooks/Adminhooks/useDisableUser";
import useDeleteUser from "../../../hooks/Adminhooks/useDeleteUser";
import useUpdateVAT from "../../../hooks/Adminhooks/useUpdateVAT";
import useAuthUser from "../../../hooks/useAuthUser";

const AdminUsers = () => {
  const { authUser } = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [disablingUserId, setDisablingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [updatingVATUserId, setUpdatingVATUserId] = useState(null);

  const { isUpdatingRole, updateUserRoleMutation } = useUpdateRole({
    setUpdatingUserId,
  });
  const { isUpdatingVAT, updateUserVATMutation } = useUpdateVAT({
    setUpdatingVATUserId,
  });
  const { disableUserMutation, disablePending } = useDisableUser({
    setDisablingUserId,
  });
  const { deleteUserMutation, deletePending } = useDeleteUser({
    setDeletingUserId,
  });

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllUsers,
    queryKey: ["allUsers"],
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">User Management</h2>
        <Input
          placeholder="Search users by name, email, role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Table Wrapper */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="w-full min-w-full text-sm">
            <thead>
              <tr className="font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap">
                <th className="px-2 py-3 text-center">User</th>
                <th className="px-2 py-3 text-center">Email</th>
                <th className="px-2 py-3 text-center">Money Spent</th>
                <th className="px-2 py-3 text-center">VAT</th>
                <th className="px-2 py-3 text-center">Credit Price</th>
                <th className="px-2 py-3 text-center">Files</th>
                <th className="px-2 py-3 text-center">Role</th>
                <th className="px-2 py-3 text-center">Joined</th>
                <th className="px-2 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-10 text-zinc-500 dark:text-gray-400"
                  >
                    <Loader2 className="animate-spin inline h-5 w-5 mr-2" />
                    Fetching Users...
                  </td>
                </tr>
              ) : filteredUser?.length > 0 ? (
                filteredUser.map((row) => (
                  <tr
                    key={row._id}
                    className="whitespace-nowrap"
                  >
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      {row.firstName} {row.lastName}
                      {row._id === authUser._id && (
                        <span className="text-green-500 text-xs ml-1">
                          (You)
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      {row.email}
                    </td>
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      {formatCurrency(row.totalMoneySpent)}
                    </td>
                    <td className="px-2 py-3 text-center">
                      {updatingVATUserId === row._id && isUpdatingVAT ? (
                        <Loader2 className="animate-spin h-5 w-5 text-zinc-500 mx-auto" />
                      ) : (
                        <Select
                          required
                          value={row?.VAT === true ? "true" : "false" || true}
                          onValueChange={(value) =>
                            updateUserVATMutation({
                              userId: row._id,
                              vat: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-24 mx-auto bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                            <SelectValue placeholder="Select VAT" />
                          </SelectTrigger>
                          <SelectContent
                            className="dark:bg-[#242526]"
                            side="top"
                          >
                            <SelectItem
                              value="true"
                              className="dark:text-white"
                            >
                              True
                            </SelectItem>
                            <SelectItem
                              value="false"
                              className="dark:text-white"
                            >
                              False
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      <UpdatePerCreditPrice
                        perCreditPrice={row?.perCreditPrice}
                        userId={row?._id}
                      />
                    </td>
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      {row.totalFilesSubmitted || 0}
                    </td>
                    <td className="px-2 py-3 text-center">
                      {updatingUserId === row._id && isUpdatingRole ? (
                        <Loader2 className="animate-spin h-5 w-5 text-zinc-500 mx-auto" />
                      ) : (
                        <Select
                          required
                          value={row.role || "user"}
                          onValueChange={(value) =>
                            updateUserRoleMutation({
                              userId: row._id,
                              role: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-24 mx-auto bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent
                            className="dark:bg-[#242526]"
                            side="top"
                          >
                            <SelectItem
                              value="user"
                              className="dark:text-white"
                            >
                              User
                            </SelectItem>
                            <SelectItem
                              value="admin"
                              className="dark:text-white"
                            >
                              Admin
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                    <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                      {formatDateTime(row.createdAt)}
                    </td>
                    <td className="px-2 py-3 text-center flex justify-center gap-1">
                      {deletingUserId === row._id && deletePending ? (
                        <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Button
                          variant="outline"
                          title="Delete"
                          onClick={() =>
                            deleteUserMutation({ userId: row._id })
                          }
                          size="xs"
                          className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      )}
                      {disablingUserId === row._id && disablePending ? (
                        <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Button
                          variant="outline"
                          title="Disable"
                          size="xs"
                          onClick={() =>
                            disableUserMutation({ userId: row._id })
                          }
                          className="bg-blue-600 hover:bg-blue-700 border-blue-500 text-white ml-1"
                        >
                          <UserLock className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-12 text-zinc-500 dark:text-gray-400"
                  >
                    No users found.
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

export default AdminUsers;
