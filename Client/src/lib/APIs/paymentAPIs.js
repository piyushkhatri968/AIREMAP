import { axiosInstance } from "../axios";

export const CreatePayment = async (formData) => {
  const response = await axiosInstance.post(
    "/payment/create-payment",
    formData
  );
  return response.data;
};
