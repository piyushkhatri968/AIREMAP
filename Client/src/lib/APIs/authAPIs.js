import { axiosInstance } from "../axios.js";

export const Signup = async (formData) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};

export const Onboarding = async (formData) => {
  const response = await axiosInstance.post("/auth/onboarding", formData);
  return response.data;
};

export const SignupEmailVerify = async (formData) => {
  const response = await axiosInstance.post("/auth/signup-verify", formData);
  return response.data;
};

export const ResendEmailVerification = async (formData) => {
  const response = await axiosInstance.post(
    "/auth/signup-verify-resend",
    formData
  );
  return response.data;
};

export const Signin = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

export const GetMe = async () => {
  const response = await axiosInstance.get("/auth/getMe");
  return response.data;
};

export const Logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const UpdateProfileSettings = async (formData) => {
  const response = await axiosInstance.put("/auth/updateProfile", formData);
  return response.data;
};

export const StatsAPI = async () => {
  const response = await axiosInstance.get("/auth/stats");
  return response.data;
};

export const ResetPassword = async (formData) => {
  const response = await axiosInstance.post("/auth/resetPassword", formData);
  return response.data;
};
export const UpdatePasswordAPI = async (formData) => {
  const response = await axiosInstance.post("/auth/updatePassword", formData);
  return response.data;
};

export const UpdateLangPreference = async (formData) => {
  const response = await axiosInstance.put("/auth/updateLangPreference", formData)
  return response.data
}