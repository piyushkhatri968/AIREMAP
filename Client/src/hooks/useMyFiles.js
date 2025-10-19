import { useQuery } from "@tanstack/react-query";
import { GetEcuFiles } from "../lib/APIs/ecuFileAPIs";

const useMyFiles = () => {
  return useQuery({
    queryKey: ["myFiles"],
    queryFn: GetEcuFiles,
  });
};

export default useMyFiles;
