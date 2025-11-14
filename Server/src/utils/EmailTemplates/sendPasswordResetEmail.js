export const sendPasswordResetEmail = ({ firstName, token }) => {
  const resetLink = `${process.env.FRONTEND_URL}/update-password/${token}`;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        background-color: #0b0b0b;
        font-family: "Inter", "Segoe UI", Roboto, Arial, sans-serif;
        color: #f3f4f6;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 520px;
        margin: 40px auto;
        background-color: #1a1a1a;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        border: 1px solid #2a2a2a;
      }
      .header {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
        color: #fff;
        letter-spacing: 1px;
      }
      .content {
        padding: 30px 25px;
        text-align: left;
        line-height: 1.6;
      }
      .content p {
        margin: 12px 0;
        color: #d1d5db;
      }
      .button {
        display: block;
        width: fit-content;
        margin: 24px auto;
        padding: 12px 24px;
        background: #dc2626;
        color: #fff !important;
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
      }
      .footer {
        background: #111111;
        text-align: center;
        padding: 16px;
        font-size: 12px;
        color: #6b7280;
      }
      @media (max-width: 600px) {
        .container {
          margin: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>AIREMAP</h1>
      </div>
      <div class="content">
        <p>Hi ${firstName || "there"},</p>
        <p>
          We received a request to reset your AIREMAP account password. If you made
          this request, click the button below to set a new password.
        </p>

        <a class="button" href="${resetLink}" target="_blank">
          Reset Password
        </a>

        <p>
          If you didn't request a password reset, you can safely ignore this email.
          Your account will remain unchanged.
        </p>

        <p>
          This link will expire after 15 minutes for security reasons.
        </p>
      </div>

      <div class="footer">
        &copy; ${new Date().getFullYear()} AIREMAP. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
};
