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
          "@type": "ProfessionalService",
          "@id": "https://jakubkaczmarek.de/#business",
          "name": "Jakub Kaczmarek – Anfragen für Handwerksbetriebe",
          "description": "Planbar qualifizierte Anfragen für Handwerks- und Ausbaubetriebe in der Region Donau-Ries, Augsburg und München.",
          "url": "https://jakubkaczmarek.de",
          "email": "jakub.kaczmarek669@gmail.com",
          "telephone": "+4917643942729",
          "image": "https://media.base44.com/images/public/69a7f4930f0e951070ab8bb0/b2fa5f40c_md.jpeg",
          "founder": { "@id": "https://jakubkaczmarek.de/#person" },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sebastian-Frank-Str. 11",
            "postalCode": "86609",
            "addressLocality": "Donauwörth",
            "addressRegion": "Bayern",
            "addressCountry": "DE"
          },
          "geo": { "@type": "GeoCoordinates", "latitude": 48.7186, "longitude": 10.7772 },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
            { "@type": "City", "name": "Donauwörth" },
            { "@type": "City", "name": "Nördlingen" },
            { "@type": "City", "name": "Augsburg" },
            { "@type": "City", "name": "München" }
          ],
          "knowsAbout": [
            "Kundengewinnung Handwerk", "Meta Ads Handwerksbetriebe",
            "Google Ads Handwerk", "Lead-Automatisierung", "Speed to Lead"
          ],
          "priceRange": "€€"
        },
        {
          "@type": "Person",
          "@id": "https://jakubkaczmarek.de/#person",
          "name": "Jakub Kaczmarek",
          "jobTitle": "Spezialist für Kundengewinnung im Handwerk",
          "worksFor": { "@id": "https://jakubkaczmarek.de/#business" },
          "knowsLanguage": ["de", "pl", "en"],
          "url": "https://jakubkaczmarek.de/ueber-mich",
          "sameAs": ["https://github.com/kubaliks1234"]
        },
        {
          "@type": "WebSite",
          "@id": "https://jakubkaczmarek.de/#website",
          "url": "https://jakubkaczmarek.de",
          "name": "Jakub Kaczmarek",
          "inLanguage": "de-DE"
        }
      ]
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mehr Anfragen für Handwerksbetriebe in Donau-Ries | Jakub Kaczmarek</title>
  <meta name="description" content="Planbar qualifizierte Anfragen für Handwerksbetriebe in Donau-Ries. Jede Anfrage in unter 60 Sekunden beantwortet. Kostenloser Anfragen-Check in 20 Minuten." />
  <meta name="keywords" content="Anfragen Handwerk, Kundengewinnung Handwerk, Marketing Handwerksbetrieb, Google Ads Handwerker, Meta Ads Handwerk, Leads Trockenbau, Aufträge Sanierung, Donau-Ries, Donauwörth" />
  <meta name="author" content="Jakub Kaczmarek" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://jakubkaczmarek.de/" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Mehr Anfragen für Handwerksbetriebe in Donau-Ries" />
  <meta property="og:description" content="Planbar qualifizierte Anfragen für Handwerksbetriebe in Donau-Ries. Jede Anfrage in unter 60 Sekunden beantwortet. Kostenloser Anfragen-Check in 20 Minuten." />
  <meta property="og:url" content="https://jakubkaczmarek.de/" />
  <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Jakub Kaczmarek – Anfragen für Handwerksbetriebe" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Jakub Kaczmarek" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mehr Anfragen für Handwerksbetriebe in Donau-Ries" />
  <meta name="twitter:description" content="Planbar qualifizierte Anfragen für Handwerksbetriebe in Donau-Ries. Jede Anfrage in unter 60 Sekunden beantwortet." />
  <meta name="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png" />
  <meta name="twitter:creator" content="@jakubkaczmarek" />

  <script type="application/ld+json">${structuredData}</script>
