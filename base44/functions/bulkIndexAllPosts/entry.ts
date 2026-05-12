import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Bulk-submits all published blog posts to Google Indexing API
// Google allows up to 200 requests/day per project
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

    const batchSize = body.batchSize || 200;
    const offset = body.offset || 0;

    const allPosts = await base44.asServiceRole.entities.BlogPost.filter(
      { status: 'published' },
      '-updated_date',
      500
    );

    const posts = allPosts.slice(offset, offset + batchSize);
    console.log(`[bulkIndexAllPosts] Total published: ${allPosts.length}, processing ${posts.length} (offset: ${offset})`);

    const results = [];

    for (const post of posts) {
      const url = `https://jakubkaczmarek.de/blog/${post.slug}`;

      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });

      const data = await res.json();
      const success = res.status === 200;

      results.push({
        slug: post.slug,
        url,
        status: res.status,
        success,
        error: !success ? (data.error?.message || JSON.stringify(data)) : null,
      });

      console.log(`[bulkIndexAllPosts] ${url} → ${res.status} ${success ? 'OK' : data.error?.message}`);

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 50));
    }

    const succeeded = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const hasMore = (offset + batchSize) < allPosts.length;

    return Response.json({
      success: true,
      total: allPosts.length,
      processed: results.length,
      succeeded,
      failed,
      offset,
      hasMore,
      nextOffset: hasMore ? offset + batchSize : null,
      results,
    });

  } catch (error) {
    console.error('[bulkIndexAllPosts] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});