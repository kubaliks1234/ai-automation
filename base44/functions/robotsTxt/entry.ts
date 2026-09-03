Deno.serve(async (_req) => {
  const baseUrl = 'https://jakubkaczmarek.de';

  const robots = `User-agent: *
Allow: /
Disallow: /SeoAdmin
Disallow: /backlink-manager
Disallow: /SeoOptimierung
Disallow: /Upsell
Disallow: /Analyse
Disallow: /oauth/
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    }
  });
});