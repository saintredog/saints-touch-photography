/**
 * Cloudflare Pages Function: /api/contact
 * Receives contact form submissions and emails Clifford via Resend.
 */

const NOTIFY_EMAIL  = 'saintstouch.photography@gmail.com';
const FROM_EMAIL    = 'hello@saintstouch.photography';
const FROM_NAME     = "Saint's Touch Photography";
const REPLY_TO_NAME = "Saint's Touch Website";

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Please fill in all required fields.' }), { status: 400, headers });
    }

    const RESEND_API_KEY = env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ ok: false, error: 'Server configuration error.' }), { status: 500, headers });
    }

    const serviceLabel = service || 'Not specified';

    // Email to Clifford (notification)
    const notifyHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#080808;border-radius:4px;overflow:hidden;max-width:100%;">

        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(201,168,124,0.15);">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a87c;">New Inquiry</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:400;color:#e8ddd0;">
              ${name} wants to book a session
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,168,124,0.08);">
                  <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a87c;">Name</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#e8ddd0;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,168,124,0.08);">
                  <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a87c;">Email</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#e8ddd0;"><a href="mailto:${email}" style="color:#c9a87c;">${email}</a></p>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,168,124,0.08);">
                  <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a87c;">Phone</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#e8ddd0;">${phone}</p>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,168,124,0.08);">
                  <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a87c;">Service</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#e8ddd0;">${serviceLabel}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a87c;">Message</p>
                  <p style="margin:8px 0 0;font-size:15px;color:#e8ddd0;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td align="center">
                  <a href="mailto:${email}?subject=Re: Your Saint's Touch Inquiry"
                     style="display:inline-block;padding:12px 28px;background:#c9a87c;color:#080808;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                    Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(201,168,124,0.08);text-align:center;">
            <p style="margin:0;color:rgba(232,221,208,0.3);font-size:11px;">
              Submitted via saintstouch.photography
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // Confirmation email to the person who submitted
    const confirmHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#080808;border-radius:4px;overflow:hidden;max-width:100%;">

        <tr>
          <td style="padding:40px 40px 28px;text-align:center;border-bottom:1px solid rgba(201,168,124,0.15);">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#c9a87c;">Saint's Touch Photography</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:#e8ddd0;line-height:1.2;">
              Got your message, ${name.split(' ')[0]}
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;color:rgba(232,221,208,0.75);font-size:15px;line-height:1.7;">
              Thanks for reaching out. I'll review your inquiry and get back to you within 24–48 hours.
            </p>
            <p style="margin:0 0 32px;color:rgba(232,221,208,0.75);font-size:15px;line-height:1.7;">
              If you need a faster response, reach out directly on WhatsApp or Instagram:
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,168,124,0.15);padding:20px;margin-bottom:28px;">
              <tr>
                <td style="padding:8px 16px;color:rgba(232,221,208,0.5);font-size:13px;line-height:1.9;">
                  📱 WhatsApp: <a href="https://wa.me/16195096448" style="color:#c9a87c;">+1 (619) 509-6448</a><br/>
                  📸 Instagram: <a href="https://www.instagram.com/saintogsnaps" style="color:#c9a87c;">@saintogsnaps</a><br/>
                  🌐 <a href="https://saintstouch.photography" style="color:#c9a87c;">saintstouch.photography</a>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://saintstouch.photography/portfolio"
                     style="display:inline-block;padding:12px 28px;border:1px solid rgba(201,168,124,0.5);color:#c9a87c;font-size:11px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                    Browse the Portfolio
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(201,168,124,0.08);text-align:center;">
            <p style="margin:0;color:rgba(232,221,208,0.3);font-size:11px;line-height:1.6;">
              © 2026 Saint's Touch Photography · Clifford Roberts III · Virginia Beach, VA
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // Send both emails in parallel
    const [notifyRes, confirmRes] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [NOTIFY_EMAIL],
          subject: `📸 New inquiry from ${name} — ${serviceLabel}`,
          html: notifyHtml,
          reply_to: email,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [email],
          subject: `Got your message, ${name.split(' ')[0]} — Saint's Touch Photography`,
          html: confirmHtml,
          reply_to: NOTIFY_EMAIL,
        }),
      }),
    ]);

    if (!notifyRes.ok) {
      const err = await notifyRes.json();
      console.error('Notify email failed:', err);
      return new Response(JSON.stringify({ ok: false, error: 'Failed to send. Please try WhatsApp or Instagram.' }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true, message: 'Message sent! You\'ll hear back within 24–48 hours.' }), { status: 200, headers });

  } catch (err) {
    console.error('contact error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected error. Please try again.' }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
