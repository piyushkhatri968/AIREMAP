export const SendVerificationEmailTemplate = ({ firstName, verifyUrl }) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
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
      .button-wrapper {
        text-align: center;
        margin: 28px 0;
      }
      .verify-btn {
        display: inline-block;
        padding: 12px 28px;
        background: #dc2626;
        color: #ffffff;
        font-weight: 600;
        border-radius: 8px;
        text-decoration: none;
        transition: background 0.3s ease;
      }
      .verify-btn:hover {
        background: #ef4444;
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
        <p>Hi ${firstName ? firstName : "there"},</p>
        <p>
          Thanks for signing up with <strong>AIREMAP</strong>! Please verify your email address by clicking the button below.
        </p>
        <div class="button-wrapper">
          <a href="${verifyUrl}" class="verify-btn">Verify My Email</a>
        </div>
        <p>
          This link will expire in <strong>15 minutes</strong>. If you did not request this, please ignore this email.
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
