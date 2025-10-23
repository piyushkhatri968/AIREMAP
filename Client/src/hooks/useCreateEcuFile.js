import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createECUFile } from "../lib/APIs/ecuFileAPIs";
import { toast } from "react-toastify";

const useCreateEcuFile = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createECUFile,
    onSuccess: (res) => {
      toast.success(res?.message);
      navigate("/my-files");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create Ecu file"
      );
    },
  });
  return { isPending, createEcuFileMutation: mutateAsync };
};

export default useCreateEcuFile;
