import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { GetTicketDetails } from "../../../lib/APIs/ecuFileAPIs";
import { Dot, Download, Loader2, Send } from "lucide-react";
import { toast } from "react-toastify";
import car1 from "../../../assets/AuthImages/car1.png";
import StatusCard from "./StatusCard";
import { useState } from "react";

const TicketDetails = () => {
  const { ticketNumber } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: ["ticketDetails", ticketNumber],
    queryFn: () => GetTicketDetails(ticketNumber),
    enabled: !!ticketNumber,
  });

  if (error) {
    toast.error(error?.response?.data?.message);
  }

  const stageDisplay = {
    "No Engine Mud": "No Engine Mud",
    Eco: "Eco",
    "Stage 1": "Stage 1",
    "Stage 2": "Stage 2",
    "Gear Box": "Gear Box",
    "Original File (Back To Stock)": "Original File (Back To Stock)",
    "ECU Cloning": "ECU Cloning",
  };

  const [showFullNotes, setShowFullNotes] = useState(false);
  const notes = data?.notes || "";
  const isLong = notes.length > 100;
  const previewText = isLong ? notes.slice(0, 100) + "..." : notes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {isPending ? (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Ticket Details...
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {data?.make} {data?.model} {data?.year}
          </h2>
          {/* Three column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] gap-4">
            {/* Details */}
            <div className="p-6 space-y-4 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Details
              </h1>
              <p className="w-full h-[1px] bg-zinc-200 dark:bg-gray-700" />
              <div className="w-full h-[9rem] overflow-hidden">
                <img
                  src={car1}
                  alt=""
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  Notes
                </p>
                {/* <p className="border border-red-600 rounded-lg p-3 bg-red-600/20 text-xs text-gray-900 dark:text-white">
                  {data?.notes}
                </p> */}
                <div className="border border-red-600 rounded-lg p-3 bg-red-600/20 text-xs text-gray-900 dark:text-white relative">
                  <AnimatePresence mode="wait">
                    {showFullNotes ? (
                      <motion.p
                        key="full"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {notes}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="preview"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {previewText}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {isLong && (
                    <button
                      onClick={() => setShowFullNotes((prev) => !prev)}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block font-semibold"
                    >
                      {showFullNotes ? "See less" : "See more"}
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  Registration
                </p>
                <p className=" text-xs text-white">
                  {data?.registration || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  ECU
                </p>
                <p className="text-xs text-white">{data?.ecuId || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  Tool
                </p>
                <p className=" text-xs text-white">
                  <span>
                    {data?.readTool} {data?.readType} {data?.masterSlave}
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  Gearbox
                </p>
                <p className=" text-xs text-white">
                  <span>{data?.transmission || "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Chat */}
            <div className="flex flex-col gap-4">
              <div className="">
                <StatusCard status={data?.status} />
              </div>
              <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center p-6 border-b border-zinc-200 dark:border-gray-700">
                  <h1 className="font-semibold text-gray-900 dark:text-white">
                    Support Chat
                  </h1>
                  <Dot className="text-green-600" />
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1C1C1C] p-6 text-gray-900 dark:text-white space-y-3"></div>

                {/* Input box */}
                <div className="p-4 border-t border-zinc-200 dark:border-gray-700 flex items-center gap-3 bg-zinc-50 dark:bg-[#242526]/90">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter message..."
                      className="w-full rounded-full bg-zinc-200 dark:bg-zinc-700 py-3 px-5 text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  <button className="bg-orange-600 rounded-full text-white p-3 hover:bg-orange-700 transition">
                    <Send />
                  </button>
                </div>
              </div>
            </div>

            {/* Request */}
            <div className="p-6 space-y-5 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Request
                </h1>
              </div>
              <p className="w-full h-[1px] bg-zinc-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Modifications
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 w-8 h-8 rounded flex items-center justify-center">
                    {/* Display first letter of stage or 'S' for default */}
                    <span className="text-white font-semibold">
                      {stageDisplay[data?.stage]
                        ? stageDisplay[data?.stage].charAt(0)
                        : "S"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                      {stageDisplay[data?.stage] || data?.stage || "N/A Stage"}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Solutions
                </p>

                <div className="text-xs text-white">
                  {data?.modificationOptions &&
                  data?.modificationOptions?.flatMap(
                    (item) =>
                      item
                        ?.split(",")
                        ?.map((opt) => opt.trim())
                        ?.filter((opt) => opt.length > 0) // remove empty values
                  ).length > 0 ? (
                    data?.modificationOptions
                      ?.flatMap((item) =>
                        item
                          ?.split(",")
                          ?.map((opt) => opt.trim())
                          ?.filter((opt) => opt.length > 0)
                      )
                      .map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs text-gray-900 dark:text-white pb-1"
                        >
                          <Dot className="w-3 h-3 mr-1" /> {option}
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-400 italic">No options available</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Uploads
                </p>
                <div className="text-white flex items-center justify-between text-xs p-3 bg-zinc-700 rounded-lg cursor-pointer font-semibold">
                  <p className="flex items-center gap-3">
                    <Download size={18} /> ECU File
                  </p>
                  <p>4.13 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TicketDetails;
