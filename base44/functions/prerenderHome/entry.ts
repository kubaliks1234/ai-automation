import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// SSR für die Startseite: Googlebot bekommt vollständiges, gecrawlbares HTML.
// Normale User werden sofort per JS zur SPA umgeleitet.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Lade die 6 neuesten Blog-Posts für interne Links
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
          "@type": "Person",
          "@id": "https://jakubkaczmarek.de/#person",
          "name": "Jakub Kaczmarek",
          "url": "https://jakubkaczmarek.de/",
          "image": "https://media.base44.com/images/public/69a7f4930f0e951070ab8bb0/b2fa5f40c_md.jpeg",
          "jobTitle": "Marketing- und KI-Automation-Spezialist",
          "description": "Jakub Kaczmarek aus Nördlingen (Bayern) hilft Handwerksbetrieben in Donau-Ries, Augsburg und München mit dem Regional-Anfrage-System, planbar Kundenanfragen zu gewinnen. Nicht zu verwechseln mit dem polnischen Radrennfahrer gleichen Namens.",
          "knowsAbout": ["Meta Ads", "Google Ads", "Kundengewinnung Handwerk", "WhatsApp-Automatisierung", "n8n", "KI-Automatisierung", "Recruiting-Marketing"],
          "worksFor": { "@id": "https://jakubkaczmarek.de/#organization" },
          "address": { "@type": "PostalAddress", "addressLocality": "Nördlingen", "addressRegion": "Bayern", "postalCode": "86720", "addressCountry": "DE" },
          "sameAs": ["https://www.linkedin.com/in/jakub-kaczmarek"]
        },
        {
          "@type": ["ProfessionalService", "LocalBusiness"],
          "@id": "https://jakubkaczmarek.de/#organization",
          "name": "Jakub Kaczmarek – Regional-Anfrage-System",
          "alternateName": "Regional-Anfrage-System",
          "url": "https://jakubkaczmarek.de/",
          "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png",
          "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png",
          "description": "Kundengewinnung für Handwerksbetriebe: regionale Meta- und Google-Ads, vorqualifizierende Landingpage und automatische WhatsApp-Antwort in unter 60 Sekunden. Ein Betrieb pro Gewerk und Landkreis, keine Mindestlaufzeit, Anfragen-Garantie.",
          "founder": { "@id": "https://jakubkaczmarek.de/#person" },
          "email": "jakub.kaczmarek669@gmail.com",
          "telephone": "+4917643942729",
          "priceRange": "€€",
          "address": { "@type": "PostalAddress", "addressLocality": "Nördlingen", "addressRegion": "Bayern", "postalCode": "86720", "addressCountry": "DE" },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
            { "@type": "City", "name": "Nördlingen" },
            { "@type": "City", "name": "Donauwörth" },
            { "@type": "City", "name": "Augsburg" },
            { "@type": "City", "name": "München" }
          ],
          "knowsLanguage": ["de", "en", "pl"],
          "sameAs": ["https://www.linkedin.com/in/jakub-kaczmarek"]
        },
        {
          "@type": "WebSite",
          "@id": "https://jakubkaczmarek.de/#website",
          "url": "https://jakubkaczmarek.de/",
          "name": "Jakub Kaczmarek – Kundengewinnung für Handwerksbetriebe",
          "inLanguage": "de-DE",
          "publisher": { "@id": "https://jakubkaczmarek.de/#organization" }
        },
        {
          "@type": "FAQPage",
          "@id": "https://jakubkaczmarek.de/#faq",
          "url": "https://jakubkaczmarek.de/",
          "mainEntity": [
            { "@type": "Question", "name": "Was ist das Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Kundengewinnungs-System für Handwerksbetriebe aus drei Bausteinen: regionale Meta- und Google-Ads, eine vorqualifizierende Landingpage und eine automatische WhatsApp-Antwort in unter 60 Sekunden. Der Betrieb bekommt exklusive Anfragen unter seiner eigenen Marke, keine geteilten Portal-Leads." } },
            { "@type": "Question", "name": "Für welche Gewerke funktioniert das Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Trockenbau, Renovierung, Maler, Sanitär und Heizung, Elektro, Fliesenleger, Dachdecker und Bodenleger. Grundsätzlich jedes Gewerk, bei dem Privatkunden oder Gewerbekunden regional nach einem Betrieb suchen." } },
            { "@type": "Question", "name": "Was ist der Unterschied zu MyHammer, Blauarbeit oder Aroundhome?", "acceptedAnswer": { "@type": "Answer", "text": "Portale verkaufen dieselbe Anfrage an mehrere Betriebe, die dann um den Kunden konkurrieren. Beim Regional-Anfrage-System laufen Anzeigen und Landingpage unter der Marke des Betriebs. Jede Anfrage ist exklusiv, und die Kundendaten gehören dem Betrieb." } },
            { "@type": "Question", "name": "In welchen Regionen ist das Regional-Anfrage-System verfügbar?", "acceptedAnswer": { "@type": "Answer", "text": "Aktuell im Landkreis Donau-Ries (Nördlingen, Donauwörth und Umgebung), Augsburg und München. Pro Gewerk und Landkreis wird nur ein Betrieb betreut." } },
            { "@type": "Question", "name": "Gibt es eine Mindestlaufzeit?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Die Zusammenarbeit ist monatlich kündbar." } },
            { "@type": "Question", "name": "Welche Garantie gibt es?", "acceptedAnswer": { "@type": "Answer", "text": "10 qualifizierte Anfragen innerhalb von 60 Tagen. Wird das nicht erreicht, läuft die Betreuung ohne Retainer weiter, bis die Zahl erreicht ist." } },
            { "@type": "Question", "name": "Warum eine automatische WhatsApp-Antwort in unter 60 Sekunden?", "acceptedAnswer": { "@type": "Answer", "text": "Handwerker sind tagsüber auf der Baustelle und erreichen Anfragen nicht sofort. Interessenten, die keine Antwort bekommen, fragen beim nächsten Betrieb an. Die automatische WhatsApp-Antwort bestätigt die Anfrage sofort, stellt die wichtigsten Rückfragen und hält den Kunden, bis der Betrieb Zeit hat." } },
            { "@type": "Question", "name": "Was bedeutet „qualifizierte Anfrage\"?", "acceptedAnswer": { "@type": "Answer", "text": "Eine Anfrage aus dem definierten Einzugsgebiet, für das richtige Gewerk, mit konkretem Projekt und Kontaktdaten, bei der der Interessent die Vorqualifizierung auf der Landingpage durchlaufen hat. Preisvergleicher und Anfragen außerhalb der Region zählen nicht." } },
            { "@type": "Question", "name": "Wer steckt hinter dem Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Jakub Kaczmarek aus Nördlingen, Marketing- und KI-Automation-Spezialist mit über 7 Jahren Erfahrung in Performance-Marketing (Meta Ads, Google Ads) und Recruiting-Marketing für die Personaldienstleistung. Die WhatsApp-Automation ist eine Eigenentwicklung." } },
            { "@type": "Question", "name": "Wie hoch ist das Werbebudget?", "acceptedAnswer": { "@type": "Answer", "text": "Das Werbebudget zahlt der Betrieb direkt an Meta und Google, ohne Aufschlag. Die Höhe hängt von Gewerk und Region ab und wird im Erstgespräch festgelegt." } }
          ]
        }
      ]
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kundengewinnung für Handwerksbetriebe in Donau-Ries, Augsburg & München | Regional-Anfrage-System</title>
  <meta name="description" content="Das Regional-Anfrage-System bringt Handwerksbetrieben exklusive, vorqualifizierte Kundenanfragen: regionale Meta- & Google-Ads, Landingpage, WhatsApp-Antwort in unter 60 Sekunden. Ein Betrieb pro Gewerk und Landkreis. Garantie: 10 Anfragen in 60 Tagen." />
  <meta name="keywords" content="Regional-Anfrage-System, Kundengewinnung Handwerk, Anfragen Handwerk, Marketing Handwerksbetrieb, Google Ads Handwerker, Meta Ads Handwerk, Leads Trockenbau, Aufträge Sanierung, Donau-Ries, Donauwörth" />
  <meta name="author" content="Jakub Kaczmarek" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="https://jakubkaczmarek.de/" />

  <meta property="og:locale" content="de_DE" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Regional-Anfrage-System – Kundengewinnung für Handwerksbetriebe" />
  <meta property="og:description" content="Exklusive Kundenanfragen für Handwerker in Donau-Ries, Augsburg und München. Ein Betrieb pro Gewerk und Landkreis, keine Mindestlaufzeit." />
  <meta property="og:url" content="https://jakubkaczmarek.de/" />
  <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Jakub Kaczmarek – Regional-Anfrage-System" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Regional-Anfrage-System – Kundengewinnung für Handwerksbetriebe" />
  <meta name="twitter:description" content="Exklusive Kundenanfragen für Handwerker in Donau-Ries, Augsburg und München. Ein Betrieb pro Gewerk und Landkreis, keine Mindestlaufzeit." />
  <meta name="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta name="twitter:creator" content="@jakubkaczmarek" />

  <script type="application/ld+json">${structuredData}</script>
