import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { slug } = await req.json();
  const posts = await base44.asServiceRole.entities.BlogPost.filter({ slug });
  if (!posts.length) return Response.json({ error: 'Not found' }, { status: 404 });

  const content = posts[0].content;
  // Return first 3000 chars as JSON-safe string to see raw content
  return Response.json({ 
    raw: JSON.stringify(content.substring(0, 3000)),
    preview: content.substring(0, 3000)
  });
});