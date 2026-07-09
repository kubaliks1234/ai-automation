import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// SSR für die Blog-Index-Seite: Googlebot bekommt alle Artikel-Links als HTML.
// Normale User werden per JS zur SPA umgeleitet.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Alle veröffentlichten Posts laden
    const posts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-published_at',
      500
    );

    // HTML-Liste aller Artikel
    const postLinks = posts.map(p =>
      `<li><a href="https://jakubkaczmarek.de/blog/${p.slug}">${(p.h1 || p.title || p.slug).replace(/</g, '&lt;')}</a> <span>— ${p.category || ''}</span></li>`
    ).join('\n      ');

    // Kategorie-Links
    const categories = ['Marketing', 'Vertrieb', 'Produktivität', 'Content', 'Analyse', 'Automatisierung', 'Allgemein'];
    const categoryLinks = categories.map(c =>
      `<a href="https://jakubkaczmarek.de/blog?category=${encodeURIComponent(c)}">${c}</a>`
    ).join(' | ');

    // ItemList Schema für alle Posts
    const itemListSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "KI Tools Blog – Alle Artikel",
      "description": "Die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung. Ehrlich getestet und bewertet für Unternehmen.",
      "url": "https://jakubkaczmarek.de/blog",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": p.title,
        "url": `https://jakubkaczmarek.de/blog/${p.slug}`
      }))
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KI Tools Blog 2026 | Beste AI Tools für Unternehmen getestet | Jakub Kaczmarek</title>
  <meta name="description" content="Entdecke die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung. Ehrlich getestet und bewertet für Unternehmen. Über ${posts.length} AI Tools im Vergleich." />
  <meta name="keywords" content="KI Tools, AI Tools, KI Software Vergleich, beste KI Tools 2026, KI Tool Vergleich, kostenlose KI Tools, AI Software, Automatisierung Tools" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Jakub Kaczmarek" />
  <link rel="canonical" href="https://jakubkaczmarek.de/blog" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="KI Tools Blog 2026 | Beste AI Tools für Unternehmen" />
  <meta property="og:description" content="Die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung. Über ${posts.length} AI Tools im Vergleich." />
  <meta property="og:url" content="https://jakubkaczmarek.de/blog" />
  <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Jakub Kaczmarek – AI Automation" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="KI Tools Blog 2026 | Beste AI Tools für Unternehmen" />
  <meta name="twitter:description" content="Die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung." />

  <script type="application/ld+json">${itemListSchema}</script>
  <script>
    (function() {
      var ua = navigator.userAgent.toLowerCase();
      var isBot = ua.indexOf('googlebot') > -1 || ua.indexOf('bingbot') > -1 ||
                  ua.indexOf('bot') > -1 || ua.indexOf('crawler') > -1 ||
                  ua.indexOf('spider') > -1 || ua.indexOf('slurp') > -1 ||
                  ua.indexOf('duckduckbot') > -1 || ua.indexOf('baiduspider') > -1 ||
                  ua.indexOf('yandexbot') > -1 || ua.indexOf('facebookexternalhit') > -1 ||
                  ua.indexOf('twitterbot') > -1 || ua.indexOf('linkedinbot') > -1 ||
                  ua.indexOf('whatsapp') > -1 || ua.indexOf('telegrambot') > -1 ||
                  ua.indexOf('applebot') > -1 || ua.indexOf('bytespider') > -1;
      if (!isBot) {
        var url = new URL(window.location.href);
        url.searchParams.set('app', '1');
        window.location.replace(url.toString());
      }
    })();
  </script>
</head>
<body>
  <header>
    <nav>
      <a href="https://jakubkaczmarek.de/">Startseite</a> |
      <a href="https://jakubkaczmarek.de/blog">Blog</a> |
      <a href="https://jakubkaczmarek.de/about">Über mich</a> |
      <a href="https://jakubkaczmarek.de/contact">Kontakt</a>
    </nav>
  </header>

  <main>
    <h1>KI Tools Blog – Alle Artikel</h1>
    <p>Die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung. Über ${posts.length} Artikel, ehrlich getestet und bewertet für Unternehmen im DACH-Raum.</p>

    <h2>Alle Artikel (${posts.length})</h2>
    <ul>
      ${postLinks}
    </ul>

    <h2>Kategorien</h2>
    <nav>${categoryLinks}</nav>

    <p><a href="https://jakubkaczmarek.de/">Zurück zur Startseite</a></p>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} Jakub Kaczmarek – AI Automation | <a href="https://jakubkaczmarek.de/">jakubkaczmarek.de</a></p>
  </footer>
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
    console.error('prerenderBlogIndex error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});