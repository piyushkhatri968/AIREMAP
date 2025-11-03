import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { IsEligibleToDownload } from "../../../lib/APIs/ecuFileAPIs";
import { toast } from "react-toastify";

const StatusCard = ({ status, ecuTunedFile, ticketNumber }) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: IsEligibleToDownload,
  });

  const handleDownload = async () => {
    if (!ticketNumber) {
      toast.error("Ticket number missing!");
      return;
    }

    try {
      const res = await mutateAsync(ticketNumber);

      if (res?.success && res?.data?.eligible) {
        toast.success(res?.data?.message);
        //  Trigger actual file download
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        const link = document.createElement("a");
        link.href = ecuTunedFile;
        link.download = "";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error(
          res?.message || "You are not eligible to download this file"
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to check download eligibility"
      );
    }
  };

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
      message:
        "File tuning has been completed successfully. Wait for the file to be available.",
      color: "text-green-500",
      button: null,
    },
    Failed: {
      title: "Failed",
      message:
        "Something went wrong while tuning the file. Please check again later.",
      color: "text-red-500",
      button: null,
    },
    Unlocked: {
      title: "File Unlocked",
      message: "Click below to download your tuned file.",
      color: "text-purple-500",
      button: ecuTunedFile ? (
        <button
          onClick={handleDownload}
          disabled={isPending}
          className={` text-xs font-semibold rounded-full py-3 px-5 ${isPending
              ? "bg-zinc-700 cursor-not-allowed opacity-70 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
            } transition-colors`}
        >
          {isPending ? "Checking..." : "Download"}
        </button>
      ) : (
        <button
          disabled
          className="text-white text-xs font-semibold rounded-full py-3 px-5 bg-zinc-700 cursor-not-allowed"
        >
          File not available
        </button>
      ),
    },
  };

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
