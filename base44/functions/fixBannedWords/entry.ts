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
      // === ENGLISH BANNED WORDS ===
      [/\bgame[- ]changer\b/gi, 'echter Vorteil'],
      [/\bgame[- ]changing\b/gi, 'wirkungsvoll'],
      [/\bunlock\b/gi, 'freischalten'],
      [/\bunleash\b/gi, 'voll ausschöpfen'],
      [/\bdelve\b/gi, 'vertiefen'],
      [/\brealm\b/gi, 'Bereich'],
      [/\blandscape\b/gi, 'Umfeld'],
      [/\brevolutionize\b/gi, 'grundlegend verändern'],
      [/\bcutting-edge\b/gi, 'modern'],
      [/\bstate[- ]of[- ]the[- ]art\b/gi, 'modern'],
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
      [/\bseamless(ly)?\b/gi, 'reibungslos'],
      [/\bscalable\b/gi, 'skalierbar'],
      [/\bempowering\b/gi, 'stärkend'],
      [/\bempower\b/gi, 'stärken'],
      [/\binnovative\b/gi, 'modern'],
      [/\binnovation\b/gi, 'Neuerung'],
      [/\btrailblazing\b/gi, 'wegweisend'],
      [/\bpivotal\b/gi, 'entscheidend'],
      [/\bgroundbreaking\b/gi, 'wegweisend'],
      [/\bdisruptive\b/gi, 'verändernd'],
      [/\bdisrupt\b/gi, 'verändern'],
      [/\bproactive\b/gi, 'vorausschauend'],
      [/\bsynergistic\b/gi, 'gemeinsam'],
      [/\boptimize\b/gi, 'optimieren'],
      [/\boptimization\b/gi, 'Optimierung'],
      [/\bsupercharge\b/gi, 'erheblich verbessern'],
      [/\bboost\b/gi, 'steigern'],
      [/\bskyrocket\b/gi, 'stark steigen'],
      [/\bexponential(ly)?\b/gi, 'deutlich'],
      [/\bincredible\b/gi, 'bemerkenswert'],
      [/\bamazing\b/gi, 'beeindruckend'],
      [/\bstunning\b/gi, 'beeindruckend'],
      [/\bpowerful\b/gi, 'leistungsfähig'],
      [/\bsophisticated\b/gi, 'ausgefeilt'],
      [/\bintuitive\b/gi, 'intuitiv'],
      [/\bcomprehensive\b/gi, 'umfassend'],
      [/\bstreamline\b/gi, 'vereinfachen'],
      [/\bstreamlined\b/gi, 'vereinfacht'],
      [/\bpivot\b/gi, 'umstellen'],
      [/\bleverage\b/gi, 'nutzen'],
      [/\bscale\b/gi, 'skalieren'],
      [/\bimpactful\b/gi, 'wirkungsvoll'],
      // === GERMAN BANNED WORDS ===
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
      [/\bständig wachsend\b/gi, 'wachsend'],
      [/\bim Sturm erobert\b/gi, 'stark geprägt'],
      [/\bim Sturm genommen\b/gi, 'stark verändert'],
      [/\bim Sturm\b/gi, 'schnell'],
      [/\bauf das nächste Level\b/gi, 'auf ein höheres Niveau'],
      [/\bauf ein neues Level\b/gi, 'auf ein höheres Niveau'],
      [/\bnächste Level\b/gi, 'nächste Stufe'],
      [/\bneu definieren\b/gi, 'verändern'],
      [/\bneu definiert\b/gi, 'verändert'],
      [/\bneu definierte[rnsm]?\b/gi, 'veränderte'],
      [/\bKiller-Feature\b/gi, 'Hauptfunktion'],
      [/\bKiller Feature\b/gi, 'Hauptfunktion'],
      [/\bDisruption\b/gi, 'Veränderung'],
      [/\bdisruptiv\b/gi, 'verändernd'],
      [/\bdisruptive[rnsm]?\b/gi, 'verändernde'],
      [/\btransformiert\b/gi, 'verändert'],
      [/\bTransformation\b/gi, 'Veränderung'],
      [/\btransformieren\b/gi, 'verändern'],
      [/\btransformierend\b/gi, 'wirkungsvoll'],
      [/\btransformative[rnsm]?\b/gi, 'wirkungsvolle'],
      [/\bSkalierung\b/gi, 'Wachstum'],
      [/\bskaliert\b/gi, 'wächst'],
      [/\bSkalierbarkät\b/gi, 'Wachstumspotenzial'],
      [/\bnahtlos\b/gi, 'reibungslos'],
      [/\bnahtlose[rnsm]?\b/gi, 'reibungslose'],
      [/\bmühelos\b/gi, 'einfach'],
      [/\bmühelos[em]?\b/gi, 'einfach'],
      [/\binnovativ\b/gi, 'modern'],
      [/\binnovative[rnsm]?\b/gi, 'moderne'],
      [/\bkraft\b/gi, 'Stärke'],
      [/\bkraftvolle?[rnsm]?\b/gi, 'wirkungsvolle'],
      [/\bProaktiv\b/gi, 'vorausschauend'],
      [/\bproaktiv\b/gi, 'vorausschauend'],
      [/\bproaktive[rnsm]?\b/gi, 'vorausschauende'],
      [/\bKI-gestützt\b/gi, 'KI-basiert'],
      [/\bKI-gestützte[rnsm]?\b/gi, 'KI-basierte'],
      [/\bLösungen der Zukunft\b/gi, 'moderne Lösungen'],
      [/\bder Zukunft gehört\b/gi, 'wird wichtiger'],
      [/\bZukunft der\b/gi, 'Entwicklung der'],
      [/\bmorgen von heute\b/gi, 'aktuelle Entwicklung'],
      [/\bsetzt Maßstäbe\b/gi, 'ist ein guter Ausgangspunkt'],
      [/\bMaßstäbe setzt\b/gi, 'einen guten Standard bietet'],
      [/\bdie Nase vorn\b/gi, 'einen Vorsprung'],
      [/\bwettbewerbsfähig bleiben\b/gi, 'am Markt bestehen'],
      [/\bin einer Welt, in der\b/gi, 'da'],
      [/\bIn einer Welt, in der\b/g, 'Da'],
      [/\bIn einer Welt wo\b/gi, 'Da'],
      [/\bin einer Welt wo\b/gi, 'da'],
      [/\bimmer schneller werdend\b/gi, 'schnell'],
      [/\bdigitale Transformation\b/gi, 'Digitalisierung'],
      [/\bDie Zeiten haben sich geändert\b/gi, ''],
      [/\bändert die Spielregeln\b/gi, 'ist wirkungsvoll'],
      [/\bSpielregeln\b/gi, 'Regeln'],
      [/\bNextlevel\b/gi, 'fortgeschritten'],
      [/\bNext-Level\b/gi, 'fortgeschritten'],
      [/\bauf höchstem Niveau\b/gi, 'auf hohem Niveau'],
      [/\bauf Sterneniveau\b/gi, 'auf hohem Niveau'],
      [/\bauf Spitzenniveau\b/gi, 'auf hohem Niveau'],
      [/\bständig weiterentwickelnd\b/gi, 'sich weiterentwickelnd'],
      [/\bder nächsten Generation\b/gi, 'moderner'],
      [/\bder neuen Generation\b/gi, 'moderner'],
      [/\bDas ändert alles\b/gi, 'Das ist relevant'],
      [/\bändert alles\b/gi, 'ist wirkungsvoll'],
      // === BANNED PHRASES ===
      [/in today's world[,]?/gi, 'heute'],
      [/in today's fast-paced[^,.]*[,]?/gi, 'heute'],
      [/look no further[.!]?/gi, ''],
      [/let's dive in[.!]?/gi, 'Hier der Überblick:'],
      [/at the end of the day[,]?/gi, 'letztlich'],
      [/nestled in/gi, 'in'],
      [/embark on [a-zäöü]+ journey/gi, 'starten'],
      [/navigate (the )?(complexities|challenges)/gi, 'mit den Herausforderungen umgehen'],
      // === RHETORICAL QUESTIONS (AI tell) ===
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
      // === TYPOGRAPHY ===
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