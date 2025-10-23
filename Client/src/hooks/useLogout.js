import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";
const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: Logout,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message);
      window.location.href = "/signin";
    },
  });
  return { logoutMutation: mutate };
};

export default useLogout;
