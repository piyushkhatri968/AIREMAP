import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssignUsersToAgent } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useAssignUsersToAgent = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, userIds }) =>
      await AssignUsersToAgent({ id, userIds }),
    onSuccess: (res) => {
      toast.success(res?.message || "Users assigned successfully!");
      queryClient.invalidateQueries({ queryKey: ["allAgents"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to assign users to agent"
      );
    },
  });
  return {
    assignUsersToAgentMutation: mutate,
    isAssigningUsersToAgent: isPending,
  };
};
export default useAssignUsersToAgent;
