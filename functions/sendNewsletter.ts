import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { subject, htmlBody, testEmail } = await req.json();

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    // Get all active subscribers (or just send to testEmail)
    const recipients = testEmail
      ? [testEmail]
      : (await base44.asServiceRole.entities.NewsletterSubscriber.filter({ status: 'active' })).map(s => s.email);

    if (recipients.length === 0) {
      return Response.json({ success: false, message: 'Keine Abonnenten gefunden.' });
    }

    let sent = 0;
    for (const to of recipients) {
      const unsubLink = `https://jakubkaczmarek.base44.app/unsubscribe?email=${encodeURIComponent(to)}`;
      const fullHtml = htmlBody + `<br><br><hr style="border:none;border-top:1px solid #333;margin:24px 0"><p style="font-size:12px;color:#888;text-align:center"><a href="${unsubLink}" style="color:#888">Abmelden</a></p>`;

      const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=utf-8',
        '',
        fullHtml
      ].join('\n');

      const encoded = btoa(unescape(encodeURIComponent(message)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: encoded })
      });
      sent++;
    }

    return Response.json({ success: true, sent, total: recipients.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});