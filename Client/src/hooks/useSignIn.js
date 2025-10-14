import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Signin } from "../lib/APIs/authAPIs";

const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Signin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message);
    },
  });
  return { isPending, signinMutation: mutate };
};

export default useSignIn;
