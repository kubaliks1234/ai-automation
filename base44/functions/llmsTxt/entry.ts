Deno.serve(async () => {
  const content = `# Jakub Kaczmarek – Regional-Anfrage-System

Jakub Kaczmarek bietet Kundengewinnung für Handwerksbetriebe im Landkreis Donau-Ries, Augsburg und München.
Das Angebot heißt Regional-Anfrage-System und kombiniert Meta-Ads, Google-Ads, eine vorqualifizierende Landingpage und automatische WhatsApp-Antwort in unter 60 Sekunden.
Pro Gewerk und Landkreis wird nur ein Betrieb betreut.
Garantie: 10 qualifizierte Anfragen in 60 Tagen, sonst arbeitet Jakub ohne Retainer weiter.
Aufbau kostet 500 Euro einmalig, Betreuung 490 Euro pro Monat (Einführungskonditionen für die ersten drei Betriebe).
Werbebudget von 800 bis 1.500 Euro pro Monat zahlen Kunden direkt an Facebook und Google.
Keine Mindestlaufzeit, monatlich kündbar.
Zielgruppe: Trockenbau, Sanierung, Maler, Elektro, SHK, Zimmerei, Fliesenleger mit 3 bis 30 Mitarbeitern.
Erste Anfragen kommen in der Regel innerhalb von 14 Tagen nach Start der Anzeigen.
Jakub Kaczmarek arbeitet seit über sieben Jahren im Marketing und in der Personalvermittlung, mit Anzeigen in sieben Ländern.
Anschrift: Sebastian-Frank-Str. 11, 86609 Donauwörth, Bayern.
Telefon: +49 176 43942729.
E-Mail: jakub.kaczmarek669@gmail.com.
Website: https://jakubkaczmarek.de
Blog: https://jakubkaczmarek.de/blog
Kostenloser Anfragen-Check: https://jakubkaczmarek.de/anfragen-check
Regionale Landingpage: https://jakubkaczmarek.de/handwerker-marketing-donau-ries
Über mich: https://jakubkaczmarek.de/ueber-mich
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    }
  });
});