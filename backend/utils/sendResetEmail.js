// utils/sendResetEmail.js
const nodemailer = require('nodemailer');

async function sendResetEmail(toEmail, username, resetLink) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request',
    html: `
      <p>Hello ${username || 'User'},</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendResetEmail;
