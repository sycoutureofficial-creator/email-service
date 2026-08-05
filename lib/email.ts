// lib/email.ts — Nodemailer transport for House of Spandana
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const info = await transporter.sendMail({
    from: `"House of Spandana" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  return info;
}
