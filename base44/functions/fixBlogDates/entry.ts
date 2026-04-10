import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let isAuthorized = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAuthorized = true;
    } catch {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const posts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 300);
    const toUpdate = posts.filter(p =>
      (p.title && p.title.includes('2025')) ||
      (p.meta_title && p.meta_title.includes('2025')) ||
      (p.excerpt && p.excerpt.includes('2025'))
    );

    let updated = 0;
    for (const post of toUpdate) {
      const patch = {};
      if (post.title && post.title.includes('2025')) {
        patch.title = post.title.replace(/2025/g, '2026');
      }
      if (post.meta_title && post.meta_title.includes('2025')) {
        patch.meta_title = post.meta_title.replace(/2025/g, '2026');
      }
      if (post.excerpt && post.excerpt.includes('2025')) {
        patch.excerpt = post.excerpt.replace(/2025/g, '2026');
      }
      if (Object.keys(patch).length > 0) {
        await base44.asServiceRole.entities.BlogPost.update(post.id, patch);
        console.log(`[INFO] Aktualisiert: "${post.title}" -> "${patch.title || post.title}"`);
        updated++;
      }
    }

    return Response.json({
      success: true,
      checked: posts.length,
      updated,
      message: `${updated} Posts von 2025 auf 2026 aktualisiert.`
    });

  } catch (error) {
    console.error(`[ERROR] fixBlogDates: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
});