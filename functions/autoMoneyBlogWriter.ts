import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
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

  // Pool of article ideas with keywords
  const articlePool = [
    { title: "10 Wege Geld mit KI zu verdienen", keyword: "geld verdienen mit ki", tags: ["KI", "Geld verdienen", "AI", "Online Business", "Side Hustle"] },
    { title: "20 AI Tools die dir Geld verdienen – Komplette Liste 2026", keyword: "ai tools geld verdienen", tags: ["AI Tools", "Geld verdienen", "Online Business", "KI Tools", "Passives Einkommen"] },
    { title: "Online Business mit KI starten: Schritt-für-Schritt Anleitung", keyword: "online business mit ki starten", tags: ["Online Business", "KI", "Business Ideen", "Einsteiger", "Automation"] },
    { title: "Geld verdienen mit ChatGPT: 15 bewährte Ideen 2026", keyword: "geld verdienen mit chatgpt", tags: ["ChatGPT", "Geld verdienen", "KI", "Side Hustle", "Online Business"] },
    { title: "AI Side Hustle Ideen: So verdienst du nebenbei mit KI Geld", keyword: "ai side hustle ideen", tags: ["Side Hustle", "KI", "AI", "Nebenverdienst", "Online Geld verdienen"] },
    { title: "Passives Einkommen mit KI aufbauen – 8 realistische Methoden", keyword: "passives einkommen mit ki", tags: ["Passives Einkommen", "KI", "AI", "Online Business", "Automation"] },
    { title: "KI Business Ideen 2026: Die besten Geschäftsmodelle mit AI", keyword: "ki business ideen 2026", tags: ["Business Ideen", "KI", "AI", "Online Business", "2026"] },
    { title: "AI Tools für Online Unternehmer: Die 15 besten Tools im Vergleich", keyword: "ai tools für online business", tags: ["AI Tools", "Online Business", "KI Tools", "Unternehmer", "Produktivität"] },
    { title: "KI Automatisierung für mehr Einkommen: So funktioniert es", keyword: "ai automatisierung business", tags: ["KI Automatisierung", "Einkommen", "AI", "Online Business", "Effizienz"] },
    { title: "AI Tools für Affiliate Marketing: Mehr Provision mit KI verdienen", keyword: "affiliate marketing mit ki", tags: ["Affiliate Marketing", "KI", "AI Tools", "Online Marketing", "Passives Einkommen"] },
    { title: "Geld verdienen im Internet für Anfänger: Der komplette Guide 2026", keyword: "geld verdienen im internet für anfänger", tags: ["Geld verdienen", "Anfänger", "Online Business", "Internet", "2026"] },
    { title: "Online Geld verdienen ohne Startkapital: 12 Methoden die funktionieren", keyword: "online geld verdienen ohne startkapital", tags: ["Geld verdienen", "Ohne Startkapital", "Online Business", "Einsteiger", "Nebenverdienst"] },
    { title: "Geld verdienen mit KI für Anfänger: Einstieg in 2026", keyword: "geld verdienen mit ki für anfänger", tags: ["KI", "Anfänger", "Geld verdienen", "AI", "Einsteiger Guide"] },
    { title: "Automatisiertes Affiliate Marketing mit KI: So geht's", keyword: "automatisiertes affiliate marketing", tags: ["Affiliate Marketing", "Automation", "KI", "Passives Einkommen", "AI Tools"] },
    { title: "Digitales Business aufbauen: Mit KI schneller zum Erfolg", keyword: "digitales business aufbauen", tags: ["Digitales Business", "KI", "Online Business", "Aufbauen", "AI"] },
    { title: "Geld verdienen mit Content und KI: Die besten Strategien", keyword: "geld verdienen mit content", tags: ["Content", "KI", "Geld verdienen", "Content Creation", "AI Tools"] },
    { title: "Geld verdienen mit Social Media und KI-Tools 2026", keyword: "geld verdienen mit social media", tags: ["Social Media", "KI", "Geld verdienen", "Content Creator", "AI Tools"] },
    { title: "AI Tools für Content Creator: Diese Tools sparen dir Stunden", keyword: "ai tools für content creator", tags: ["Content Creator", "AI Tools", "KI", "Social Media", "Produktivität"] },
    { title: "Side Hustle Ideen mit KI: 10 Nebenjobs die wirklich funktionieren", keyword: "side hustle ideen mit künstlicher intelligenz", tags: ["Side Hustle", "KI", "Nebenjob", "Online Geld", "AI"] },
    { title: "Geld verdienen mit digitalen Produkten + KI: Schritt für Schritt", keyword: "geld verdienen mit digitalen produkten", tags: ["Digitale Produkte", "KI", "Passives Einkommen", "Online Business", "AI"] },
    { title: "Wie man mit AI Geld verdient: Der ehrliche Leitfaden 2026", keyword: "wie man mit ai geld verdient", tags: ["AI", "Geld verdienen", "KI", "Online Business", "Einsteiger"] },
    { title: "Nebenverdienst online: 15 Ideen für 2026 mit und ohne KI", keyword: "nebenverdienst online", tags: ["Nebenverdienst", "Online", "Geld verdienen", "KI", "Side Hustle"] },
    { title: "Geld verdienen mit YouTube und KI: Kanal automatisieren 2026", keyword: "geld verdienen mit youtube", tags: ["YouTube", "KI", "Geld verdienen", "Content Creator", "AI Tools"] },
    { title: "KI Business Ideen für Anfänger: So startest du ohne Vorkenntnisse", keyword: "ki business ideen für anfänger", tags: ["KI Business", "Anfänger", "Business Ideen", "AI", "Einsteiger"] },
    { title: "Beste AI Tools für Online Business 2026: Mein ehrlicher Vergleich", keyword: "beste ai tools für online business", tags: ["AI Tools", "Online Business", "KI", "Vergleich", "2026"] },
    { title: "Affiliate Marketing für Anfänger mit KI: Der Starter Guide", keyword: "affiliate marketing für anfänger", tags: ["Affiliate Marketing", "Anfänger", "KI", "Passives Einkommen", "AI"] },
    { title: "Online Marketing Geld verdienen: Mit KI auf Autopilot", keyword: "online marketing geld verdienen", tags: ["Online Marketing", "KI", "Geld verdienen", "Automation", "AI Tools"] },
    { title: "AI Marketing Tools 2026: Die besten Tools für dein Business", keyword: "ai marketing tools", tags: ["AI Marketing", "Tools", "KI", "Online Marketing", "Business"] },
    { title: "Geld verdienen mit TikTok und KI: Strategie für 2026", keyword: "geld verdienen mit tiktok", tags: ["TikTok", "KI", "Geld verdienen", "Social Media", "Content Creator"] },
    { title: "Internet Business Ideen 2026: Mit KI durchstarten", keyword: "internet business ideen", tags: ["Internet Business", "KI", "Business Ideen", "Online", "2026"] },
  ];

  const remaining = articlePool.filter(a => 
    !existingTitles.some(t => t.includes(a.keyword.toLowerCase()) || t.includes(a.title.toLowerCase().slice(0, 20)))
  );

  const article = remaining.length > 0
    ? remaining[Math.floor(Math.random() * remaining.length)]
    : articlePool[Math.floor(Math.random() * articlePool.length)];

  const today = new Date().toISOString().split('T')[0];

  const prompt = `Du bist ein professioneller SEO-Texter und KI-Experte. Schreibe einen vollständigen, SEO-optimierten Blogartikel auf Deutsch.

**Titel:** "${article.title}"
**Hauptkeyword:** "${article.keyword}"
**Zielgruppe:** Menschen die online Geld verdienen wollen, Einsteiger bis Fortgeschrittene

## Pflichtstruktur:
- H1: Haupttitel (mit Keyword)
- Einleitung: Warum das Thema wichtig ist (ca. 150 Wörter)
- H2: Was du in diesem Artikel lernst
- H2: [Hauptteil je nach Thema: Methoden, Tools, Schritte, etc. – mindestens 5 H2 Sektionen]
- H2: Welche KI Tools helfen dir dabei
- H2: Meine Empfehlungen (hier Affiliate-Möglichkeiten erwähnen)
- H2: Häufige Fehler vermeiden
- H2: Fazit
- H2: FAQ (5 Fragen & Antworten)

## WICHTIG - KI Tools & Interne Links einbauen:
Im Abschnitt "Welche KI Tools helfen dir dabei" und "Meine Empfehlungen" MUSST du folgende Tools erwähnen und verlinken:
- ChatGPT: https://chat.openai.com (für Content, Texte, Ideen)
- Jasper AI: https://jasper.ai (für Marketing-Texte, Affiliate-Content)
- Copy.ai: https://copy.ai (für schnelle Texte)
- Notion AI: https://notion.so (für Organisation)
- n8n: https://n8n.io (für Automatisierung)
- Surfer SEO: https://surferseo.com (für SEO-Artikel)
- Canva AI: https://canva.com (für visuelle Inhalte)

Schreibe bei diesen Tools: "Du kannst [Tool] hier testen: [Link]" und erwähne kurz was Affiliate-Partner verdienen können.

## SEO-Regeln:
- Hauptkeyword in Title, H1, ersten 100 Wörtern, Meta Description
- 3-5 Nebenkeywords natürlich einbauen: ${article.tags.join(', ')}
- Mindestens eine Tabelle (z.B. Tool-Vergleich oder Methoden-Übersicht)
- Bullet-Listen für alle Aufzählungen
- Konkrete Zahlen und realistische Einschätzungen (kein Hype!)
- Gesamtlänge: 1800-2500 Wörter

Gib das Ergebnis als JSON zurück:
{
  "title": "...",
  "slug": "...(URL-freundlich, lowercase, mit Bindestrichen)...",
  "excerpt": "...(Teaser, max 160 Zeichen)...",
  "content": "...(vollständiger Markdown-Artikel mit allen Links)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: Marketing, Vertrieb, Produktivität, Content, Analyse, Automatisierung, Allgemein",
  "tags": ${JSON.stringify(article.tags)},
  "pricing": "Freemium",
  "rating": 4.5,
  "meta_title": "...(max 60 Zeichen, mit Keyword)...",
  "meta_description": "...(max 160 Zeichen, mit Keyword + CTA)..."
}`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    add_context_from_internet: true,
    model: "gemini_3_pro",
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

  const postData = {
    ...result,
    status: "published",
    published_at: today
  };

  const created = await base44.asServiceRole.entities.BlogPost.create(postData);

  return Response.json({
    success: true,
    keyword: article.keyword,
    post_id: created.id,
    title: result.title,
    message: `Artikel "${result.title}" wurde erfolgreich erstellt.`
  });
});