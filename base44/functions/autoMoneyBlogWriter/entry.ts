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

      // === 🔥 GELD-KEYWORDS (Buyer Intent) ===
      { title: "Beste KI Tools 2026: Die Top AI Software im großen Vergleich", keyword: "beste ki tools 2026", tags: ["KI Tools", "2026", "Vergleich", "AI Software", "Empfehlung"] },
      { title: "KI Tools Vergleich 2026: Welches Tool lohnt sich wirklich?", keyword: "ki tools vergleich", tags: ["KI Tools", "Vergleich", "2026", "Bewertung", "Kaufberatung"] },
      { title: "AI Tools for Business: Die besten Lösungen für Unternehmen", keyword: "ai tools for business", tags: ["AI Tools", "Business", "Unternehmen", "B2B", "Produktivität"] },
      { title: "Beste ChatGPT Alternativen 2026: 8 Tools im ehrlichen Test", keyword: "beste chatgpt alternativen", tags: ["ChatGPT", "Alternativen", "AI Tools", "Vergleich", "2026"] },
      { title: "AI Tools für Marketing: Diese 7 Tools sparen dir Stunden täglich", keyword: "ai tools für marketing", tags: ["AI Tools", "Marketing", "Automatisierung", "Content", "2026"] },
      { title: "AI Tools für Geld verdienen: So nutzt du KI für Einnahmen online", keyword: "ai tools für geld verdienen", tags: ["AI Tools", "Geld verdienen", "Online Business", "Affiliate", "2026"] },
      { title: "AI Tools für Selbstständige: Die besten Helfer für Freelancer 2026", keyword: "ai tools für selbstständige", tags: ["AI Tools", "Selbstständige", "Freelancer", "Produktivität", "DACH"] },
      { title: "AI Automation Tools kaufen: Worauf du achten musst", keyword: "ai automation tools kaufen", tags: ["AI Automation", "Tools", "Kaufen", "Vergleich", "B2B"] },
      { title: "Die 7 KI Tools die dir 10 Stunden Arbeit pro Woche sparen", keyword: "ki tools zeit sparen", tags: ["KI Tools", "Zeit sparen", "Produktivität", "Automatisierung", "2026"] },
      { title: "Ich habe 23 KI Tools getestet – diese 5 sind wirklich gut", keyword: "ki tools erfahrungsberichte test", tags: ["KI Tools", "Test", "Erfahrung", "Empfehlung", "Vergleich"] },

      // === 🧲 PROBLEM-KEYWORDS (Pain Points) ===
      { title: "Texte schreiben automatisch mit KI: Die besten Tools im Vergleich", keyword: "texte schreiben automatisch ki", tags: ["Texte schreiben", "KI", "Automatisch", "AI Writer", "Content"] },
      { title: "Bilder erstellen mit KI kostenlos: Die besten Gratis-Tools 2026", keyword: "bilder erstellen ki kostenlos", tags: ["Bilder erstellen", "KI", "Kostenlos", "AI Art", "Midjourney"] },
      { title: "Videos erstellen mit KI: So geht es schnell und einfach 2026", keyword: "videos erstellen ki", tags: ["Videos erstellen", "KI", "Video AI", "Content", "2026"] },
      { title: "Zeit sparen im Business mit KI: 10 sofort umsetzbare Strategien", keyword: "zeit sparen im business ki", tags: ["Zeit sparen", "Business", "KI", "Effizienz", "Automatisierung"] },
      { title: "Automatisierung im Marketing: Schritt-für-Schritt Guide 2026", keyword: "automatisierung im marketing", tags: ["Automatisierung", "Marketing", "Guide", "Tools", "B2B"] },
      { title: "Content erstellen ohne Aufwand: KI Tools die wirklich funktionieren", keyword: "content erstellen ohne aufwand ki", tags: ["Content", "KI", "Automatisierung", "Creator", "Marketing"] },
      { title: "Passives Einkommen mit Online Tools aufbauen: Realistische Wege", keyword: "passives einkommen online tools", tags: ["Passives Einkommen", "Online Tools", "Business", "Nebenverdienst", "KI"] },

      // === 💡 HOW-TO KEYWORDS ===
      { title: "Wie funktioniert KI? Einfach erklärt für Selbstständige & Unternehmer", keyword: "wie funktioniert ki", tags: ["KI", "Erklärung", "Einsteiger", "Unternehmer", "Grundlagen"] },
      { title: "Wie nutze ich ChatGPT richtig? 12 Profi-Tipps für 2026", keyword: "wie nutze ich chatgpt richtig", tags: ["ChatGPT", "Tipps", "Anleitung", "Prompts", "2026"] },
      { title: "Wie mit KI Geld verdienen? 9 bewährte Methoden für 2026", keyword: "wie mit ki geld verdienen", tags: ["KI", "Geld verdienen", "Methoden", "Online Business", "2026"] },
      { title: "Wie automatisiere ich mein Business? Der komplette Einstieg", keyword: "wie automatisiere ich mein business", tags: ["Business", "Automatisierung", "Anleitung", "KI", "Einsteiger"] },
      { title: "Wie erstelle ich Content mit KI? Schritt-für-Schritt Anleitung", keyword: "wie erstelle ich content mit ki", tags: ["Content", "KI", "Anleitung", "Creator", "Marketing"] },
      { title: "AI Prompts Beispiele: Die besten Prompts für deinen Business-Alltag", keyword: "ai prompts beispiele", tags: ["AI Prompts", "ChatGPT", "Beispiele", "Business", "Tipps"] },

      // === ⚔️ TOOL VS TOOL ===
      { title: "ChatGPT vs Jasper: Welches KI-Schreibtool lohnt sich 2026?", keyword: "chatgpt vs jasper", tags: ["ChatGPT", "Jasper", "Vergleich", "AI Writer", "2026"] },
      { title: "Midjourney vs DALL-E: Der ehrliche Bildgenerator-Vergleich 2026", keyword: "midjourney vs dall-e", tags: ["Midjourney", "DALL-E", "Vergleich", "Bilder KI", "2026"] },
      { title: "Beste AI Writer Tools 2026: Die Top 6 im direkten Vergleich", keyword: "beste ai writer tools", tags: ["AI Writer", "Tools", "Vergleich", "Content", "2026"] },
      { title: "Notion AI vs ChatGPT: Welches Tool passt besser zu dir?", keyword: "notion ai vs chatgpt", tags: ["Notion AI", "ChatGPT", "Vergleich", "Produktivität", "2026"] },
      { title: "Canva AI vs Midjourney: Was ist besser für dein Business?", keyword: "canva ai vs midjourney", tags: ["Canva AI", "Midjourney", "Vergleich", "Design", "2026"] },

      // === 🚀 TREND & HYPE KEYWORDS ===
      { title: "Neue KI Tools 2026: Diese Releases musst du kennen", keyword: "neue ki tools 2026", tags: ["Neue KI Tools", "2026", "Trends", "Releases", "AI"] },
      { title: "AI Trends 2026: Was du jetzt wissen musst", keyword: "ai trends 2026", tags: ["AI Trends", "2026", "KI", "Zukunft", "Business"] },
      { title: "Neue ChatGPT Features 2026: Die wichtigsten Updates erklärt", keyword: "neue chatgpt features 2026", tags: ["ChatGPT", "Features", "Updates", "2026", "OpenAI"] },
      { title: "Top AI Tools kostenlos: Die besten Gratis-KI-Tools im Überblick", keyword: "top ai tools kostenlos", tags: ["AI Tools", "Kostenlos", "Gratis", "Überblick", "2026"] },
      { title: "AI Tools Liste 2026: Über 30 Tools für jeden Einsatzbereich", keyword: "ai tools liste 2026", tags: ["AI Tools", "Liste", "Überblick", "2026", "Vergleich"] },

      // === 🎯 ULTRA-NICHE KEYWORDS ===
      { title: "KI Tools für Immobilienmakler: So sparst du 60% deiner Zeit", keyword: "ki tools für immobilienmakler", tags: ["KI Tools", "Immobilienmakler", "Nische", "Automatisierung", "2026"] },
      { title: "KI Tools für Coaches: Diese 7 Tools transformieren dein Coaching-Business", keyword: "ki tools für coaches", tags: ["KI Tools", "Coaches", "Coaching", "Business", "Automatisierung"] },
      { title: "KI Tools für Studenten: Mit KI schneller studieren und besser lernen", keyword: "ki tools für studenten", tags: ["KI Tools", "Studenten", "Lernen", "Universität", "2026"] },
      { title: "KI Tools für TikTok Content: So erstellst du viralen Content auf Autopilot", keyword: "ki tools für tiktok content", tags: ["KI Tools", "TikTok", "Content", "Social Media", "Viral"] },
      { title: "KI Tools für Etsy Seller: Mehr Umsatz mit weniger Aufwand", keyword: "ki tools für etsy seller", tags: ["KI Tools", "Etsy", "E-Commerce", "Seller", "Automatisierung"] },
    ];

    const remaining = articlePool.filter(a =>
      !existingTitles.some(t => t.includes(a.keyword.toLowerCase()) || t.includes(a.title.toLowerCase().slice(0, 20)))
    );

    const article = remaining.length > 0
      ? remaining[Math.floor(Math.random() * remaining.length)]
      : articlePool[Math.floor(Math.random() * articlePool.length)];

    const today = new Date().toISOString().split('T')[0];

    console.log(`[INFO] Starte Artikel-Generierung: "${article.title}"`);

    // Step 1: Metadaten schnell generieren (kein body_html → kein Timeout)
    const metaPrompt = `Du bist SEO-Texter für jakubkaczmarek.de (KI-Automatisierung, DACH, B2B).
Erstelle NUR die Metadaten für diesen Artikel als JSON. KEIN body_html.

Titel: "${article.title}"
Keyword: "${article.keyword}"
Tags: ${article.tags.join(', ')}
Datum: ${today}

JSON-Ausgabe:
{
  "title": "...(Keyword vorne)...",
  "h1": "...(50–80 Zeichen)...",
  "slug": "...(lowercase, Bindestriche)...",
  "excerpt": "...(150–160 Zeichen, Keyword + Nutzen)...",
  "meta_title": "...(max 60 Zeichen)...",
  "meta_description": "...(150–160 Zeichen)...",
  "category": "Automatisierung",
  "cover_image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
  "reading_time": 7,
  "rating": 4.5
}`;

    const meta = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: metaPrompt,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          h1: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          meta_title: { type: "string" },
          meta_description: { type: "string" },
          category: { type: "string" },
          cover_image: { type: "string" },
          reading_time: { type: "number" },
          rating: { type: "number" }
        },
        required: ["title", "slug", "excerpt", "category"]
      }
    });

    console.log(`[INFO] Meta generiert: "${meta.title}"`);

    // Step 2: body_html separat generieren
    const bodyPrompt = `Du bist SEO-Texter. Schreibe den vollständigen HTML-Artikel auf Deutsch.
KEIN Markdown. Nur fertiges HTML.

Artikel: "${meta.title}"
Keyword: "${article.keyword}"

STRUKTUR (PFLICHT):
1. <p class="lead">[Intro, Keyword in Satz 1, Problem + Versprechen, <strong>Schlüsselbegriffe</strong>]</p>
2. Mind. 5x <h2>[Abschnitt]</h2> mit je 2–3 <p> Absätzen
3. Mind. 1 <div class="tool-card"> mit Pro/Con-Grid
4. Mind. 1 <div class="table-wrap"><table>...</table></div>
5. Mind. 1 <div class="callout"><div class="callout-label">💡 Tipp</div><p>...</p></div>
6. FAQ: <div class="faq-list"> mit 4–5 <div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">[Frage]<span class="faq-icon">+</span></button><div class="faq-answer"><p>...</p></div></div>
7. Fazit: <div class="fazit-box"><h2>Fazit</h2><p>...</p><a href="/#cta" class="btn">Kostenloses Gespräch buchen</a></div>

VERBOTEN: Markdown, "Game Changer", "bahnbrechend", "nahtlos", Gedankenstriche (—)
STIL: "du" statt "man", 1800–2500 Wörter, konkrete Zahlen

Gib NUR den HTML-String zurück, kein JSON-Wrapper.`;

    const bodyResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: bodyPrompt,
      model: "gemini_3_flash"
    });

    console.log(`[INFO] Body HTML generiert (${bodyResult?.length || 0} Zeichen)`);

    const postData = {
      ...meta,
      tags: article.tags,
      body_html: typeof bodyResult === 'string' ? bodyResult : JSON.stringify(bodyResult),
      status: "published",
      published_at: today
    };

    const created = await base44.asServiceRole.entities.BlogPost.create(postData);

    console.log(`[INFO] Artikel erfolgreich erstellt mit ID: ${created.id}`);

    return Response.json({
      success: true,
      keyword: article.keyword,
      post_id: created.id,
      title: postData.title,
      message: `Artikel "${postData.title}" wurde erfolgreich erstellt.`
    });

  } catch (error) {
    console.error(`[ERROR] autoMoneyBlogWriter fehlgeschlagen: ${error.message}`);
    console.error(error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
});