</head>
<body>
  <header>
    <nav>
      <a href="https://jakubkaczmarek.de/#mechanismus">So funktioniert's</a> |
      <a href="https://jakubkaczmarek.de/#ergebnisse">Ergebnisse</a> |
      <a href="https://jakubkaczmarek.de/#about">Über mich</a> |
      <a href="https://jakubkaczmarek.de/blog">Blog</a>
    </nav>
  </header>

  <main>
    <p><strong>Für Handwerks- und Ausbaubetriebe in Donau-Ries</strong></p>
    <h1>Planbar Anfragen aus Ihrer Region – ohne dass Sie sich um Marketing kümmern.</h1>
    <p>Ihre Anzeigen laufen. Ihre Landingpage filtert vor. Jede Anfrage bekommt in unter 60 Sekunden eine Antwort. Sie sehen morgens nur noch, wer wirklich will.</p>
    <p>Erste Anfragen in 14 Tagen · Nur ein Betrieb pro Gewerk und Landkreis · Keine Mindestlaufzeit</p>

    <h2>Sie sind gut. Das Problem ist nur: keiner fragt Sie.</h2>
    <p>Die meisten Betriebe in Donau-Ries leben von Empfehlung. Das funktioniert – bis zwei große Aufträge wegfallen und plötzlich Lücken im Kalender stehen.</p>
    <p>Portale wie MyHammer liefern Anfragen, aber die falschen: Preisdrücker, Kleinkram, fünf Betriebe im selben Angebot.</p>
    <p>Und wenn doch mal jemand über die Website anfragt, ruft man abends um halb acht zurück. Da hat der Interessent längst mit jemand anderem telefoniert.</p>
    <p><strong>Es fehlt Ihnen kein Können. Es fehlt eine zweite Leitung, die Sie an- und ausschalten können.</strong></p>

    <h2>Das Regional-Anfrage-System</h2>
    <p>Drei Bausteine. Läuft nach dem Onboarding ohne Ihr Zutun.</p>
    <h3>01 – Anzeigen in Ihrem Umkreis</h3>
    <p>Ihre Anzeigen laufen auf Facebook, Instagram und Google – nur im Umkreis, den Sie bedienen, und ausgerichtet auf die Aufträge, die Sie wirklich wollen. Keine Kleinaufträge, wenn Sie Sanierungen suchen.</p>
    <h3>02 – Eine Seite, die vorsortiert</h3>
    <p>Interessenten landen auf einer Seite, die vier Fragen stellt: Was, wie groß, wo, bis wann. Wer keine ernsthafte Absicht hat, füllt das nicht aus. Das ist Absicht.</p>
    <h3>03 – Antwort in unter 60 Sekunden</h3>
    <p>Jede Anfrage bekommt sofort eine WhatsApp mit Terminvorschlag – auch nachts, auch sonntags. Sie bekommen die Zusammenfassung aufs Handy und rufen nur noch die an, bei denen es sich lohnt.</p>
    <p>Schritt 3 ist der Grund, warum das funktioniert. Studien und Praxis sagen dasselbe: Wer innerhalb von Minuten reagiert, gewinnt den Auftrag. Wer nach vier Stunden zurückruft, redet mit jemandem, der schon woanders unterschrieben hat.</p>

    <h2>Was Sie bekommen</h2>
    <ul>
      <li>Aufbau und laufende Betreuung Ihrer Anzeigen (Meta und Google)</li>
      <li>Landingpage mit Vorqualifizierung, auf Ihren Betrieb zugeschnitten</li>
      <li>Automatische Antwort in unter 60 Sekunden, per WhatsApp und E-Mail</li>
      <li>Nachfass-Sequenz für alle, die nicht sofort reagieren</li>
      <li>Optimierung Ihres Google-Unternehmensprofils</li>
      <li>Automatische Bewertungsanfrage nach abgeschlossenem Auftrag</li>
      <li>Monatlicher Report auf einer Seite: Anfragen, Kosten pro Anfrage, Aufträge</li>
    </ul>
    <p>Ihr Aufwand: 60 Minuten Onboarding. Danach fassen Sie nichts mehr an.</p>

    <h2>Der aktuelle Stand</h2>
    <p>Ich baue dieses Angebot gerade aus meinem Hauptjob heraus auf und suche die ersten drei Betriebe in Donau-Ries.</p>
    <p>Bei TL-Bau, einem Trockenbau- und Sanierungsbetrieb, kamen bisher zwei bis drei Anfragen pro Monat rein – rein organisch über die Website, ohne einen Cent Werbebudget. Genau da läuft aktuell der erste Test.</p>
    <p>Deshalb bekommen die ersten drei Betriebe Konditionen, die ich in sechs Monaten nicht mehr anbiete. Und deshalb trage ich das Risiko, nicht Sie.</p>

    <h2>Das Risiko liegt bei mir</h2>
    <p>Wenn Sie in 60 Tagen keine 10 qualifizierten Anfragen haben, arbeite ich ohne Retainer weiter, bis Sie sie haben.</p>
    <p>Keine Mindestlaufzeit. Monatlich kündbar. Wenn es nicht läuft, sollen Sie gehen können.</p>

    <h2>So läuft es ab</h2>
    <ol>
      <li><strong>Anfragen-Check, 20 Minuten</strong> – Wir schauen uns gemeinsam Ihren Google-Auftritt an, und ich zeige Ihnen live, welche Anzeigen Ihre Konkurrenz gerade schaltet. Kostet nichts, verpflichtet zu nichts.</li>
      <li><strong>Aufbau, 7–10 Tage</strong> – Ich baue Anzeigen, Landingpage und die automatische Antwort auf. Sie geben mir 60 Minuten für Fotos, Referenzen und Zielaufträge.</li>
      <li><strong>Start</strong> – Die Anzeigen gehen live. Erste Anfragen kommen in der Regel innerhalb von 14 Tagen.</li>
      <li><strong>Laufender Betrieb</strong> – Ich optimiere wöchentlich. Sie bekommen monatlich einen Report auf einer Seite.</li>
    </ol>
    <h3>Investition</h3>
    <p>Aufbau: 500 € einmalig (regulär 2.000 €)</p>
    <p>Betreuung: 490 € im Monat für die ersten sechs Monate (regulär 990 €)</p>
    <p>Werbebudget: zahlen Sie direkt an Facebook und Google, Empfehlung 800–1.500 € im Monat</p>
    <p>Im Gegenzug: Ich darf Ihre Zahlen als Referenz nutzen und bekomme nach 60 Tagen ein ehrliches Testimonial – auch wenn es kritisch ausfällt.</p>

    <h2>Wer das macht</h2>
    <p>Ich bin Jakub Kaczmarek. Seit über sieben Jahren arbeite ich im Marketing und in der Personalvermittlung – ich habe Anzeigen in sieben Ländern geschaltet, Bewerberprozesse automatisiert und Systeme gebaut, die Anfragen in Sekunden statt in Stunden beantworten.</p>
    <p>Das Gleiche baue ich jetzt für Handwerksbetriebe in Donau-Ries.</p>
    <p>Ich bin keine Agentur mit zwölf Leuten und Etage in München. Sie reden mit mir, ich baue es, ich betreue es. Deshalb nehme ich pro Gewerk und Landkreis nur einen Betrieb – alles andere wäre unseriös gegenüber dem Ersten, der unterschrieben hat.</p>

    <h2>Häufige Fragen</h2>
    <h3>„Wir sind ohnehin ausgelastet."</h3>
    <p>Die Frage ist nicht ob, sondern womit. Die meisten Betriebe sind mit Kleinkram ausgelastet und hätten lieber zwei große Aufträge. Genau das lässt sich über die Ausrichtung der Anzeigen steuern.</p>
    <h3>„Wir haben das schon mit einer Agentur versucht, hat nichts gebracht."</h3>
    <p>Höre ich ständig. Fast immer war das Problem nicht die Anzeige, sondern was danach passiert ist: Die Anfragen kamen, aber der Rückruf kam erst abends. Deshalb ist die Antwort in unter 60 Sekunden bei mir kein Extra, sondern der Kern.</p>
    <h3>„Was kostet das Werbebudget?"</h3>
    <p>800 bis 1.500 € im Monat sind für Donau-Ries realistisch. Sie zahlen das direkt an Facebook und Google, nicht an mich. Ich verdiene nichts daran, wenn Sie mehr ausgeben.</p>
    <h3>„Wie lange bin ich gebunden?"</h3>
    <p>Gar nicht. Monatlich kündbar.</p>
    <h3>„Was ist, wenn es nicht funktioniert?"</h3>
    <p>Keine 10 qualifizierten Anfragen in 60 Tagen: Ich arbeite ohne Retainer weiter, bis sie da sind.</p>
    <h3>„Machen Sie auch Mitarbeitergewinnung?"</h3>
    <p>Aktuell konzentriere ich mich auf Kundenanfragen. Mitarbeitergewinnung biete ich Bestandskunden ab 2027 an.</p>

    <h2>Ein Betrieb pro Gewerk. Pro Landkreis.</h2>
    <p>Für Trockenbau- und Sanierungsbetriebe in Donau-Ries ist der Platz aktuell frei.</p>
    <p>Der Anfragen-Check dauert 20 Minuten, kostet nichts und Sie sehen dabei schwarz auf weiß, was Ihre Konkurrenz gerade macht. Wenn Sie danach nicht weitermachen wollen, haben Sie trotzdem etwas mitgenommen.</p>

    <h2>Kontakt & Standort</h2>
    <address>
      <strong>Jakub Kaczmarek</strong><br />
      Sebastian-Frank-Str. 11<br />
      86609 Donauwörth, Bayern, Deutschland<br />
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
    <p>© ${new Date().getFullYear()} Jakub Kaczmarek | <a href="https://jakubkaczmarek.de/">jakubkaczmarek.de</a> | Anfragen für Handwerksbetriebe in Donau-Ries</p>
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