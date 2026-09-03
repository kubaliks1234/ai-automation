import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Handwerker-Blog-Generator nach SEO-Plan
// Erzeugt Entwürfe (published=false, reviewed_by_human=false)
// Qualitätsprüfung nach Plan Teil 8.3

const TOPICS = [
  { title: "Wie bekomme ich als Handwerker mehr Kunden? 7 Wege, ehrlich bewertet", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Was kostet Google-Werbung für einen Handwerksbetrieb wirklich?", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
  { title: "MyHammer: Für welche Betriebe es sich lohnt und für welche nicht", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Ihre Website bringt keine Anfragen? Diese 5 Gründe finden Sie zuerst", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Google-Unternehmensprofil für Handwerker: die 12-Punkte-Checkliste", cluster: "problem", region: "bundesweit", cta: "ratgeber" },
  { title: "Was darf ein Neukunde im Handwerk kosten? Eine Beispielrechnung", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
  { title: "Warum Handwerker Aufträge verlieren, obwohl das Angebot gut war", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "So sehen Sie in 5 Minuten, welche Anzeigen Ihre Konkurrenz schaltet", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Handwerker-Marketing im Landkreis Donau-Ries: die Ausgangslage", cluster: "money", region: "donau-ries", cta: "anfragen-check" },
  { title: "Bewertungen für Ihren Handwerksbetrieb: System statt Bitten", cluster: "problem", region: "bundesweit", cta: "ratgeber" },
  { title: "Meta Ads oder Google Ads für Handwerksbetriebe? Der ehrliche Vergleich", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
  { title: "Werbebudget für Handwerksbetriebe: wie viel ist sinnvoll", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
  { title: "Warum die ersten 5 Minuten nach einer Anfrage über den Auftrag entscheiden", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Check24 Profis für Handwerker: Erfahrungen und Alternativen", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Handwerker-Marketing Augsburg: was hier funktioniert", cluster: "money", region: "augsburg", cta: "anfragen-check" },
  { title: "Anfragen vorqualifizieren: 4 Fragen, die Ihnen Zeit sparen", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Was eine Anfrage im Trockenbau kosten darf", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
  { title: "Saisonalität im Handwerk: wann Sie Werbung hoch- und runterfahren", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Marketing für Trockenbaubetriebe: was anders ist als bei anderen Gewerken", cluster: "gewerk", region: "bundesweit", cta: "anfragen-check" },
  { title: "Landingpage für Handwerksbetriebe: die 8 Elemente, die zählen", cluster: "problem", region: "bundesweit", cta: "anfragen-check" },
  { title: "Empfehlungsmarketing systematisieren statt darauf hoffen", cluster: "problem", region: "bundesweit", cta: "ratgeber" },
  { title: "Handwerker-Marketing München: warum hier andere Regeln gelten", cluster: "money", region: "muenchen", cta: "anfragen-check" },
  { title: "Marketing für Sanierungsbetriebe: Auftragsgröße steuern", cluster: "gewerk", region: "bundesweit", cta: "anfragen-check" },
  { title: "Kosten pro Anfrage im Handwerk: Richtwerte nach Gewerk", cluster: "kosten", region: "bundesweit", cta: "anfragen-check" },
];

const FORBIDDEN_PHRASES = [
  "In der heutigen digitalen Welt", "In Zeiten von", "Es ist wichtig zu verstehen",
  "Zusammenfassend lässt sich sagen", "revolutionär", "innovativ", "maßgeschneidert",
  "Game Changer", "Sie fragen sich vielleicht"
];

const CLUSTER_MIN_WORDS = {
  money: 800,
  problem: 1200,
  kosten: 1200,
  gewerk: 800,
};

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Admin-Check
    let isAuthorized = false;
    try {
      const user = await base44.auth.me();
      if (user?.role === 'admin') isAuthorized = true;
    } catch {
      isAuthorized = true; // scheduled call
    }
    if (!isAuthorized) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Bestehende Posts laden (Kannibalisierungs-Check)
    const existingPosts = await base44.asServiceRole.entities.BlogPost.list('-published_at', 200);
    const existingKeywords = existingPosts.map(p => p.primary_keyword).filter(Boolean);

    // Nächstes unbehandeltes Thema finden
    const remaining = TOPICS.filter(t => {
      return !existingKeywords.some(k => k && t.title.toLowerCase().includes(k.toLowerCase().substring(0, 20)));
    });
    const pool = remaining.length > 0 ? remaining : TOPICS;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    // Interne Links: echte veröffentlichte Artikel + Pillar-Seiten
    const publishedPosts = existingPosts.filter(p => p.status === 'published' && p.slug);
    const blogLinks = publishedPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(p => `- /blog/${p.slug} → "${p.h1 || p.title}"`)
      .join('\n');

    const pillarLinks = [
      '- /handwerker-marketing-donau-ries → "Handwerker-Marketing im Landkreis Donau-Ries"',
      '- /anfragen-check → "Anfragen-Check in 20 Minuten"',
      '- /ueber-mich → "Über mich – Jakub Kaczmarek"',
    ].join('\n');

    const internalLinkPool = `${pillarLinks}\n${blogLinks}`;

    const regionLabel = {
      'donau-ries': 'Donau-Ries (Donauwörth, Nördlingen, Rain, Harburg)',
      'augsburg': 'Augsburg und Umgebung',
      'muenchen': 'München und Oberbayern',
      'bundesweit': 'bundesweit',
    }[selected.region] || 'bundesweit';

    const prompt = `Du schreibst Fachartikel für die Website von Jakub Kaczmarek. Zielgruppe sind
Inhaber von Handwerks- und Ausbaubetrieben mit 3 bis 30 Mitarbeitern in
Bayerisch-Schwaben und Oberbayern: Trockenbau, Sanierung, Maler, Elektro, SHK,
Zimmerei, Fliesenleger.

ZIELGRUPPE VERSTEHEN
Der Leser ist Chef, nicht Marketingmensch. Er steht morgens um 6 auf der
Baustelle und liest abends am Küchentisch auf dem Handy. Er ist skeptisch
gegenüber Agenturen, weil er schon mal Geld verbrannt hat. Er misst alles in
Aufträgen und Euro, nicht in Klicks und Reichweite.

TONFALL
- Du-Form vermeiden, konsequent Sie
- Kurze Sätze. Hauptsatz vor Nebensatz.
- Keine Marketing-Anglizismen: kein Funnel, kein Conversion Rate, kein Lead
  Nurturing. Schreib Anfrage, Abschlussquote, Nachfassen.
- Keine Superlative, keine Ausrufezeichen
- Konkrete Zahlen und Beispiele statt allgemeiner Aussagen
- Baustellen-Vergleiche sind erlaubt und gut, wenn sie tragen

VERBOTENE FORMULIERUNGEN
"In der heutigen digitalen Welt", "In Zeiten von", "Es ist wichtig zu
verstehen", "Zusammenfassend lässt sich sagen", "revolutionär", "innovativ",
"maßgeschneidert", "Game Changer", "Sie fragen sich vielleicht"

AUFBAU JEDES ARTIKELS
1. H1 = die Frage oder das Problem, wörtlich wie der Leser es formulieren würde
2. Antwortblock: 2–3 Sätze direkt unter der H1, die die Frage vollständig
   beantworten. Kein Spannungsaufbau. Wer nur diesen Block liest, hat
   eine brauchbare Antwort.
3. 4–7 H2-Abschnitte. Jede H2 ist eine Aussage oder Frage, keine Floskel.
4. Mindestens eine Tabelle oder eine strukturierte Aufzählung mit Zahlen
5. Mindestens ein konkretes Rechenbeispiel mit Euro-Beträgen
6. Ein Abschnitt "Was das für Ihren Betrieb heißt" mit 3 konkreten Schritten
7. Abschluss: ein Satz Einordnung, dann der CTA aus dem Feld cta_variant

LÄNGE
Cluster problem und kosten: 1.200–1.800 Wörter
Cluster money und gewerk: 800–1.200 Wörter

INTERNE LINKS
Baue mindestens 3 interne Links ein, die aus dem Feld internal_links kommen.
Ankertext muss beschreibend sein. Niemals "hier klicken" oder "mehr erfahren".
Mindestens einer der Links geht auf eine Pillar-Seite, mindestens einer auf
/anfragen-check.

REGIONALBEZUG
Wenn target_region nicht "bundesweit" ist: mindestens zwei natürliche
Ortsbezüge einbauen — Wettbewerbslage, Handwerkerdichte, typische
Auftragsgrößen der Region. Niemals einfach den Ortsnamen in Sätze einsetzen,
die sonst identisch wären.

EHRLICHKEIT
Wenn du eine Zahl nicht sicher weißt, schreib eine Spanne und kennzeichne sie
als Erfahrungswert. Erfinde niemals Studien, Prozentzahlen oder Zitate.
Erfinde niemals Referenzkunden. Wenn ein Beispiel gebraucht wird, formuliere
es erkennbar als Rechenbeispiel.

AUSGABEFORMAT
Gib ausschließlich ein JSON-Objekt zurück, ohne Markdown-Codeblock, ohne
Vor- oder Nachtext, mit genau diesen Feldern:
{
  "slug": "", "title": "", "meta_description": "", "h1": "",
  "answer_block": "", "body_markdown": "", "primary_keyword": "",
  "secondary_keywords": [], "cover_image_alt": "", "word_count": 0
}

THEMA: "${selected.title}"
CLUSTER: ${selected.cluster}
TARGET_REGION: ${selected.region} (${regionLabel})
CTA_VARIANT: ${selected.cta}

VERFÜGBARE INTERNE LINKS:
${internalLinkPool}

body_markdown als Markdown (kein HTML). Tabellen als Markdown-Tabellen.
Listen als Markdown-Listen. H2 als ##. H3 als ###.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: false,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          meta_description: { type: "string" },
          h1: { type: "string" },
          answer_block: { type: "string" },
          body_markdown: { type: "string" },
          primary_keyword: { type: "string" },
          secondary_keywords: { type: "array", items: { type: "string" } },
          cover_image_alt: { type: "string" },
          word_count: { type: "number" }
        },
        required: ["slug", "title", "h1", "answer_block", "body_markdown", "primary_keyword"]
      }
    });

    // ── QUALITÄTSPRÜFUNG (Plan 8.3) ──
    const errors = [];

    // 1. Wortzahl
    const minWords = CLUSTER_MIN_WORDS[selected.cluster] || 800;
    if (result.word_count < minWords) {
      errors.push(`word_count ${result.word_count} unter Minimum ${minWords} für Cluster ${selected.cluster}`);
    }

    // 2. Interne Links (mindestens 3)
    const linkCount = (result.body_markdown?.match(/\[.+?\]\(.+?\)/g) || []).length;
    if (linkCount < 3) {
      errors.push(`nur ${linkCount} interne Links (Minimum: 3)`);
    }

    // 3. Verbotene Formulierungen
    for (const phrase of FORBIDDEN_PHRASES) {
      if (result.body_markdown?.includes(phrase) || result.answer_block?.includes(phrase)) {
        errors.push(`verbotene Formulierung: "${phrase}"`);
      }
    }

    // 4. meta_description max 155 Zeichen
    if (result.meta_description && result.meta_description.length > 155) {
      errors.push(`meta_description ${result.meta_description.length} Zeichen (max 155)`);
    }

    // 5. title max 60 Zeichen
    if (result.title && result.title.length > 60) {
      errors.push(`title ${result.title.length} Zeichen (max 60)`);
    }

    // 6. Tabelle oder Zahlenliste vorhanden
    const hasTable = result.body_markdown?.includes('|') && result.body_markdown?.includes('---');
    const hasNumberList = /^\d+\.\s/m.test(result.body_markdown || '');
    if (!hasTable && !hasNumberList) {
      errors.push('keine Tabelle und keine Zahlenliste im body_markdown');
    }

    if (errors.length > 0) {
      console.error(`[QUALITY] Artikel verworfen: ${errors.join('; ')}`);
      return Response.json({
        success: false,
        discarded: true,
        topic: selected.title,
        errors
      });
    }

    // ── ENTWURF ABLEGEN (published=false, reviewed_by_human=false) ──
    const today = new Date().toISOString().split('T')[0];
    const postData = {
      title: result.title,
      h1: result.h1,
      slug: result.slug,
      answer_block: result.answer_block,
      body_html: result.body_markdown, // Markdown als body_html gespeichert (BlogPost.jsx rendert beides)
      meta_description: result.meta_description,
      meta_title: result.title,
      category: "Marketing",
      cluster: selected.cluster,
      primary_keyword: result.primary_keyword,
      secondary_keywords: result.secondary_keywords || [],
      target_region: selected.region,
      cta_variant: selected.cta,
      word_count: result.word_count,
      cover_image_alt: result.cover_image_alt,
      status: "draft",
      reviewed_by_human: false,
      published_at: today,
      tags: [selected.cluster, selected.region],
    };

    const created = await base44.asServiceRole.entities.BlogPost.create(postData);

    console.log(`[INFO] Entwurf erstellt: "${result.title}" (Cluster: ${selected.cluster}, Region: ${selected.region})`);

    return Response.json({
      success: true,
      draft: true,
      post_id: created.id,
      title: result.title,
      topic: selected.title,
      cluster: selected.cluster,
      region: selected.region,
      word_count: result.word_count,
      message: `Entwurf "${result.title}" wurde als Draft gespeetzt. reviewed_by_human=false.`
    });

  } catch (error) {
    console.error(`[ERROR] handwerkerBlogWriter: ${error.message}`);
    return Response.json({ error: error.message }, { status: 500 });
  }
}