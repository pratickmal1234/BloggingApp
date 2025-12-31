import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import userSchema from "../model/userSchema.js";


export const verifyUser = async (req, res, next) => { 
    try {
        const token = req.cookies.accessToken;
        console.log("cookies",req.cookies);
        console.log("accesscookies",req.cookies.accessToken);

        
        // console.log(token);
        
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.secretKey);

    
        req.userId = decoded._id;
        console.log("id",req.userId);
        

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

/*export const hasToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Token authorization invalid or not found!"
            })
        }
        else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.secretKey, async (err, decoded) => {
                if (err) {
                    if (err.message === "ExpiredTokenError") {
                        return res.status(401).json({
                            success: false,
                            message: "Token expired!"
                        })
                    }
                    return res.status(401).json({
                        success: false,
                        message: "Token invalid!"
                    })
                }
                else {
                    const { _id } = decoded;
                    const user = await userSchema.findById(_id);
                    if (!user) {
                        return res.status(401).json({
                            success: false,
                            message: "User not found!"
                        });
                    }

                    const existing = await scissonSchema.findOne({ userId: _id });
                    if (existing) {
                        req.userId = _id;
                        next();
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: "User logged out already",
                        });
                    }

                    // req.userId = id;
                    // next();
                }
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}*/