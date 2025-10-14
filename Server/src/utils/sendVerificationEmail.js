import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async ({ to, token, firstName }) => {
  try {
    const verifyUrl = `${
      process.env.FRONTEND_URL
    }/verify-email?token=${token}&email=${encodeURIComponent(to)}`;

    const html = `
    <p>Hi ${firstName || "there"},</p>
    <p>Thanks for signing up. Please verify your email by clicking the link below:</p>
    <p><a href="${verifyUrl}">Verify my email</a></p>
    <p>This link expires in 15 minutes.</p>
  `;

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      subject: "Verify your email at AIREMAP",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully");
  } catch (error) {
    console.error("Verification email failed to send:", error);
  }
};
