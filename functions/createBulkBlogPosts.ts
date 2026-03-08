import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const topics = [
  {
    title: "10 Online Business Ideen für Anfänger 2026",
    slug: "online-business-ideen-anfaenger",
    keyword: "Online Business Ideen Anfänger",
    focus: "10 konkrete Online Business Ideen speziell für Anfänger ohne Vorkenntnisse oder Startkapital"
  },
  {
    title: "7 digitale Produkte die wirklich Geld bringen",
    slug: "digitale-produkte-geld-verdienen",
    keyword: "digitale Produkte Geld verdienen",
    focus: "7 digitale Produkte (E-Books, Kurse, Templates etc.) die sich gut verkaufen lassen, mit konkreten Einstiegsstrategien"
  },
  {
    title: "12 Wege ein Online Business zu starten – Schritt für Schritt",
    slug: "online-business-starten",
    keyword: "Online Business starten",
    focus: "12 verschiedene Wege wie man ein Online Business startet, von Freelancing bis Dropshipping"
  },
  {
    title: "9 Business Ideen ohne Startkapital für 2026",
    slug: "business-ideen-ohne-startkapital",
    keyword: "Business Ideen ohne Startkapital",
    focus: "9 Business-Ideen die man mit null Euro starten kann, vor allem online und mit KI-Unterstützung"
  },
  {
    title: "14 digitale Einkommensideen die du jetzt umsetzen kannst",
    slug: "digitale-einkommen-ideen",
    keyword: "digitale Einkommen Ideen",
    focus: "14 Wege digitales Einkommen aufzubauen, von passivem Einkommen bis aktiven Dienstleistungen"
  },
  {
    title: "15 Side Hustle Ideen für 2026 – so startest du nebenbei",
    slug: "side-hustle-ideen-2026",
    keyword: "Side Hustle Ideen 2026",
    focus: "15 realistische Side Hustle Ideen für 2026, mit Verdienstpotenzial und Einstiegstipps"
  },
  {
    title: "10 Nebenjobs die du bequem von zuhause machen kannst",
    slug: "nebenjobs-von-zuhause",
    keyword: "Nebenjobs von zuhause",
    focus: "10 Heimarbeit-Nebenjobs ohne Pendelzeit, für Flexibilität und zusätzliches Einkommen"
  },
  {
    title: "8 Online Nebenjobs für Anfänger – ohne Vorkenntnisse starten",
    slug: "online-nebenjobs-anfaenger",
    keyword: "Online Nebenjobs Anfänger",
    focus: "8 einsteigerfreundliche Online-Nebenjobs die man ohne Erfahrung sofort beginnen kann"
  },
  {
    title: "12 digitale Side Hustles die 2026 wirklich funktionieren",
    slug: "digitale-side-hustles",
    keyword: "digitale Side Hustles",
    focus: "12 digitale Side Hustles mit echtem Potenzial, inklusive KI-unterstützte Ansätze"
  },
  {
    title: "7 Wege nebenbei online Geld zu verdienen – Realistische Strategien",
    slug: "nebenbei-online-geld-verdienen",
    keyword: "nebenbei online Geld verdienen",
    focus: "7 ehrliche und funktionierende Methoden um neben dem Hauptjob online Geld zu verdienen"
  }
];

const categoryOptions = ["Marketing", "Vertrieb", "Produktivität", "Content", "Analyse", "Automatisierung", "Allgemein"];
const today = new Date().toISOString().split('T')[0];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  try {
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const batchIndex = body.batchIndex ?? 0; // 0-4 (2 topics each)
  const batchSize = 2;
  const batchTopics = topics.slice(batchIndex * batchSize, batchIndex * batchSize + batchSize);

  const results = [];
  const errors = [];

  for (const topic of batchTopics) {
    try {
      const prompt = `Du bist ein professioneller SEO-Texter. Schreibe einen vollständigen, SEO-optimierten Artikel auf Deutsch zum Thema: "${topic.focus}".

Hauptkeyword: "${topic.keyword}"
Slug: "${topic.slug}"

Artikel-Struktur (Listicle-Format):
- H1: Exakt "${topic.title}"
- Einleitung (150 Wörter) – Problem ansprechen, Lösung versprechen, Hauptkeyword in ersten 100 Wörtern
- Überblick (H2) – kurze Zusammenfassung was folgt
- Die [Zahl] Ideen/Wege/Methoden (H2 für jede einzelne Idee)
  - Pro Idee: Erklärung, Wie du startest, Verdienstpotenzial, benötigte Tools/Skills
- Tabelle: Vergleich aller Ideen (Aufwand, Potenzial, Startkapital)
- Fazit & Empfehlung (H2)
- FAQ (H2) – 5 häufige Fragen mit Antworten

Gesamtlänge: 1800-2500 Wörter. Echte, praktische Tipps. Natürlicher Schreibstil. Deutsche Leser ansprechen.
Wo passend: KI-Tools (ChatGPT, etc.) als hilfreiche Ergänzung erwähnen.

Gib das Ergebnis als JSON zurück:
{
  "title": "${topic.title}",
  "slug": "${topic.slug}",
  "excerpt": "...(120-160 Zeichen, mit Hauptkeyword)...",
  "content": "...(vollständiger Markdown-Artikel)...",
  "cover_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "category": "eines von: ${categoryOptions.join(', ')}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "meta_title": "...(max 60 Zeichen, mit Keyword)...",
  "meta_description": "...(max 160 Zeichen, mit Keyword, CTA)..."
}`;

      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: false,
        model: "gemini_3_pro",
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            slug: { type: "string" },
            excerpt: { type: "string" },
            content: { type: "string" },
            cover_image: { type: "string" },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            meta_title: { type: "string" },
            meta_description: { type: "string" }
          },
          required: ["title", "slug", "content", "excerpt", "category"]
        }
      });

      const created = await base44.asServiceRole.entities.BlogPost.create({
        ...result,
        status: "published",
        published_at: today
      });

      results.push({ slug: topic.slug, title: result.title, id: created.id });
      console.log(`✅ Erstellt: ${result.title}`);

    } catch (err) {
      console.error(`❌ Fehler bei "${topic.slug}": ${err.message}`);
      errors.push({ slug: topic.slug, error: err.message });
    }
  }

  return Response.json({
    success: true,
    created: results.length,
    failed: errors.length,
    results,
    errors
  });
});