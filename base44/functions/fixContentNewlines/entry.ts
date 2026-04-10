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

    // Step 2: Fix mid-word line breaks (e.g. "Revi\ne\nw" → "Review")
    // A line of only 1-3 word chars after a word-ending line is a broken word fragment
    for (let i = 0; i < 8; i++) {
      fixedContent = fixedContent.replace(
        /([a-zA-Z\u00C0-\u017E])\n([a-zA-Z\u00C0-\u017E?!,]{1,3})\n/g,
        '$1$2\n'
      );
    }

    // Remove standalone empty heading lines (just "#" on its own line)
    fixedContent = fixedContent.replace(/\n#\s*\n/g, '\n');

    // Step 3: Ensure markdown headings have a blank line before them
    fixedContent = fixedContent
      .replace(/([^\n])(\n?)(#{1,4} )/g, '$1\n\n$3');

    // Step 3: Fix merged markdown table rows
    // Pattern: | col1 | col2 | | col3 | col4 | → split on " | |" boundary
    // Also handle || joining two rows
    fixedContent = fixedContent
      .replace(/(\|[^\n]+\|)\s*\|(\s*[^:\-\|][^\n]*\|)/g, '$1\n|$2') // split data rows
      .replace(/(\|[^\n]+\|)\s*(\|[:\-]+[^\n]*\|)/g, '$1\n$2');     // split separator row

    // Step 4: Clean up excessive newlines
    fixedContent = fixedContent
      .replace(/\n{4,}/g, '\n\n\n');

    // Always update to ensure consistency
    await base44.asServiceRole.entities.BlogPost.update(post.id, { content: fixedContent });
    fixed++;
    console.log(`Updated: ${post.slug}`);
  }

  return Response.json({ total: posts.length, fixed, message: `${fixed} Beiträge korrigiert` });
});