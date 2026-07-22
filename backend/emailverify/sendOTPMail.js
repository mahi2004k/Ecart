import { resend } from "../utils/resend.js";

export const sendOTPMail = async (otp, email) => {

    try {

        await resend.emails.send({

            from: "onboarding@resend.dev",

            to: email,

            subject: "Password Reset OTP",

            html: `
                <h2>Password Reset OTP</h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>
            `
        });

        console.log("OTP sent successfully");

    } catch (error) {

        console.log("Resend OTP error:");

        console.log(error);

        throw error;
    }
};