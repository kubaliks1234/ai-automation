import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const BASE_URL = 'https://jakubkaczmarek.de';
const DEFAULT_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png';

// Statische Seiten-Metadaten
const STATIC_PAGES = {
  'about': {
    title: 'Über uns – KI-Automatisierung mit Jakub Kaczmarek',
    description: 'Erfahre mehr über Jakub Kaczmarek und seine Mission, Unternehmen mit KI-Automatisierung effizienter zu machen.',
    canonical: `${BASE_URL}/about`,
    noindex: false,
    h1: 'Über uns',
    body: '<p>Diese Plattform ist dein zentraler Anlaufpunkt rund um KI-Tools, Automatisierung und digitale Produktivität. Hier findest du praxisnahe Artikel, ehrliche Bewertungen und konkrete Anleitungen, mit denen du KI gewinnbringend in deinen Alltag oder dein Unternehmen integrieren kannst.</p><p>Hinter dieser Plattform steht <strong>Jakub Kaczmarek</strong>, KI-Stratege und Automatisierungsexperte aus Deutschland. Jakub begleitet Unternehmen dabei, Workflows zu automatisieren, Content-Prozesse zu skalieren und KI-Tools sinnvoll einzusetzen.</p>',
    schema: { "@context": "https://schema.org", "@type": "AboutPage", "name": "Über Jakub Kaczmarek", "url": `${BASE_URL}/about` }
  },
  'contact': {
    title: 'Kontakt – Jakub Kaczmarek',
    description: 'Nimm Kontakt auf mit Jakub Kaczmarek – per E-Mail, LinkedIn oder über einen Beratungstermin.',
    canonical: `${BASE_URL}/contact`,
    noindex: false,
    h1: 'Kontakt',
    body: '<p>Du hast eine Frage, möchtest eine Zusammenarbeit besprechen oder einfach Hallo sagen? Ich freue mich über deine Nachricht.</p><p><strong>E-Mail:</strong> hello@jakubkaczmarek.de</p><p><strong>LinkedIn:</strong> linkedin.com/in/jakubkaczmarek</p><p><strong>Kostenloses Erstgespräch:</strong> Buche direkt einen Termin für eine kostenlose KI-Analyse.</p>',
    schema: { "@context": "https://schema.org", "@type": "ContactPage", "name": "Kontakt – Jakub Kaczmarek", "url": `${BASE_URL}/contact` }
  },
  'Analyse': {
    title: 'Kostenlose KI-Analyse buchen | Jakub Kaczmarek',
    description: 'Buche jetzt deine kostenlose 30-minütige KI-Analyse. Ich zeige dir, welche Automationen in deinem Unternehmen sofort Wirkung zeigen.',
    keywords: 'Kostenlose KI Analyse, AI Beratung, Automatisierung Unternehmen, KI Erstgespräch',
    canonical: `${BASE_URL}/analyse`,
    noindex: false,
    h1: 'Kostenlose KI-Analyse buchen',
    body: '<p>Ich analysiere kostenlos, welche Automationen in deinem Unternehmen am meisten Sinn machen.</p><ul><li>30 Minuten</li><li>Google Meet</li><li>Kostenlos</li></ul>',
    schema: { "@context": "https://schema.org", "@type": "Service", "name": "Kostenlose KI-Analyse", "provider": { "@type": "Person", "name": "Jakub Kaczmarek" }, "areaServed": "DE" }
  },
  'Upsell': {
    title: 'AI Automation Starter Kurs – KI-Automationen lernen | Jakub Kaczmarek',
    description: 'Baue echte KI-Automationen für Marketing, Content und Leadgenerierung. Schritt-für-Schritt Videoanleitungen, fertige Templates und Tool-Stack.',
    canonical: `${BASE_URL}/upsell`,
    noindex: false,
    h1: 'Baue echte KI-Automationen – nicht nur Prompts',
    body: '<p>Du hast gerade gelernt, wie du mit KI Geld verdienen kannst. Jetzt zeige ich dir, wie du echte Automationen baust, die Marketing, Content und Leadgenerierung automatisieren.</p><ul><li>Keine Programmierkenntnisse nötig</li><li>Schritt-für-Schritt Videoanleitungen</li><li>Automationen die sofort einsetzbar sind</li></ul><p>Module: KI Automationen verstehen, Content Automation, Lead Generation Systeme, AI Workflow Automationen, AI Business Systeme.</p>',
    schema: { "@context": "https://schema.org", "@type": "Product", "name": "AI Automation Starter Kurs", "offers": { "@type": "Offer", "price": "47", "priceCurrency": "EUR" } }
  },
  // Admin / Legal → noindex
  'SeoOptimierung': { title: 'SEO-Optimierung (Admin)', description: '', canonical: '', noindex: true, h1: 'SEO-Optimierung', body: '' },
  'SeoAdmin': { title: 'SEO Admin', description: '', canonical: '', noindex: true, h1: 'SEO Admin', body: '' },
  'backlink-manager': { title: 'Backlink Manager', description: '', canonical: '', noindex: true, h1: 'Backlink Manager', body: '' },
  'sitemap-blog': { title: 'Sitemap', description: '', canonical: '', noindex: true, h1: 'Sitemap', body: '' },
  'Impressum': { title: 'Impressum', description: '', canonical: '', noindex: true, h1: 'Impressum', body: '' },
  'Datenschutz': { title: 'Datenschutz', description: '', canonical: '', noindex: true, h1: 'Datenschutz', body: '' },
};

