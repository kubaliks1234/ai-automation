import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// SEO-Guide Keywords: jakubkaczmarek.de BOFU→MOFU Strategie
const GUIDE_KEYWORDS = {
  bofu: ["KI Automatisierung Spezialist", "n8n Automatisierung Agentur", "KI Consultant Deutschland", "AI Automation Freelancer Deutschland", "n8n Workflow Entwickler", "Marketing Automatisierung KI", "KI Recruiting Automatisierung", "Automatisierung Berater DACH"],
  mofu: ["KI Automatisierung B2B", "n8n Tutorial Deutsch", "Marketing mit KI automatisieren", "Recruiting Automatisierung", "KI Tools für Unternehmen 2026", "LinkedIn Automatisierung legal", "ElevenLabs n8n verbinden", "WhatsApp Automatisierung Business", "Perplexity API Integration"],
};

// Keyword-Mapping nach Kategorie
const CATEGORY_KEYWORDS = {
  "Automatisierung": ["KI Automatisierung", "n8n Automatisierung", "Workflow Automatisierung", "Automatisierung DACH", "n8n Tutorial"],
  "Marketing": ["Marketing Automatisierung KI", "KI Marketing B2B", "LinkedIn Automatisierung", "Content Automatisierung"],
  "Vertrieb": ["KI Leadgenerierung B2B", "Vertrieb Automatisierung KI", "AI Automation Freelancer", "CRM Automatisierung"],
  "Produktivität": ["KI Tools Unternehmen 2026", "Produktivität KI", "Prompt Engineering B2B"],
  "Content": ["KI Content Erstellung", "Content Pipeline KI", "ElevenLabs Voice Agent"],
  "Analyse": ["KI Analyse Tools", "Perplexity AI", "AI Research Automatisierung"],
  "Allgemein": ["KI Automatisierung DACH", "KI Spezialist Deutschland", "KI Consultant"],
};

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
    if (!isAuthorized) return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const postIds = body.post_ids || null; // optional: specific post IDs
    const batchSize = body.batch_size || 10;

    const allPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 200);
    const posts = postIds
      ? allPosts.filter(p => postIds.includes(p.id))
      : allPosts.filter(p => p.status === 'published');

    const batch = posts.slice(0, batchSize);

    let updated = 0;
    const results = [];

    for (const post of batch) {
      const catKeywords = CATEGORY_KEYWORDS[post.category] || CATEGORY_KEYWORDS["Allgemein"];
      const keywords = catKeywords.slice(0, 3).join(', ');

      const seo = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `Du bist SEO-Experte für jakubkaczmarek.de (KI-Automatisierung Spezialist DACH, B2B).
Optimiere diesen Blog-Beitrag für maximale Sichtbarkeit in Deutschland.

STRATEGIE: BOFU→MOFU Trichter. Positionierung: KI-Automatisierung Spezialist DACH.
BOFU Keywords (höchste Kaufabsicht): ${GUIDE_KEYWORDS.bofu.join(', ')}
MOFU Keywords: ${GUIDE_KEYWORDS.mofu.join(', ')}

AKTUELLER BEITRAG:
Titel: ${post.title}
Kategorie: ${post.category}
Excerpt: ${post.excerpt || ''}
Meta Title: ${post.meta_title || ''}
Meta Description: ${post.meta_description || ''}

THEMATISCH PASSENDE KEYWORDS für diese Kategorie: ${keywords}

AUFGABE: Erstelle optimierte SEO-Felder. Regeln:
- Meta Title: max. 60 Zeichen, Hauptkeyword an Position 1, kein Datum nötig
- Meta Description: max. 160 Zeichen, Keyword + konkreter Nutzen + CTA ("Jetzt lesen", "Hier mehr erfahren")
- Excerpt: max. 200 Zeichen, ansprechend, enthält Keyword
- KEINE verbotenen Wörter: bahnbrechend, revolutionär, wegweisend, Game Changer, cutting-edge, transformativ
- Kein Gedankenstrich (—), keine rhetorischen Einwort-Fragen
- Sprache: Deutsch, direkt, konkret`,
        response_json_schema: {
          type: "object",
          properties: {
            meta_title: { type: "string" },
            meta_description: { type: "string" },
            excerpt: { type: "string" },
          },
          required: ["meta_title", "meta_description", "excerpt"]
        }
      });

      await base44.asServiceRole.entities.BlogPost.update(post.id, {
        meta_title: seo.meta_title,
        meta_description: seo.meta_description,
        excerpt: seo.excerpt,
      });

      console.log(`[OK] "${post.title}" → Meta: "${seo.meta_title}" (${seo.meta_title?.length}Z)`);
      results.push({ id: post.id, title: post.title, meta_title: seo.meta_title, meta_description: seo.meta_description });
      updated++;
    }

    return Response.json({
      success: true,
      total_posts: posts.length,
      updated,
      remaining: Math.max(0, posts.length - batchSize),
      results
    });

  } catch (error) {
    console.error(`[ERROR] bulkSeoOptimize: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
});