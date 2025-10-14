import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupEmailVerify } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useSignupEmailVerify = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: SignupEmailVerify,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message);
    },
  });
  return { isPending, signupEmailVerifyMutation: mutate };
};

export default useSignupEmailVerify;
