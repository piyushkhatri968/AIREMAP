import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import useMyFiles from "../../../hooks/useMyFiles";
import { toast } from "react-toastify";
import { FolderOpen, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const MyFiles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useMyFiles();

  if (isError) toast.error(t("myFilesPage.errors.common"));

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

  const filteredFiles =
    data?.data?.filter((file) => {
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
    }) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {t("myFiles")}
          </h2>
          <p className="text-zinc-500 dark:text-gray-400 text-sm">
            {t("myFilesPage.subtitle")}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6 w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-zinc-400 dark:text-gray-500"
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
          placeholder={t('myFilesPage.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-zinc-50 dark:bg-[#1e1f20] border border-zinc-200 dark:border-[#2c2c2d] 
          text-zinc-900 dark:text-gray-200 placeholder-zinc-500 dark:placeholder-gray-400 
          rounded-md h-10 text-sm focus-visible:ring-0"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-[#2c2c2d] bg-white dark:bg-[#1b1c1d] shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center py-10 text-zinc-500 dark:text-gray-400">
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            {t("loading")}
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-10">
            <FolderOpen className="w-10 h-10 text-zinc-400 dark:text-gray-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
              {t("myFilesPage.noFilesTitle")}
            </h3>
            <p className="text-zinc-500 dark:text-gray-400 text-sm mb-4">
              {t("myFilesPage.noFilesDescription")}
            </p>
            <Button
              onClick={() => navigate("/upload-file")}
              className="bg-red-600 hover:bg-red-700 text-white h-9 text-sm"
            >
              {t("myFilesPage.submitFile")}
            </Button>
          </div>
        ) : filteredFiles.length > 0 ? (
          <table className="min-w-full w-full text-sm text-left text-zinc-800 dark:text-gray-200 whitespace-nowrap">
            <thead className="bg-zinc-100 dark:bg-[#1c1d1e] text-zinc-600 dark:text-gray-400 text-xs uppercase text-center">
              <tr>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.vehicle")}</th>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.registration")}</th>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.tool")}</th>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.price")}</th>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.status")}</th>
                <th className="px-6 py-3 font-medium">{t("myFilesPage.table.date")}</th>
              </tr>
            </thead>

            <tbody>
              {filteredFiles.map((file, index) => (
                <motion.tr
                  key={file._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-zinc-200 dark:border-[#2c2c2d] hover:bg-zinc-50 dark:hover:bg-[#242526] 
                  transition-colors cursor-pointer text-center"
                  onClick={() => navigate(`/ticket-details/${file?.ticketNumber}`)}
                >
                  <td className="px-6 py-3 font-medium text-zinc-900 dark:text-white">
                    {file.make} {file.model}
                  </td>

                  <td className="px-6 py-3">
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-[#2b2c2e] rounded-lg text-zinc-900 dark:text-white text-xs font-medium">
                      {file.registration}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div>{file.readTool}</div>
                    <div className="text-xs text-zinc-500 dark:text-gray-400 capitalize">
                      {file.readType?.toLowerCase()}
                    </div>
                  </td>

                  <td className="px-6 py-3 font-medium text-zinc-900 dark:text-white">
                    {file.creditsNeed}.00 CRD
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[80px] text-center whitespace-nowrap ${file.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                        : file.status === "Rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          : file.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                            : file.status === "Unlocked"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                        }`}
                    >
                      {t(`myFilesPage.status.${file.status}`)}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    {formatDateTime(file.createdAt)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <FolderOpen className="w-10 h-10 text-zinc-400 dark:text-gray-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
              {t("myFilesPage.noData")}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyFiles;