// City Daten (aus cityData.jsx)
const CITIES = [
  { slug: "berlin", name: "Berlin", metaTitle: "KI Agentur Berlin – KI Automatisierung & AI Lösungen | Jakub Kaczmarek", metaDesc: "KI Agentur Berlin: Prozessautomatisierung, AI Chatbots & Marketing Automation für Berliner Unternehmen. Kostenlose KI-Analyse anfordern.", keywords: "KI Agentur Berlin, AI Agentur Berlin, KI Beratung Berlin, KI Automatisierung Berlin", description: "In der pulsierenden Startup-Metropole Berlin treffen Innovation und Technologie aufeinander. Als KI Agentur in Berlin helfen wir Unternehmen, Prozesse mit künstlicher Intelligenz zu automatisieren.", industries: ["Tech-Startups", "E-Commerce", "Medien", "Fintech"] },
  { slug: "hamburg", name: "Hamburg", metaTitle: "KI Agentur Hamburg – KI Automatisierung & AI Lösungen | Jakub Kaczmarek", metaDesc: "KI Agentur Hamburg: Automatisierung für Logistik, Handel & Medien. AI Chatbots, Marketing Automation & KI Beratung.", keywords: "KI Agentur Hamburg, AI Agentur Hamburg, KI Beratung Hamburg", description: "Als KI Agentur für Hamburg unterstützen wir Unternehmen in der Hansestadt dabei, durch Automatisierung effizienter zu arbeiten.", industries: ["Logistik", "Handel", "Medien", "Tourismus"] },
  { slug: "muenchen", name: "München", metaTitle: "KI Agentur München – KI Automatisierung & AI Lösungen Bayern | Jakub Kaczmarek", metaDesc: "KI Agentur München: Automatisierung für Automotive, IT & Finanzen. AI Chatbots, KI Prozessautomatisierung & Beratung.", keywords: "KI Agentur München, AI Agentur München, KI Beratung München", description: "Als KI Agentur für München begleiten wir bayerische Unternehmen auf dem Weg in die KI-gestützte Zukunft.", industries: ["Automotive", "IT", "Versicherungen", "Gesundheitswesen"] },
  { slug: "koeln", name: "Köln", metaTitle: "KI Agentur Köln – KI Automatisierung & AI Lösungen NRW | Jakub Kaczmarek", metaDesc: "KI Agentur Köln: Automatisierung für Medien, Handel & Kreativwirtschaft. AI Lösungen, Chatbots & Marketing Automation.", keywords: "KI Agentur Köln, AI Agentur Köln, KI Beratung Köln", description: "Als KI Agentur für Köln helfen wir Unternehmen im Rheinland, durch KI-Automatisierung schneller zu wachsen.", industries: ["Medien", "Kreativwirtschaft", "Handel", "Versicherungen"] },
  { slug: "frankfurt", name: "Frankfurt", metaTitle: "KI Agentur Frankfurt – KI Automatisierung für Finance & Business | Jakub Kaczmarek", metaDesc: "KI Agentur Frankfurt: KI Automatisierung für Banken, Beratung & Konzerne. AI Lösungen, Prozessautomatisierung & KI Beratung.", keywords: "KI Agentur Frankfurt, AI Agentur Frankfurt, KI Beratung Frankfurt", description: "Als KI Agentur für Frankfurt unterstützen wir Finanz- und Wirtschaftsunternehmen bei der KI-Automatisierung.", industries: ["Banking", "Beratung", "Immobilien", "Pharma"] },
  { slug: "stuttgart", name: "Stuttgart", metaTitle: "KI Agentur Stuttgart – KI Automatisierung für Industrie & Mittelstand | Jakub Kaczmarek", metaDesc: "KI Agentur Stuttgart: KI Lösungen für Automotive, Maschinenbau & Mittelstand. Prozessautomatisierung & AI Beratung.", keywords: "KI Agentur Stuttgart, AI Agentur Stuttgart, KI Beratung Stuttgart", description: "Als KI Agentur für Stuttgart unterstützen wir Unternehmen in der Automobilregion bei der KI-Automatisierung.", industries: ["Automotive", "Maschinenbau", "Engineering", "Software"] },
  { slug: "duesseldorf", name: "Düsseldorf", metaTitle: "KI Agentur Düsseldorf – KI Automatisierung & AI Lösungen NRW | Jakub Kaczmarek", metaDesc: "KI Agentur Düsseldorf: Automatisierung für Marketing, Handel & Beratung. AI Chatbots & Marketing Automation.", keywords: "KI Agentur Düsseldorf, AI Agentur Düsseldorf, KI Beratung Düsseldorf", description: "Als KI Agentur für Düsseldorf helfen wir Unternehmen mit maßgeschneiderten KI-Lösungen.", industries: ["Marketing", "Mode", "Beratung", "Handel"] },
  { slug: "leipzig", name: "Leipzig", metaTitle: "KI Agentur Leipzig – KI Automatisierung & AI Lösungen Sachsen | Jakub Kaczmarek", metaDesc: "KI Agentur Leipzig: KI Automatisierung für Startups, KMU & Kreativwirtschaft in Sachsen. AI Lösungen & Beratung.", keywords: "KI Agentur Leipzig, AI Agentur Leipzig, KI Beratung Leipzig", description: "Als KI Agentur für Leipzig unterstützen wir Unternehmen in Sachsen bei der smarten KI-Automatisierung.", industries: ["Kreativwirtschaft", "Handel", "Gesundheitswesen", "Startups"] },
];

