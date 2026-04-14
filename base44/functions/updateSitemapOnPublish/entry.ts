import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// This function is triggered by entity automation when a BlogPost is created/updated.
// It re-submits the sitemap to Google Search Console so new posts get crawled.

const SITE_URLS = [
  'sc-domain:jakubkaczmarek.de',
  'https://jakubkaczmarek.de/',
];
const SITEMAP_URL = 'https://jakubkaczmarek.de/sitemap.xml';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Re-submit sitemap to Google Search Console
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    for (const siteUrl of SITE_URLS) {
      const response = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok || response.status === 204) {
        console.log(`Sitemap re-submitted after new BlogPost: ${siteUrl}`);
        return Response.json({ success: true });
      }
    }

    return Response.json({ success: false, note: 'GSC submission failed but continuing' });
  } catch (error) {
    console.error('updateSitemapOnPublish error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});