import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/Blog', priority: '0.9', changefreq: 'daily' },
  { path: '/KiAgentur', priority: '0.8', changefreq: 'monthly' },
  { path: '/Datenschutz', priority: '0.3', changefreq: 'yearly' },
  { path: '/Impressum', priority: '0.3', changefreq: 'yearly' },
];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const origin = req.headers.get('origin') || req.headers.get('referer') || '';
  const url = new URL(req.url);
  const baseUrl = url.searchParams.get('base_url') ||
    (origin ? new URL(origin).origin : 'https://jakubkaczmarek.de');

  const posts = await base44.asServiceRole.entities.BlogPost.filter(
    { status: 'published' },
    '-published_at',
    500
  );

  const today = new Date().toISOString().split('T')[0];

  const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  const staticEntries = STATIC_PAGES.map(page => `
  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const blogEntries = posts.map(post => `
  <url>
    <loc>${escapeXml(baseUrl + '/blog/' + post.slug)}</loc>
    <lastmod>${post.published_at || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    }
  });
});