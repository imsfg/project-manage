import express from "express"
import { adminRight, displayRegistration, loginUser,registerUser } from "../controllers/userControllers.js"

const userRouter =express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/regis",displayRegistration)
userRouter.post("/admin",adminRight)

export default userRouter