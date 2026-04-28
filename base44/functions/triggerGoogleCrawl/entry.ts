import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Triggers Google to crawl/index blog post URLs via the Indexing API
// The Indexing API is designed exactly for this: notifying Google of new/updated URLs

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
    const limit = body.limit || 20;

    // Fetch posts
    let posts;
    if (singleSlug) {
      posts = await base44.asServiceRole.entities.BlogPost.filter({ slug: singleSlug, status: 'published' }, '-published_at', 1);
    } else {
      const allPosts = await base44.asServiceRole.entities.BlogPost.filter({ status: 'published' }, '-published_at', 500);
      posts = allPosts.slice(offset, offset + limit);
    }

    const results = [];

    for (const post of posts) {
      const url = `https://jakubkaczmarek.de/blog/${post.slug}`;

      // Use Google Indexing API to request crawling
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED',
        }),
      });

      const data = await res.json();
      const success = res.status === 200;
      results.push({
        slug: post.slug,
        url,
        status: res.status,
        success,
        notifyTime: data.urlNotificationMetadata?.latestUpdate?.notifyTime || null,
        error: !success ? (data.error?.message || JSON.stringify(data)) : null,
      });

      console.log(`[triggerGoogleCrawl] ${url} → ${res.status} ${success ? 'OK' : data.error?.message}`);
    }

    const succeeded = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return Response.json({
      success: true,
      total: results.length,
      succeeded,
      failed,
      offset,
      limit,
      results,
    });

  } catch (error) {
    console.error('triggerGoogleCrawl error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});