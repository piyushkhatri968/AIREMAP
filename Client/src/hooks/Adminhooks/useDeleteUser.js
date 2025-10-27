import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useDeleteUser = ({ setDeletingUserId }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ userId }) => DeleteUser({ userId }),
    onMutate: ({ userId }) => {
      if (setDeletingUserId) {
        setDeletingUserId(userId);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success(res.message || "User deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
    onSettled: () => {
      if (setDeletingUserId) {
        setDeletingUserId(null);
      }
    },
  });
  return { deletePending: isPending, deleteUserMutation: mutate };
};

export default useDeleteUser;
