import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfileSettings } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";

const useUpdateProfile = ({ setFormData }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateProfileSettings,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          confirmPassword: "",
          currentPassword: "",
          newPassword: "",
        }));
      }
      toast.success(res.message);
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message || "Failed to update profile");
    },
  });
  return { isPending, updateProfileMutation: mutate };
};

export default useUpdateProfile;