</head>
<body>
  <header>
    <nav>
      <a href="https://jakubkaczmarek.de/#mechanismus">So funktioniert's</a> |
      <a href="https://jakubkaczmarek.de/#about">Wer steckt dahinter</a> |
      <a href="https://jakubkaczmarek.de/handwerker">Regional-Anfrage-System</a> |
      <a href="https://jakubkaczmarek.de/blog">Blog</a>
    </nav>
  </header>

  <main>
    <p><strong>Für Handwerksbetriebe in Donau-Ries, Augsburg und München</strong></p>
    <h1>Kundengewinnung für Handwerksbetriebe in Donau-Ries, Augsburg und München</h1>
    <p>Das Regional-Anfrage-System bringt dir exklusive, vorqualifizierte Anfragen – ohne Portale, ohne geteilte Leads, ohne Mindestlaufzeit.</p>
    <p>Das Regional-Anfrage-System ist ein Kundengewinnungs-System für Handwerksbetriebe im Landkreis Donau-Ries, in Augsburg und München. Es kombiniert regionale Werbeanzeigen auf Meta und Google mit einer vorqualifizierenden Landingpage und einer automatischen WhatsApp-Antwort in unter 60 Sekunden. Pro Gewerk und Landkreis wird nur ein Betrieb betreut. Es gibt keine Mindestlaufzeit und eine Garantie von 10 qualifizierten Anfragen in 60 Tagen.</p>

    <h2>Warum verlieren Handwerker Anfragen, obwohl sie ausgebucht sind?</h2>
    <p>Weil die Anfrage kommt, wenn du auf der Baustelle bist. Der Interessent schreibt drei Betriebe an. Wer zuerst antwortet, bekommt den Termin. Bis du abends zurückrufst, ist der Auftrag vergeben.</p>
    <p>Das Regional-Anfrage-System löst genau das: Jeder Interessent bekommt in unter 60 Sekunden eine WhatsApp-Antwort mit Bestätigung und den wichtigsten Rückfragen. Du meldest dich, wenn du Zeit hast – der Kunde ist bis dahin gehalten.</p>

    <h2>Wie funktioniert das Regional-Anfrage-System?</h2>
    <h3>1. Regionale Anzeigen auf Meta und Google</h3>
    <p>Anzeigen laufen nur in deinem Einzugsgebiet, für dein Gewerk, unter deinem Firmennamen. Das Werbebudget zahlst du direkt an Meta und Google – ohne Aufschlag.</p>
    <h3>2. Vorqualifizierende Landingpage</h3>
    <p>Bevor jemand deine Nummer bekommt, beantwortet er drei bis fünf Fragen: Was für ein Projekt, wo, wann. Preisvergleicher, falsches Gewerk und Anfragen von außerhalb werden aussortiert, bevor sie dich Zeit kosten.</p>
    <h3>3. Automatische WhatsApp-Antwort</h3>
    <p>Jede Anfrage wird in unter 60 Sekunden beantwortet. Die Automation ist eine Eigenentwicklung, kein gemietetes Fremdtool.</p>

    <h2>Was unterscheidet das von MyHammer, Blauarbeit oder Aroundhome?</h2>
    <table border="1" cellpadding="6">
      <thead><tr><th></th><th>Portale</th><th>Regional-Anfrage-System</th></tr></thead>
      <tbody>
        <tr><td>Anfrage geht an</td><td>3–5 Betriebe gleichzeitig</td><td>nur dich</td></tr>
        <tr><td>Läuft unter</td><td>Marke des Portals</td><td>deiner Marke</td></tr>
        <tr><td>Kundendaten gehören</td><td>dem Portal</td><td>dir</td></tr>
        <tr><td>Exklusivität in deiner Region</td><td>keine</td><td>ein Betrieb pro Gewerk und Landkreis</td></tr>
        <tr><td>Antwortzeit</td><td>wenn du Zeit hast</td><td>unter 60 Sekunden, automatisch</td></tr>
        <tr><td>Laufzeit</td><td>Jahresverträge üblich</td><td>keine Mindestlaufzeit</td></tr>
      </tbody>
    </table>

    <h2>Für welche Gewerke?</h2>
    <p>Trockenbau · Renovierung und Sanierung · Maler und Lackierer · Sanitär, Heizung, Klima · Elektro · Fliesenleger · Dachdecker · Bodenleger</p>
    <p>Betriebe mit 1 bis 25 Mitarbeitern, die planbare Anfragen wollen statt Abhängigkeit von Empfehlungen oder Portalen.</p>

    <h2>Was kostet das und welche Garantie gibt es?</h2>
    <ul>
      <li><strong>Keine Mindestlaufzeit</strong> – monatlich kündbar</li>
      <li><strong>Exklusivität</strong> – ein Betrieb pro Gewerk und Landkreis; ist dein Gewerk in deinem Landkreis vergeben, kann ich dich nicht aufnehmen</li>
      <li><strong>Garantie</strong> – 10 qualifizierte Anfragen in 60 Tagen. Wird das nicht erreicht, arbeite ich ohne Retainer weiter, bis es erreicht ist</li>
      <li><strong>Werbebudget</strong> – geht direkt an Meta/Google, ohne Aufschlag; Höhe wird im Erstgespräch nach Gewerk und Region festgelegt</li>
    </ul>
    <p>Aktuell suche ich die ersten drei Betriebe im Landkreis Donau-Ries zu Startkonditionen.</p>

    <h2>Wer steckt dahinter?</h2>
    <p>Ich bin Jakub Kaczmarek, Marketing- und KI-Automation-Spezialist aus Nördlingen. Seit über sieben Jahren mache ich Performance-Marketing (Meta Ads, Google Ads) für die Personaldienstleistung – mehrsprachig, in mehreren europäischen Märkten, mit messbaren Kosten pro Anfrage. Die Automationen dahinter baue ich selbst (n8n, Claude API, WhatsApp Business API).</p>
    <p>Das Regional-Anfrage-System ist die Übertragung dieser Systeme auf Handwerksbetriebe in meiner Region.</p>

    <h2>Häufige Fragen</h2>
    <h3>Was ist das Regional-Anfrage-System?</h3>
    <p>Ein Kundengewinnungs-System für Handwerksbetriebe aus drei Bausteinen: regionale Meta- und Google-Ads, eine vorqualifizierende Landingpage und eine automatische WhatsApp-Antwort in unter 60 Sekunden. Der Betrieb bekommt exklusive Anfragen unter seiner eigenen Marke, keine geteilten Portal-Leads.</p>
    <h3>Für welche Gewerke funktioniert das Regional-Anfrage-System?</h3>
    <p>Trockenbau, Renovierung, Maler, Sanitär und Heizung, Elektro, Fliesenleger, Dachdecker und Bodenleger. Grundsätzlich jedes Gewerk, bei dem Privatkunden oder Gewerbekunden regional nach einem Betrieb suchen.</p>
    <h3>Was ist der Unterschied zu MyHammer, Blauarbeit oder Aroundhome?</h3>
    <p>Portale verkaufen dieselbe Anfrage an mehrere Betriebe, die dann um den Kunden konkurrieren. Beim Regional-Anfrage-System laufen Anzeigen und Landingpage unter der Marke des Betriebs. Jede Anfrage ist exklusiv, und die Kundendaten gehören dem Betrieb.</p>
    <h3>In welchen Regionen ist das Regional-Anfrage-System verfügbar?</h3>
    <p>Aktuell im Landkreis Donau-Ries (Nördlingen, Donauwörth und Umgebung), Augsburg und München. Pro Gewerk und Landkreis wird nur ein Betrieb betreut.</p>
    <h3>Gibt es eine Mindestlaufzeit?</h3>
    <p>Nein. Die Zusammenarbeit ist monatlich kündbar.</p>
    <h3>Welche Garantie gibt es?</h3>
    <p>10 qualifizierte Anfragen innerhalb von 60 Tagen. Wird das nicht erreicht, läuft die Betreuung ohne Retainer weiter, bis die Zahl erreicht ist.</p>
    <h3>Warum eine automatische WhatsApp-Antwort in unter 60 Sekunden?</h3>
    <p>Handwerker sind tagsüber auf der Baustelle und erreichen Anfragen nicht sofort. Interessenten, die keine Antwort bekommen, fragen beim nächsten Betrieb an. Die automatische WhatsApp-Antwort bestätigt die Anfrage sofort, stellt die wichtigsten Rückfragen und hält den Kunden, bis der Betrieb Zeit hat.</p>
    <h3>Was bedeutet „qualifizierte Anfrage"?</h3>
    <p>Eine Anfrage aus dem definierten Einzugsgebiet, für das richtige Gewerk, mit konkretem Projekt und Kontaktdaten, bei der der Interessent die Vorqualifizierung auf der Landingpage durchlaufen hat. Preisvergleicher und Anfragen außerhalb der Region zählen nicht.</p>
    <h3>Wer steckt hinter dem Regional-Anfrage-System?</h3>
    <p>Jakub Kaczmarek aus Nördlingen, Marketing- und KI-Automation-Spezialist mit über 7 Jahren Erfahrung in Performance-Marketing (Meta Ads, Google Ads) und Recruiting-Marketing für die Personaldienstleistung. Die WhatsApp-Automation ist eine Eigenentwicklung.</p>
    <h3>Wie hoch ist das Werbebudget?</h3>
    <p>Das Werbebudget zahlt der Betrieb direkt an Meta und Google, ohne Aufschlag. Die Höhe hängt von Gewerk und Region ab und wird im Erstgespräch festgelegt.</p>

    <h2>Ist dein Gewerk in deinem Landkreis noch frei?</h2>
    <p>Schreib mir kurz Gewerk und Ort. Ich sage dir innerhalb eines Werktags, ob der Platz frei ist und was realistisch drin ist.</p>
    <p><a href="https://wa.me/4917643942729">Verfügbarkeit prüfen – WhatsApp</a> | <a href="mailto:jakub.kaczmarek669@gmail.com">E-Mail</a></p>

    <h2>Kontakt & Standort</h2>
    <address>
      <strong>Jakub Kaczmarek</strong><br />
      Nördlingen, Landkreis Donau-Ries, Bayern, Deutschland<br />
      Telefon: <a href="tel:+4917643942729">+49 176 43942729</a><br />
      E-Mail: <a href="mailto:jakub.kaczmarek669@gmail.com">jakub.kaczmarek669@gmail.com</a>
    </address>

    <section>
      <h2>Aktuelle Blogartikel</h2>
      <ul>
        ${postLinks}
      </ul>
      <p><a href="https://jakubkaczmarek.de/blog">Alle Artikel im Blog ansehen →</a></p>
    </section>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} Jakub Kaczmarek | <a href="https://jakubkaczmarek.de/">jakubkaczmarek.de</a> | Regional-Anfrage-System für Handwerksbetriebe</p>
    <p><a href="https://jakubkaczmarek.de/Impressum">Impressum</a> | <a href="https://jakubkaczmarek.de/Datenschutz">Datenschutz</a></p>
  </footer>

  <!-- Redirect humans to full SPA, let bots read this page -->
  <script>
    (function() {
      var ua = navigator.userAgent.toLowerCase();
      var bots = ['googlebot','bingbot','slurp','duckduckbot','baiduspider','yandexbot','sogou','exabot','facebot','ia_archiver','bot','crawler','spider'];
      var isBot = bots.some(function(b) { return ua.indexOf(b) > -1; });
      if (!isBot) {
        var url = new URL(window.location.href);
        url.searchParams.set('app', '1');
        window.location.replace(url.toString());
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