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
import { useNavigate } from "react-router";

const AdminFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingFileId, setUpdatingFileId] = useState(null);

  const navigate = useNavigate();

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
      ?.toLowerCase()
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
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-2 sm:mt-0">
          ECU File Management
        </h2>
        <Input
          placeholder="Search files by name, email, status and ticket no"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-zinc-100 dark:bg-[#1c1d1e] border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap">
            <tr>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Ticket
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Vehicle
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                User
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Created
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-zinc-500 dark:text-gray-400"
                >
                  <Loader2 className="animate-spin h-5 w-5 inline-block mr-2" />
                  Fetching Files...
                </td>
              </tr>
            ) : filteredEcuFiles?.length > 0 ? (
              filteredEcuFiles.map((row) => (
                <tr
                  key={row._id}
                  className="border-b border-zinc-200 dark:border-gray-700 hover:bg-zinc-100 dark:hover:bg-[#2a2b2c] transition-colors cursor-pointer whitespace-nowrap"
                  onClick={() => navigate(`/ticket/${row?.ticketNumber}`)}
                >
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {row?.ticketNumber}
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {row?.make + " " + row?.model}
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {row?.userId?.firstName + " " + row?.userId?.lastName}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {updatingFileId === row._id && isUpdatingStatus ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500 mx-auto" />
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
                  </td>
                  <td className="px-4 py-3 text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row?.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {updatingFileId === row._id && isUpdatingStatus ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500 mx-auto" />
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
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent className="dark:bg-[#242526]" side="top">
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                          <SelectItem value="Unlocked">Unlocked</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-zinc-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminFiles;
