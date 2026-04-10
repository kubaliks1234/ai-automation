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

    const prompt = `Du bist ein professioneller SEO-Texter und KI-Automatisierungs-Experte für den DACH-Markt. Schreibe einen vollständigen Blogartikel auf Deutsch.

DIE WEBSITE: jakubkaczmarek.de – KI-Automatisierungs-Spezialist für den deutschen B2B-Markt.
ZIELGRUPPE: B2B-Entscheider, Unternehmer, Freelancer im DACH-Raum.

**Titel:** "${article.title}"
**Primär-Keyword:** "${article.keyword}"
**Neben-Keywords:** ${article.tags.join(', ')}

═══════════════════════════════════════════
🚨 WICHTIGSTE REGEL: KEIN MARKDOWN
═══════════════════════════════════════════
Schreibe NIEMALS Markdown in body_html.
Kein **fett**, kein # Überschrift, kein | Tabelle |, kein - Liste.
ALLE Inhalte als fertiges HTML ausgeben.

═══════════════════════════════════════════
📐 BODY_HTML STRUKTUR (PFLICHT):
═══════════════════════════════════════════

1. INTRO: <p class="lead">[150–200 Wörter. Keyword in Satz 1–2. Problem benennen. Versprechen machen. Credibility. <strong>Schlüsselbegriffe</strong> markieren.]</p>

2. ABSCHNITTE (mind. 5 H2-Sektionen):
   <h2>[Abschnittstitel mit sekundärem Keyword]</h2>
   <p>[3–4 Sätze. Immer "du" statt "man".]</p>
   Ggf. H3: <h3>[Unterabschnitt]</h3>

3. TOOL-CARD (für jedes vorgestellte Tool):
   <div class="tool-card"><div class="tool-card-header"><span class="tool-name">[Name]</span><span class="tool-badge">[Label]</span></div>
   <p>[Praxisbeschreibung]</p>
   <div class="pro-con-grid"><div class="pro-box"><div class="box-label">Stärken</div><ul class="box-list"><li>[1]</li><li>[2]</li></ul></div>
   <div class="con-box"><div class="box-label">Schwächen</div><ul class="box-list"><li>[1]</li><li>[2]</li></ul></div></div></div>

4. VERGLEICHSTABELLE (mind. 1 PFLICHT):
   <div class="table-wrap"><table><thead><tr><th>Feature</th><th>[Spalte]</th>...</tr></thead>
   <tbody><tr><td>[Label]</td><td><span class="badge-good">[Gut]</span></td><td><span class="badge-mid">[Mittel]</span></td><td><span class="badge-bad">[Schlecht]</span></td></tr>...</tbody></table></div>

5. CALLOUT (mind. 1 PFLICHT):
   <div class="callout"><div class="callout-label">💡 Praxis-Tipp</div><p>[Konkreter Tipp.]</p></div>

6. INTERNER LINK (1–3 PFLICHT):
   <div class="read-also"><span class="read-also-label">Weiterlesen</span><a href="/blog/[slug]">[Titel] →</a></div>

7. LISTEN: <ul><li><strong>[Begriff]</strong> — [Erklärung]</li></ul> oder <ol><li><strong>[Schritt]</strong> — [Erklärung]</li></ol>

8. FAQ (PFLICHT):
   <hr /><h2>Häufige Fragen zu [Keyword]</h2>
   <div class="faq-list">
   <div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">[Frage]<span class="faq-icon">+</span></button><div class="faq-answer"><p>[Antwort]</p></div></div>
   [4–6 Fragen total]
   </div>

9. FAZIT + CTA (PFLICHT):
   <hr /><div class="fazit-box"><h2>Fazit</h2><p>[2–3 Sätze Zusammenfassung + nächster Schritt.]</p>
   <a href="/#cta" class="btn">Kostenloses Gespräch buchen</a>
   <a href="/Blog" class="btn-ghost">Mehr Artikel</a></div>

═══════════════════════════════════════════
🚫 VERBOTEN: Markdown, Game Changer, bahnbrechend, wegweisend, disruptiv, nahtlos, Gedankenstriche (—), "in today's world", "let's dive in"
✅ STIL: "du" statt "man", konkrete Zahlen, aktive Sprache, max. 3–4 Sätze/Absatz, 1800–2500 Wörter

Gib das Ergebnis als JSON zurück:
{
  "title": "...(Keyword an Position 1)...",
  "h1": "...(sichtbare H1, 50–80 Zeichen)...",
  "slug": "...(lowercase, Bindestriche, kein Datum)...",
  "excerpt": "...(150–160 Zeichen, Keyword + Nutzen + CTA)...",
  "body_html": "...(vollständiger HTML-Artikel, KEIN Markdown)...",
  "schema_json": "{\\"@context\\": \\"https://schema.org\\", \\"@type\\": \\"Article\\", \\"headline\\": \\"...\\", \\"description\\": \\"...\\", \\"author\\": {\\"@type\\": \\"Person\\", \\"name\\": \\"Jakub Kaczmarek\\"}, \\"datePublished\\": \\"${today}\\"}",
  "reading_time": 7,
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
          h1: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          body_html: { type: "string" },
          schema_json: { type: "string" },
          reading_time: { type: "number" },
          cover_image: { type: "string" },
          category: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          pricing: { type: "string" },
          rating: { type: "number" },
          meta_title: { type: "string" },
          meta_description: { type: "string" }
        },
        required: ["title", "slug", "body_html", "excerpt", "category"]
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