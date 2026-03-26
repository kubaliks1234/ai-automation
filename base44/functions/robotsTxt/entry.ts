Deno.serve(async (_req) => {
  const baseUrl = 'https://jakubkaczmarek.de';

  const robots = `User-agent: *
Allow: /

# Keine Admin/Draft Seiten indexieren
Disallow: /admin
Disallow: /api/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    }
  });
});