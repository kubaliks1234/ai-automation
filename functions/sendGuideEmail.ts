import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const GUIDE_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/7d20b6d5f_KI_Automationen_Guidepdf.pdf";

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { email, name } = await req.json();

        if (!email) {
            return Response.json({ error: 'E-Mail fehlt' }, { status: 400 });
        }

        const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

        const greeting = name ? `Hi ${name},` : 'Hi,';

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 16px 16px 0 0; padding: 40px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; }
    .body { background: #111827; border: 1px solid #1f2937; border-top: none; border-radius: 0 0 16px 16px; padding: 40px; }
    .download-btn { display: block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; text-align: center; font-weight: bold; font-size: 16px; margin: 24px 0; }
    .feature-list { list-style: none; padding: 0; margin: 20px 0; }
    .feature-list li { padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #1f2937; }
    .feature-list li::before { content: "✓ "; color: #06b6d4; font-weight: bold; }
    .divider { border: none; border-top: 1px solid #1f2937; margin: 32px 0; }
    .tip-box { background: #0f172a; border: 1px solid #1f2937; border-left: 4px solid #06b6d4; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .cta-btn { display: block; background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; text-align: center; font-weight: bold; font-size: 16px; margin: 24px 0; }
    .footer { text-align: center; margin-top: 32px; color: #4b5563; font-size: 12px; }
    .signature { color: #e2e8f0; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 10 AI Automationen für Unternehmen</h1>
      <p>Dein kostenloser Guide ist bereit</p>
    </div>
    <div class="body">
      <p>${greeting}</p>
      <p>danke für dein Interesse an <strong>„10 AI Automationen für Unternehmen"</strong>.</p>
      <p>Hier kannst du den Guide herunterladen:</p>

      <a href="${GUIDE_URL}" class="download-btn">👉 Download Guide</a>

      <p>In diesem Guide zeige ich dir Automationen, die Unternehmen sofort einsetzen können, um:</p>

      <ul class="feature-list">
        <li>Marketingprozesse zu automatisieren</li>
        <li>Leads automatisch zu generieren</li>
        <li>wiederkehrende Aufgaben durch KI erledigen zu lassen</li>
        <li>Zeit zu sparen und schneller zu wachsen</li>
      </ul>

      <p style="color: #94a3b8;">Viele Unternehmen nutzen KI aktuell nur für Texte oder Bilder.</p>
      <p>Der echte Hebel entsteht aber erst, wenn <strong>ganze Prozesse automatisiert werden</strong>.</p>
      <p>Genau darum geht es in diesem Guide.</p>

      <hr class="divider" />

      <div class="tip-box">
        <p style="color: #06b6d4; font-weight: bold; margin-top: 0;">💡 Mein Tipp für dich:</p>
        <p style="margin: 0; color: #94a3b8;">Während du den Guide liest, frage dich bei jedem Beispiel:<br><br>
        <em>„Welcher Prozess in meinem Unternehmen könnte genauso automatisiert werden?"</em><br><br>
        Oft reicht <strong>eine einzige Automation</strong>, um jeden Monat viele Stunden Arbeit zu sparen.</p>
      </div>

      <hr class="divider" />

      <p>Wenn du möchtest, analysiere ich gerne kostenlos, welche Automationen in deinem Unternehmen am meisten Sinn machen.</p>

      <a href="https://jakubkaczmarek.de/ki-analyse" class="cta-btn">👉 Kostenlose KI Analyse buchen</a>

      <p>Ich freue mich auf dein Feedback zum Guide.</p>

      <div class="signature">
        <p>Jakub<br>
        <span style="color: #4b5563;">KI Automation Agency</span></p>
      </div>
    </div>
    <div class="footer">
      <p>Du erhältst diese E-Mail, weil du den Guide angefordert hast.<br>
      <a href="#" style="color: #4b5563;">Abmelden</a></p>
    </div>
  </div>
</body>
</html>`;

        const rawEmail = [
            `To: ${email}`,
            `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent('🚀 Dein Guide: 10 AI Automationen für Unternehmen')))}?=`,
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

        // Also store as newsletter subscriber
        try {
            await base44.asServiceRole.entities.NewsletterSubscriber.create({
                email,
                name: name || '',
                status: 'active',
                source: 'guide-download'
            });
        } catch (e) {
            // ignore duplicate subscriber errors
        }

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});