import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, CheckCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const MY_URL = 'https://jakubkaczmarek.de';
const MY_NAME = 'Jakub Kaczmarek';

// Hochwertige deutsche KI/Marketing Blogs für Gastbeiträge
const OUTREACH_TARGETS = [
  { name: 'OMR Reviews', url: 'https://omr.com', niche: 'Marketing & Tech', da: 'hoch', contact: 'https://omr.com/de/contact/', type: 'Gastbeitrag' },
  { name: 't3n', url: 'https://t3n.de', niche: 'Digital Business', da: 'sehr hoch', contact: 'https://t3n.de/kontakt/', type: 'Gastbeitrag/Pressemitteilung' },
  { name: 'Gründerszene', url: 'https://www.gruenderszene.de', niche: 'Startup & KI', da: 'hoch', contact: 'https://www.gruenderszene.de/kontakt', type: 'Gastbeitrag' },
  { name: 'Computerwoche', url: 'https://www.computerwoche.de', niche: 'IT & Digitalisierung', da: 'sehr hoch', contact: 'https://www.computerwoche.de/kontakt/', type: 'Fachartikel' },
  { name: 'Heise Online', url: 'https://www.heise.de', niche: 'Tech & KI', da: 'sehr hoch', contact: 'https://www.heise.de/impressum/', type: 'Pressemitteilung' },
  { name: 'Digitalmarketing.de', url: 'https://digitalmarketing.de', niche: 'Online Marketing', da: 'mittel', contact: 'https://digitalmarketing.de/kontakt/', type: 'Gastbeitrag' },
  { name: 'Onlinemarketing.de', url: 'https://onlinemarketing.de', niche: 'Marketing', da: 'mittel', contact: 'https://onlinemarketing.de/ueber-uns', type: 'Gastbeitrag' },
  { name: 'KI-tools.de', url: 'https://ki-tools.de', niche: 'KI Tools', da: 'mittel', contact: 'mailto:info@ki-tools.de', type: 'Listung / Gastbeitrag' },
  { name: 'IT-Business', url: 'https://www.it-business.de', niche: 'IT & KI Business', da: 'hoch', contact: 'https://www.it-business.de/kontakt/', type: 'Fachartikel' },
  { name: 'Marconomy', url: 'https://www.marconomy.de', niche: 'B2B Marketing', da: 'mittel-hoch', contact: 'https://www.marconomy.de/kontakt/', type: 'Gastbeitrag' },
];

const BACKLINK_TACTICS = [
  { title: 'Tool-Verzeichnisse', desc: 'Trage dich in KI-Tool-Verzeichnisse ein', actions: ['Futurepedia.io', 'There\'s An AI For That', 'AI Tools Directory', 'Toolify.ai', 'Product Hunt'], done: false },
  { title: 'HARO / ProfNet', desc: 'Beantworte Journalisten-Anfragen zu KI/Automatisierung', actions: ['Auf https://www.helpareporter.com registrieren', 'Täglich KI-Anfragen beantworten', 'Expertise zeigen → Backlink in Artikeln'], done: false },
  { title: 'Lokale Verzeichnisse', desc: 'Lokale Backlinks für Donauwörth/Bayern', actions: ['IHK Schwaben Mitglied werden', 'Lokalkompass.de Profil', 'Google Business Profil optimieren', 'Bavaria Startup Liste'], done: false },
  { title: 'Podcast-Auftritte', desc: 'Als Gast in deutschen KI-Podcasts', actions: ['KI Perspektiven Podcast', 'Digital Kompakt Podcast', 'Zukunft der Arbeit Podcast', 'Kontakt aufnehmen mit Hosts via LinkedIn'], done: false },
  { title: 'LinkedIn Artikel', desc: 'Artikel auf LinkedIn veröffentlichen die auf deinen Blog verlinken', actions: ['Wöchentlich LinkedIn-Artikel mit Backlink zu Blog', 'Kommentare bei KI-Influencern hinterlassen', 'LinkedIn Newsletter aufbauen'], done: false },
];

