import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let isAuthorized = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAuthorized = true;
    } catch {
      isAuthorized = true; // scheduled call
    }
    if (!isAuthorized) return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const offset = body.offset ?? 0;
    const batchSize = body.batch_size ?? 3;

    const allPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 200);
    const published = allPosts.filter(p => p.status === 'published');
    const batch = published.slice(offset, offset + batchSize);

    if (batch.length === 0) {
      return Response.json({ done: true, total: published.length, message: 'Alle Artikel wurden aktualisiert.' });
    }

    const today = new Date().toISOString().split('T')[0];
    let refreshed = 0;

    for (const post of batch) {
      const mainTopic = post.ai_tool_name || post.title;
      const keyword = post.meta_title || post.title;

      const prompt = `Du bist ein professioneller SEO-Texter und KI-Automatisierungs-Experte für den DACH-Markt.
Überarbeite den folgenden bestehenden Blogartikel vollständig auf den neuesten Stand (2026).

WEBSITE: jakubkaczmarek.de – KI-Automatisierungs-Spezialist für B2B im DACH-Raum.
ZIELGRUPPE: B2B-Entscheider, Freelancer, Unternehmer im DACH-Raum.

BESTEHENDER ARTIKEL:
Titel: ${post.title}
Thema/Tool: ${mainTopic}
Slug: ${post.slug}
Excerpt: ${post.excerpt || ''}
Aktueller Inhalt (Auszug): ${(post.body_html || post.content || '').substring(0, 800)}

AUFGABE: Schreibe den Artikel komplett neu mit aktuellen Informationen für 2026.

═══════════════════════════════════════════
🚨 WICHTIGSTE REGEL: KEIN MARKDOWN
═══════════════════════════════════════════
ALLE Inhalte als fertiges HTML ausgeben. Niemals **fett**, # Überschrift, | Tabelle |, - Liste in body_html.

═══════════════════════════════════════════
📐 BODY_HTML STRUKTUR (PFLICHT):
═══════════════════════════════════════════

1. INTRO: <p class="lead">[150–200 Wörter. Keyword in Satz 1–2. Problem benennen. Versprechen machen. Schlüsselbegriffe mit <strong> markieren.]</p>

2. ABSCHNITTE (5–7 H2-Sektionen):
   <h2>[Titel mit sekundärem Keyword]</h2>
   <p>[3–4 Sätze Fließtext. Immer "du" statt "man".]</p>
   Optional: <h3>[Unterabschnitt]</h3>

3. TOOL-CARD (für jedes vorgestellte Tool PFLICHT):
   <div class="tool-card">
     <div class="tool-card-header">
       <span class="tool-name">[Tool-Name]</span>
       <span class="tool-badge">[Kurz-Label]</span>
     </div>
     <p>[2–3 Sätze Praxisbeschreibung.]</p>
     <div class="pro-con-grid">
       <div class="pro-box"><div class="box-label">Stärken</div><ul class="box-list"><li>[Stärke 1]</li><li>[Stärke 2]</li><li>[Stärke 3]</li></ul></div>
       <div class="con-box"><div class="box-label">Schwächen</div><ul class="box-list"><li>[Schwäche 1]</li><li>[Schwäche 2]</li><li>[Schwäche 3]</li></ul></div>
     </div>
   </div>

4. VERGLEICHSTABELLE (mind. 1 PFLICHT):
   <div class="table-wrap"><table><thead><tr><th>Feature</th><th>[Spalte]</th></tr></thead>
   <tbody><tr><td>[Label]</td><td><span class="badge-good">[Gut]</span></td></tr></tbody></table></div>

5. CALLOUT (mind. 1 PFLICHT):
   <div class="callout"><div class="callout-label">💡 Praxis-Tipp</div><p>[Konkreter Tipp. 2–4 Sätze.]</p></div>

6. INTERNER LINK (1–2 PFLICHT):
   <div class="read-also"><span class="read-also-label">Weiterlesen</span><a href="/blog/[slug]">[Artikeltitel] →</a></div>

7. LISTEN:
   <ul><li><strong>[Begriff]</strong> — [Erklärung]</li></ul>
   <ol><li><strong>[Schritt]</strong> — [Erklärung]</li></ol>

8. FAQ (PFLICHT vor Fazit):
   <hr />
   <h2>Häufige Fragen zu ${mainTopic}</h2>
   <div class="faq-list">
     <div class="faq-item">
       <button class="faq-question" onclick="toggleFaq(this)">[Frage]<span class="faq-icon">+</span></button>
       <div class="faq-answer"><p>[Antwort. 2–4 Sätze.]</p></div>
     </div>
     [5–6 Fragen total]
   </div>

9. FAZIT + CTA (PFLICHT am Ende):
   <hr />
   <div class="fazit-box">
     <h2>Fazit</h2>
     <p>[Zusammenfassung 2–3 Sätze.]</p>
     <a href="/#cta" class="btn">Kostenloses Gespräch buchen</a>
     <a href="/Blog" class="btn-ghost">Mehr Artikel</a>
   </div>

═══════════════════════════════════════════
🚫 VERBOTENE BEGRIFFE:
═══════════════════════════════════════════
Game Changer, unlock, unleash, delve, revolutionieren, cutting-edge, synergy, transformative, bahnbrechend, wegweisend, visionär, disruptiv, nahtlos, Gedankenstriche (—), rhetorische Ein-Wort-Fragen, Digitale Transformation, Next-Level

✅ SCHREIBSTIL:
- Immer "du", nie "man" oder "der User"
- Konkrete Zahlen statt vager Aussagen
- Aktive Sprache: "du sparst 3 Stunden"
- Ehrliche Einschätzung inkl. Nachteile
- Autor-Perspektive: "In meiner Praxis..."
- Max. 3–4 Sätze pro Absatz

ARTIKEL-LÄNGE: 2000–3000 Wörter

Gib das Ergebnis als JSON zurück:
{
  "h1": "...(sichtbare H1, 50–80 Zeichen, Keyword enthalten)...",
  "excerpt": "...(150–160 Zeichen, Keyword + Nutzen + CTA)...",
  "body_html": "...(vollständiger HTML-Artikel nach obiger Struktur, KEIN Markdown)...",
  "reading_time": 8,
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
            h1: { type: "string" },
            excerpt: { type: "string" },
            body_html: { type: "string" },
            reading_time: { type: "number" },
            meta_title: { type: "string" },
            meta_description: { type: "string" }
          },
          required: ["h1", "body_html", "meta_title", "meta_description"]
        }
      });

      await base44.asServiceRole.entities.BlogPost.update(post.id, {
        h1: result.h1,
        excerpt: result.excerpt || post.excerpt,
        body_html: result.body_html,
        reading_time: result.reading_time || post.reading_time,
        meta_title: result.meta_title,
        meta_description: result.meta_description,
        published_at: post.published_at || today
      });

      console.log(`[INFO] Aktualisiert: ${post.slug}`);
      refreshed++;
    }

    return Response.json({
      total: published.length,
      batch: batchSize,
      offset,
      refreshed,
      next_offset: offset + batchSize,
      done: offset + batchSize >= published.length,
      message: `${refreshed} von ${batchSize} Artikeln aktualisiert (offset ${offset})`
    });

  } catch (error) {
    console.error(`[ERROR] refreshAllBlogPosts: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
});