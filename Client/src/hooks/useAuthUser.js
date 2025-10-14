import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../lib/APIs/authAPIs";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: GetMe,
    retry: false,
  });
  return { isLoading: authUser.isLoading, authUser: authUser.data?.data };
};

export default useAuthUser;
