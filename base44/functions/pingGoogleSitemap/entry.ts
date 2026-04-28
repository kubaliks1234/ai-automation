import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Pings Google to re-fetch the sitemap and prewarms the prerender cache for new/updated posts
// Called by entity automation when BlogPost is created or updated

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    let body = {};
    try { body = await req.json(); } catch { /* no body */ }

    const slug = body.event?.entity_id
      ? (await base44.asServiceRole.entities.BlogPost.filter({ slug: body.data?.slug || '' }, '-updated_date', 1))[0]?.slug
      : body.slug;

    const results = [];

    // 1. Re-submit sitemap to Google Search Console
    const siteUrl = encodeURIComponent('sc-domain:jakubkaczmarek.de');
    const sitemapUrl = encodeURIComponent('https://jakubkaczmarek.de/sitemap.xml');
    const sitemapRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/sitemaps/${sitemapUrl}`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }
    );
    results.push({ action: 'sitemap_submit', status: sitemapRes.status, ok: sitemapRes.status === 200 });
    console.log(`[pingGoogleSitemap] Sitemap submit → ${sitemapRes.status}`);

    // 2. If we have a specific slug, prewarm prerender cache by self-fetching
    if (slug) {
      const prerenderUrl = `https://jakubkaczmarek.de/blog/${slug}`;
      // Fetch via prerenderBlogPost to warm it up
      const prerenderRes = await fetch(
        `https://app.base44.com/api/apps/69a7f4930f0e951070ab8bb0/functions/prerenderBlogPost?slug=${encodeURIComponent(slug)}`,
        { method: 'GET', headers: { 'User-Agent': 'Googlebot/2.1' } }
      );
      results.push({ action: 'prerender_warmup', slug, status: prerenderRes.status, ok: prerenderRes.ok });
      console.log(`[pingGoogleSitemap] Prerender warmup ${slug} → ${prerenderRes.status}`);
    }

    return Response.json({ success: true, results });
  } catch (error) {
    console.error('pingGoogleSitemap error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});