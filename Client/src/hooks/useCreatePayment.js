import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePayment } from "../lib/APIs/paymentAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: CreatePayment,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries(["authUser"]);
        toast.success(res.message || "Payment Successful");
        navigate("/dashboard");
      } else {
        toast.error(res.message || "Payment Failed");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.detail ||
          "Payment failed!"
      );
    },
  });
  return { isPending, createPaymentMutation: mutateAsync };
};

export default useCreatePayment;
