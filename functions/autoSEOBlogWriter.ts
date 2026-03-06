import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Allow scheduled calls (no user) OR admin users
  let isAuthorized = false;
  try {
    const user = await base44.auth.me();
    if (user?.role === 'admin') isAuthorized = true;
  } catch {
    // Called from scheduler (no user context) — use service role
    isAuthorized = true;
  }

  if (!isAuthorized) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get list of already existing tool names to avoid duplicates
  const existingPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 100);
  const existingTools = existingPosts.map(p => p.ai_tool_name).filter(Boolean);

  // Pool of KI tools to write about
  const toolPool = [
    "Claude AI", "Midjourney", "Jasper AI", "Copy.ai", "Notion AI",
    "GitHub Copilot", "Synthesia", "HeyGen", "ElevenLabs", "Descript",
    "Fireflies.ai", "Otter.ai", "n8n", "Apollo.io", "Lemlist",
    "Instantly.ai", "Surfer SEO", "Semrush AI", "Gemini", "Mistral AI",
    "Runway ML", "Canva AI", "Grammarly AI", "Loom AI", "Zapier AI",
    "Writesonic", "Rytr", "Pictory", "InVideo AI", "Murf AI",
    "Beautiful.ai", "Tome AI", "Gamma AI", "Kling AI", "Sora",
    "Grok", "Pika Labs", "Adobe Firefly", "Leonardo AI", "Ideogram"
  ];

  const remaining = toolPool.filter(t => !existingTools.includes(t));
  const toolName = remaining.length > 0
    ? remaining[Math.floor(Math.random() * remaining.length)]
    : toolPool[Math.floor(Math.random() * toolPool.length)];

  // Trigger the agent conversation to write the article
  const conversation = await base44.asServiceRole.agents.createConversation({
    agent_name: "seo_blog_writer",
    metadata: { name: `Auto-Artikel: ${toolName}`, source: "scheduler" }
  });

  await base44.asServiceRole.agents.addMessage(conversation, {
    role: "user",
    content: `Schreibe jetzt einen vollständigen, SEO-optimierten Artikel über "${toolName}". Prüfe zuerst ob das Tool bereits existiert, dann schreibe den Artikel und speichere ihn direkt als BlogPost mit status="published".`
  });

  return Response.json({
    success: true,
    tool: toolName,
    conversation_id: conversation.id,
    message: `Artikel-Erstellung für "${toolName}" gestartet.`
  });
});