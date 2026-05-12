import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const BASE_URL = 'https://jakubkaczmarek.de';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
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
    <loc>${escapeXml(BASE_URL + page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const blogEntries = posts.map(post => `
  <url>
    <loc>${escapeXml('https://jakubkaczmarek.de/blog/' + post.slug)}</loc>
    <lastmod>${post.updated_date ? post.updated_date.split('T')[0] : (post.published_at || today)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex',
    }
  });
});