import Auth from "../models/auth.model.js";
import { sendResponse } from "../utils/sendResponse.js";

export const AssignedUsers = async (req, res) => {
    try {
        const id = req.user._id;
        const response = await Auth.findById(id).select("assignedUsersToAgent");
        const assignedIds = response?.assignedUsersToAgent || [];

        if (assignedIds.length === 0) {
            return sendResponse(res, 200, true, "No assigned users", []);
        }
        const users = await Auth.find({ _id: { $in: assignedIds } })
            .select("firstName lastName credits createdAt");

        return sendResponse(res, 200, true, "", users);

    } catch (error) {
        console.error("Error in Agent-AssignedUsers:", error);
        return sendResponse(res, 500, false, error.message, null);
    }
};
