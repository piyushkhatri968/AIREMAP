import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Onboarding } from "../lib/APIs/authAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useOnboarding = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Onboarding,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/unverified");
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message);
    },
  });
  return { isPending, OnboardingMutation: mutate };
};

export default useOnboarding;
