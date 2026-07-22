import { resend } from "../utils/resend.js";

export const verifyEmail = async (token, email) => {

    console.log("VERIFY FUNCTION STARTED");

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    try {

        console.log("SENDING EMAIL TO:", email);

        const response = await resend.emails.send({

            from: "onboarding@resend.dev",

            to: email,

            subject: "Email Verification",

            html: `
                <h2>Verify your email</h2>

                <a href="${verifyUrl}">
                    Verify Email
                </a>
            `
        });

        console.log("EMAIL SENT SUCCESSFULLY");

        console.log(response);

    } catch (error) {

        console.log("EMAIL ERROR");

        console.log(error);

        throw error;
    }
};