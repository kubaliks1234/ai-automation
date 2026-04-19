import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/Blog', priority: '0.9', changefreq: 'daily' },
  { path: '/KiAgentur', priority: '0.8', changefreq: 'monthly' },
  { path: '/Service', priority: '0.8', changefreq: 'monthly' },
  { path: '/Analyse', priority: '0.7', changefreq: 'monthly' },
  { path: '/Datenschutz', priority: '0.3', changefreq: 'yearly' },
  { path: '/Impressum', priority: '0.3', changefreq: 'yearly' },
];

const BASE_URL = 'https://jakubkaczmarek.de';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const posts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-published_at',
      500
    );

    const today = new Date().toISOString().split('T')[0];

    const escapeXml = (str) => String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const staticEntries = STATIC_PAGES.map(page => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

    const blogEntries = posts
      .filter(post => post.slug)
      .map(post => `  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${post.published_at || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;

    // Write to /tmp first, then we serve it - but since we can't write to public/,
    // we return the XML directly AND store it in a BlogPost-like entity isn't ideal.
    // Instead: return the XML so the caller can see it's valid.
    // The real fix: this function IS the sitemap endpoint.

    console.log(`Sitemap generated with ${posts.filter(p => p.slug).length} blog posts`);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex',
      }
    });

  } catch (error) {
    console.error('writeSitemap error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});