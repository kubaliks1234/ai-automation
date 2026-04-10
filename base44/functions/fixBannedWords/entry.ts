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

    // Simple word-level replacements (case-insensitive)
    const replacements = [
      // Einzelne Wörter
      [/\bgame[- ]changer\b/gi, 'echter Vorteil'],
      [/\bunlock\b/gi, 'freischalten'],
      [/\bunleash\b/gi, 'entfesseln'],
      [/\bdelve\b/gi, 'vertiefen'],
      [/\brealm\b/gi, 'Bereich'],
      [/\blandscape\b/gi, 'Umfeld'],
      [/\brevolutionize\b/gi, 'grundlegend verändern'],
      [/\brevolutionieren\b/gi, 'grundlegend verändern'],
      [/\bcutting-edge\b/gi, 'modern'],
      [/\brobust\b/gi, 'zuverlässig'],
      [/\belevate\b/gi, 'verbessern'],
      [/\bfoster\b/gi, 'fördern'],
      [/\bspearhead\b/gi, 'vorantreiben'],
      [/\butilize\b/gi, 'nutzen'],
      [/\bcommence\b/gi, 'starten'],
      [/\bendeavor\b/gi, 'Bemühung'],
      [/\bparamount\b/gi, 'entscheidend'],
      [/\bsynergy\b/gi, 'Zusammenarbeit'],
      [/\bthought leader\b/gi, 'Experte'],
      [/\bvalue-add\b/gi, 'Mehrwert'],
      [/\bholistic\b/gi, 'ganzheitlich'],
      [/\btransformative\b/gi, 'wirkungsvoll'],
      [/\bbahnbrechend\b/gi, 'wirkungsvoll'],
      [/\bwegweisend\b/gi, 'richtungsweisend'],
      [/\bunglaublich\b/gi, 'bemerkenswert'],
      [/\bvisionär\b/gi, 'zukunftsorientiert'],
      // Verbotene Phrasen
      [/in today's world[,]?/gi, 'heute'],
      [/in today's fast-paced[^,.]*/gi, 'heute'],
      [/look no further[.!]?/gi, ''],
      [/let's dive in[.!]?/gi, 'Hier ist der Überblick:'],
      [/at the end of the day[,]?/gi, 'letztlich'],
      [/nestled in/gi, 'in'],
      [/embark on [a-z]+ journey/gi, 'starten'],
      [/navigate (the )?(complexities|challenges)/gi, 'mit den Herausforderungen umgehen'],
    ];

    const fields = ['title', 'excerpt', 'meta_title', 'meta_description', 'content'];

    const posts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 300);
    let updatedCount = 0;

    for (const post of posts) {
      const patch = {};

      for (const field of fields) {
        if (!post[field]) continue;
        let text = post[field];
        let changed = false;

        for (const [pattern, replacement] of replacements) {
          const newText = text.replace(pattern, replacement);
          if (newText !== text) {
            text = newText;
            changed = true;
          }
        }

        if (changed) patch[field] = text;
      }

      if (Object.keys(patch).length > 0) {
        await base44.asServiceRole.entities.BlogPost.update(post.id, patch);
        console.log(`[INFO] Bereinigt: "${post.title}" (Felder: ${Object.keys(patch).join(', ')})`);
        updatedCount++;
      }
    }

    return Response.json({
      success: true,
      checked: posts.length,
      updated: updatedCount,
      message: `${updatedCount} von ${posts.length} Posts wurden bereinigt.`
    });

  } catch (error) {
    console.error(`[ERROR] fixBannedWords: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
});