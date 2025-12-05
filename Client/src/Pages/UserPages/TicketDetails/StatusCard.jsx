import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IsEligibleToDownload } from "../../../lib/APIs/ecuFileAPIs";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const StatusCard = ({ status, ecuTunedFile, ticketNumber }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: IsEligibleToDownload,
  });

  const handleDownload = async () => {
    if (!ticketNumber) {
      toast.error(t("StatusCardPage.common.ticketMissing")); // i18n instead of hardcoded
      return;
    }

    try {
      const res = await mutateAsync(ticketNumber);

      if (res?.success && res?.data?.eligible) {
        toast.success(res?.data?.message);
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
          res?.message ||
          t("StatusCardPage.common.notEligible") // i18n
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        t("StatusCardPage.common.failedCheck") // i18n
      );
    }
  };

  const statusConfig = {
    Pending: {
      title: t("StatusCardPage.pending.title"),
      message: t("StatusCardPage.pending.message"),
      color: "text-yellow-500",
      button: null,
    },
    "In Progress": {
      title: t("StatusCardPage.inProgress.title"),
      message: t("StatusCardPage.inProgress.message"),
      color: "text-blue-500",
      button: null,
    },
    Completed: {
      title: t("StatusCardPage.completed.title"),
      message: t("StatusCardPage.completed.message"),
      color: "text-green-500",
      button: null,
    },
    Rejected: {
      title: t("StatusCardPage.rejected.title"),
      message: t("StatusCardPage.rejected.message"),
      color: "text-red-500",
      button: null,
    },
    Unlocked: {
      title: t("StatusCardPage.unlocked.title"),
      message: t("StatusCardPage.unlocked.message"),
      color: "text-purple-500",
      button: ecuTunedFile ? (
        <button
          onClick={handleDownload}
          disabled={isPending}
          className={`text-xs font-semibold rounded-full py-3 px-5 ${isPending
              ? "bg-zinc-700 cursor-not-allowed opacity-70 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
            } transition-colors`}
        >
          {isPending
            ? t("StatusCardPage.unlocked.checking")
            : t("StatusCardPage.unlocked.download")}
        </button>
      ) : (
        <button
          disabled
          className="text-white text-xs font-semibold rounded-full py-3 px-5 bg-zinc-700 cursor-not-allowed"
        >
          {t("StatusCardPage.unlocked.fileNotAvailable")}
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
