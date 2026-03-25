import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, name, source } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await base44.asServiceRole.entities.NewsletterSubscriber.filter({ email });
    if (existing.length > 0) {
      if (existing[0].status === 'unsubscribed') {
        await base44.asServiceRole.entities.NewsletterSubscriber.update(existing[0].id, { status: 'active' });
        return Response.json({ success: true, message: 'Willkommen zurück! Du bist wieder angemeldet.' });
      }
      return Response.json({ success: true, message: 'Du bist bereits angemeldet!' });
    }

    await base44.asServiceRole.entities.NewsletterSubscriber.create({ email, name: name || '', status: 'active', source: source || 'blog' });

    // Send welcome email via Gmail
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    const welcomeHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:32px;border-radius:16px">
        <h2 style="color:#06b6d4">Willkommen beim KI-Newsletter! 🎉</h2>
        <p style="color:#9ca3af">Hey${name ? ' ' + name : ''},</p>
        <p style="color:#9ca3af">du erhältst ab sofort die neuesten Artikel über KI-Tools, Tutorials und Automatisierungen direkt in dein Postfach.</p>
        <p style="color:#9ca3af">Bis zum nächsten Artikel,<br><strong style="color:#fff">Jakub Kaczmarek</strong></p>
        <hr style="border:none;border-top:1px solid #1f2937;margin:24px 0">
        <p style="font-size:12px;color:#6b7280;text-align:center">
          <a href="https://jakubkaczmarek.base44.app/unsubscribe?email=${encodeURIComponent(email)}" style="color:#6b7280">Abmelden</a>
        </p>
      </div>`;

    const message = [
      `To: ${email}`,
      'Subject: Willkommen beim KI-Newsletter von Jakub Kaczmarek',
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      welcomeHtml
    ].join('\n');

    const encoded = btoa(unescape(encodeURIComponent(message)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw: encoded })
    });

    return Response.json({ success: true, message: 'Erfolgreich angemeldet! Schau in dein Postfach.' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});