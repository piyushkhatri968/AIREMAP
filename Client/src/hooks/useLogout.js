import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: Logout,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/signin");
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message);
      navigate("/signin");
    },
  });
  return { logoutMutation: mutate };
};

export default useLogout;
