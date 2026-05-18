import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// SSR für die Startseite: Googlebot bekommt vollständiges, gecrawlbares HTML.
// Normale User werden sofort per JS zur SPA umgeleitet.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Lade die 6 neuesten Blog-Posts für interne Links / Erwähnung
    const recentPosts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-published_at',
      6
    );

    const postLinks = recentPosts.map(p =>
      `<li><a href="https://jakubkaczmarek.de/blog/${p.slug}">${p.h1 || p.title || p.slug}</a></li>`
    ).join('\n');

    const structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://jakubkaczmarek.de/#business",
          "name": "Jakub Kaczmarek – AI Automation",
          "description": "KI-Automatisierung und digitale Systeme für Unternehmen im DACH-Raum. Spare Zeit, generiere mehr Leads und steigere deinen Umsatz mit maßgeschneiderten AI-Workflows.",
          "url": "https://jakubkaczmarek.de",
          "telephone": "+4917643942729",
          "email": "jakub.kaczmarek669@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sebastian-Frank-Str. 11",
            "addressLocality": "Donauwörth",
            "postalCode": "86609",
            "addressCountry": "DE"
          },
          "areaServed": ["DE", "AT", "CH"],
          "priceRange": "$$",
          "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png",
          "sameAs": ["https://github.com/kubaliks1234"],
          "founder": { "@type": "Person", "name": "Jakub Kaczmarek" },
          "serviceType": ["KI Automatisierung", "AI Marketing", "Lead Generation", "Sales Automation", "Workflow Automatisierung", "n8n Automatisierung"]
        },
        {
          "@type": "Person",
          "@id": "https://jakubkaczmarek.de/#person",
          "name": "Jakub Kaczmarek",
          "jobTitle": "KI-Automatisierungsexperte",
          "url": "https://jakubkaczmarek.de",
          "knowsAbout": ["KI Automatisierung", "AI Automation", "Lead Generation", "n8n", "Marketing Automatisierung", "Sales Automation"]
        },
        {
          "@type": "WebSite",
          "@id": "https://jakubkaczmarek.de/#website",
          "url": "https://jakubkaczmarek.de",
          "name": "Jakub Kaczmarek – AI Automation",
          "inLanguage": "de-DE"
        }
      ]
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KI Automatisierung für Unternehmen | Jakub Kaczmarek – AI Experte DACH</title>
  <meta name="description" content="Jakub Kaczmarek – KI-Automatisierung und digitale Systeme für Unternehmen. Spare Zeit, generiere mehr Leads und steigere deinen Umsatz mit maßgeschneiderten AI-Workflows." />
  <meta name="keywords" content="KI Automatisierung, AI Automation, Workflow Automatisierung, Lead Generation, Sales Automation, Marketing Automatisierung, KI Agentur Deutschland, KI Beratung, Donauwörth, Bayern, KI Experte, künstliche Intelligenz Unternehmen" />
  <meta name="author" content="Jakub Kaczmarek" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://jakubkaczmarek.de/" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="KI Automatisierung für Unternehmen | Jakub Kaczmarek" />
  <meta property="og:description" content="KI-Automatisierung und digitale Systeme für Unternehmen im DACH-Raum. Spare Zeit, generiere mehr Leads und steigere deinen Umsatz." />
  <meta property="og:url" content="https://jakubkaczmarek.de/" />
  <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Jakub Kaczmarek – AI Automation" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="KI Automatisierung für Unternehmen | Jakub Kaczmarek" />
  <meta name="twitter:description" content="KI-Automatisierung und digitale Systeme für Unternehmen im DACH-Raum." />
  <meta name="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta name="twitter:creator" content="@jakubkaczmarek" />

  <script type="application/ld+json">${structuredData}</script>
