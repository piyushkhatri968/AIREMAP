import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RejectUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useRejectUser = ({ setRejectedUserId, setRejectUserPopup }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, reason }) =>
      await RejectUser({ userId, reason }),

    onMutate: ({ userId }) => {
      if (setRejectedUserId) {
        setRejectedUserId(userId);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allUnverifiedUsers"] });
      if (setRejectUserPopup) {
        setRejectUserPopup(false);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to reject user");
    },
    onSettled: () => {
      if (setRejectedUserId) {
        setRejectedUserId(null);
      }
    },
  });
  return { rejectUserMutation: mutate, isRejectingUser: isPending };
};
export default useRejectUser;
