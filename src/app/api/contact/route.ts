import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // Send an email to the main inbox using Resend
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'no-reply@rahulai.com',
          to: ['info@rahulai.com'],
          subject: `New project brief from ${body.name || 'Website'}`,
          html: `<h3>New brief</h3><pre>${JSON.stringify(body, null, 2)}</pre>`,
        }),
      });
    } else {
      // No email provider configured — log to console for now
      // In production you should set RESEND_API_KEY
      // eslint-disable-next-line no-console
      console.log('Contact submission', body);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
