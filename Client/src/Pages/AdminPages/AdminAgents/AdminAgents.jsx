import { useQuery } from "@tanstack/react-query";
import { GetAllAgents, GetAllUsers } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Loader2, UserLock, UserX } from "lucide-react";
import { Button } from "../../../components/ui/button";

import useDisableUser from "../../../hooks/Adminhooks/useDisableUser";
import useDeleteUser from "../../../hooks/Adminhooks/useDeleteUser";
import useAuthUser from "../../../hooks/useAuthUser";
import CreateAgent from "./CreateAgent";
import AgentUsersSelectorModal from "./AgentUsersSelectorModal";

const AdminAgents = () => {
  const { authUser } = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [disablingUserId, setDisablingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const [addAgentPopup, setAddAgentPopup] = useState(false);

  const { disableUserMutation, disablePending } = useDisableUser({
    setDisablingUserId,
  });
  const { deleteUserMutation, deletePending } = useDeleteUser({
    setDeletingUserId,
  });

  const { data: usersData } = useQuery({
    queryFn: GetAllUsers,
    queryKey: ["allUsers"],
  });

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllAgents,
    queryKey: ["allAgents"],
  });

  if (isError) toast.error("Failed to load users");

  const filteredUser = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.email?.toLowerCase().includes(query) ||
      item.firstName?.toLowerCase().includes(query) ||
      item.lastName?.toLowerCase().includes(query)
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

  const [showModal, setShowModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleSave = (selected) => {
    setSelectedUserIds(selected);
    console.log(selected);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white whitespace-nowrap">
            Agents Management
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-end">
            <Input
              placeholder="Search users by name, email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
            />
            <Button
              onClick={() => setAddAgentPopup(true)}
              className="w-full md:w-fit bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800"
            >
              Add Agent
            </Button>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            {/* Table */}
            <table className="w-full min-w-full text-sm">
              <thead>
                <tr className="font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap">
                  <th className="px-2 py-3 text-center">Agent</th>
                  <th className="px-2 py-3 text-center">Email</th>
                  <th className="px-2 py-3 text-center">Assign Users</th>
                  <th className="px-2 py-3 text-center">Joined</th>
                  <th className="px-2 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-10 text-zinc-500 dark:text-gray-400"
                    >
                      <Loader2 className="animate-spin inline h-5 w-5 mr-2" />
                      Fetching Users...
                    </td>
                  </tr>
                ) : filteredUser?.length > 0 ? (
                  filteredUser.map((row) => (
                    <tr key={row._id} className="whitespace-nowrap">
                      <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                        {row.firstName} {row.lastName}
                        {row._id === authUser._id && (
                          <span className="text-green-500 text-xs ml-1">
                            (You)
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                        {row.email}
                      </td>
                      <td
                        className="px-2 py-3 text-center text-zinc-900 dark:text-white cursor-pointer"
                        onClick={() => setShowModal(true)}
                      >
                        Click here
                      </td>

                      <td className="px-2 py-3 text-center text-zinc-900 dark:text-white">
                        {formatDateTime(row?.createdAt)}
                      </td>
                      <td className="px-2 py-3 text-center flex justify-center gap-1">
                        {deletingUserId === row._id && deletePending ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Delete"
                            onClick={() =>
                              deleteUserMutation({ userId: row._id })
                            }
                            size="xs"
                            className="bg-red-600 hover:bg-red-700 border-red-500 text-white"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        )}
                        {disablingUserId === row._id && disablePending ? (
                          <Loader2 className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Button
                            variant="outline"
                            title="Disable"
                            size="xs"
                            onClick={() =>
                              disableUserMutation({ userId: row._id })
                            }
                            className="bg-blue-600 hover:bg-blue-700 border-blue-500 text-white ml-1"
                          >
                            <UserLock className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-12 text-zinc-500 dark:text-gray-400"
                    >
                      No agents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {addAgentPopup && (
        <div className="fixed inset-0 z-[9999]">
          <CreateAgent setAddAgentPopup={setAddAgentPopup} />
        </div>
      )}

      {showModal && (
        <AgentUsersSelectorModal
          usersData={usersData}
          setShowModal={setShowModal}
          onSave={(selected) => handleSave(selected)}
        />
      )}
    </>
  );
};

export default AdminAgents;
