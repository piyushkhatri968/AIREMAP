import { axiosInstance } from "../axios";

export const GetAllUsers = async () => {
  const response = await axiosInstance.get("/admin/getAllUsers");
  return response.data;
};
export const GetAllUnverifiedUsers = async () => {
  const response = await axiosInstance.get("/admin/getAllUnverifiedUsers");
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

export const UpdateUserCredits = async (formData) => {
  const response = await axiosInstance.put(
    "/admin/updateUserCredits",
    formData
  );
  return response.data;
};

export const GetAllEcuFiles = async () => {
  const response = await axiosInstance.get("/admin/getAllEcuFiles");
  return response.data;
};

export const UpdateFileStatus = async (formData) => {
  const response = await axiosInstance.put(
    "/admin/updateEcuFileStatus",
    formData
  );
  return response.data;
};
