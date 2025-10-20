import { axiosInstance } from "../axios";

export const GetAllUsers = async () => {
  const response = await axiosInstance.get("/admin/getAllUsers");
  return response.data;
};

export const UpdateUserRole = async (formData) => {
  const response = await axiosInstance.put("/admin/updateUserRole", formData);
  return response.data;
};

export const GetAllTransactionHistory = async () => {
  const response = await axiosInstance.get("/admin/getAllTransactionHistory");
  return response.data;
};

export const UpdateUserCredits = async (credits) => {
  const response = await axiosInstance.put("/admin/updateUserCredits", {
    credits,
  });
  return response.data;
};
