import React from "react";

const statusConfig = {
  Pending: {
    title: "Pending",
    message: "Your file request is pending and will be processed soon.",
    color: "text-yellow-500",
    button: null,
  },
  "In Progress": {
    title: "In Progress",
    message: "Your file is currently being tuned.",
    color: "text-blue-500",
    button: null,
  },
  Completed: {
    title: "Completed",
    message: "File tuning has been completed successfully.",
    color: "text-green-500",
    button: null,
  },
  Failed: {
    title: "Failed",
    message: "Something went wrong while tuning the file. Please try again.",
    color: "text-red-500",
    button: (
      <button className="text-gray-900 dark:text-white text-xs font-semibold rounded-full py-3 px-5 bg-zinc-700 hover:bg-zinc-600">
        Retry
      </button>
    ),
  },
  Unlocked: {
    title: "File Unlocked",
    message: "Click here to download tuned file.",
    color: "text-purple-500",
    button: (
      <button className="text-gray-900 dark:text-white text-xs font-semibold rounded-full py-3 px-5 bg-zinc-700 hover:bg-zinc-600">
        Download (4.19MB)
      </button>
    ),
  },
};

const StatusCard = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6">
      <div>
        <h1 className={`font-semibold ${config.color}`}>{config.title}</h1>
        <p className="text-sm text-gray-900 dark:text-white">
          {config.message}
        </p>
      </div>
      {config.button && config.button}
    </div>
  );
};

export default StatusCard;
