import { axiosInstance } from "../axios";

export const CreatePayment = async (formData) => {
  const response = await axiosInstance.post(
    "/payment/create-payment",
    formData
  );
  return response.data;
};

export const PaymentHistory = async () => {
  const response = await axiosInstance.get("/payment/payment-history");
  return response.data;
};
