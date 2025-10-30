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
} from "../../../components/ui/select";
import { SelectItem } from "../../../components/ui/select";
import useUpdateRole from "../../../hooks/Adminhooks/useUpdateRole";
import UpdatePerCreditPrice from "./UpdatePerCreditPrice";

import useDisableUser from "../../../hooks/Adminhooks/useDisableUser";
import useDeleteUser from "../../../hooks/Adminhooks/useDeleteUser";
import useUpdateVAT from "../../../hooks/Adminhooks/useUpdateVAT";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const [disablingUserId, setDisablingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const { isUpdatingRole, updateUserRoleMutation } = useUpdateRole({
    setUpdatingUserId,
  });

  const [updatingVATUserId, setUpdatingVATUserId] = useState(null);

  const { isUpdatingVAT, updateUserVATMutation } = useUpdateVAT({
    setUpdatingVATUserId,
  });

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllUsers,
    queryKey: ["allUsers"],
  });

  if (isError) toast.error("Failed to load users");

  const filteredUser = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();

    const emailMatch = item.email?.toLowerCase().includes(query);
    const firstNameMatch = item.firstName?.toLowerCase().includes(query);
    const lastNameMatch = item.lastName?.toLowerCase().includes(query);
    const roleMatch = item.role?.toLowerCase().includes(query);

    return emailMatch || firstNameMatch || lastNameMatch || roleMatch;
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

  const formatCurrency = (amount) => {
    console.log(typeof amount);
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP", // British Pound
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const { disableUserMutation, disablePending } = useDisableUser({
    setDisablingUserId,
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <Input
          placeholder="Search users by name, email, role"
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
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr_1.2fr_1.5fr_1fr] px-1 py-3 text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
            <div className="text-center">User</div>
            <div className="text-center">Email</div>
            <div className="text-center">Money Spent</div>
            <div className="text-center">VAT</div>
            <div className="text-center">Credit Price</div>
            <div className="text-center">Files</div>
            <div className="text-center">Role</div>
            <div className="text-center">Joined</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Content */}
          <div className="divide-y divide-zinc-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                Users...
              </div>
            ) : filteredUser?.length > 0 ? (
              filteredUser.map((row) => (
                <div
                  key={row._id}
                  className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr_1.2fr_1.5fr_1fr] items-center justify-center px-1 py-4 text-sm"
                >
                  <div className="text-center text-zinc-900 dark:text-white">
                    {row?.firstName + " " + row?.lastName}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white">
                    {row?.email}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white">
                    {formatCurrency(row?.totalMoneySpent)}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white flex justify-center">
                    {updatingVATUserId === row._id && isUpdatingVAT ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500" />
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
                          className="dark:bg-[#242526] relative"
                          side="top"
                        >
                          <SelectItem
                            value="true"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            True
                          </SelectItem>
                          <SelectItem
                            value="false"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            False
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <UpdatePerCreditPrice
                    perCreditPrice={row?.perCreditPrice}
                    userId={row?._id}
                  />

                  <div className="text-center text-zinc-900 dark:text-white">
                    {row?.totalFilesSubmitted || 0}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white flex justify-center">
                    {updatingUserId === row._id && isUpdatingRole ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500" />
                    ) : (
                      <Select
                        required
                        value={row?.role || "user"}
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
                          className="dark:bg-[#242526] relative"
                          side="top"
                        >
                          <SelectItem
                            value="user"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            User
                          </SelectItem>
                          <SelectItem
                            value="admin"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row?.createdAt)}
                  </div>
                  <div className="text-center text-zinc-900 dark:text-white flex justify-center gap-1">
                    {deletingUserId === row?._id && deletePending ? (
                      <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Button
                        variant="outline"
                        title="Delete"
                        onClick={() => deleteUserMutation({ userId: row?._id })}
                        size="xs"
                        className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                        data-testid={`button-disable-${row._id}`}
                      >
                        <UserX className="w-4 h-4" />
                      </Button>
                    )}

                    {disablingUserId === row?._id && disablePending ? (
                      <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Button
                        variant="outline"
                        title="Disable"
                        size="xs"
                        onClick={() =>
                          disableUserMutation({ userId: row?._id })
                        }
                        className="bg-blue-600 hover:bg-blue-700 border-blue-500 text-white ml-1"
                        data-testid={`button-disable-${row._id}`}
                      >
                        <UserLock className="w-4 h-4" />
                      </Button>
                    )}
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

export default AdminUsers;