// Service Daten (aus Service.jsx)
const SERVICES = {
  'ai-marketing': { title: 'AI Marketing Systeme', metaTitle: 'AI Marketing Systeme – Automatisierte Content-Maschinen | Jakub Kaczmarek', metaDescription: 'Automatisierte AI Marketing Systeme: Content-Erstellung, Verteilung und Performance-Analyse mit künstlicher Intelligenz.', description: 'AI Marketing Systeme automatisieren den gesamten Content-Prozess – von der Ideenfindung bis zur Veröffentlichung und Analyse.' },
  'lead-generation': { title: 'AI Lead Generation', metaTitle: 'AI Lead Generation – Automatisch neue Kunden finden | Jakub Kaczmarek', metaDescription: 'Mit AI Lead Generation automatisch qualifizierte Leads finden, ansprechen und Termine buchen. LinkedIn-Automationen und KI-Qualifizierung.', description: 'AI Lead Generation Systeme identifizieren automatisch potenzielle Kunden, sprechen sie an und qualifizieren Leads.' },
  'sales-automation': { title: 'AI Sales Automationen', metaTitle: 'AI Sales Automation – Vertrieb automatisieren | Jakub Kaczmarek', metaDescription: 'AI Sales Automationen: Automatische Follow-ups, CRM-Automationen und intelligente Lead-Qualifizierung für mehr Umsatz.', description: 'AI Sales Automationen übernehmen Follow-ups, CRM-Pflege und Qualifizierung für Ihren Vertrieb.' },
  'workflow-automation': { title: 'Workflow Automationen', metaTitle: 'Workflow Automation – Interne Prozesse automatisieren | Jakub Kaczmarek', metaDescription: 'Workflow Automationen: Dokumentenverarbeitung, Datenintegration und AI Assistenten für effizientere interne Abläufe.', description: 'Workflow Automationen mit AI übernehmen Routineaufgaben vollständig – von Dokumentenverarbeitung bis Datenintegration.' },
};

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildHtml({ title, description, keywords, canonical, noindex, h1, body, schema }) {
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
  const schemaJson = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : '';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ''}
  <meta name="robots" content="${robotsContent}" />
  <meta name="author" content="Jakub Kaczmarek" />
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  ${canonical ? `<meta property="og:url" content="${canonical}" />` : ''}
  <meta property="og:image" content="${DEFAULT_IMAGE}" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Jakub Kaczmarek – AI Automation" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${schemaJson}
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
      <a href="${BASE_URL}/">Startseite</a> |
      <a href="${BASE_URL}/blog">Blog</a> |
      <a href="${BASE_URL}/about">Über mich</a> |
      <a href="${BASE_URL}/contact">Kontakt</a> |
      <a href="${BASE_URL}/Analyse">Kostenlose KI-Analyse</a>
    </nav>
  </header>
  <main>
    <h1>${escapeHtml(h1)}</h1>
    ${body}
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} Jakub Kaczmarek – AI Automation | <a href="${BASE_URL}/">jakubkaczmarek.de</a></p>
  </footer>
