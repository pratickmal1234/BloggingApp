import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";


export const verifyUser = async (req, res, next) => { 
    try {
        const token = req.cookies.accessToken;
        
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.secretKey);

    
        req.userId = decoded._id;        

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};