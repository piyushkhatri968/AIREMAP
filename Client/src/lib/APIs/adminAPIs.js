import { axiosInstance } from "../axios";

export const GetAllUsers = async () => {
  const response = await axiosInstance.get("/admin/getAllUsers");
  return response.data;
};
export const GetAllAgents = async () => {
  const response = await axiosInstance.get("/admin/getAllAgents");
  return response.data;
};
export const GetAllAdmins = async () => {
  const response = await axiosInstance.get("/admin/getAllAdmins");
  return response.data;
};
export const GetAllDisabledUsers = async () => {
  const response = await axiosInstance.get("/admin/getAllDisabledUsers");
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
export const UpdateUserVAT = async (formData) => {
  const response = await axiosInstance.put("/admin/updateUserVAT", formData);
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
export const GetAllAgentEcuFiles = async () => {
  const response = await axiosInstance.get("/admin/getAllAgentEcuFiles");
  return response.data;
};

export const UpdateFileStatus = async (formData) => {
  const response = await axiosInstance.put(
    "/admin/updateEcuFileStatus",
    formData
  );
  return response.data;
};

export const UploadTunedFile = async (formData) => {
  const response = await axiosInstance.put("/admin/uploadTunedFile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const UpdateCreditPrice = async (data) => {
  const response = await axiosInstance.put("/admin/updatePerCreditPrice", data);
  return response.data;
};
export const DisableUser = async (formData) => {
  const response = await axiosInstance.post("/admin/disableUser", formData);
  return response.data;
};
export const EnableUser = async (formData) => {
  const response = await axiosInstance.post("/admin/activeUser", formData);
  return response.data;
};
export const DeleteUser = async (formData) => {
  const response = await axiosInstance.post("/admin/deleteUser", formData);
  return response.data;
};

export const CreateAgent = async (formData) => {
  const response = await axiosInstance.post("/admin/createAgent", formData);
  return response.data;
};
export const CreateAdmin = async (formData) => {
  const response = await axiosInstance.post("/admin/createAdmin", formData);
  return response.data;
};

export const ApproveUser = async (formData) => {
  const response = await axiosInstance.post("/admin/approveUser", formData);
  return response.data;
};
export const RejectUser = async (formData) => {
  const response = await axiosInstance.post("/admin/rejectUser", formData);
  return response.data;
};

export const GetAssignedUsersToAgent = async (id) => {
  const response = await axiosInstance.get(
    `/admin/GetAssignedUsersToAgent/${id}`
  );
  return response.data;
};

export const AssignUsersToAgent = async ({ id, userIds }) => {
  const response = await axiosInstance.post(`/admin/assignUsersToAgent/${id}`, {
    userIds,
  });
  return response.data;
};
