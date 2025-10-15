import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResendEmailVerification } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";

const useResendSignupEmailVerify = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: (email) => ResendEmailVerification({ email }),
    onSuccess: (data) => {
      toast.success(data?.message || "Verification email sent successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
  return { isPending, resendEmailMutation: mutate };
};

export default useResendSignupEmailVerify;
