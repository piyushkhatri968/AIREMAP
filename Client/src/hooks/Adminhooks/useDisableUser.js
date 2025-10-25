import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DisableUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useDisableUser = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: DisableUser,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success(res.message || "User disabled successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to disable user");
    },
  });
  return { disablePending: isPending, disableUserMutation: mutate };
};

export default useDisableUser;
