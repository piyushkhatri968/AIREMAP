export const sendCreditsBoughtEmailConfirmation = ({
  amount,
  credits,
  serialNo,
  firstName,
  dateTime,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Receipt</title>
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
      .details-box {
        background: #111111;
        border: 1px solid #2a2a2a;
        border-radius: 10px;
        padding: 18px 20px;
        margin: 22px 0;
      }
      .details-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid #2a2a2a;
      }
      .details-row:last-child {
        border-bottom: none;
      }
      .details-row span {
        font-size: 14px;
        color: #9ca3af;
      }
      .details-row strong {
        color: #f3f4f6;
      }
      .footer {
        background: #111111;
        text-align: center;
        padding: 16px;
        font-size: 12px;
        color: #6b7280;
      }
      .note {
        margin-top: 20px;
        font-size: 13px;
        color: #9ca3af;
        text-align: center;
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
          Your purchase was successful! Below are the details of your recent credit transaction.
        </p>

        <div class="details-box">
          <div class="details-row">
            <span>Transaction ID: </span>
            <strong>#${serialNo}</strong>
          </div>
          <div class="details-row">
            <span>Credits Purchased: </span>
            <strong>${credits}</strong>
          </div>
          <div class="details-row">
            <span>Total Amount: </span>
            <strong>£${Number(amount).toFixed(2)}</strong>
          </div>
          <div class="details-row">
            <span>Date & Time: </span>
            <strong>${new Date(dateTime).toLocaleString()}</strong>
          </div>
        </div>

        <p>
          Thank you for choosing <strong>AIREMAP</strong>. Your credits have been added to your account and are ready to use.
        </p>
        <p class="note">
          You can also download your payment invoice from the <strong>Transactions</strong> page in your dashboard.
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
