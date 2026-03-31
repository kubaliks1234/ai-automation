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

  // Content-Hub Themen-Pool: Mix aus allen Cluster-Typen
  const contentPool = [
    // === Cluster 1: AI Tools (Longtail!) ===
    { type: "use-case", topic: "AI Tools für Recruiter", keyword: "ai tools recruiter", category: "Vertrieb" },
    { type: "use-case", topic: "AI Tools für Social Media Manager", keyword: "ai tools social media", category: "Marketing" },
    { type: "use-case", topic: "AI Tools für Handwerker", keyword: "ai tools handwerker", category: "Allgemein" },
    { type: "use-case", topic: "AI Tools für Coaches und Berater", keyword: "ai tools coaches berater", category: "Produktivität" },
    { type: "use-case", topic: "AI Tools für E-Commerce Shops", keyword: "ai tools e-commerce", category: "Marketing" },
    { type: "use-case", topic: "AI für kleine Unternehmen", keyword: "ki für kleine unternehmen", category: "Allgemein" },
    { type: "use-case", topic: "AI Tools für Content Creator", keyword: "ai tools content creator", category: "Content" },
    { type: "use-case", topic: "ChatGPT für den Vertrieb nutzen", keyword: "chatgpt vertrieb", category: "Vertrieb" },
    { type: "use-case", topic: "AI im Kundenservice einsetzen", keyword: "ki kundenservice", category: "Vertrieb" },
    { type: "use-case", topic: "AI für Immobilienmakler", keyword: "ki immobilienmakler", category: "Allgemein" },
    
    // === Cluster 1: Tool Reviews ===
    { type: "review", tool: "Claude AI", keyword: "claude ai test", category: "Produktivität" },
    { type: "review", tool: "Midjourney", keyword: "midjourney test deutsch", category: "Content" },
    { type: "review", tool: "Perplexity AI", keyword: "perplexity ai test", category: "Analyse" },
    { type: "review", tool: "n8n", keyword: "n8n automatisierung test", category: "Automatisierung" },
    { type: "review", tool: "Jasper AI", keyword: "jasper ai test", category: "Marketing" },
    { type: "review", tool: "ElevenLabs", keyword: "elevenlabs test deutsch", category: "Content" },
    { type: "review", tool: "Surfer SEO", keyword: "surfer seo test", category: "Marketing" },
    { type: "review", tool: "Synthesia", keyword: "synthesia ai test", category: "Content" },
    { type: "review", tool: "Gamma AI", keyword: "gamma ai präsentationen test", category: "Produktivität" },
    { type: "review", tool: "HeyGen", keyword: "heygen ai video test", category: "Content" },
    { type: "review", tool: "Apollo.io", keyword: "apollo io test", category: "Vertrieb" },
    { type: "review", tool: "Runway ML", keyword: "runway ml test", category: "Content" },
    { type: "review", tool: "Murf AI", keyword: "murf ai test", category: "Content" },
    { type: "review", tool: "Canva AI", keyword: "canva ai test", category: "Marketing" },
    { type: "review", tool: "Gemini AI", keyword: "google gemini test", category: "Produktivität" },
    { type: "review", tool: "Mistral AI", keyword: "mistral ai test", category: "Produktivität" },
    { type: "review", tool: "Kling AI", keyword: "kling ai video test", category: "Content" },
    
    // === Cluster 2: Tutorials ===
    { type: "tutorial", topic: "ChatGPT für E-Mails nutzen", keyword: "chatgpt e-mails schreiben", category: "Produktivität" },
    { type: "tutorial", topic: "Mit KI Social Media Content erstellen", keyword: "ki social media content erstellen", category: "Marketing" },
    { type: "tutorial", topic: "Produktbeschreibungen mit KI schreiben", keyword: "produktbeschreibungen ki", category: "Marketing" },
    { type: "tutorial", topic: "ChatGPT Prompts für den Vertrieb", keyword: "chatgpt prompts vertrieb", category: "Vertrieb" },
    { type: "tutorial", topic: "Mit KI SEO-Texte schreiben", keyword: "ki seo texte schreiben", category: "Marketing" },
    { type: "tutorial", topic: "Bewerbungen mit KI schreiben", keyword: "bewerbung ki chatgpt", category: "Produktivität" },
    { type: "tutorial", topic: "AI für Marktforschung nutzen", keyword: "ki marktforschung", category: "Analyse" },
    { type: "tutorial", topic: "Automatische Berichte mit KI erstellen", keyword: "ki berichte automatisch", category: "Automatisierung" },
    
    // === Cluster 3: Ratgeber / Education ===
    { type: "ratgeber", topic: "Was ist Prompt Engineering?", keyword: "prompt engineering guide", category: "Produktivität" },
    { type: "ratgeber", topic: "DSGVO und KI: Was musst du wissen?", keyword: "dsgvo ki", category: "Allgemein" },
    { type: "ratgeber", topic: "KI Tools kostenlos nutzen", keyword: "ki tools kostenlos", category: "Allgemein" },
    { type: "ratgeber", topic: "AI Automatisierung für Einsteiger", keyword: "ki automatisierung einsteiger", category: "Automatisierung" },
    { type: "ratgeber", topic: "Wie erkenne ich guten AI Content?", keyword: "ai content erkennen", category: "Content" },
    
    // === Cluster 4: Vergleiche ===
    { type: "vergleich", topic: "ChatGPT vs. Claude: Was ist besser?", keyword: "chatgpt vs claude", category: "Produktivität" },
    { type: "vergleich", topic: "Jasper vs. Copy.ai: Welches AI-Schreibtool gewinnt?", keyword: "jasper vs copy.ai", category: "Marketing" },
    { type: "vergleich", topic: "n8n vs. Zapier: Automatisierung im Vergleich", keyword: "n8n vs zapier", category: "Automatisierung" },
    { type: "vergleich", topic: "Midjourney vs. DALL-E vs. Adobe Firefly", keyword: "midjourney vs dall-e adobe firefly", category: "Content" },
    
    // === Cluster 4: Trends ===
    { type: "trend", topic: "AI Trends 2026: Was kommt als nächstes?", keyword: "ai trends 2026", category: "Allgemein" },
    { type: "trend", topic: "Die besten AI Tools 2026 im Überblick", keyword: "beste ai tools 2026", category: "Allgemein" },
    { type: "trend", topic: "KI und die Zukunft der Arbeit", keyword: "ki zukunft arbeit", category: "Allgemein" },
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

  const prompt = `Du bist ein professioneller SEO-Texter und KI-Experte mit echter Erfahrung. Schreibe einen vollständigen, SEO-optimierten Artikel auf Deutsch.

THEMA: "${mainTopic}"
ARTIKEL-TYP: ${selected.type.toUpperCase()}

${typeInstructions}

🎯 WICHTIGE SEO-REGELN:
- Keyword "${selected.keyword || mainTopic}" in: Titel (mit Jahreszahl 2026), erster Absatz, H1, Meta Title, Meta Description, Slug
- Longtail-Keyword Fokus: Ziele auf spezifische Nische, nicht allgemeine Begriffe
- Mindestens eine Vergleichstabelle einbauen
- Artikel muss 1800-2500 Wörter lang sein
- Kurze Absätze (max 3-4 Sätze), visuelle Struktur

📊 E-E-A-T (sehr wichtig!):
- Eigene Meinung und Bewertung einbringen ("In unserem Test...", "Wir empfehlen...")
- Konkrete Zahlen nennen (z.B. "spart bis zu 3 Stunden pro Woche")
- Vor- UND Nachteile ehrlich ansprechen
- Praktische Beispiele aus dem Alltag
- KEIN generischer AI-Fließtext

Gib mir das Ergebnis als JSON:
{
  "title": "...(mit Keyword + 2026)...",
  "slug": "...(lowercase, hyphens, kein Sonderzeichen)...",
  "excerpt": "...(2-3 Sätze, Keyword enthalten, max 200 Zeichen)...",
  "content": "...(vollständiger Markdown-Artikel, 1800-2500 Wörter)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: ${categoryOptions.join(', ')}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "ai_tool_name": "${selected.tool || ''}",
  "ai_tool_url": "https://...",
  "pricing": "eines von: ${pricingOptions.join(', ')}",
  "rating": 4.2,
  "meta_title": "...(max 60 Zeichen, Keyword enthalten)...",
  "meta_description": "...(max 160 Zeichen, Keyword + CTA enthalten)..."
}`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    add_context_from_internet: true,
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