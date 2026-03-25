import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SITE_URL = 'https://jakubkaczmarek.de';
const SITEMAP_URL = 'https://jakubkaczmarek.de/sitemap.xml';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // Submit sitemap to Google Search Console
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('GSC Sitemap submission failed:', error);
      return Response.json({ success: false, error }, { status: response.status });
    }

    console.log('Sitemap successfully submitted:', SITEMAP_URL);
    return Response.json({ success: true, message: 'Sitemap erfolgreich eingereicht', sitemap: SITEMAP_URL });

  } catch (error) {
    console.error('submitSitemap error:', error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});