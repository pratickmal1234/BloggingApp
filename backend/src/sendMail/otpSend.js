import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const otpSent = async (otp, email) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPass
        }
    });


    const mailConfiguration = {
        from: process.env.mailUser,
        to: email,
        subject: "OTP",
        text: `Your otp is    ${otp}`
    };

    transport.sendMail(mailConfiguration, function (error, info) {
        if (error) {
            console.error(error);
            console.log("Email cannot sent!");
        }
        console.log("Email send successfully!");
        console.log(info);
    })
};

















