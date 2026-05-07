/**
 * Cloudflare Pages Function: /api/guide-signup
 * Receives an email address, sends the Session Planning Guide via Resend.
 */

const GUIDE_URL = 'https://saintstouch.photography/session-planning-guide.html';
const FROM_EMAIL = 'hello@saintstouch.photography';
const FROM_NAME = "Saint's Touch Photography";

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email address.' }), { status: 400, headers });
    }

    const RESEND_API_KEY = env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ ok: false, error: 'Server configuration error.' }), { status: 500, headers });
    }

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Session Planning Guide</title>
</head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#080808;border-radius:4px;overflow:hidden;max-width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(201,168,124,0.15);">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#c9a87c;">Saint's Touch Photography</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;color:#e8ddd0;line-height:1.2;">Your Session Planning Guide<br/><em style="font-style:italic;color:#c9a87c;">is ready</em></h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;color:rgba(232,221,208,0.7);font-size:15px;line-height:1.7;">
                Hey there,
              </p>
              <p style="margin:0 0 16px;color:rgba(232,221,208,0.7);font-size:15px;line-height:1.7;">
                Your free <strong style="color:#e8ddd0;">Session Planning Guide</strong> is ready. It covers everything you need to prepare for a fine art portrait session — wardrobe, timing, what to bring, and what to expect on the day.
              </p>
              <p style="margin:0 0 32px;color:rgba(232,221,208,0.7);font-size:15px;line-height:1.7;">
                Click the button below to open it. You can also save it as a PDF directly from the page (hit "Save as PDF" in the top bar).
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${GUIDE_URL}" style="display:inline-block;padding:14px 36px;background:#c9a87c;color:#080808;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                      Open My Guide →
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid rgba(201,168,124,0.1);margin:36px 0;"/>

              <p style="margin:0 0 12px;color:rgba(232,221,208,0.5);font-size:13px;line-height:1.7;">
                When you're ready to book your session, reach out:
              </p>
              <p style="margin:0;color:rgba(232,221,208,0.5);font-size:13px;line-height:1.9;">
                📱 WhatsApp: <a href="https://wa.me/16195096448" style="color:#c9a87c;">+1 (619) 509-6448</a><br/>
                📸 Instagram: <a href="https://www.instagram.com/saintogsnaps" style="color:#c9a87c;">@saintogsnaps</a><br/>
                🌐 <a href="https://saintstouch.photography" style="color:#c9a87c;">saintstouch.photography</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(201,168,124,0.08);">
              <p style="margin:0;color:rgba(232,221,208,0.3);font-size:11px;line-height:1.6;">
                © 2026 Saint's Touch Photography · Clifford Roberts III · Virginia Beach, VA<br/>
                You're receiving this because you requested the free Session Planning Guide.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: "Your free Session Planning Guide is here ✨",
        html: emailHtml,
        reply_to: FROM_EMAIL,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend error:', resendData);
      // If domain not verified yet, fall back gracefully
      if (resendData?.name === 'validation_error' || resendData?.statusCode === 422) {
        return new Response(JSON.stringify({ ok: false, error: 'Email delivery temporarily unavailable. Please try again soon.', debug: resendData }), { status: 500, headers });
      }
      return new Response(JSON.stringify({ ok: false, error: 'Failed to send email.', debug: resendData }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true, message: 'Guide sent! Check your inbox.' }), { status: 200, headers });

  } catch (err) {
    console.error('guide-signup error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected error. Please try again.' }), { status: 500, headers });
  }
}

// Handle CORS preflight
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
