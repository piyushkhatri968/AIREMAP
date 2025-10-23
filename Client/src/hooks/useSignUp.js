import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Signup } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";

const useSignUp = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data?.message);
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message || "Failed to signup");
    },
  });
  return { isPending, signupMutation: mutate };
};

export default useSignUp;
