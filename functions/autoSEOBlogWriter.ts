import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
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
  const existingTools = existingPosts.map(p => p.ai_tool_name).filter(Boolean);
  const existingTitles = existingPosts.map(p => p.title).filter(Boolean);

  const toolPool = [
    "Claude AI", "Midjourney", "Jasper AI", "Copy.ai", "Notion AI",
    "GitHub Copilot", "Synthesia", "HeyGen", "ElevenLabs", "Descript",
    "Fireflies.ai", "Otter.ai", "n8n", "Apollo.io", "Lemlist",
    "Instantly.ai", "Surfer SEO", "Semrush AI", "Gemini", "Mistral AI",
    "Runway ML", "Canva AI", "Grammarly AI", "Loom AI", "Zapier AI",
    "Writesonic", "Rytr", "Pictory", "InVideo AI", "Murf AI",
    "Beautiful.ai", "Tome AI", "Gamma AI", "Kling AI", "Sora",
    "Grok", "Pika Labs", "Adobe Firefly", "Leonardo AI", "Ideogram",
    "Perplexity AI", "ChatGPT"
  ];

  const remaining = toolPool.filter(t => !existingTools.includes(t));
  const toolName = remaining.length > 0
    ? remaining[Math.floor(Math.random() * remaining.length)]
    : toolPool[Math.floor(Math.random() * toolPool.length)];

  const today = new Date().toISOString().split('T')[0];

  const categoryOptions = ["Marketing", "Vertrieb", "Produktivität", "Content", "Analyse", "Automatisierung", "Allgemein"];
  const pricingOptions = ["Kostenlos", "Freemium", "Kostenpflichtig"];

  const prompt = `Du bist ein professioneller SEO-Texter und KI-Experte. Schreibe einen vollständigen, SEO-optimierten Artikel auf Deutsch über "${toolName}".

Der Artikel muss folgende Struktur haben:
- H1 Titel mit Hauptkeyword
- Einleitung (ca. 150 Wörter)
- Was ist ${toolName}? (H2)
- Hauptfeatures (H2) – als Bullet-Liste
- Preise & Pläne (H2) – mit Tabelle
- Vorteile & Nachteile (H2)
- Für wen ist ${toolName} geeignet? (H2)
- Schritt-für-Schritt: So startest du (H2)
- Fazit (H2)
- FAQ (H2) – 5 Fragen & Antworten

Gesamtlänge: 1500-2000 Wörter. Verwende echte, aktuelle Informationen. Schreibe natürlich und hilfreich.

Gib mir das Ergebnis als JSON mit diesen Feldern:
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "...(vollständiger Markdown-Artikel)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: ${categoryOptions.join(', ')}",
  "tags": ["tag1", "tag2", ...],
  "ai_tool_name": "${toolName}",
  "ai_tool_url": "https://...",
  "pricing": "eines von: ${pricingOptions.join(', ')}",
  "rating": 4.2,
  "meta_title": "...(max 60 Zeichen)...",
  "meta_description": "...(max 160 Zeichen)..."
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
    status: "published",
    published_at: today
  };

  const created = await base44.asServiceRole.entities.BlogPost.create(postData);

  return Response.json({
    success: true,
    tool: toolName,
    post_id: created.id,
    title: result.title,
    message: `Artikel "${result.title}" wurde erfolgreich erstellt.`
  });
});