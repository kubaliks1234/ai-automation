import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Step 1: Research trending keywords in niche via internet search
// Step 2: Pick the highest-volume keyword not yet covered
// Step 3: Write a full SEO blog post for that keyword

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Allow scheduled calls OR admin users
    let isAuthorized = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAuthorized = true;
    } catch {
      isAuthorized = true;
    }
    if (!isAuthorized) return Response.json({ error: 'Forbidden' }, { status: 403 });

    const today = new Date().toISOString().split('T')[0];

    // --- STEP 1: Get existing posts to avoid duplicates ---
    const existingPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 200);
    const existingSlugs = existingPosts.map(p => p.slug).filter(Boolean);
    const existingKeywords = existingPosts.map(p => p.meta_title || p.title || '').filter(Boolean);

    // Interne Links: 10 zufällige Artikel als Verlinkungspool
    const linkPool = existingPosts
      .filter(p => p.slug && (p.title || p.h1))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(p => `- /blog/${p.slug} → "${p.h1 || p.title}"`)
      .join('\n');

    // --- STEP 2: Keyword Research via LLM + Internet ---
    console.log('[keywordResearchBlogWriter] Starte Keyword-Recherche...');

    const keywordResearchResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Du bist ein SEO-Experte für den DACH-Markt (Deutschland, Österreich, Schweiz).

Analysiere aktuelle Suchanfragen und Trends in diesen Nischen für 2026:
1. KI-Automatisierung für B2B-Unternehmen (n8n, Make, Zapier)
2. KI-Tools für Marketing, Vertrieb, Content
3. AI-Recruiting und HR-Automatisierung
4. ChatGPT, Claude, Gemini - Vergleiche und Tutorials
5. Geld verdienen mit KI / KI im Business

Recherchiere JETZT aktuelle, viel gesuchte Keywords auf Google.de. Berücksichtige:
- Aktuelle Tool-Launches und Updates 2026
- Trending Topics auf Reddit, YouTube und LinkedIn DACH
- "People Also Ask" Fragen zu diesen Themen
- Long-Tail Keywords mit kommerzieller Absicht

Bereits abgedeckte Keywords (NICHT nochmal nehmen):
${existingKeywords.slice(0, 30).join('\n')}

Gib mir die 10 besten Keywords mit dem höchsten Suchvolumen zurück, die noch NICHT abgedeckt sind.`,
      add_context_from_internet: true,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: {
              type: "object",
              properties: {
                keyword: { type: "string" },
                monthly_searches: { type: "string" },
                intent: { type: "string" },
                article_type: { type: "string" },
                category: { type: "string" },
                suggested_title: { type: "string" }
              },
              required: ["keyword", "article_type", "category", "suggested_title"]
            }
          },
          trending_topics: { type: "array", items: { type: "string" } }
        },
        required: ["keywords"]
      }
    });

    console.log(`[keywordResearchBlogWriter] Gefundene Keywords: ${keywordResearchResult.keywords?.length || 0}`);
    if (keywordResearchResult.trending_topics?.length) {
      console.log(`[keywordResearchBlogWriter] Trending: ${keywordResearchResult.trending_topics.slice(0, 5).join(', ')}`);
    }

    // --- STEP 3: Pick best keyword not yet covered ---
    const keywords = keywordResearchResult.keywords || [];
    let selected = null;

    for (const kw of keywords) {
      const alreadyCovered = existingSlugs.some(slug =>
        slug.includes(kw.keyword.toLowerCase().replace(/\s+/g, '-').substring(0, 20))
      ) || existingKeywords.some(title =>
        title.toLowerCase().includes(kw.keyword.toLowerCase().substring(0, 15))
      );
      if (!alreadyCovered) {
        selected = kw;
        break;
      }
    }

    // Fallback: just take first keyword
    if (!selected && keywords.length > 0) {
      selected = keywords[0];
    }

    if (!selected) {
      return Response.json({ error: 'Keine neuen Keywords gefunden' }, { status: 404 });
    }

    console.log(`[keywordResearchBlogWriter] Ausgewähltes Keyword: "${selected.keyword}" (${selected.monthly_searches || 'unbekannt'} Suchen/Mo)`);

    // --- STEP 4: Write full SEO blog post ---
    const categoryOptions = ["Marketing", "Vertrieb", "Produktivität", "Content", "Analyse", "Automatisierung", "Allgemein"];
    const pricingOptions = ["Kostenlos", "Freemium", "Kostenpflichtig"];

    const articleTypeInstructions = {
      review: `Schreibe einen ehrlichen Tool-Test.
