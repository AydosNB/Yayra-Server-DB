import express from "express"
import { activationUser, registerUser } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", registerUser)
router.get("/activation/:id", activationUser)

export const authRouter = router