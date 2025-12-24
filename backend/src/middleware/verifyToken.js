import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";

export const verification = async (req, res) => {
    try {
        // 🔥 token query থেকে নিচ্ছি
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



/*import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";

export const verification = async (req, res) => {
try {
// ✅ token query থেকে নাও
const { token } = req.query;

if (!token) {
return res.status(400).json({
success: false,
message: "Verification token missing",
});
}

// ✅ verify token
const decoded = jwt.verify(token, process.env.secretKey);

const user = await userSchema.findById(decoded._id);

if (!user) {
return res.status(404).json({
success: false,
message: "User not found",
});
}

// ✅ already verified check
if (user.isVarifyed) {
return res.json({
success: true,
message: "Email already verified",
});
}

user.token = null;
user.isVarifyed = true;
await user.save();

return res.status(200).json({
success: true,
message: "Email verified successfully",
});

} catch (error) {
return res.status(400).json({
success: false,
message: "Token expired or invalid",
});
}
};*/














/*import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";


//mail verification
export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader)
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing or Invalid",
            });
        } else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.secretKey, async (err, decoded) => {
                console.log(decoded);

                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(400).json({
                            success: false,
                            message: "The registration Token is Expired",
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        message: "Token verification failed, possibly expired",
                    });
                } else {
                    const { _id } = decoded; //here id comes in the body
                    console.log(_id);
                    
                    const user = await userSchema.findById(_id);
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            message: "User not found",
                        });
                    } else {
                        user.token = null;
                        user.isVarifyed = true;
                        await user.save();
                        return res.status(200).json({
                            success: true,
                            message: "Email verified successfully",
                        });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not access",
        });
    }
};*/