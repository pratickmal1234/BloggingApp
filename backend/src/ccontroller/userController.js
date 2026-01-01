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

export const Logout = async (req, res) => {
  try {
    const userId = req.userId; // ✅ ঠিক করা

    // ✅ Clear cookies (login এর সাথে MATCH করা জরুরি)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    if (userId) {
      await userSchema.findByIdAndUpdate(userId, {
        isLoged: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// export const Logout = async (req, res) => {
//     try {
//         const existing = await scissonSchema.findOne({ userId: req.userId });
//         const user = await userSchema.findById({ _id: req.userId });
//         if (existing) {
//             await scissonSchema.findOneAndDelete({ userId: req.userId });
//             user.isLoged = false;
//             await user.save()
//             return res.status(200).json({
//                 success: true,
//                 message: "Session successfully ended",
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "User had no session",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


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



export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userSchema.findById(userId);

    const profileImage = req.files?.profileImage
      ? `/upload/${req.files.profileImage[0].filename}`
      : user.profileImage;

    const coverImage = req.files?.coverImage
      ? `/upload/${req.files.coverImage[0].filename}`
      : user.coverImage;

    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        profileImage,
        coverImage,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};








// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await userSchema.findById(req.userId).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




