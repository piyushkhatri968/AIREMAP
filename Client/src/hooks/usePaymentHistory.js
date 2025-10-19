import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "../lib/APIs/paymentAPIs";

const usePaymentHistory = () => {
  return useQuery({
    queryKey: ["paymentHistory"],
    queryFn: PaymentHistory,
  });
};

export default usePaymentHistory;
