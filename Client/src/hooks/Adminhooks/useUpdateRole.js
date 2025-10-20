import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserRole } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useUpdateRole = ({ setUpdatingUserId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, role }) =>
      await UpdateUserRole({ userId, role }),

    onMutate: ({ userId }) => {
      if (setUpdatingUserId) {
        setUpdatingUserId(userId);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      if (setUpdatingUserId) {
        setUpdatingUserId(null);
      }
    },
  });
  return { updateUserRoleMutation: mutate, isUpdatingRole: isPending };
};
export default useUpdateRole;
