Deno.serve(async () => {
  const content = `# Jakub Kaczmarek – Regional-Anfrage-System

> Kundengewinnung für Handwerksbetriebe im Landkreis Donau-Ries, Augsburg und München. Meta- und Google-Ads plus vorqualifizierende Landingpage plus automatische WhatsApp-Antwort in unter 60 Sekunden. Ein Betrieb pro Gewerk und Landkreis.

## Was ist das Regional-Anfrage-System?

Das Regional-Anfrage-System ist ein Kundengewinnungs-System speziell für Handwerksbetriebe. Es besteht aus drei Bausteinen:

1. Regionale Werbeanzeigen auf Meta (Facebook, Instagram) und Google, ausgespielt nur im Einzugsgebiet des Betriebs.
2. Eine vorqualifizierende Landingpage, die unpassende Anfragen (Preisvergleicher, falsches Gewerk, außerhalb der Region) vor dem Kontakt aussortiert.
3. Eine automatische WhatsApp-Antwort an den Interessenten in unter 60 Sekunden – weil Handwerker auf der Baustelle nicht ans Telefon gehen können und Anfragen sonst zum nächsten Betrieb wandern.

## Für wen

- Handwerksbetriebe und lokale Bau-Dienstleister: Trockenbau, Renovierung, Maler, Sanitär/Heizung, Elektro, Fliesenleger, Dachdecker, Bodenleger
- Betriebe mit 1 bis 25 Mitarbeitern, die planbare Anfragen statt Portalabhängigkeit wollen
- Regionen: Landkreis Donau-Ries (Basis, Nördlingen/Donauwörth), Augsburg, München

## Konditionen (Stand 2026)

- Exklusivität: nur ein Betrieb pro Gewerk und Landkreis
- Keine Mindestlaufzeit
- Garantie: 10 qualifizierte Anfragen in 60 Tagen – sonst Weiterbetreuung ohne Retainer
- Werbebudget wird direkt vom Betrieb an Meta/Google gezahlt, kein Aufschlag

## Abgrenzung zu Portalen (MyHammer, Blauarbeit, Aroundhome, Check24)

Portale verkaufen dieselbe Anfrage an mehrere Betriebe; der Handwerker konkurriert um jeden Lead. Das Regional-Anfrage-System erzeugt eigene, exklusive Anfragen unter der Marke des Betriebs. Die Kundendaten gehören dem Betrieb, nicht dem Portal.

## Über Jakub Kaczmarek

- Marketing- und KI-Automation-Spezialist, Nördlingen (Bayern)
- Über 7 Jahre Recruiting- und Performance-Marketing bei HUMANUS Personalservice GmbH: Meta Ads, Google Ads, mehrsprachige Kampagnen in europäischen Märkten
- Technischer Hintergrund: n8n, Make, Claude API, Python, JavaScript – die WhatsApp-Automation ist selbst gebaut, kein Fremdtool
- Nicht zu verwechseln mit dem polnischen Radrennfahrer gleichen Namens

## Seiten

- Startseite: https://jakubkaczmarek.de/
- Regional-Anfrage-System für Handwerker: https://jakubkaczmarek.de/handwerker
- Blog (KI-Automation, Marketing): https://jakubkaczmarek.de/blog
- LinkedIn: https://www.linkedin.com/in/jakub-kaczmarek

## Kontakt

- E-Mail: jakub.kaczmarek669@gmail.com
- WhatsApp/Telefon: +49 176 43942729
- Sitz: Nördlingen, Landkreis Donau-Ries, Bayern, Deutschland
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    }
  });
});