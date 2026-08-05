// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const info = await sendEmail({ to, subject, html });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: `Email sent successfully to ${to}`,
    });
  } catch (err: any) {
    console.error('Email send error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
