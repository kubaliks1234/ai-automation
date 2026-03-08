import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email || session.metadata?.customer_email;

      console.log('Payment completed for:', email);

      if (email) {
        // Use service role to send email via SDK integration
        const base44 = createClientFromRequest(req);

        const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 40px; border-radius: 16px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #06b6d4; font-size: 28px; margin-bottom: 8px;">🎉 Dein KI Starter Bundle ist da!</h1>
    <p style="color: #94a3b8; font-size: 16px;">Vielen Dank für deinen Kauf. Hier sind deine Downloads:</p>
  </div>

  <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
    <h2 style="color: #fff; font-size: 18px; margin-bottom: 16px;">📦 Deine Downloads</h2>
    
    <div style="margin-bottom: 16px; padding: 16px; background: #0f172a; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h3 style="color: #06b6d4; margin: 0 0 8px 0;">📘 E-Book: Mit KI dein erstes Einkommen</h3>
      <p style="color: #94a3b8; margin: 0 0 12px 0;">Der komplette Leitfaden, wie du mit KI-Tools online Geld verdienst.</p>
      <a href="https://drive.google.com/drive/folders/PLACEHOLDER_EBOOK" style="display: inline-block; background: #06b6d4; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">📥 E-Book herunterladen</a>
    </div>

    <div style="margin-bottom: 16px; padding: 16px; background: #0f172a; border-radius: 8px; border-left: 4px solid #8b5cf6;">
      <h3 style="color: #8b5cf6; margin: 0 0 8px 0;">⚡ Prompt-Bibliothek (100+ Prompts)</h3>
      <p style="color: #94a3b8; margin: 0 0 12px 0;">Über 100 sofort einsetzbare ChatGPT-Prompts für dein Online Business.</p>
      <a href="https://drive.google.com/drive/folders/PLACEHOLDER_PROMPTS" style="display: inline-block; background: #8b5cf6; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">📥 Prompts herunterladen</a>
    </div>

    <div style="padding: 16px; background: #0f172a; border-radius: 8px; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin: 0 0 8px 0;">✅ Checklisten-Paket</h3>
      <p style="color: #94a3b8; margin: 0 0 12px 0;">Schritt-für-Schritt Checklisten für dein KI Business.</p>
      <a href="https://drive.google.com/drive/folders/PLACEHOLDER_CHECKLISTEN" style="display: inline-block; background: #10b981; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">📥 Checklisten herunterladen</a>
    </div>
  </div>

  <div style="background: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155; margin-bottom: 24px;">
    <p style="color: #94a3b8; margin: 0; font-size: 14px; text-align: center;">
      💡 <strong style="color: #fff;">Tipp:</strong> Speichere diese E-Mail, damit du jederzeit auf deine Downloads zugreifen kannst.
    </p>
  </div>

  <div style="text-align: center; color: #475569; font-size: 12px;">
    <p>© ${new Date().getFullYear()} Jakub Kaczmarek · KI Automation</p>
    <p>Du hast am ${new Date().toLocaleDateString('de-DE')} das KI Starter Bundle erworben.</p>
  </div>
</div>
        `;

        await base44.asServiceRole.integrations.Core.SendEmail({
          to: email,
          subject: '🎉 Dein KI Starter Bundle — Hier sind deine Downloads!',
          body: emailBody,
          from_name: 'Jakub Kaczmarek',
        });

        console.log('Confirmation email sent to:', email);
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});