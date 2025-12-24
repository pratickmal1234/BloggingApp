import userSchema from "../model/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailVerify } from "../sendMail/sendEmail.js"
import scissonSchema from "../model/scissonSchema.js"

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await userSchema.findOne({ email })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "user already existing"
            })
        }
        const hasPassword = await bcrypt.hash(password, 10)
        const user = await userSchema.create({
            name,
            email,
            password: hasPassword
        })

        const token = jwt.sign({ _id: user.id }, process.env.secretKey, { expiresIn: "5h" })
        mailVerify(token, email)
        user.token = token
        await user.save()


        if (user) {
            return res.status(201).json({
                success: true,
                message: "user register successfuly",
                user
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "user not register successfuly"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Register first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        if (!user.isVarifyed) {
            return res.status(400).json({ success: false, message: "Verify your email first" });
        }

        // ✅ Tokens
        const accessToken = jwt.sign({ _id: user._id }, process.env.secretKey, { expiresIn: "5h" });
        const refreshToken = jwt.sign({ _id: user._id }, process.env.secretKey, { expiresIn: "7d" });

        // ✅ Set cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true, 
            secure:false,
            sameSite: "lax",
            maxAge: 5 * 60 * 60 * 1000,
            path:"/",
            
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "lax",
        });

        // ✅ Save login status
        user.isLoged = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/*export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "register fast then login"
            })
        }
        const passwords = await bcrypt.compare(password, user.password)
        if (!passwords) {
            return res.status(400).json({
                success: false,
                message: "wrong password"
            })
        } if (passwords && user.isVarifyed === true) {

            await scissonSchema.create({ userId: user._id })

            const accessToken = jwt.sign({ _id: user.id }, process.env.secretKey, { expiresIn: "5h" })
            const refreshToken = jwt.sign({ _id: user.id }, process.env.secretKey, { expiresIn: "5h" })
            user.isLoged = true
            await user.save()

            return res.status(200).json({
                success: true,
                message: "login successfuly",
                accessToken: accessToken,
                refreshToken: refreshToken,
                user
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "varify token fast"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}*/

export const Logout = async (req, res) => {
    try {
        const existing = await scissonSchema.findOne({ userId: req.userId });
        const user = await userSchema.findById({ _id: req.userId });
        if (existing) {
            await scissonSchema.findOneAndDelete({ userId: req.userId });
            user.isLoged = false;
            await user.save()
            return res.status(200).json({
                success: true,
                message: "Session successfully ended",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User had no session",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    res.cookie("fp_otp", otp.toString(), {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: "lax"
    });

    res.cookie("fp_email", email, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000
    });

    await mailVerify(otp, email);

    res.json({ message: "OTP sent", otp });
};


export const verifyOtp = (req, res) => {
    const { otp } = req.body;
    const cookieOtp = req.cookies.fp_otp;

    if (!cookieOtp || cookieOtp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    res.clearCookie("fp_otp");

    res.cookie("fp_verified", "true", {
        httpOnly: true,
        maxAge: 10 * 60 * 1000
    });

    res.json({ message: "OTP verified" });
};



export const resetPassword = async (req, res) => {
    if (req.cookies.fp_verified !== "true") {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const { password } = req.body;
    const email = req.cookies.fp_email;

    const hash = await bcrypt.hash(password, 10);
    await userSchema.findOneAndUpdate({ email }, { password: hash });

    res.clearCookie("fp_verified");
    res.clearCookie("fp_email");

    res.json({ message: "Password reset successful" });
};