</body>
</html>`;
}

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    let rawPath = url.searchParams.get('path') || '';
    let citySlug = url.searchParams.get('city');
    let serviceSlug = url.searchParams.get('service');

    // Fallback: read from POST body (used by test_backend_function)
    if (!rawPath && req.method === 'POST') {
      try {
        const body = await req.json();
        console.log('Body parsed:', JSON.stringify(body));
        if (body.path) rawPath = body.path;
        if (body.city) citySlug = body.city;
        if (body.service) serviceSlug = body.service;
      } catch (e) { console.log('Body parse error:', e.message); }
    }

    // Fallback: extract from pathname
    if (!rawPath) {
      const pn = url.pathname.replace(/^\//, '');
      if (pn && !pn.startsWith('functions')) {
        rawPath = pn;
      }
    }

    const path = decodeURIComponent(rawPath || '').replace(/\/$/, '');
    console.log('prerenderPage path:', path, '| city:', citySlug, '| service:', serviceSlug);

    // Redirect /Blog (uppercase) to /blog
    if (path === 'Blog') {
      return new Response(null, {
        status: 301,
        headers: { Location: `${BASE_URL}/blog` }
      });
    }
    // Redirect /Home to /
    if (path === 'Home') {
      return new Response(null, {
        status: 301,
        headers: { Location: `${BASE_URL}/` }
      });
    }
    // /BlogPost without slug → noindex placeholder
    if (path === 'BlogPost') {
      return new Response(buildHtml({
        title: 'BlogPost', description: '', canonical: '', noindex: true, h1: 'BlogPost', body: ''
      }), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    // KiAgentur with city param
    if (path === 'KiAgentur' && citySlug) {
      const city = CITIES.find(c => c.slug === citySlug);
      if (!city) {
        return new Response(buildHtml({
          title: 'Stadt nicht gefunden', description: '', canonical: '', noindex: true, h1: 'Stadt nicht gefunden', body: ''
        }), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' } });
      }
      const industriesList = city.industries.map(i => `<li>${escapeHtml(i)}</li>`).join('');
      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", "name": `KI Agentur ${city.name} – Jakub Kaczmarek`, "description": city.metaDesc, "url": `${BASE_URL}/ki-agentur-${city.slug}`, "areaServed": city.name, "serviceType": ["KI Automatisierung", "AI Chatbot", "Marketing Automation", "KI Beratung"], "address": { "@type": "PostalAddress", "addressCountry": "DE" } },
          { "@type": "FAQPage", "mainEntity": [
            { "@type": "Question", "name": `Was macht eine KI Agentur in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `Eine KI Agentur in ${city.name} hilft Unternehmen dabei, Geschäftsprozesse mit künstlicher Intelligenz zu automatisieren.` } },
            { "@type": "Question", "name": `Was kostet KI Automatisierung in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten hängen vom Umfang ab. Wir bieten eine kostenlose Erstanalyse an." } }
          ]}
        ]
      };
      return new Response(buildHtml({
        title: city.metaTitle,
        description: city.metaDesc,
        keywords: city.keywords,
        canonical: `${BASE_URL}/KiAgentur?city=${city.slug}`,
        noindex: false,
        h1: `KI Agentur ${city.name}`,
        body: `<p>${escapeHtml(city.description)}</p><h2>Branche in ${escapeHtml(city.name)}</h2><ul>${industriesList}</ul><p><a href="${BASE_URL}/Analyse">Kostenlose KI-Analyse anfragen</a></p>`,
        schema
      }), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Robots-Tag': 'index, follow'
        }
      });
    }

    // KiAgentur overview (no city param)
    if (path === 'KiAgentur') {
      const cityLinks = CITIES.map(c =>
        `<li><a href="${BASE_URL}/KiAgentur?city=${c.slug}">KI Agentur ${escapeHtml(c.name)}</a></li>`
      ).join('');
      const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "KI Agentur Deutschland – Jakub Kaczmarek",
        "provider": { "@type": "Person", "name": "Jakub Kaczmarek", "jobTitle": "KI-Automatisierungsexperte" },
        "areaServed": "DE",
        "url": `${BASE_URL}/ki-agentur`,
        "description": "KI-Automatisierung und AI-Lösungen für Unternehmen in ganz Deutschland.",
        "serviceType": ["KI Automatisierung", "AI Beratung", "Lead Generation", "Workflow Automatisierung"]
      };
      return new Response(buildHtml({
        title: 'KI Agentur Deutschland – KI Automatisierung für Unternehmen | Jakub Kaczmarek',
        description: 'KI Agentur für Unternehmen in ganz Deutschland. Berlin, Hamburg, München, Köln, Frankfurt und mehr. Maßgeschneiderte KI-Automatisierung & AI Lösungen.',
        keywords: 'KI Agentur Deutschland, AI Agentur, KI Beratung, KI Automatisierung, KI Lösungen',
        canonical: `${BASE_URL}/KiAgentur`,
        noindex: false,
        h1: 'KI Agentur Deutschland – AI Lösungen für jede Stadt',
        body: `<p>Wir helfen Unternehmen in ganz Deutschland, durch KI-Automatisierung Zeit zu sparen, Kosten zu senken und schneller zu wachsen. Wähle deine Stadt:</p><ul>${cityLinks}</ul>`,
        schema
      }), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'X-Robots-Tag': 'index, follow' }
      });
    }

    // Service with service param
    if (path === 'Service' && serviceSlug && SERVICES[serviceSlug]) {
      const service = SERVICES[serviceSlug];
      const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.metaDescription,
        "provider": { "@type": "Person", "name": "Jakub Kaczmarek", "url": BASE_URL },
        "areaServed": "DE",
        "inLanguage": "de"
      };
      return new Response(buildHtml({
        title: service.metaTitle,
        description: service.metaDescription,
        canonical: `${BASE_URL}/service?service=${serviceSlug}`,
        noindex: false,
        h1: service.title,
        body: `<p>${escapeHtml(service.description)}</p><p><a href="${BASE_URL}/Analyse">Kostenlose Analyse anfragen</a></p>`,
        schema
      }), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'X-Robots-Tag': 'index, follow' }
      });
    }

    // Service overview (no service param) → noindex
    if (path === 'Service') {
      return new Response(buildHtml({
        title: 'Services', description: '', canonical: '', noindex: true, h1: 'Services', body: ''
      }), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' } });
    }

    // Static pages from the map
    if (STATIC_PAGES[path]) {
      const page = STATIC_PAGES[path];
      return new Response(buildHtml({
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        canonical: page.canonical,
        noindex: page.noindex,
        h1: page.h1,
        body: page.body,
        schema: page.schema
      }), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Robots-Tag': page.noindex ? 'noindex, nofollow' : 'index, follow'
        }
      });
    }

    // Unknown page → 404 with noindex
    return new Response(buildHtml({
      title: 'Seite nicht gefunden – Jakub Kaczmarek',
      description: 'Die angeforderte Seite wurde nicht gefunden.',
      canonical: '',
      noindex: true,
      h1: 'Seite nicht gefunden',
      body: '<p>Die angeforderte Seite wurde nicht gefunden. <a href="' + BASE_URL + '/">Zur Startseite</a></p>'
    }), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' }
    });

  } catch (error) {
    console.error('prerenderPage error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});