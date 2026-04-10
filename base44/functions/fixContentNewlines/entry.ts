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

    // Step 1: Replace literal escaped newlines
    fixedContent = fixedContent
      .replace(/\\n\\n/g, '\n\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '')
      .replace(/\r\n/g, '\n');

    // Step 2: Ensure markdown headings are on their own lines
    fixedContent = fixedContent
      .replace(/([^\n])(#{1,4} )/g, '$1\n\n$2')  // add newline before heading
      .replace(/(#{1,4} [^\n]+)([^\n])/g, '$1\n$2') // add newline after heading
      .replace(/([^\n])(- )/g, (match, p1, p2, offset, str) => {
        // Only add newline if this looks like a list item start
        if (p1 === ' ' || p1 === '\t') return match;
        return p1 + '\n' + p2;
      });

    // Step 3: Clean up excessive newlines
    fixedContent = fixedContent
      .replace(/\n{4,}/g, '\n\n\n');

    // Always update to ensure consistency
    await base44.asServiceRole.entities.BlogPost.update(post.id, { content: fixedContent });
    fixed++;
    console.log(`Updated: ${post.slug}`);
  }

  return Response.json({ total: posts.length, fixed, message: `${fixed} Beiträge korrigiert` });
});