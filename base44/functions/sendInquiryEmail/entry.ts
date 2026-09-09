import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const RECIPIENT = "jakub.kaczmarek669@gmail.com";

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { name, email, phone, message } = await req.json();

        if (!email || !name) {
            return Response.json({ error: 'Name und E-Mail sind erforderlich' }, { status: 400 });
        }

        const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

        const subject = `Neue Anfrage über jakubkaczmarek.de – ${name}`;

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 16px 16px 0 0; padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 22px; }
    .body { background: #111827; border: 1px solid #1f2937; border-top: none; border-radius: 0 0 16px 16px; padding: 30px; }
    .field { margin-bottom: 20px; }
    .label { color: #06b6d4; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { color: #e2e8f0; font-size: 16px; }
    .message-box { background: #0f172a; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; color: #cbd5e1; line-height: 1.6; }
    .footer { text-align: center; margin-top: 24px; color: #4b5563; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 Neue Anfrage eingegangen</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">E-Mail</div>
        <div class="value"><a href="mailto:${email}" style="color:#06b6d4;">${email}</a></div>
      </div>
      ${phone ? `<div class="field"><div class="label">Telefon</div><div class="value"><a href="tel:${phone}" style="color:#06b6d4;">${phone}</a></div></div>` : ''}
      ${message ? `<div class="field"><div class="label">Nachricht</div><div class="message-box">${message.replace(/\n/g, '<br>')}</div></div>` : ''}
    </div>
    <div class="footer">
      <p>Diese E-Mail wurde über das Anfrage-Formular auf jakubkaczmarek.de gesendet.</p>
    </div>
  </div>
</body>
</html>`;

        const rawEmail = [
            `To: ${RECIPIENT}`,
            `Reply-To: ${email}`,
            `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            '',
            htmlBody
        ].join('\r\n');

        const encodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw: encodedEmail }),
        });

        if (!gmailRes.ok) {
            const err = await gmailRes.text();
            return Response.json({ error: err }, { status: 500 });
        }

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});