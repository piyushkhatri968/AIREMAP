import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetAllEcuFiles } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import useUpdateFileStatus from "../../../hooks/Adminhooks/useUpdateFileStatus";

const AdminFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [updatingFileId, setUpdatingFileId] = useState(null);

  const { isUpdatingStatus, updateFileStatusMutation } = useUpdateFileStatus({
    setUpdatingFileId,
  });

  const { data, isLoading, error } = useQuery({
    queryFn: GetAllEcuFiles,
    queryKey: ["allAdminEcuFiles"],
  });

  if (error) {
    return toast.error("Failed to load ECU Files");
  }

  const filteredEcuFiles = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();

    const firstNameMatch = item?.userId?.firstName
      .toLowerCase()
      .includes(query);
    const lastNameMatch = item?.userId?.lastName?.toLowerCase().includes(query);
    const emailMatch = item?.userId?.email?.toLowerCase().includes(query);
    const ticketNoMatch = item?.ticketNumber?.toLowerCase().includes(query);
    const statusMatch = item?.status?.toLowerCase().includes(query);

    return (
      firstNameMatch ||
      lastNameMatch ||
      emailMatch ||
      ticketNoMatch ||
      statusMatch
    );
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
        <h2 className="text-2xl font-bold text-white">ECU File Management</h2>
        <Input
          placeholder="Search files by name, email, status and ticket no"
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
          <div className="grid grid-cols-6 gap-4 py-3 text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
            <div className="text-center">Ticket</div>
            <div className="text-center">Vehicle</div>
            <div className="text-center">User</div>
            <div className="text-center">Status</div>
            <div className="text-center">Created</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Content */}
          <div className="divide-y divide-zinc-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                Files...
              </div>
            ) : filteredEcuFiles?.length > 0 ? (
              filteredEcuFiles.map((row) => (
                <div
                  key={row._id}
                  className="grid grid-cols-6 items-center gap-4 py-4 text-sm"
                >
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.ticketNumber}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.make + " " + row?.model}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.userId?.firstName + " " + row?.userId?.lastName}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {updatingFileId === row._id && isUpdatingStatus ? (
                      <Loader2 className="animate-spin h-5 w-5 text-center mx-auto text-zinc-500" />
                    ) : (
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[80px] text-center whitespace-nowrap 
        ${
          row?.status === "Completed"
            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
            : row?.status === "Failed"
            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
            : row?.status === "In Progress"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
            : row?.status === "Unlocked"
            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
        }`}
                      >
                        {row?.status || "N/A"}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row?.createdAt)}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white flex justify-center">
                    {updatingFileId === row._id && isUpdatingStatus ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500" />
                    ) : (
                      <Select
                        required
                        value={row?.status || "Pending"}
                        onValueChange={(value) =>
                          updateFileStatusMutation({
                            fileId: row._id,
                            status: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-28 mx-auto h-10 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent
                          className="dark:bg-[#242526] relative"
                          side="top"
                        >
                          <SelectItem
                            value="Pending"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            value="In Progress"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            In Progress
                          </SelectItem>
                          <SelectItem
                            value="Completed"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Completed
                          </SelectItem>
                          <SelectItem
                            value="Failed"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Failed
                          </SelectItem>
                          <SelectItem
                            value="Unlocked"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Unlocked
                          </SelectItem>
                        </SelectContent>
                      </Select>
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

export default AdminFiles;
