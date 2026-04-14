import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Generiert und speichert slugs für alle Artikel die keinen haben
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let isAdmin = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAdmin = true;
    } catch {
      isAdmin = true; // Allow scheduled/service calls
    }

    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const posts = await base44.asServiceRole.entities.BlogPost.list('-created_date', 500);
    
    let fixed = 0;
    let skipped = 0;
    const results = [];

    for (const post of posts) {
      if (post.slug) {
        skipped++;
        continue;
      }

      const titleSource = post.title || post.h1 || post.meta_title || '';
      if (!titleSource) {
        results.push({ id: post.id, status: 'no_title' });
        continue;
      }

      const newSlug = toSlug(titleSource);
      
      await base44.asServiceRole.entities.BlogPost.update(post.id, { slug: newSlug });
      fixed++;
      results.push({ id: post.id, slug: newSlug, title: titleSource });
      console.log(`[fixMissingSlugs] Fixed: "${titleSource}" → "${newSlug}"`);
    }

    return Response.json({
      success: true,
      total: posts.length,
      fixed,
      skipped,
      results
    });

  } catch (error) {
    console.error('[fixMissingSlugs] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});