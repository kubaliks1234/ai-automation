import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let isAuthorized = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAuthorized = true;
    } catch {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const existingPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 200);
    const existingTitles = existingPosts.map(p => p.title?.toLowerCase()).filter(Boolean);

    // SEO-Guide Strategie: BOFU→MOFU Cluster für jakubkaczmarek.de
    const articlePool = [
      // === BOFU: Kaufabsicht (KI-Automatisierung Freelancer/Agentur) ===
      { title: "KI Automatisierung Spezialist beauftragen: Was kostet es & was bringt es?", keyword: "ki automatisierung spezialist beauftragen", tags: ["KI Automatisierung", "Spezialist", "B2B", "DACH", "Freelancer"] },
      { title: "n8n Automatisierung Agentur finden: Worauf du achten solltest", keyword: "n8n automatisierung agentur", tags: ["n8n", "Automatisierung", "Agentur", "DACH", "B2B"] },
      { title: "KI Consultant Deutschland beauftragen: Kosten, Ablauf & Erfahrungen", keyword: "ki consultant deutschland", tags: ["KI Consultant", "Deutschland", "Beratung", "DACH", "B2B"] },
      { title: "AI Automation Freelancer Deutschland: So findest du den richtigen", keyword: "ai automation freelancer deutschland", tags: ["AI Automation", "Freelancer", "Deutschland", "B2B", "DACH"] },
      { title: "Automatisierung Berater DACH: So wählst du den richtigen Partner", keyword: "automatisierung berater dach", tags: ["Automatisierung", "Berater", "DACH", "B2B", "KI"] },
      // === MOFU: Vergleiche & Guides ===
      { title: "KI Automatisierung B2B: Der vollständige Leitfaden 2026", keyword: "ki automatisierung b2b", tags: ["KI Automatisierung", "B2B", "Leitfaden", "DACH", "2026"] },
      { title: "n8n Tutorial Deutsch: Von Null zur ersten Automatisierung 2026", keyword: "n8n tutorial deutsch", tags: ["n8n", "Tutorial", "Deutsch", "Automatisierung", "Einsteiger"] },
      { title: "Marketing mit KI automatisieren: 7 Wege die wirklich funktionieren", keyword: "marketing mit ki automatisieren", tags: ["Marketing", "KI", "Automatisierung", "B2B", "Effizienz"] },
      { title: "LinkedIn Automatisierung legal 2026: Was geht, was nicht?", keyword: "linkedin automatisierung legal", tags: ["LinkedIn", "Automatisierung", "Legal", "B2B", "DACH"] },
      { title: "KI Tools für Unternehmen 2026: Die besten im Vergleich", keyword: "ki tools für unternehmen 2026", tags: ["KI Tools", "Unternehmen", "2026", "B2B", "DACH"] },
      { title: "ElevenLabs n8n verbinden: Schritt-für-Schritt Guide", keyword: "elevenlabs n8n verbinden", tags: ["ElevenLabs", "n8n", "Integration", "Voice Agent", "Automatisierung"] },
      { title: "WhatsApp Automatisierung Business: KI-Lösungen für Unternehmen", keyword: "whatsapp automatisierung business ki", tags: ["WhatsApp", "Automatisierung", "Business", "KI", "B2B"] },
      { title: "Perplexity API Integration: So nutzt du sie mit n8n", keyword: "perplexity api integration n8n", tags: ["Perplexity", "API", "n8n", "KI", "Automatisierung"] },
      { title: "Recruiting Automatisierung Erfahrungen: Was wirklich klappt", keyword: "recruiting automatisierung erfahrungen", tags: ["Recruiting", "Automatisierung", "KI", "HR", "Erfahrungen"] },
      { title: "AI Content Strategie B2B: So baust du thematische Autorität auf", keyword: "ai content strategie b2b", tags: ["AI Content", "B2B", "Strategie", "SEO", "Autorität"] },
      // === TOFU: Reichweite aufbauen ===
      { title: "KI Automatisierungsexperte werden: Wege und Gehalt 2026", keyword: "ki automatisierungsexperte werden", tags: ["KI Automatisierung", "Experte", "Karriere", "Gehalt", "2026"] },
      { title: "n8n Agentur Deutschland: Leistungen und Preise im Überblick", keyword: "n8n agentur deutschland", tags: ["n8n", "Agentur", "Deutschland", "Preise", "Leistungen"] },
      { title: "Automatisierungsberater Freelance: So startest du 2026", keyword: "automatisierungsberater freelance", tags: ["Automatisierung", "Freelance", "Berater", "Starten", "2026"] },
      { title: "KI Spezialist DACH: Gefragte Skills und Projekte 2026", keyword: "ki spezialist dach", tags: ["KI", "Spezialist", "DACH", "Skills", "2026"] },
      { title: "Geld verdienen mit KI-Automatisierung: 8 realistische Methoden", keyword: "geld verdienen ki automatisierung", tags: ["Geld verdienen", "KI", "Automatisierung", "Methoden", "2026"] },
      { title: "Online Business mit KI automatisieren: Der Starter-Guide 2026", keyword: "online business mit ki automatisieren", tags: ["Online Business", "KI", "Automatisierung", "Starter", "2026"] },
      { title: "Side Hustle mit n8n und KI: Wie ich monatlich X Euro verdiene", keyword: "side hustle n8n ki", tags: ["Side Hustle", "n8n", "KI", "Nebenverdienst", "Automatisierung"] },
      { title: "Passives Einkommen mit KI-Automatisierung aufbauen", keyword: "passives einkommen ki automatisierung", tags: ["Passives Einkommen", "KI", "Automatisierung", "Online Business", "2026"] },
    ];

    const remaining = articlePool.filter(a =>
      !existingTitles.some(t => t.includes(a.keyword.toLowerCase()) || t.includes(a.title.toLowerCase().slice(0, 20)))
    );

    const article = remaining.length > 0
      ? remaining[Math.floor(Math.random() * remaining.length)]
      : articlePool[Math.floor(Math.random() * articlePool.length)];

    const today = new Date().toISOString().split('T')[0];

    console.log(`[INFO] Starte Artikel-Generierung: "${article.title}"`);

    const prompt = `Du bist ein professioneller SEO-Texter und KI-Automatisierungs-Experte für den DACH-Markt. Schreibe einen vollständigen Blogartikel auf Deutsch nach dem exakten Blueprint unten.

DIE WEBSITE: jakubkaczmarek.de – KI-Automatisierungs-Spezialist für den deutschen B2B-Markt.
ZIELGRUPPE: B2B-Entscheider, Unternehmer, Freelancer im DACH-Raum.

**Titel:** "${article.title}"
**Primär-Keyword:** "${article.keyword}"
**Neben-Keywords/Tags:** ${article.tags.join(', ')}

═══════════════════════════════════════════
📐 BLUEPRINT – EXAKTE STRUKTUR (PFLICHT):
═══════════════════════════════════════════

1. SLUG (URL):
   - Nur Kleinbuchstaben, Bindestriche, kein Datum, kein Sonderzeichen
   - Nur das Keyword: z.B. "ki-automatisierung-b2b"

2. META TITLE (≤60 Zeichen, PFLICHT):
   - Keyword an Position 1
   - Formel: [Keyword]: [Benefit oder Zahl]
   - Beispiel: "KI Automatisierung B2B: ROI-Guide für 2026"

3. META DESCRIPTION (150–160 Zeichen, PFLICHT):
   - Keyword enthalten
   - Formel: [Keyword] erklärt: [Was der Leser bekommt]. [Nutzen]. Jetzt lesen.

4. H1 (exakt eine, 50–80 Zeichen):
   - Keyword exakt oder sehr nah enthalten
   - Neugier oder klares Versprechen erzeugen

5. INTRO (150–200 Wörter, PFLICHT):
   - Satz 1–2: Keyword + Problem benennen (Leser nickt)
   - Satz 3–4: Warum das Problem schmerzhaft ist
   - Satz 5–6: Was dieser Artikel löst (Versprechen)
   - Satz 7–8: Credibility (warum der Leser mir glaubt)
   - KEIN "In diesem Artikel werde ich..."
   - KEIN "Willkommen auf meinem Blog"
   - KEINE generischen Aussagen wie "KI ist wichtig"

6. HAUPTTEIL – H2/H3 STRUKTUR:
   - Mind. 5 H2-Sektionen
   - H3 nur wenn ein H2 mehr als 2 Unterpunkte hat
   - KEIN H4 oder H5 verwenden
   - Jeder H2 mind. 150 Wörter Inhalt
   - H2-Überschriften standalone lesbar
   - Neben-Keywords in H2-Überschriften einbauen
   - Nach jedem H2: Mix aus Fließtext + Liste oder Tabelle
   - Max. 3–4 Sätze pro Absatz
   - Mind. eine Vergleichstabelle oder strukturierte Übersicht

7. INTERNE LINKS (2–4, PFLICHT):
   - Verlinke auf: [KI-Automatisierung Lösungen](/ki-automatisierung) oder ähnliche Seiten
   - Anchor-Text beschreibend, NICHT "hier klicken"

8. EXTERNE LINKS (1–2, PFLICHT):
   - Nur Autoritätsquellen (offizielle Docs, Studien)
   - KEIN Link auf Konkurrenten

9. FAQ-SEKTION (PFLICHT – People Also Ask):
   - H2: "Häufige Fragen zu [Keyword]"
   - 4–6 Fragen als H3
   - Jede Antwort: 2–4 Sätze

10. FAZIT + CTA (PFLICHT):
    - H2: "Fazit"
    - 2–3 Sätze Zusammenfassung
    - Nächster logischer Schritt für den Leser
    - CTA mit Link auf https://jakubkaczmarek.de/#cta

═══════════════════════════════════════════
🚫 ABSOLUT VERBOTENE WÖRTER:
═══════════════════════════════════════════
- Game Changer, unlock, unleash, delve, realm, landscape
- revolutionieren, cutting-edge, robust, elevate, foster
- synergy/Synergie, thought leader, transformative
- "in today's world", "let's dive in", "at the end of the day"
- Gedankenstriche (—) → nutze Komma, Punkt oder Klammern
- Rhetorische Ein-Wort-Fragen: "Ergebnis?", "Der Haken?"
- unglaublich, bahnbrechend, wegweisend, visionär, disruptiv, nahtlos
- Digitale Transformation, Next-Level, Spielregeln

✅ SCHREIBE WIE EIN EXPERTE:
- Direkt, konkret, ohne Blabla
- Kurze Sätze (max. 20 Wörter)
- Aktive Sprache: "du sparst 3 Stunden" statt "es ermöglicht dir Zeit zu sparen"
- Konkrete Zahlen, echte Beispiele, klare Empfehlungen
- Ehrliche Einschätzung inkl. Nachteile
- Autor-Perspektive: "In meiner Praxis...", "Ich empfehle..."
- Immer "du", nie "man" oder "der User"

📊 E-E-A-T (PFLICHT):
- Eigene Einschätzung und Erfahrung einbringen
- Konkrete Zahlen (z.B. "spart bis zu 4 Stunden pro Woche")
- Vor- UND Nachteile ehrlich ansprechen
- Praktische Beispiele aus dem B2B-Alltag

ARTIKEL-LÄNGE: 1800–2500 Wörter

Gib das Ergebnis als JSON zurück:
{
  "title": "...(Keyword an Position 1)...",
  "slug": "...(lowercase, Bindestriche, kein Datum)...",
  "excerpt": "...(Teaser, 150–160 Zeichen, mit Keyword)...",
  "content": "...(vollständiger Markdown-Artikel nach Blueprint)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: Marketing, Vertrieb, Produktivität, Content, Analyse, Automatisierung, Allgemein",
  "tags": ${JSON.stringify(article.tags)},
  "pricing": "Freemium",
  "rating": 4.5,
  "meta_title": "...(max 60 Zeichen, Keyword vorne)...",
  "meta_description": "...(150–160 Zeichen, Keyword + Nutzen + CTA)..."
}`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: false,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          cover_image: { type: "string" },
          category: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          pricing: { type: "string" },
          rating: { type: "number" },
          meta_title: { type: "string" },
          meta_description: { type: "string" }
        },
        required: ["title", "slug", "content", "excerpt", "category"]
      }
    });

    console.log(`[INFO] LLM-Antwort erhalten für: "${result.title}"`);

    const postData = {
      ...result,
      status: "published",
      published_at: today
    };

    const created = await base44.asServiceRole.entities.BlogPost.create(postData);

    console.log(`[INFO] Artikel erfolgreich erstellt mit ID: ${created.id}`);

    return Response.json({
      success: true,
      keyword: article.keyword,
      post_id: created.id,
      title: result.title,
      message: `Artikel "${result.title}" wurde erfolgreich erstellt.`
    });

  } catch (error) {
    console.error(`[ERROR] autoMoneyBlogWriter fehlgeschlagen: ${error.message}`);
    console.error(error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});