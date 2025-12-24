import express from "express"
import { forgotPassword, Login, Logout, Register, resetPassword, verifyOtp } from "../ccontroller/userController.js"
import { verification } from "../middleware/verifyToken.js"
// import { hasToken } from "../middleware/hasToken.js"
const userRout=express.Router()

userRout.post("/register",Register)
userRout.post("/tokenVerify",verification)
userRout.post("/login",Login)
// userRout.delete("/logout",hasToken,Logout)
userRout.post("/forgotPassword",forgotPassword)
userRout.post("/verifyOtp",verifyOtp)
userRout.post("/resetPassword",resetPassword)

export default userRout