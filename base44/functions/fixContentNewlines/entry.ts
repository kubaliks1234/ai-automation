import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const posts = await base44.asServiceRole.entities.BlogPost.list('-created_date', 200);
  let fixed = 0;

  for (const post of posts) {
    if (!post.content) continue;

    let fixedContent = post.content;

    // Handle all variants of escaped newlines
    fixedContent = fixedContent
      .replace(/\\n\\n/g, '\n\n')  // \n\n → double newline
      .replace(/\\n/g, '\n')        // \n → single newline
      .replace(/\\t/g, '\t')        // \t → tab
      .replace(/\\r/g, '')           // remove \r
      .replace(/\r\n/g, '\n');       // normalize CRLF

    // Always update to ensure consistency
    await base44.asServiceRole.entities.BlogPost.update(post.id, { content: fixedContent });
    fixed++;
    console.log(`Updated: ${post.slug}`);
  }

  return Response.json({ total: posts.length, fixed, message: `${fixed} Beiträge korrigiert` });
});