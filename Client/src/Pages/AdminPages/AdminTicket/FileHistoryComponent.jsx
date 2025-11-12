import React from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

export const FileHistoryComponent = ({
  handleFileHistoryPopup,
  fileHistoryData,
  isLoading,
}) => {
  return (
    <div className="w-full min-h-screen bg-black/40 flex items-center justify-center backdrop-blur-sm fixed inset-0 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-2xl rounded-2xl w-[90%] sm:w-[480px] max-w-[90vw] p-6"
      >
        {/* Close Button */}
        <button
          onClick={handleFileHistoryPopup}
          className="absolute right-5 top-5 text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
        >
          <X />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white text-center mb-2">
          File History
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 text-sm text-center mb-6">
          Uploads and downloads for this file
        </p>

        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2
              className="animate-spin text-zinc-500 dark:text-gray-400"
              size={28}
            />
          </div>
        ) : (
          <>
            {/* Total Uploads & Downloads */}
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {fileHistoryData?.totalUploads || 0}
                </p>
                <p className="text-sm text-zinc-500 dark:text-gray-400">
                  Uploads
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {fileHistoryData?.totalDownloads || 0}
                </p>
                <p className="text-sm text-zinc-500 dark:text-gray-400">
                  Downloads
                </p>
              </div>
            </div>

            {/* Upload History */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-zinc-700 dark:text-gray-300 mb-2">
                Upload History
              </h2>
              <div className="max-h-[200px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-gray-600">
                {fileHistoryData?.uploadHistory?.length > 0 ? (
                  fileHistoryData.uploadHistory.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-zinc-50 dark:bg-[#2a2b2c] p-3 rounded-md"
                    >
                      <p className="text-sm text-zinc-700 dark:text-gray-300">
                        {item.userId.firstName} {item.userId.lastName} (
                        {item.userId.email})
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-5">
                    No uploads yet
                  </div>
                )}
              </div>
            </div>

            {/* Download History */}
            <div>
              <h2 className="text-sm font-medium text-zinc-700 dark:text-gray-300 mb-2">
                Download History
              </h2>
              <div className="max-h-[200px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-gray-600">
                {fileHistoryData?.downloadHistory?.length > 0 ? (
                  fileHistoryData.downloadHistory.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-zinc-50 dark:bg-[#2a2b2c] p-3 rounded-md"
                    >
                      <p className="text-sm text-zinc-700 dark:text-gray-300">
                        Download #{index + 1}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-5">
                    No downloads yet
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
