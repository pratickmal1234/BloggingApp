import express from "express"
import { forgotPassword, getProfile, Login, Logout, Register, resetPassword, updateProfile, verifyOtp } from "../ccontroller/userController.js"
import { verification } from "../middleware/verifyToken.js"
import { verifyUser } from "../middleware/hasToken.js"
import { upload } from "../ccontroller/multarControrller.js"
import { loginSchema, profileSchema, registerSchema, validateUser } from "../Validation/UserValidation.js"
const userRout = express.Router()

userRout.post("/register",validateUser(registerSchema), Register)
userRout.post("/tokenVerify", verification)
userRout.post("/login",validateUser(loginSchema), Login)
userRout.delete("/logout", verifyUser, Logout)
userRout.post("/forgotPassword", forgotPassword)
userRout.post("/verifyOtp", verifyOtp)
userRout.post("/resetPassword", resetPassword)
userRout.put(
    "/profile",
    verifyUser,
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),validateUser(profileSchema),
    updateProfile
);
userRout.get("/profile", verifyUser, getProfile);


export default userRout