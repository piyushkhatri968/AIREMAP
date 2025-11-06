import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DisableUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useDisableUser = ({ setDisablingUserId }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ userId }) => await DisableUser({ userId }),
    onMutate: ({ userId }) => {
      if (setDisablingUserId) {
        setDisablingUserId(userId);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allAgents"] });
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
      toast.success(res.message || "User disabled successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to disable user");
    },
    onSettled: () => {
      if (setDisablingUserId) {
        setDisablingUserId(null);
      }
    },
  });
  return { disablePending: isPending, disableUserMutation: mutate };
};

export default useDisableUser;
