export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields (name, email, message)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not configured on server.');
      return new Response(
        JSON.stringify({ error: 'Email service is currently offline. Please use direct email.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'belalwaheed000@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Portfolio Inquiry <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject || 'New Contact Request'} - from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #18181b; background-color: #fafafa;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px;">
              <h2 style="margin-top: 0; color: #047857;">New Message from Portfolio</h2>
              <hr style="border: 0; border-top: 1px solid #f4f4f5; margin: 16px 0;" />
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
              <hr style="border: 0; border-top: 1px solid #f4f4f5; margin: 24px 0 16px 0;" />
              <p style="font-size: 12px; color: #71717a; margin: 0;">Sent automatically from Belal Waheed Portfolio Website</p>
            </div>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      const errorData = await resendRes.json();
      console.error('Resend API Error:', errorData);
      return new Response(JSON.stringify({ error: errorData.message || 'Failed to send email via Resend' }), {
        status: resendRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await resendRes.json();
    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Contact handler exception:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
