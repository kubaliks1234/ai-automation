import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, ChevronDown, ChevronUp, Copy, Check, Loader2, X, Zap, RefreshCw } from 'lucide-react';

// SEO-Guide Keywords vorgefüllt nach Kategorie
const CATEGORY_KEYWORDS = {
  "Automatisierung": ["KI Automatisierung", "n8n Automatisierung DACH", "Workflow Automatisierung B2B"],
  "Marketing": ["Marketing Automatisierung KI", "LinkedIn Automatisierung", "KI Content Marketing"],
  "Vertrieb": ["KI Leadgenerierung B2B", "AI Automation Freelancer Deutschland", "Vertrieb Automatisierung"],
  "Produktivität": ["KI Tools Unternehmen 2026", "Prompt Engineering B2B", "KI Produktivität"],
  "Content": ["KI Content Erstellung", "ElevenLabs Voice Agent", "Content Pipeline KI"],
  "Analyse": ["Perplexity AI Test", "KI Analyse Tools", "AI Research Automatisierung"],
  "Allgemein": ["KI Automatisierung Spezialist", "KI Consultant Deutschland", "Automatisierung Berater DACH"],
};

const BOFU_KEYWORDS = [
  "KI Automatisierung Spezialist", "n8n Automatisierung Agentur", "KI Consultant Deutschland",
  "AI Automation Freelancer Deutschland", "Marketing Automatisierung KI", "KI Recruiting Automatisierung",
  "Automatisierung Berater DACH", "n8n Workflow Entwickler"
];

