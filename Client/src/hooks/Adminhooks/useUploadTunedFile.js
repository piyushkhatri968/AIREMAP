import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UploadTunedFile } from "../../lib/APIs/adminAPIs";

const useUploadTunedFile = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: UploadTunedFile,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetails"] });
      toast.success(res?.message);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to upload tuned file"
      );
    },
  });
  return { isPending, uploadTunedFileMutation: mutateAsync };
};

export default useUploadTunedFile;
