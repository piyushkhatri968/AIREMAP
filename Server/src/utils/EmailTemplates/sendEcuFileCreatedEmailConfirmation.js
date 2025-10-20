export const sendEcuFileCreatedEmailConfirmation = ({
  firstName,
  ticketNo,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ECU File Ticket Created</title>
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
      .ticket-box {
        background: #111111;
        border: 1px solid #2a2a2a;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
        margin: 24px 0;
      }
      .ticket-box span {
        font-size: 16px;
        color: #9ca3af;
      }
      .ticket-number {
        display: block;
        font-size: 22px;
        font-weight: 700;
        color: #dc2626;
        margin-top: 8px;
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
          Your ECU File Ticket has been created successfully. Our team will start
          processing it shortly.
        </p>
        <div class="ticket-box">
          <span>Your Ticket Number</span>
          <strong class="ticket-number">#${ticketNo}</strong>
        </div>
        <p>
          You can track your ticket’s progress by logging into your AIREMAP account.
        </p>
        <p>
          Thanks for trusting <strong>AIREMAP</strong> — we’ll notify you once your file is ready.
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