export default function SeoOptimierung() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [keywords, setKeywords] = useState({});
  const [keywordInput, setKeywordInput] = useState({});
  const [analyzing, setAnalyzing] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [copied, setCopied] = useState({});
  const [applying, setApplying] = useState({});
  const [applied, setApplied] = useState({});

  // Bulk state
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(null); // { done, total, results }

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setLoading(true);
    base44.entities.BlogPost.list('-published_at', 200).then(data => {
      setPosts(data.filter(p => p.status === 'published'));
      setLoading(false);
    });
  };

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Init keywords from guide for a post
  const initKeywords = (post) => {
    const cat = post.category || 'Allgemein';
    const guideKws = CATEGORY_KEYWORDS[cat] || CATEGORY_KEYWORDS['Allgemein'];
    setKeywords(prev => ({ ...prev, [post.id]: guideKws }));
  };

  const addKeyword = (postId) => {
    const val = (keywordInput[postId] || '').trim();
    if (!val) return;
    setKeywords(prev => ({ ...prev, [postId]: [...(prev[postId] || []), val] }));
    setKeywordInput(prev => ({ ...prev, [postId]: '' }));
  };

  const removeKeyword = (postId, kw) => {
    setKeywords(prev => ({ ...prev, [postId]: prev[postId].filter(k => k !== kw) }));
  };

  const analyze = async (post) => {
    const kws = keywords[post.id] || [];
    if (kws.length === 0) return;
    setAnalyzing(prev => ({ ...prev, [post.id]: true }));
    setSuggestions(prev => ({ ...prev, [post.id]: null }));

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Du bist SEO-Experte für jakubkaczmarek.de (KI-Automatisierung Spezialist DACH, B2B-Markt).

AKTUELLER BEITRAG:
Titel: ${post.title}
Kategorie: ${post.category}
Meta Title aktuell: ${post.meta_title || '(leer)'}
Meta Description aktuell: ${post.meta_description || '(leer)'}
Excerpt aktuell: ${post.excerpt || '(leer)'}

ZIEL-KEYWORDS aus dem SEO-Guide: ${kws.join(', ')}
BOFU Keywords (höchste Priorität): ${BOFU_KEYWORDS.slice(0, 4).join(', ')}

Erstelle optimierte Versionen nach On-Page Checkliste:
- Meta Title: max. 60 Zeichen, Hauptkeyword an Position 1
- Meta Description: max. 160 Zeichen, Keyword + konkreter Nutzen + CTA ("Jetzt lesen" o.ä.)
- Excerpt: max. 200 Zeichen, ansprechend, Keyword enthalten
- Optimierter Titel: prägnant, Keyword + 2026
- Content-Tipps: 3-5 konkrete Hinweise (H2-Struktur, FAQ-Sektion, interne Verlinkung zu Pillar Pages, Tabellen)
- NIEMALS: bahnbrechend, revolutionär, Game-Changer, cutting-edge, transformativ, Gedankenstriche (—), rhetorische Einwort-Fragen
- Sprache: Deutsch, direkt, konkret`,
      response_json_schema: {
        type: 'object',
        properties: {
          optimized_title: { type: 'string' },
          optimized_meta_title: { type: 'string' },
          optimized_meta_description: { type: 'string' },
          optimized_excerpt: { type: 'string' },
          content_tips: { type: 'array', items: { type: 'string' } },
          keyword_density_note: { type: 'string' }
        }
      }
    });

    setSuggestions(prev => ({ ...prev, [post.id]: result }));
    setAnalyzing(prev => ({ ...prev, [post.id]: false }));
  };

  const copyText = (postId, field, text) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [`${postId}-${field}`]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [`${postId}-${field}`]: false })), 2000);
  };

  const applyAll = async (post) => {
    const s = suggestions[post.id];
    if (!s) return;
    setApplying(prev => ({ ...prev, [post.id]: true }));
    await base44.entities.BlogPost.update(post.id, {
      title: s.optimized_title,
      meta_title: s.optimized_meta_title,
      meta_description: s.optimized_meta_description,
      excerpt: s.optimized_excerpt,
    });
    setApplied(prev => ({ ...prev, [post.id]: true }));
    setPosts(prev => prev.map(p => p.id === post.id ? {
      ...p,
      title: s.optimized_title,
      meta_title: s.optimized_meta_title,
      meta_description: s.optimized_meta_description,
      excerpt: s.optimized_excerpt,
    } : p));
    setApplying(prev => ({ ...prev, [post.id]: false }));
    setTimeout(() => setApplied(prev => ({ ...prev, [post.id]: false })), 3000);
  };

  // Bulk: run in batches of 10 until all done
  const runBulk = async () => {
    setBulkRunning(true);
    const total = posts.length;
    let done = 0;
    const allResults = [];
    setBulkProgress({ done: 0, total, results: [] });

    while (done < total) {
      const res = await base44.functions.invoke('bulkSeoOptimize', { batch_size: 10 });
      const data = res.data;
      done += data.updated || 0;
      allResults.push(...(data.results || []));
      setBulkProgress({ done, total, results: allResults });
      if (!data.remaining || data.remaining === 0) break;
      // small delay between batches
      await new Promise(r => setTimeout(r, 1500));
    }

    setBulkRunning(false);
    loadPosts(); // refresh
  };

  const metaStatus = (post) => {
    const hasTitle = post.meta_title && post.meta_title.length <= 60;
    const hasDesc = post.meta_description && post.meta_description.length <= 160;
    if (hasTitle && hasDesc) return 'ok';
    if (hasTitle || hasDesc) return 'partial';
    return 'missing';
  };

  const statusDot = (st) => {
    if (st === 'ok') return 'bg-green-500';
    if (st === 'partial') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold">SEO-Optimierung</h1>
          </div>
          <p className="text-gray-400 text-sm">Strategie: BOFU→MOFU Trichter · KI-Automatisierung Spezialist DACH · Keywords aus SEO-Guide vorausgefüllt.</p>
        </div>

        {/* Bulk Section */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5 mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-cyan-300 flex items-center gap-2"><Zap className="w-4 h-4" />Alle Beiträge auf einmal optimieren</p>
              <p className="text-xs text-gray-400 mt-1">Automatisch Meta Title, Meta Description und Excerpt für alle {posts.length} Beiträge nach SEO-Guide optimieren.</p>
              {bulkProgress && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${Math.min(100, (bulkProgress.done / bulkProgress.total) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-gray-400">{bulkProgress.done}/{bulkProgress.total}</span>
                  </div>
                  {bulkProgress.results.slice(-3).map((r, i) => (
                    <p key={i} className="text-xs text-gray-500 truncate">✓ {r.title}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={loadPosts} variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
              <Button
                onClick={runBulk}
                disabled={bulkRunning || loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold whitespace-nowrap"
              >
                {bulkRunning ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Läuft...</> : <><Zap className="w-4 h-4 mr-2" />Alle optimieren</>}
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Beitrag suchen..."
            className="pl-9 bg-gray-900 border-gray-800 text-white placeholder:text-gray-600"
          />
        </div>

        {/* Stats bar */}
        {!loading && (
          <div className="flex gap-4 text-xs text-gray-500 mb-4">
            <span><span className="text-green-400 font-medium">{posts.filter(p => metaStatus(p) === 'ok').length}</span> vollständig</span>
            <span><span className="text-yellow-400 font-medium">{posts.filter(p => metaStatus(p) === 'partial').length}</span> teilweise</span>
            <span><span className="text-red-400 font-medium">{posts.filter(p => metaStatus(p) === 'missing').length}</span> fehlen</span>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(post => {
              const isOpen = expandedId === post.id;
              const kws = keywords[post.id] || [];
              const s = suggestions[post.id];
              const st = metaStatus(post);
              return (
                <div key={post.id} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-800/40 transition-colors"
                    onClick={() => {
                      const opening = expandedId !== post.id;
                      setExpandedId(opening ? post.id : null);
                      if (opening && !keywords[post.id]) initKeywords(post);
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${statusDot(st)}`} title={st} />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{post.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {post.category}
                          {post.meta_title && <span className="ml-2 text-gray-600">· Meta: "{post.meta_title.slice(0, 35)}{post.meta_title.length > 35 ? '…' : ''}"</span>}
                        </p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 ml-3 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-3 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 border-t border-gray-800 pt-5 space-y-5">
                      {/* Current SEO */}
                      <div className="space-y-2 text-xs">
                        <p className="text-gray-500 font-medium uppercase tracking-wide">Aktuell</p>
                        <div className="bg-gray-800/60 rounded-lg p-3 space-y-2">
                          <div>
                            <span className="text-gray-500">Meta Title: </span>
                            <span className={`${post.meta_title ? (post.meta_title.length > 60 ? 'text-red-400' : 'text-green-400') : 'text-red-400'}`}>
                              {post.meta_title || '(fehlt)'}
                            </span>
                            {post.meta_title && <span className="text-gray-600 ml-1">({post.meta_title.length}/60)</span>}
                          </div>
                          <div>
                            <span className="text-gray-500">Meta Desc: </span>
                            <span className={`${post.meta_description ? (post.meta_description.length > 160 ? 'text-red-400' : 'text-green-400') : 'text-red-400'}`}>
                              {post.meta_description || '(fehlt)'}
                            </span>
                            {post.meta_description && <span className="text-gray-600 ml-1">({post.meta_description.length}/160)</span>}
                          </div>
                          <div>
                            <span className="text-gray-500">Excerpt: </span>
                            <span className="text-gray-200">{post.excerpt ? post.excerpt.slice(0, 80) + (post.excerpt.length > 80 ? '…' : '') : '(fehlt)'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Ziel-Keywords</p>
                          <button onClick={() => initKeywords(post)} className="text-xs text-cyan-400 hover:text-cyan-300">Guide-Keywords laden</button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {kws.map(kw => (
                            <Badge key={kw} variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 gap-1 text-xs">
                              {kw}
                              <button onClick={() => removeKeyword(post.id, kw)}><X className="w-3 h-3" /></button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={keywordInput[post.id] || ''}
                            onChange={e => setKeywordInput(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && addKeyword(post.id)}
                            placeholder="Keyword eingeben + Enter"
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 text-sm h-9"
                          />
                          <Button onClick={() => addKeyword(post.id)} size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-white h-9">+</Button>
                        </div>
                      </div>

                      {/* Analyze */}
                      <Button
                        onClick={() => analyze(post)}
                        disabled={kws.length === 0 || analyzing[post.id]}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium"
                      >
                        {analyzing[post.id] ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Analysiere...</> : <><Sparkles className="w-4 h-4 mr-2" />SEO analysieren</>}
                      </Button>

                      {/* Suggestions */}
                      {s && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">KI-Vorschläge</p>
                          {[
                            { label: 'Titel', field: 'optimized_title', val: s.optimized_title, limit: null },
                            { label: 'Meta Title', field: 'optimized_meta_title', val: s.optimized_meta_title, limit: 60 },
                            { label: 'Meta Description', field: 'optimized_meta_description', val: s.optimized_meta_description, limit: 160 },
                            { label: 'Excerpt', field: 'optimized_excerpt', val: s.optimized_excerpt, limit: null },
                          ].map(({ label, field, val, limit }) => (
                            <div key={field} className="bg-gray-800/60 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-gray-400 font-medium">
                                  {label}
                                  {limit && val && <span className={`ml-1 ${val.length > limit ? 'text-red-400' : 'text-green-400'}`}>({val.length}/{limit})</span>}
                                </span>
                                <button onClick={() => copyText(post.id, field, val)} className="text-gray-500 hover:text-cyan-400 transition-colors">
                                  {copied[`${post.id}-${field}`] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <p className="text-sm text-white">{val}</p>
                            </div>
                          ))}

                          {s.content_tips?.length > 0 && (
                            <div className="bg-gray-800/60 rounded-lg p-3">
                              <p className="text-xs text-gray-400 font-medium mb-2">Content-Tipps (On-Page Checkliste)</p>
                              <ul className="space-y-1.5">
                                {s.content_tips.map((tip, i) => (
                                  <li key={i} className="flex gap-2 text-sm text-gray-300">
                                    <span className="text-cyan-400 shrink-0">→</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {s.keyword_density_note && <p className="text-xs text-gray-500 italic">{s.keyword_density_note}</p>}

                          <Button
                            onClick={() => applyAll(post)}
                            disabled={applying[post.id]}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium"
                          >
                            {applying[post.id] ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Wird übernommen...</>
                              : applied[post.id] ? <><Check className="w-4 h-4 mr-2" />Übernommen!</>
                              : 'Alle Vorschläge übernehmen'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}