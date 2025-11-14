import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { GetTicketDetails } from "../../../lib/APIs/ecuFileAPIs";
import { Dot, Download, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import car1 from "../../../assets/AuthImages/car1.png";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import useUpdateFileStatus from "../../../hooks/Adminhooks/useUpdateFileStatus";
import useUploadTunedFile from "../../../hooks/Adminhooks/useUploadTunedFile";
import ChatRoom from "../../UserPages/TicketDetails/ChatRoom";
import { FileHistory } from "../../../lib/APIs/adminAPIs";
import { FileHistoryComponent } from "./FileHistoryComponent";
import useAuthUser from "../../../hooks/useAuthUser";

const AdminTicket = () => {
  const { ticketNumber } = useParams();
  const navigate = useNavigate();

  const { authUser } = useAuthUser()

  const [updatingFileId, setUpdatingFileId] = useState(null);

  const { isUpdatingStatus, updateFileStatusMutation } = useUpdateFileStatus({
    setUpdatingFileId,
    comingFrom: "AdminTicket",
  });

  useEffect(() => {
    if (!ticketNumber) {
      navigate("/files");
    }
  }, []);

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

  const [tunedFile, setTunedFile] = useState(null);

  const handleTunedFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File size cannot exceed 10 MB");
      e.target.value = ""; // reset file input
      return;
    }
    if (file) {
      setTunedFile(file);
    }
  };

  const { isPending: isTunedFilePending, uploadTunedFileMutation } =
    useUploadTunedFile();

  const uploadTunedFile = async () => {
    if (!tunedFile) {
      return toast.error("Please select a tuned file");
    }

    try {
      const fd = new FormData();
      fd.append("tunedFile", tunedFile);
      fd.append("ticketNumber", ticketNumber);

      await uploadTunedFileMutation(fd);
      setTunedFile(null);
    } catch (error) {
      toast.error(
        error?.message ||
        error?.response?.data?.message ||
        "Failed to upload tuned file"
      );
    }
  };

  const [fileHistoryPop, setFileHistoryPop] = useState(false);
  const handleFileHistoryPopup = () => {
    setFileHistoryPop((prev) => !prev);
  };

  const { data: fileHistoryData, isLoading } = useQuery({
    queryKey: ["fileHistory", ticketNumber],
    queryFn: () => FileHistory(ticketNumber),
    enabled: fileHistoryPop,
  });

  return (
    <>
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
          <div className="">
            {/* Three column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] gap-4">
              {/* Details */}
              <div className="p-6 space-y-4 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6 h-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
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
                {data?.notes && (
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      Notes
                    </p>
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
                )}
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Vehicle
                  </p>
                  <p className=" text-xs text-gray-900 dark:text-white">
                    {data?.make} {data?.model} {data?.year}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Registration
                  </p>
                  <p className=" text-xs text-gray-900 dark:text-white">
                    {data?.registration || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    ECU
                  </p>
                  <p className="text-xs text-gray-900 dark:text-white">
                    {data?.ecuId || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Tool
                  </p>
                  <p className=" text-xs text-gray-900 dark:text-white">
                    <span>
                      {data?.readTool} {data?.readType} {data?.masterSlave}
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    Gearbox
                  </p>
                  <p className=" text-xs text-gray-900 dark:text-white">
                    <span>{data?.transmission || "N/A"}</span>
                  </p>
                </div>
              </div>

              {/* File System */}
              <div className="p-6 space-y-6 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6 h-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    File Status
                  </h1>
                  {
                    authUser?.role === "admin" && <Button
                      variant="outline"
                      size="xs"
                      className="bg-red-600 hover:bg-red-700 border-red-500 text-white disabled:bg-red-800"
                      onClick={handleFileHistoryPopup}
                    >
                      View File History
                    </Button>
                  }

                </div>
                <p className="w-full h-[1px] bg-zinc-200 dark:bg-gray-700" />

                <div className="flex flex-col w-full space-y-2">
                  <label className="text-gray-900 dark:text-white">
                    Update File Status
                  </label>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white flex justify-center">
                    {updatingFileId === data._id && isUpdatingStatus ? (
                      <Loader2 className="animate-spin h-5 w-5 text-zinc-500" />
                    ) : (
                      <Select
                        required
                        value={data?.status || "Pending"}
                        onValueChange={(value) =>
                          updateFileStatusMutation({
                            fileId: data._id,
                            status: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full mx-auto h-10 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent
                          className="dark:bg-[#242526] relative"
                          side="bottom"
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
                            value="Rejected"
                            className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                          >
                            Rejected
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
                <div className="flex flex-col w-full space-y-2">
                  <label className=" text-gray-900 dark:text-white">
                    Upload Tuned File
                  </label>
                  <input
                    onChange={handleTunedFileUpload}
                    type="file"
                    className="w-full border p-2 border-zinc-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-md
             file:bg-red-600 file:hover:bg-red-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:cursor-pointer"
                  />

                  {tunedFile && (
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 border-red-500 text-white disabled:bg-red-800"
                        onClick={uploadTunedFile}
                        disabled={isTunedFilePending}
                      >
                        {isTunedFilePending ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  )}
                </div>
                {data?.tunedFile && (
                  <div className="flex items-center justify-between">
                    <p className=" text-gray-900 dark:text-white">
                      Download Tuned File
                    </p>
                    <a
                      href={data?.tunedFile}
                      download
                      target="__blank"
                      className="bg-green-600 hover:bg-green-700 border-green-500 text-white p-2 rounded-md text-sm cursor-pointer disabled:bg-green-800"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>

              {/* Request */}
              <div className="p-6 space-y-5 bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 mt-6 h-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
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
                        {stageDisplay[data?.stage] ||
                          data?.stage ||
                          "N/A Stage"}
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
                      <p className="text-gray-400 italic">
                        No options available
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Uploads
                  </p>
                  <a
                    href={data?.originalFile}
                    download
                    target="__blank"
                    className="text-white flex items-center justify-between text-xs p-3 bg-zinc-700 rounded-lg cursor-pointer font-semibold w-full"
                  >
                    <p className="flex items-center gap-3">
                      <Download size={18} /> ECU File
                    </p>
                  </a>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Additional Files
                  </p>

                  {data?.additionalFiles?.length > 0 ? (
                    data.additionalFiles.map((item, idx) => (
                      <a
                        key={idx}
                        href={item} // Use item, assuming it's the file URL
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white flex items-center justify-between text-xs p-3 bg-zinc-700 rounded-lg cursor-pointer font-semibold w-full"
                      >
                        <p className="flex items-center gap-3">
                          <Download size={18} /> File {idx + 1}
                        </p>
                      </a>
                    ))
                  ) : (
                    <div className="text-gray-900 dark:text-zinc-400 text-xs">
                      No Additional Files
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Chat */}
            <div className="flex flex-col gap-4 mt-6">
              <ChatRoom ecuFileId={data?._id} />
            </div>
          </div>
        )}
      </motion.div>
      {fileHistoryPop && (
        <div className="fixed inset-0 z-[9999]">
          <FileHistoryComponent
            fileHistoryData={fileHistoryData?.data}
            isLoading={isLoading}
            handleFileHistoryPopup={handleFileHistoryPopup}
          />
        </div>
      )}
    </>
  );
};

export default AdminTicket;