export default function BacklinkManager() {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [template, setTemplate] = useState('');
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [expandedTactic, setExpandedTactic] = useState(null);
  const [doneTactics, setDoneTactics] = useState(() => {
    try { return JSON.parse(localStorage.getItem('doneTactics') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    base44.entities.BlogPost.filter({ status: 'published' }, '-published_at', 5)
      .then(posts => setBlogPosts(posts));
  }, []);

  const generateTemplate = async (target) => {
    setSelectedTarget(target);
    setLoadingTemplate(true);
    setTemplate('');

    const topPosts = blogPosts.slice(0, 3).map(p => `- ${p.title}: ${MY_URL}/blog/${p.slug}`).join('\n');

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Schreibe eine professionelle, kurze Outreach-E-Mail auf Deutsch für eine Backlink/Gastbeitrag-Anfrage.

Absender: ${MY_NAME} (KI-Automatisierungs-Experte, ${MY_URL})
Empfänger: Redaktion von ${target.name} (${target.url})
Typ: ${target.type}
Nische: ${target.niche}

Meine Top-Artikel als Referenz:
${topPosts}

Anforderungen:
- Maximal 150 Wörter
- Professionell aber nicht steif
- Konkreten Mehrwert für den Leser nennen (KI-Automatisierung für KMU)
- Einen konkreten Artikel-Vorschlag mit Arbeitstitel
- Call-to-Action am Ende
- Keine Floskeln wie "Ich hoffe diese E-Mail erreicht Sie gut"
- Betreffzeile am Anfang mit "Betreff: "

Schreibe NUR die E-Mail, kein Kommentar davor oder danach.`,
    });

    setTemplate(result);
    setLoadingTemplate(false);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTactic = (i) => {
    const updated = doneTactics.includes(i)
      ? doneTactics.filter(d => d !== i)
      : [...doneTactics, i];
    setDoneTactics(updated);
    localStorage.setItem('doneTactics', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white mb-2">Backlink-Manager</h1>
        <p className="text-gray-400 mb-10">Systematischer Aufbau von hochwertigen Backlinks für jakubkaczmarek.de</p>

        {/* Taktiken */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">📌 Backlink-Taktiken</h2>
          <div className="space-y-3">
            {BACKLINK_TACTICS.map((tactic, i) => (
              <div key={i} className={`border rounded-xl overflow-hidden transition-all ${doneTactics.includes(i) ? 'border-green-500/30 bg-green-500/5' : 'border-gray-800 bg-gray-900/40'}`}>
                <button
                  onClick={() => setExpandedTactic(expandedTactic === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleTactic(i); }}
                      className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${doneTactics.includes(i) ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-cyan-400'}`}
                    >
                      {doneTactics.includes(i) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <div>
                      <span className={`font-semibold ${doneTactics.includes(i) ? 'text-green-400' : 'text-white'}`}>{tactic.title}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{tactic.desc}</p>
                    </div>
                  </div>
                  {expandedTactic === i ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {expandedTactic === i && (
                  <div className="px-5 pb-4 border-t border-gray-800">
                    <ul className="mt-3 space-y-1.5">
                      {tactic.actions.map((action, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-cyan-500 mt-0.5 flex-shrink-0">→</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Outreach Targets */}
        <section>
          <h2 className="text-xl font-bold text-white mb-2">✉️ Gastbeitrag-Outreach</h2>
          <p className="text-gray-500 text-sm mb-5">Klicke auf ein Medium um eine personalisierte E-Mail-Vorlage per KI zu generieren.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {OUTREACH_TARGETS.map((target, i) => (
              <button
                key={i}
                onClick={() => generateTemplate(target)}
                className={`text-left p-4 rounded-xl border transition-all ${selectedTarget?.name === target.name ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-800 bg-gray-900/40 hover:border-gray-600'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">{target.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{target.niche}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${target.da === 'sehr hoch' ? 'bg-green-500/10 text-green-400' : target.da === 'hoch' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-700 text-gray-400'}`}>
                      DA: {target.da}
                    </span>
                    <span className="text-xs text-gray-600">{target.type}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Generated Template */}
          {(loadingTemplate || template) && (
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">E-Mail-Vorlage: {selectedTarget?.name}</h3>
                {selectedTarget?.contact && (
                  <a href={selectedTarget.contact} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                    Kontakt <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              {loadingTemplate ? (
                <div className="flex items-center gap-2 text-gray-400 py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">KI generiert Vorlage...</span>
                </div>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans bg-gray-950/50 rounded-xl p-4 mb-4">{template}</pre>
                  <Button
                    onClick={() => copyToClipboard(template, 'template')}
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:text-white"
                  >
                    {copiedId === 'template' ? <CheckCircle className="w-4 h-4 text-green-400 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedId === 'template' ? 'Kopiert!' : 'In Zwischenablage kopieren'}
                  </Button>
                </>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}