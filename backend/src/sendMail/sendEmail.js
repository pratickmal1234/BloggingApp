import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const mailVerify = async (token, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPass,
        },
    });

    const link = `http://localhost:5173/verifyemail?token=${token}`;

    const mailConfigurations = {
        from: process.env.mailUser,
        to: email,
        subject: "Email Verification",
        html: `
           <h3>Email Verification</h3>
           <p>Please click the link below to verify your email</p>
           <a href="${link}">${link}</a>
         `,
    };

    await transporter.sendMail(mailConfigurations);
};

















