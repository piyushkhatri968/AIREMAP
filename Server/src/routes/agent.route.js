import express from "express"
import { AssignedUsers } from "../controllers/agent.Controller.js"
import { isAuthorized, isFullyAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router()

router.get("/assignedUsers", isFullyAuthenticated, isAuthorized("agent"), AssignedUsers)


export default router