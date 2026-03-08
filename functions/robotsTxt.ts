Deno.serve(async (req) => {
  const url = new URL(req.url);
  const baseUrl = url.searchParams.get('base_url') || 'https://jakubkaczmarek.de';

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/generateSitemap?base_url=${baseUrl}
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    }
  });
});