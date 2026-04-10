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

    // Word-level replacements (case-insensitive)
    const replacements = [
      // English banned words
      [/\bgame[- ]changer\b/gi, 'echter Vorteil'],
      [/\bgame[- ]changing\b/gi, 'wirkungsvoll'],
      [/\bunlock\b/gi, 'freischalten'],
      [/\bunleash\b/gi, 'voll ausschöpfen'],
      [/\bdelve\b/gi, 'vertiefen'],
      [/\brealm\b/gi, 'Bereich'],
      [/\blandscape\b/gi, 'Umfeld'],
      [/\brevolutionize\b/gi, 'grundlegend verändern'],
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
      [/\bsynergies\b/gi, 'Synergieeffekte'],
      [/\bthought leader\b/gi, 'Experte'],
      [/\bthought leadership\b/gi, 'Expertise'],
      [/\bvalue-add\b/gi, 'Mehrwert'],
      [/\bholistic\b/gi, 'ganzheitlich'],
      [/\btransformative\b/gi, 'wirkungsvoll'],
      // German banned words
      [/\brevolutionieren\b/gi, 'grundlegend verändern'],
      [/\brevolutioniert\b/gi, 'grundlegend verändert'],
      [/\brevolutionierend\b/gi, 'wirkungsvoll'],
      [/\bbahnbrechend\b/gi, 'wirkungsvoll'],
      [/\bbahnbrechende[rnsm]?\b/gi, 'wirkungsvolle'],
      [/\bwegweisend\b/gi, 'richtungsweisend'],
      [/\bwegweisende[rnsm]?\b/gi, 'richtungsweisende'],
      [/\bunglaublich\b/gi, 'sehr'],
      [/\bunglaubliche[rnsm]?\b/gi, 'bemerkenswerte'],
      [/\bvisionär\b/gi, 'zukunftsorientiert'],
      [/\bvisionäre[rnsm]?\b/gi, 'zukunftsorientierte'],
      [/\bim Sturm erobert\b/gi, 'stark geprägt'],
      [/\bim Sturm genommen\b/gi, 'stark verändert'],
      [/\bSpielbuch\b/gi, 'Regeln'],
      [/\bSpielregeln grundlegend\b/gi, 'Regeln'],
      [/\bauf das nächste Level\b/gi, 'auf ein höheres Niveau'],
      [/\bauf ein neues Level\b/gi, 'auf ein höheres Niveau'],
      [/\bnächste Level\b/gi, 'nächste Stufe'],
      [/\bChampions League\b/gi, 'Spitzengruppe'],
      [/\bKiller-Feature\b/gi, 'Hauptfunktion'],
      [/\bKiller Feature\b/gi, 'Hauptfunktion'],
      [/\bim Sturm\b/gi, 'schnell'],
      [/\btransformiert\b/gi, 'verändert'],
      [/\bTransformation\b/gi, 'Veränderung'],
      [/\btransformieren\b/gi, 'verändern'],
      // Banned phrases
      [/in today's world[,]?/gi, 'heute'],
      [/in today's fast-paced[^,.]*[,]?/gi, 'heute'],
      [/look no further[.!]?/gi, ''],
      [/let's dive in[.!]?/gi, 'Hier der Überblick:'],
      [/at the end of the day[,]?/gi, 'letztlich'],
      [/nestled in/gi, 'in'],
      [/embark on [a-zäöü]+ journey/gi, 'starten'],
      [/navigate (the )?(complexities|challenges)/gi, 'mit den Herausforderungen umgehen'],
      // Rhetorical one-word questions (worst AI tell)
      [/\bErgebnis\?/g, ''],
      [/\bDer Haken\?/g, 'Aber:'],
      [/\bMein Tipp\?/g, 'Tipp:'],
      [/\bDie Lösung\?/g, 'Die Lösung:'],
      [/\bDas Ergebnis\?/g, ''],
      [/\bDie Antwort\?/g, 'Die Antwort:'],
      [/\bDer Trick\?/g, 'Der Trick:'],
      [/\bDie Moral\?/g, ''],
      [/\bDas Fazit\?/g, 'Das Fazit:'],
      [/\bThe result\?/gi, ''],
      [/\bThe catch\?/gi, 'Aber:'],
      // Em dashes
      [/ — /g, ', '],
      [/—/g, ', '],
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