import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST!,
    port: Number(process.env.MAIL_PORT!),
    auth: {
      user: process.env.MAIL_USERNAME!,
      pass: process.env.MAIL_PASSWORD!,
    },
  });

  const verificationUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: email,
    subject: '請驗證您的信箱',
    html: `<p>請點擊以下連結驗證您的信箱：</p><a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}
