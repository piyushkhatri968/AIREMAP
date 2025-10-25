import { axiosInstance } from "../axios";

export const createECUFile = async (formData) => {
  const response = await axiosInstance.post(
    "/ecuFile/create-ecuFile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const GetEcuFiles = async () => {
  const response = await axiosInstance.get("/ecuFile/my-files");
  return response.data;
};

export const GetTicketDetails = async (ticketNumber) => {
  const response = await axiosInstance.get(
    `/ecuFile/getTicketDetails/${ticketNumber}`
  );
  return response.data.data;
};

export const IsEligibleToDownload = async (ticketNumber) => {
  const response = await axiosInstance.post("/ecuFile/isEligibleToDownload", {
    ticketNumber,
  });
  return response.data;
};
