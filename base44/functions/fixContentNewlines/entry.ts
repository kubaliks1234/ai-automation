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

    // Replace literal \n (two chars: backslash + n) with real newlines
    const fixedContent = post.content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');

    if (fixedContent !== post.content) {
      await base44.asServiceRole.entities.BlogPost.update(post.id, { content: fixedContent });
      fixed++;
      console.log(`Fixed: ${post.title}`);
    }
  }

  return Response.json({ total: posts.length, fixed, message: `${fixed} Beiträge korrigiert` });
});