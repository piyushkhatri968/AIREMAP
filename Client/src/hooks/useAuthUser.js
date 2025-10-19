import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../lib/APIs/authAPIs";
import { useLocation } from "react-router";

const useAuthUser = () => {
  const { pathname: currentPath } = useLocation();
  const publicRoutes = ["/signin", "/signup", "/password-reset"];
  const isPublicPage = publicRoutes.includes(currentPath);
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: GetMe,
    retry: false,
    refetchOnWindowFocus: !isPublicPage,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.data };
};

export default useAuthUser;