</head>
<body>
  <header>
    <nav>
      <a href="https://jakubkaczmarek.de/">Startseite</a> |
      <a href="https://jakubkaczmarek.de/Blog">Blog</a> |
      <a href="https://jakubkaczmarek.de/about">Über mich</a> |
      <a href="https://jakubkaczmarek.de/contact">Kontakt</a>
    </nav>
  </header>

  <main>
    <h1>KI Automatisierung für Unternehmen – Jakub Kaczmarek</h1>
    <p>Jakub Kaczmarek ist KI-Automatisierungsexperte im DACH-Raum (Deutschland, Österreich, Schweiz) mit Sitz in Donauwörth, Bayern. Er entwickelt maßgeschneiderte AI-Workflows, die Unternehmen Zeit sparen, mehr Leads generieren und den Umsatz steigern.</p>

    <h2>KI-Automatisierung für dein Unternehmen</h2>
    <p>Mit modernen Tools wie n8n, Make und individuellen AI-Integrationen automatisiert Jakub Kaczmarek Geschäftsprozesse in Marketing, Vertrieb, HR und mehr. Über 50 Unternehmen im DACH-Raum vertrauen bereits auf seine Lösungen.</p>

    <h2>Leistungen</h2>
    <ul>
      <li><strong>Workflow Automatisierung</strong> – Wiederholende Prozesse mit KI automatisieren und Ressourcen sparen.</li>
      <li><strong>Lead Generation</strong> – Automatisierte Systeme zur Leadgenerierung und Qualifizierung.</li>
      <li><strong>Marketing Automatisierung</strong> – KI-gestützte Content-Pipelines und Kampagnen-Automatisierung.</li>
      <li><strong>Sales Automation</strong> – CRM-Integration, Follow-up-Sequenzen und Vertriebs-Workflows.</li>
      <li><strong>n8n Automatisierung</strong> – Individuelle n8n-Setups für den deutschen Markt.</li>
      <li><strong>KI Beratung</strong> – Strategische Beratung für den Einsatz von KI im Unternehmen.</li>
    </ul>

    <h2>Warum Jakub Kaczmarek?</h2>
    <p>Als spezialisierter KI-Automatisierungsexperte für den DACH-Markt kombiniert Jakub technisches Know-how mit einem tiefen Verständnis für deutsche Geschäftsprozesse und DSGVO-Anforderungen. Jede Lösung wird individuell entwickelt – kein Copy-Paste, sondern maßgeschneiderte Automatisierung.</p>

    <h2>Kontakt & Standort</h2>
    <address>
      <strong>Jakub Kaczmarek – AI Automation</strong><br />
      Sebastian-Frank-Str. 11<br />
      86609 Donauwörth, Bayern, Deutschland<br />
      Telefon: <a href="tel:+4917643942729">+49 176 43942729</a><br />
      E-Mail: <a href="mailto:jakub.kaczmarek669@gmail.com">jakub.kaczmarek669@gmail.com</a>
    </address>

    <section>
      <h2>Aktuelle Blogartikel über KI-Automatisierung</h2>
      <ul>
        ${postLinks}
      </ul>
      <p><a href="https://jakubkaczmarek.de/Blog">Alle Artikel im KI-Blog ansehen →</a></p>
    </section>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} Jakub Kaczmarek – AI Automation | <a href="https://jakubkaczmarek.de/">jakubkaczmarek.de</a> | KI Automatisierung, Donauwörth, Bayern, Deutschland</p>
    <p><a href="https://jakubkaczmarek.de/Impressum">Impressum</a> | <a href="https://jakubkaczmarek.de/Datenschutz">Datenschutz</a></p>
  </footer>

  <!-- Redirect humans to full SPA, let bots read this page -->
  <script>
    (function() {
      var ua = navigator.userAgent.toLowerCase();
      var bots = ['googlebot','bingbot','slurp','duckduckbot','baiduspider','yandexbot','sogou','exabot','facebot','ia_archiver','bot','crawler','spider'];
      var isBot = bots.some(function(b) { return ua.indexOf(b) > -1; });
      if (!isBot) {
        window.location.replace('https://jakubkaczmarek.de/');
      }
    })();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'index, follow',
      }
    });

  } catch (error) {
    console.error('prerenderHome error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});