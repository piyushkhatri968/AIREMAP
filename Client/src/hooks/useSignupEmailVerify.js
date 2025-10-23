import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupEmailVerify } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";

const useSignupEmailVerify = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: SignupEmailVerify,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message || "Failed to verify");
    },
  });
  return { isPending, signupEmailVerifyMutation: mutate, error };
};

export default useSignupEmailVerify;
