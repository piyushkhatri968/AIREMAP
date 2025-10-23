import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import useMyFiles from "../../../hooks/useMyFiles";
import { toast } from "react-toastify";
import { FolderOpen, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router";

const MyFiles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useMyFiles();

  if (isError) {
    return toast.error("Failed to fetch Ecu Files");
  }

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
      className="space-y-4 sm:space-y-6"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              My Files
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              View your submitted ECU files
            </p>
          </div>
        </div>
        {/* Search Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Input
            type="text"
            placeholder="Search files by make, model, registration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-visible:ring-0 h-10 text-sm w-80"
            data-testid="input-search-files"
          />
        </div>

        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching Data...
            </div>
          ) : data && data.data?.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <FolderOpen className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-400 dark:text-gray-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                No files submitted yet
              </h3>
              <p className="text-zinc-500 dark:text-gray-400 text-sm mb-4">
                Submit your first ECU file to get started!
              </p>
              <Button
                onClick={() => navigate("/upload-file")}
                className="bg-red-600 hover:bg-red-700 text-white h-9 sm:h-10 text-sm"
              >
                Submit File
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              {/* Desktop Table Header - Hidden on Mobile */}
              <div className="hidden sm:grid grid-cols-[2fr,1fr,1fr,0.7fr,0.8fr,1fr] gap-6 mb-4 text-[13px] font-medium text-gray-500 dark:text-gray-400 tracking-wide px-4">
                <div>VEHICLE</div>
                <div>REGISTRATION</div>
                <div>TOOL</div>
                <div>PRICE</div>
                <div>STATUS</div>
                <div>DATE</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-1">
                {data &&
                  data?.data
                    .filter((file) => {
                      if (!searchQuery) return true;
                      const query = searchQuery.toLowerCase();
                      return (
                        file?.make?.toLowerCase().includes(query) ||
                        file?.model?.toLowerCase().includes(query) ||
                        file?.registration?.toLowerCase().includes(query) ||
                        file?.ticketNumber?.toLowerCase().includes(query) ||
                        file?.readTool?.toLowerCase().includes(query) ||
                        file?.stage?.toLowerCase().includes(query)
                      );
                    })
                    .map((file) => (
                      <Link
                        to={`/ticket-details/${file?.ticketNumber}`}
                        key={file._id}
                        // onClick={() => setSelectedFile(file)}
                        data-testid={`row-file-${file._id}`}
                      >
                        {/* Mobile View */}
                        <div className="sm:hidden p-4 space-y-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${
                                    file?.status === "Completed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                      : file?.status === "Failed"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                      : file?.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                      : file?.status === "Unlocked"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                                  }`}
                                >
                                  {file.status}
                                </span>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-900 dark:text-white font-medium">
                                  {file.registration}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDateTime(file.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden sm:grid grid-cols-[2fr,1fr,1fr,0.7fr,0.8fr,1fr] gap-6 items-center py-4 px-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer rounded-lg group">
                          <div className="text-gray-900 dark:text-white text-sm font-medium">
                            {file.make} {file.model}
                          </div>
                          <div className="text-sm">
                            <span className="px-2 py-1 bg-gray-800/10 dark:bg-white/10 rounded text-gray-900 dark:text-white font-medium">
                              {file.registration}
                            </span>
                          </div>
                          <div>
                            <div className="text-gray-900 dark:text-white text-sm font-medium">
                              {file.readTool}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs capitalize">
                              {file.readType?.toLowerCase()}
                            </div>
                          </div>
                          <div className="text-gray-900 dark:text-white text-sm font-medium">
                            {file.creditsNeed}.00 CRD
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${
                                file?.status === "Completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                  : file?.status === "Failed"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                  : file?.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                  : file?.status === "Unlocked"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                              }`}
                            >
                              {file.status}
                            </span>
                          </div>
                          <div>
                            <div className="text-gray-900 dark:text-white text-sm font-medium">
                              {formatDateTime(file.createdAt)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyFiles;
