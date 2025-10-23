import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateFileStatus } from "../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";

const useUpdateFileStatus = ({ setUpdatingFileId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ fileId, status }) =>
      await UpdateFileStatus({ fileId, status }),

    onMutate: ({ fileId }) => {
      if (setUpdatingFileId) {
        setUpdatingFileId(fileId);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["allAdminEcuFiles"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update file status"
      );
    },
    onSettled: () => {
      if (setUpdatingFileId) {
        setUpdatingFileId(null);
      }
    },
  });
  return { updateFileStatusMutation: mutate, isUpdatingStatus: isPending };
};
export default useUpdateFileStatus;
