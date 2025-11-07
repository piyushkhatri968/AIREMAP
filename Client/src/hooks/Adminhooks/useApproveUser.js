import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApproveUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useApproveUser = ({ setApprovingUserId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId }) => await ApproveUser({ userId }),

    onMutate: ({ userId }) => {
      if (setApprovingUserId) {
        setApprovingUserId(userId);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allUnverifiedUsers"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to approve user");
    },
    onSettled: () => {
      if (setApprovingUserId) {
        setApprovingUserId(null);
      }
    },
  });
  return { approveUserMutation: mutate, isApprovingUser: isPending };
};
export default useApproveUser;
