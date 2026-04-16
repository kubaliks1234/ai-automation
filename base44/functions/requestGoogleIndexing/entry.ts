import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Nutzt Google Search Console URL Inspection API, um Blog-Posts zur erneuten Crawl-Prüfung einzureichen.
// Endpoint: POST {} → prüft alle publizierten Posts
// Optional: POST { slug: "mein-slug" } → prüft nur einen Post

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    let body = {};
    try { body = await req.json(); } catch { /* no body */ }
    const singleSlug = body.slug;
    const offset = body.offset || 0;
    const limit = body.limit || 10;

    // Posts holen
    let posts;
    if (singleSlug) {
      posts = await base44.asServiceRole.entities.BlogPost.filter({ slug: singleSlug, status: 'published' }, '-published_at', 1);
    } else {
      const allPosts = await base44.asServiceRole.entities.BlogPost.filter({ status: 'published' }, '-published_at', 200);
      posts = allPosts.slice(offset, offset + limit);
    }

    const SITE_URL = 'sc-domain:jakubkaczmarek.de';
    const results = [];

    for (const post of posts) {
      const inspectUrl = `https://jakubkaczmarek.de/blog/${post.slug}`;
      
      const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inspectionUrl: inspectUrl,
          siteUrl: SITE_URL,
        }),
      });

      const data = await res.json();
      const verdict = data.inspectionResult?.indexStatusResult?.verdict || 'UNKNOWN';
      const lastCrawled = data.inspectionResult?.indexStatusResult?.lastCrawlTime || null;
      const crawledTitle = data.inspectionResult?.indexStatusResult?.lastCrawlResult || null;
      results.push({ slug: post.slug, url: inspectUrl, status: res.status, verdict, lastCrawled, crawledTitle });
      console.log(`[inspect] ${inspectUrl} → verdict: ${verdict}`);
    }

    const indexed = results.filter(r => r.verdict === 'PASS').length;
    const notIndexed = results.filter(r => r.verdict !== 'PASS').length;

    return Response.json({ success: true, total: results.length, indexed, notIndexed, offset, limit, results });
  } catch (error) {
    console.error('requestGoogleIndexing error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});