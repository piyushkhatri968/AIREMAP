import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserVAT } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useUpdateVAT = ({ setUpdatingVATUserId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, vat }) => await UpdateUserVAT({ userId, vat }),

    onMutate: ({ userId }) => {
      if (setUpdatingVATUserId) {
        setUpdatingVATUserId(userId);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update VAT");
    },
    onSettled: () => {
      if (setUpdatingVATUserId) {
        setUpdatingVATUserId(null);
      }
    },
  });
  return { updateUserVATMutation: mutate, isUpdatingVAT: isPending };
};
export default useUpdateVAT;
