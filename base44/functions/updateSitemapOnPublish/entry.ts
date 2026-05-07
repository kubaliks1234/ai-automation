import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Triggered by entity automation when a BlogPost is created/updated with status=published.
// 1. Notifies Google Indexing API immediately for instant crawl request
// 2. Re-submits the sitemap to Google Search Console

const SITEMAP_URL = 'https://jakubkaczmarek.de/functions/generateSitemap';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // Parse entity automation payload
    let slug = null;
    try {
      const body = await req.json();
      slug = body?.data?.slug || null;
    } catch { /* no body / not automation */ }

    const results = {};

    // --- 1. Google Indexing API: instant crawl request ---
    if (slug) {
      const postUrl = `https://jakubkaczmarek.de/blog/${slug}`;
      const indexRes = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: postUrl, type: 'URL_UPDATED' }),
      });
      const indexData = await indexRes.json();
      results.indexing = {
        url: postUrl,
        status: indexRes.status,
        success: indexRes.ok,
        notifyTime: indexData.urlNotificationMetadata?.latestUpdate?.notifyTime || null,
        error: !indexRes.ok ? (indexData.error?.message || JSON.stringify(indexData)) : null,
      };
      console.log(`[updateSitemapOnPublish] Indexing API ${postUrl} → ${indexRes.status}`);
    } else {
      console.log('[updateSitemapOnPublish] Kein Slug gefunden – überspringe Indexing API');
      results.indexing = { skipped: true, reason: 'no slug in payload' };
    }

    // --- 2. Sitemap re-submit to GSC ---
    const sitemapRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:jakubkaczmarek.de')}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }
    );
    results.sitemap = { status: sitemapRes.status, success: sitemapRes.ok || sitemapRes.status === 204 };
    console.log(`[updateSitemapOnPublish] Sitemap submit → ${sitemapRes.status}`);

    return Response.json({ success: true, slug, results });
  } catch (error) {
    console.error('[updateSitemapOnPublish] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});