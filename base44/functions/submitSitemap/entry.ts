import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Try domain property first, then URL prefix property
const SITE_URLS = [
  'sc-domain:jakubkaczmarek.de',
  'https://jakubkaczmarek.de/',
  'https://jakubkaczmarek.de'
];
const SITEMAP_URL = 'https://jakubkaczmarek.de/functions/generateSitemap';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // Try each site URL format until one works
    let lastError = null;
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
        console.log(`Sitemap successfully submitted via site: ${siteUrl}`);
        return Response.json({ success: true, message: 'Sitemap erfolgreich eingereicht', sitemap: SITEMAP_URL, siteUrl });
      }

      const errorText = await response.text();
      console.warn(`Failed with site URL ${siteUrl}:`, errorText);
      lastError = errorText;
    }

    console.error('All site URL formats failed. Last error:', lastError);
    return Response.json({ success: false, error: lastError }, { status: 403 });

  } catch (error) {
    console.error('submitSitemap error:', error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});