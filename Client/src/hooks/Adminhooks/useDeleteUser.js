import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: DeleteUser,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success(res.message || "User deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });
  return { deletePending: isPending, deleteUserMutation: mutate };
};

export default useDeleteUser;
