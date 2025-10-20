export const sendAccountVerifiedEmailTemplate = ({ firstName }) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verified</title>
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
        background: linear-gradient(135deg, #16a34a, #15803d);
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
      .success-icon {
        font-size: 48px;
        text-align: center;
        color: #22c55e;
        margin: 20px 0;
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
        <div class="success-icon">✅</div>
        <p>Hi ${firstName || "there"},</p>
        <p>
          Congratulations! 🎉 Your email has been successfully verified and your
          <strong>AIREMAP</strong> account is now active.
        </p>
        <p>
          You can now log in and start exploring all features available to you.
        </p>
        <p>Welcome aboard, we're excited to have you with us!</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} AIREMAP. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
};
