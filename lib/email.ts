import { Resend } from "resend";

const resend = new Resend("re_zRJH7671_GFW9uoDESYwsiUqsQkYDmsW8");

export const sendEmail = (email: string, url: string) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Verification",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        border: 1px solid #000000;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #000000;
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #444444;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification</h2>
      <p>Hello,</p>
      <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
      <a href=${url} class="button">Verify Email</a>
      <p>If the button doesn't work, copy and paste this URL into your browser:</p>
      <p>${url}</p>
      <div class="footer">
        <p>If you did not request this email, you can safely ignore it.</p>
      </div>
    </div>
  </body>
</html>
`,
  });
};

export const sendResetPasswordEmail = (email: string, url: string) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Verification",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        border: 1px solid #000000;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #000000;
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #444444;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Reset Password</h2>
      <p>Hello,</p>
      <p>You can reset your password by clicking the button below:</p>
      <a href=${url} class="button">Verify Email</a>
      <p>If the button doesn't work, copy and paste this URL into your browser:</p>
      <p>${url}</p>
      <div class="footer">
        <p>If you did not request this email, you can safely ignore it.</p>
      </div>
    </div>
  </body>
</html>
`,
  });
};
