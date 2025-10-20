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

export const sendEmail = async ({ to, html, subject }) => {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing required fields: to, subject, or html");
    }
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      html,
      subject,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email send successfully");
  } catch (error) {
    console.error("Email failed to send:", error);
    if (error.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Please check SMTP credentials."
      );
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNECTION") {
      throw new Error(
        "Unable to connect to mail server. Please try again later."
      );
    } else {
      throw new Error("Failed to send email. Please try again.");
    }
  }
};