Struktur: Was ist das Tool? (H2) → Hauptfeatures (H2) mit Bullet-Liste → Preise & Pläne (H2) mit Tabelle → Vorteile & Nachteile (H2) → Für wen geeignet? (H2) → Schritt-für-Schritt Start (H2) → Fazit (H2) → FAQ (H2) mit 5 Fragen`,
      tutorial: `Schreibe ein praktisches Tutorial.
Struktur: Was lernst du? (H2) → Voraussetzungen (H2) → Schritt-für-Schritt Anleitung (H2) mit nummerierten Schritten → Tipps & häufige Fehler (H2) → Fazit (H2) → FAQ (H2) mit 5 Fragen`,
      vergleich: `Schreibe einen detaillierten Vergleich.
Struktur: Überblick (H2) → Feature-Vergleich Tabelle (H2) → Preisvergleich Tabelle (H2) → Stärken & Schwächen (H2) → Für wen ist was besser? (H2) → Fazit & Empfehlung (H2) → FAQ (H2) mit 5 Fragen`,
      ratgeber: `Schreibe einen informativen Ratgeber.
Struktur: Einfache Erklärung (H2) → Warum wichtig? (H2) → Konkrete Anwendungsbeispiele (H2) → Tipps für Einsteiger (H2) → Häufige Fehler vermeiden (H2) → Fazit (H2) → FAQ (H2) mit 5 Fragen`,
      liste: `Schreibe einen "Best of" Listen-Artikel.
Struktur: Warum diese Liste? (H2) → Top-Tools/Tipps nummeriert (H2 für jedes Item) mit Tool-Cards → Vergleichstabelle (H2) → Fazit & Empfehlung (H2) → FAQ (H2) mit 5 Fragen`
    };

    const typeKey = selected.article_type?.toLowerCase() || 'ratgeber';
    const instructions = articleTypeInstructions[typeKey] || articleTypeInstructions.ratgeber;

    const prompt = `Du bist ein professioneller SEO-Texter und KI-Automatisierungs-Experte für den DACH-Markt.

DIE WEBSITE: jakubkaczmarek.de – KI-Automatisierungs-Spezialist für den deutschen B2B-Markt.
ZIELGRUPPE: B2B-Entscheider, Freelancer, Unternehmer im DACH-Raum.

THEMA: "${selected.suggested_title}"
ARTIKEL-TYP: ${selected.article_type?.toUpperCase() || 'RATGEBER'}
PRIMÄR-KEYWORD: "${selected.keyword}"
SUCHINTENTION: ${selected.intent || 'informational + commercial'}

${instructions}

═══════════════════════════════════════════
🚨 WICHTIGSTE REGEL: KEIN MARKDOWN
═══════════════════════════════════════════
Schreibe NIEMALS Markdown. Kein **fett**, kein # Überschrift, kein | Tabelle |, kein - Liste.
ALLE Inhalte als fertiges HTML ausgeben.

═══════════════════════════════════════════
📐 BODY_HTML STRUKTUR:
═══════════════════════════════════════════

1. INTRO: <p class="lead">[150–200 Wörter. Keyword in Satz 1–2. Problem + Versprechen. <strong> für Schlüsselbegriffe.]</p>

2. ABSCHNITTE (4–7 H2-Sektionen):
   <h2>[Titel mit sekundärem Keyword]</h2>
   <p>[3–4 Sätze. Immer "du" statt "man".]</p>

3. TOOL-CARD (für Tools PFLICHT):
   <div class="tool-card"><div class="tool-card-header"><span class="tool-name">[Name]</span><span class="tool-badge">[Label]</span></div><p>[2–3 Sätze]</p><div class="pro-con-grid"><div class="pro-box"><div class="box-label">Stärken</div><ul class="box-list"><li>[1]</li><li>[2]</li><li>[3]</li></ul></div><div class="con-box"><div class="box-label">Schwächen</div><ul class="box-list"><li>[1]</li><li>[2]</li><li>[3]</li></ul></div></div></div>

4. VERGLEICHSTABELLE (mind. 1):
   <div class="table-wrap"><table><thead><tr><th>Feature</th><th>[Spalte]</th></tr></thead><tbody><tr><td>[Label]</td><td><span class="badge-good">[Gut]</span></td></tr></tbody></table></div>

