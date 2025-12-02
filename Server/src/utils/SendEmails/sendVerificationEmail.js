import nodeMailer from "nodemailer";
import { SendVerificationEmailTemplate } from "../EmailTemplates/SendVerificationEmailTemplate.js";

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async ({ to, token, firstName }) => {
  try {
    const verifyUrl = `${process.env.FRONTEND_URL
      }/verify-email?token=${token}&email=${encodeURIComponent(to)}`;

    const htmlTemplate = SendVerificationEmailTemplate({
      firstName,
      verifyUrl,
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      subject: "Verify your email at AIREMAP",
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully");
  } catch (error) {
    console.error("Verification email failed to send:", error);
    if (error.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Please check SMTP credentials."
      );
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNECTION") {
      throw new Error(
        "Unable to connect to mail server. Please try again later."
      );
    } else {
      throw new Error("Failed to send verification email. Please try again.");
    }
  }
};
