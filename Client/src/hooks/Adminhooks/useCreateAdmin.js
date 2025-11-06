import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateAdmin } from "../../lib/APIs/adminAPIs";

const useCreateAdmin = ({ setAddAdminPopup }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateAdmin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
      toast.success(data?.message);
      if (setAddAdminPopup) {
        setAddAdminPopup(false);
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message || "Failed to create admin");
    },
  });
  return { isPending, createAdminMutation: mutate };
};

export default useCreateAdmin;