5. CALLOUT (mind. 1):
   <div class="callout"><div class="callout-label">💡 Praxis-Tipp</div><p>[Konkreter Tipp. 2–4 Sätze.]</p></div>

6. INTERNE LINKS (2–3 PFLICHT) – Nur echte Slugs aus dieser Liste verwenden:
${linkPool}
   Format: <div class="read-also"><span class="read-also-label">Weiterlesen</span><a href="/blog/[slug]">[Artikeltitel] →</a></div>

7. FAQ (PFLICHT vor Fazit):
   <hr /><h2>Häufige Fragen zu ${selected.keyword}</h2>
   <div class="faq-list"><div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">[Frage]<span class="faq-icon">+</span></button><div class="faq-answer"><p>[Antwort 2–4 Sätze.]</p></div></div></div>

8. FAZIT + CTA:
   <hr /><div class="fazit-box"><h2>Fazit</h2><p>[Zusammenfassung 2–3 Sätze.]</p><a href="/#cta" class="btn">Kostenloses Gespräch buchen</a><a href="/blog" class="btn-ghost">Mehr Artikel</a></div>

🚫 VERBOTENE BEGRIFFE: Game Changer, unlock, unleash, delve, revolutionieren, cutting-edge, synergy, transformative, bahnbrechend, wegweisend, visionär, disruptiv, nahtlos

✅ SCHREIBSTIL: Immer "du" | Konkrete Zahlen | Aktive Sprache | Ehrliche Einschätzung inkl. Nachteile | "In meiner Praxis..."
LÄNGE: 2000–3000 Wörter

JSON-Ausgabe:
{
  "title": "...(Keyword an Position 1, max 70 Zeichen)...",
  "h1": "...(sichtbare H1, 50–80 Zeichen, Keyword enthalten)...",
  "slug": "...(lowercase, Bindestriche, kein Datum)...",
  "excerpt": "...(150–160 Zeichen, Keyword + Nutzen + CTA)...",
  "body_html": "...(vollständiger HTML-Artikel, KEIN Markdown)...",
  "schema_json": "{\\"@context\\": \\"https://schema.org\\", \\"@type\\": \\"Article\\", \\"headline\\": \\"...\\", \\"description\\": \\"...\\", \\"author\\": {\\"@type\\": \\"Person\\", \\"name\\": \\"Jakub Kaczmarek\\"}, \\"datePublished\\": \\"${today}\\"}",
  "reading_time": 8,
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: ${categoryOptions.join(', ')}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "ai_tool_name": "",
  "ai_tool_url": "",
  "pricing": "eines von: ${pricingOptions.join(', ')}",
  "rating": 4.3,
  "meta_title": "...(max 60 Zeichen, Keyword vorne)...",
  "meta_description": "...(150–160 Zeichen, Keyword + Nutzen + CTA)..."
}`;

    const articleResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
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
          ai_tool_name: { type: "string" },
          ai_tool_url: { type: "string" },
          pricing: { type: "string" },
          rating: { type: "number" },
          meta_title: { type: "string" },
          meta_description: { type: "string" }
        },
        required: ["title", "slug", "body_html", "excerpt", "category"]
      }
    });

    // Check for slug conflicts
    let finalSlug = articleResult.slug || selected.keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (existingSlugs.includes(finalSlug)) {
      finalSlug = `${finalSlug}-2026`;
    }

    const postData = {
      ...articleResult,
      slug: finalSlug,
      category: selected.category || articleResult.category,
      status: "published",
      published_at: today
    };

    const created = await base44.asServiceRole.entities.BlogPost.create(postData);

    console.log(`[keywordResearchBlogWriter] ✅ Artikel erstellt: "${articleResult.title}"`);
    console.log(`[keywordResearchBlogWriter] Keyword: "${selected.keyword}" | Slug: ${finalSlug}`);

    return Response.json({
      success: true,
      keyword: selected.keyword,
      monthly_searches: selected.monthly_searches,
      article_type: selected.article_type,
      post_id: created.id,
      title: articleResult.title,
      slug: finalSlug,
      trending_topics: keywordResearchResult.trending_topics || [],
      message: `Artikel "${articleResult.title}" für Keyword "${selected.keyword}" wurde erstellt.`
    });

  } catch (error) {
    console.error(`[keywordResearchBlogWriter ERROR]: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
});