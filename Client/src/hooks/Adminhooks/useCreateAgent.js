import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreateAgent } from "../../lib/APIs/adminAPIs";

const useCreateAgent = ({ setAddAgentPopup }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateAgent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allAgents"] });
      toast.success(data?.message);
      if (setAddAgentPopup) {
        setAddAgentPopup(false);
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(message || "Failed to create agent");
    },
  });
  return { isPending, createAgentMutation: mutate };
};

export default useCreateAgent;
