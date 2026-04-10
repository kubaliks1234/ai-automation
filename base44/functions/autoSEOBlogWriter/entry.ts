import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
  const base44 = createClientFromRequest(req);

  // Allow scheduled calls (no user) OR admin users
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
  const existingTitles = existingPosts.map(p => p.title).filter(Boolean);
  const existingSlugs = existingPosts.map(p => p.slug).filter(Boolean);

  // SEO-Guide Themen-Pool: 4 Topic Cluster (jakubkaczmarek.de)
  // Strategie: BOFU → MOFU → TOFU | Positionierung: KI-Automatisierung Spezialist DACH
  const contentPool = [
    // === CLUSTER 1: KI-Automatisierung für Unternehmen (BOFU) ===
    { type: "review", tool: "n8n", keyword: "n8n automatisierung test deutsch", category: "Automatisierung" },
    { type: "vergleich", topic: "n8n vs. Make vs. Zapier: Automatisierung für den DACH-Markt", keyword: "n8n vs make vs zapier", category: "Automatisierung" },
    { type: "tutorial", topic: "KI-Automatisierung im Recruiting: Schritt-für-Schritt Guide", keyword: "ki automatisierung recruiting", category: "Automatisierung" },
    { type: "tutorial", topic: "WhatsApp Business Automatisierung mit KI", keyword: "whatsapp business automatisierung ki", category: "Automatisierung" },
    { type: "ratgeber", topic: "ROI von KI-Automatisierung berechnen: Lohnt es sich?", keyword: "roi ki automatisierung", category: "Automatisierung" },
    { type: "ratgeber", topic: "Welche Prozesse lassen sich mit KI automatisieren?", keyword: "prozesse ki automatisieren", category: "Automatisierung" },
    { type: "ratgeber", topic: "KI Automatisierung für B2B Unternehmen: Was wirklich funktioniert", keyword: "ki automatisierung b2b", category: "Automatisierung" },
    { type: "use-case", topic: "KI-Automatisierung für kleine Unternehmen DACH", keyword: "ki automatisierung kleine unternehmen", category: "Automatisierung" },
    // === CLUSTER 2: n8n Tutorials & Praxis (MOFU) ===
    { type: "tutorial", topic: "n8n + ElevenLabs: Voice-Agents bauen", keyword: "n8n elevenlabs voice agent", category: "Automatisierung" },
    { type: "tutorial", topic: "n8n + Perplexity: KI-Research automatisieren", keyword: "n8n perplexity ki research", category: "Automatisierung" },
    { type: "tutorial", topic: "n8n SharePoint Integration: Schritt-für-Schritt", keyword: "n8n sharepoint integration", category: "Automatisierung" },
    { type: "tutorial", topic: "n8n HTTP-Requests und Claude API verbinden", keyword: "n8n claude api integration", category: "Automatisierung" },
    { type: "ratgeber", topic: "n8n Fehler beheben: Die 10 häufigsten Probleme und Lösungen", keyword: "n8n fehler beheben", category: "Automatisierung" },
    { type: "tutorial", topic: "n8n Tutorial Deutsch: Der Einsteiger-Guide für Anfänger", keyword: "n8n tutorial deutsch", category: "Automatisierung" },
    { type: "review", tool: "Perplexity AI", keyword: "perplexity ai test deutsch", category: "Analyse" },
    { type: "review", tool: "ElevenLabs", keyword: "elevenlabs test deutsch", category: "Content" },
    // === CLUSTER 3: KI im Marketing (MOFU) ===
    { type: "tutorial", topic: "LinkedIn Content mit KI automatisieren (legal)", keyword: "linkedin content ki automatisieren", category: "Marketing" },
    { type: "tutorial", topic: "TikTok Content-Pipeline mit KI aufbauen", keyword: "tiktok content pipeline ki", category: "Marketing" },
    { type: "tutorial", topic: "KI-gestützte Leadgenerierung B2B: So geht es", keyword: "ki leadgenerierung b2b", category: "Vertrieb" },
    { type: "tutorial", topic: "Pinterest Automatisierung mit n8n", keyword: "pinterest automatisierung n8n", category: "Marketing" },
    { type: "tutorial", topic: "Content-Kalender mit KI erstellen und automatisieren", keyword: "content kalender ki erstellen", category: "Marketing" },
    { type: "use-case", topic: "AI Content Strategie für B2B Unternehmen", keyword: "ai content strategie b2b", category: "Marketing" },
    { type: "use-case", topic: "Marketing Automatisierung mit KI: Was wirklich funktioniert", keyword: "marketing automatisierung ki", category: "Marketing" },
    { type: "review", tool: "Surfer SEO", keyword: "surfer seo test deutsch", category: "Marketing" },
    { type: "review", tool: "Jasper AI", keyword: "jasper ai test deutsch", category: "Marketing" },
    // === CLUSTER 4: Recruiting Automation (BOFU) ===
    { type: "ratgeber", topic: "KI-Candidate Scoring: Wie es in der Praxis funktioniert", keyword: "ki candidate scoring recruiting", category: "Automatisierung" },
    { type: "tutorial", topic: "WhatsApp Outreach für Recruiting mit KI", keyword: "whatsapp outreach recruiting ki", category: "Vertrieb" },
    { type: "tutorial", topic: "Mehrsprachige Recruiting-Kampagnen mit KI erstellen", keyword: "mehrsprachige recruiting kampagnen ki", category: "Automatisierung" },
    { type: "tutorial", topic: "ElevenLabs Voice-Agent für Recruiting-Calls bauen", keyword: "elevenlabs voice agent recruiting", category: "Automatisierung" },
    { type: "ratgeber", topic: "Zeitarbeit und KI: Chancen und Grenzen im HR-Prozess", keyword: "zeitarbeit ki hr automatisierung", category: "Allgemein" },
    // === TOOL REVIEWS (BOFU/MOFU) ===
    { type: "review", tool: "Claude AI", keyword: "claude ai test deutsch", category: "Produktivität" },
    { type: "review", tool: "Midjourney", keyword: "midjourney test deutsch", category: "Content" },
    { type: "review", tool: "HeyGen", keyword: "heygen ai video test", category: "Content" },
    { type: "review", tool: "Apollo.io", keyword: "apollo io test b2b", category: "Vertrieb" },
    { type: "review", tool: "Synthesia", keyword: "synthesia ki video test", category: "Content" },
    { type: "review", tool: "Gemini AI", keyword: "google gemini test deutsch", category: "Produktivität" },
    // === VERGLEICHE (MOFU) ===
    { type: "vergleich", topic: "KI Automatisierung Spezialist vs. Freelancer: Was ist besser?", keyword: "ki automatisierung spezialist freelancer", category: "Allgemein" },
    { type: "vergleich", topic: "ChatGPT vs. Claude vs. Gemini: Welches KI-Modell 2026?", keyword: "chatgpt vs claude vs gemini", category: "Produktivität" },
    { type: "vergleich", topic: "n8n vs. Zapier: Welches Automatisierungs-Tool lohnt sich?", keyword: "n8n vs zapier vergleich", category: "Automatisierung" },
    // === RATGEBER (TOFU) ===
    { type: "ratgeber", topic: "DSGVO und KI-Automatisierung: Was musst du wissen?", keyword: "dsgvo ki automatisierung", category: "Allgemein" },
    { type: "ratgeber", topic: "EU AI Act 2026: Was ändert sich für Unternehmen?", keyword: "eu ai act unternehmen", category: "Allgemein" },
    { type: "ratgeber", topic: "Prompt Engineering für B2B: Bessere KI-Ergebnisse erzielen", keyword: "prompt engineering b2b", category: "Produktivität" },
    { type: "trend", topic: "KI-Automatisierung Trends 2026: Was kommt als nächstes?", keyword: "ki automatisierung trends 2026", category: "Allgemein" },
  ];

  // Filter out already covered topics
  const remaining = contentPool.filter(item => {
    const titleKey = item.topic || item.tool || '';
    return !existingTitles.some(t => t.toLowerCase().includes(titleKey.toLowerCase().substring(0, 15)));
  });

  const pool = remaining.length > 0 ? remaining : contentPool;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  const today = new Date().toISOString().split('T')[0];
  const categoryOptions = ["Marketing", "Vertrieb", "Produktivität", "Content", "Analyse", "Automatisierung", "Allgemein"];
  const pricingOptions = ["Kostenlos", "Freemium", "Kostenpflichtig"];

  // Build type-specific prompt
  let typeInstructions = '';
  let mainTopic = '';

  if (selected.type === 'review') {
    mainTopic = selected.tool;
    typeInstructions = `Schreibe einen ehrlichen Tool-Test über "${selected.tool}" (Keyword: "${selected.keyword}").
Struktur:
- Was ist ${selected.tool}? (H2)
- Hauptfeatures (H2) – Bullet-Liste
- Preise & Pläne (H2) – mit Tabelle
- Vorteile & Nachteile (H2)
- Für wen ist ${selected.tool} geeignet? (H2)
- Schritt-für-Schritt: So startest du (H2)
- Fazit (H2)
- FAQ (H2) – 5 Fragen`;
  } else if (selected.type === 'use-case') {
    mainTopic = selected.topic;
    typeInstructions = `Schreibe einen Use-Case-Artikel über "${selected.topic}" (Keyword: "${selected.keyword}").
Struktur:
- Herausforderungen ohne KI (H2)
- Wie hilft KI konkret? (H2)
- Die besten AI Tools dafür (H2) – mit Tabelle
- Schritt-für-Schritt Einstieg (H2) – nummerierte Liste
- Echte Beispiele & Ergebnisse (H2)
- Fazit (H2)
- FAQ (H2) – 5 Fragen`;
  } else if (selected.type === 'tutorial') {
    mainTopic = selected.topic;
    typeInstructions = `Schreibe ein praktisches Tutorial über "${selected.topic}" (Keyword: "${selected.keyword}").
Struktur:
- Was lernst du in diesem Tutorial? (H2)
- Voraussetzungen (H2)
- Schritt-für-Schritt Anleitung (H2) – nummerierte Schritte mit konkreten Beispielen
- Tipps & häufige Fehler (H2)
- Fazit (H2)
- FAQ (H2) – 5 Fragen`;
  } else if (selected.type === 'vergleich') {
    mainTopic = selected.topic;
    typeInstructions = `Schreibe einen detaillierten Vergleich: "${selected.topic}" (Keyword: "${selected.keyword}").
Struktur:
- Überblick (H2)
- Feature-Vergleich (H2) – Tabelle mit allen wichtigen Features
- Preisvergleich (H2) – Tabelle
- Stärken & Schwächen (H2)
- Für wen ist welches Tool besser? (H2)
- Fazit & Empfehlung (H2)
- FAQ (H2) – 5 Fragen`;
  } else if (selected.type === 'ratgeber') {
    mainTopic = selected.topic;
    typeInstructions = `Schreibe einen informativen Ratgeber über "${selected.topic}" (Keyword: "${selected.keyword}").
Struktur:
- Einfache Erklärung (H2)
- Warum ist das wichtig? (H2)
- Konkrete Anwendungsbeispiele (H2) – mit echten Szenarien
- Tipps für Einsteiger (H2)
- Häufige Fehler vermeiden (H2)
- Fazit (H2)
- FAQ (H2) – 5 Fragen`;
  } else {
    mainTopic = selected.topic;
    typeInstructions = `Schreibe einen aktuellen Trend-Artikel über "${selected.topic}" (Keyword: "${selected.keyword}").
Struktur:
- Aktuelle Situation (H2)
- Die wichtigsten Entwicklungen (H2) – mit konkreten Beispielen
- Was bedeutet das für Unternehmen? (H2)
- Praxistipps: So bereitest du dich vor (H2)
- Ausblick (H2)
- FAQ (H2) – 5 Fragen`;
  }

  const prompt = `Du bist ein professioneller SEO-Texter und KI-Automatisierungs-Experte für den DACH-Markt. Schreibe einen vollständigen, SEO-optimierten Artikel auf Deutsch.

DIE WEBSITE: jakubkaczmarek.de – positioniert als KI-Automatisierungs-Spezialist für den deutschen B2B-Markt.
ZIELGRUPPE: B2B-Entscheider, Freelancer, Unternehmer im DACH-Raum, die KI-Automatisierung umsetzen wollen.

THEMA: "${mainTopic}"
ARTIKEL-TYP: ${selected.type.toUpperCase()}

${typeInstructions}

🚫 ABSOLUT VERBOTENE WÖRTER – NIEMALS verwenden:
- Game Changer, unlock, unleash, delve, realm, landscape
- revolutionize / revolutionieren / revolutioniert, cutting-edge, robust, elevate, foster
- navigate (complexities), embark on journey, spearhead
- utilize (→ nutzen), commence (→ starten), endeavor, paramount
- synergy / Synergie, thought leader, value-add, holistic, transformative / transformieren
- "in today's world", "in today's fast-paced", "look no further"
- "let's dive in", "at the end of the day", "nestled in"
- Gedankenstriche (—) → nutze Komma, Punkt oder Klammern
- Rhetorische Ein-Wort-Fragen: "Ergebnis?", "Der Haken?", "Mein Tipp?", "Die Lösung?"
- Übertriebene Adjektive: unglaublich, bahnbrechend, wegweisend, visionär, disruptiv, nahtlos
- Digitale Transformation, Next-Level, Spielregeln, im Sturm

✅ SCHREIBE WIE EIN MENSCH UND EXPERTE:
- Direkt, konkret, ohne Blabla
- Kurze Sätze (max. 20 Wörter)
- Aktive Sprache: "du sparst 3 Stunden" statt "es ermöglicht dir, Zeit zu sparen"
- Konkrete Zahlen, echte Beispiele, klare Empfehlungen
- Ehrliche Einschätzung inkl. Nachteile
- Autor-Perspektive einbauen: "In meiner Praxis...", "Mein Tipp:", "Ich empfehle..."

🎯 SEO-REGELN (aus dem SEO-Guide jakubkaczmarek.de):
- Keyword "${selected.keyword || mainTopic}" MUSS: im Titel an Position 1, im H1 (exakt), in den ersten 100 Wörtern, im Meta Title (≤60Z), in der Meta Description (≤160Z), im Slug
- H1 muss das Keyword exakt oder sehr nah enthalten
- LSI-Keywords und verwandte Begriffe natürlich einstreuen
- Mindestens eine Vergleichstabelle oder strukturierte Übersicht
- FAQ-Sektion am Ende (People Also Ask Logik)
- Interne Verlinkung: Erwähne und verlinke auf jakubkaczmarek.de/ki-automatisierung oder relevante Blog-Beiträge
- Artikel: 1800–2500 Wörter, kurze Absätze (max. 3–4 Sätze)
- Jahreszahl 2026 im Titel einbauen

📊 E-E-A-T (Pflicht):
- Eigene Einschätzung und Erfahrung einbringen
- Konkrete Zahlen (z.B. "spart bis zu 4 Stunden pro Woche")
- Vor- UND Nachteile ehrlich ansprechen
- Praktische Beispiele aus dem B2B-Alltag
- KEIN generischer AI-Fließtext

Gib mir das Ergebnis als JSON:
{
  "title": "...(Keyword an Position 1 + 2026)...",
  "slug": "...(lowercase, hyphens, kein Sonderzeichen)...",
  "excerpt": "...(2–3 Sätze, Keyword enthalten, max 200 Zeichen)...",
  "content": "...(vollständiger Markdown-Artikel, 1800–2500 Wörter)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: ${categoryOptions.join(', ')}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "ai_tool_name": "${selected.tool || ''}",
  "ai_tool_url": "https://...",
  "pricing": "eines von: ${pricingOptions.join(', ')}",
  "rating": 4.2,
  "meta_title": "...(max 60 Zeichen, Keyword vorne)...",
  "meta_description": "...(max 160 Zeichen, Keyword + konkreter Nutzen + CTA)..."
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
        ai_tool_name: { type: "string" },
        ai_tool_url: { type: "string" },
        pricing: { type: "string" },
        rating: { type: "number" },
        meta_title: { type: "string" },
        meta_description: { type: "string" }
      },
      required: ["title", "slug", "content", "excerpt", "category"]
    }
  });

  const postData = {
    ...result,
    category: selected.category || result.category,
    status: "published",
    published_at: today
  };

  const created = await base44.asServiceRole.entities.BlogPost.create(postData);

  console.log(`[INFO] Artikel erstellt: "${result.title}" (Typ: ${selected.type}, Keyword: ${selected.keyword || mainTopic})`);

  return Response.json({
    success: true,
    type: selected.type,
    topic: mainTopic,
    keyword: selected.keyword || mainTopic,
    post_id: created.id,
    title: result.title,
    message: `Artikel "${result.title}" wurde erfolgreich erstellt.`
  });

  } catch (error) {
    console.error(`[ERROR] autoSEOBlogWriter fehlgeschlagen: ${error.message}`);
    console.error(error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});