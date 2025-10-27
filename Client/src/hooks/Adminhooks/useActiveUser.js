import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EnableUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useActiveUser = ({ setEnablingUserId }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ userId }) => await EnableUser({ userId }),
    onMutate: ({ userId }) => {
      if (setEnablingUserId) {
        setEnablingUserId(userId);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
      toast.success(res.message || "User activated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to active user");
    },
    onSettled: () => {
      if (setEnablingUserId) {
        setEnablingUserId(null);
      }
    },
  });
  return { enablePending: isPending, enableUserMutation: mutate };
};

export default useActiveUser;
