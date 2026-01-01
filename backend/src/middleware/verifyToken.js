import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";

export const verification = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(token);
        

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token missing",
            });
        }

        jwt.verify(token, process.env.secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Token expired or invalid",
                });
            }

            const user = await userSchema.findById(decoded._id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found here"
                });
            }

            user.isVarifyed = true;
            user.token = null;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Email verified successfully",
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


