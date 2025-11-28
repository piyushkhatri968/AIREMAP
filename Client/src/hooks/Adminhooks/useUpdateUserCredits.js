import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserCredits } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useUpdateUserCredits = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateUserCredits,

    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["assignUsersToAgent"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update the credits"
      );
    },
  });

  return { updateUserCreditsMutation: mutate, isUpdatingCredits: isPending };
};

export default useUpdateUserCredits;
