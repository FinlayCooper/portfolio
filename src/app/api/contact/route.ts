import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '../../../lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_TO,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
} 