import { axiosInstance } from "../axios"

export const GetAssignedUsers = async () => {
    const response = await axiosInstance.get("/agent/assignedUsers")
    return response.data
}