import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Nutzt Google Indexing API, um Blog-Posts direkt zur Indexierung anzumelden.
// Google crawlt dann die URL erneut und holt frische Meta-Daten.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_search_console');

    // Alle publizierten Posts holen
    const posts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-published_at',
      200
    );

    const results = [];

    for (const post of posts) {
      const url = `https://jakubkaczmarek.de/blog/${post.slug}`;
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED',
        }),
      });

      const data = await res.json();
      results.push({ slug: post.slug, url, status: res.status, response: data });
      console.log(`[indexing] ${url} → ${res.status}`);
    }

    const ok = results.filter(r => r.status === 200).length;
    const fail = results.filter(r => r.status !== 200).length;

    return Response.json({ success: true, ok, fail, results });
  } catch (error) {
    console.error('requestGoogleIndexing error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});