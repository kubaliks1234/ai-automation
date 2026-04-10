import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, ChevronDown, ChevronUp, Copy, Check, Loader2, X } from 'lucide-react';

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

  useEffect(() => {
    base44.entities.BlogPost.list('-published_at', 200).then(data => {
      setPosts(data.filter(p => p.status === 'published'));
      setLoading(false);
    });
  }, []);

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const addKeyword = (postId) => {
    const val = (keywordInput[postId] || '').trim();
    if (!val) return;
    setKeywords(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), val]
    }));
    setKeywordInput(prev => ({ ...prev, [postId]: '' }));
  };

  const removeKeyword = (postId, kw) => {
    setKeywords(prev => ({
      ...prev,
      [postId]: prev[postId].filter(k => k !== kw)
    }));
  };

  const analyze = async (post) => {
    const kws = keywords[post.id] || [];
    if (kws.length === 0) return;
    setAnalyzing(prev => ({ ...prev, [post.id]: true }));
    setSuggestions(prev => ({ ...prev, [post.id]: null }));

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Du bist ein SEO-Experte. Analysiere diesen deutschen Blogbeitrag und gib konkrete Verbesserungsvorschläge basierend auf den Ziel-Keywords.

AKTUELLER BEITRAG:
Titel: ${post.title}
Meta Title: ${post.meta_title || post.title}
Meta Description: ${post.meta_description || post.excerpt}
Excerpt: ${post.excerpt}

ZIEL-KEYWORDS: ${kws.join(', ')}

Erstelle optimierte Versionen. Regeln:
- Meta Title: max. 60 Zeichen, Keyword möglichst vorne
- Meta Description: max. 160 Zeichen, enthält Keyword + klaren Nutzen
- Titel: prägnant, enthält das Haupt-Keyword
- Content-Tipps: 3-5 konkrete Hinweise zur inhaltlichen Optimierung (H2-Struktur, fehlende Abschnitte, interne Verlinkung etc.)
- Kein Marketingsprech, keine verbotenen Wörter wie "revolutionär", "bahnbrechend", "Game-Changer"
- Sprache: Deutsch`,
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold">SEO-Optimierung</h1>
          </div>
          <p className="text-gray-400 text-sm">Keywords eingeben → KI analysiert und verbessert Titel, Meta-Tags & Inhalt.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Beitrag suchen..."
            className="pl-9 bg-gray-900 border-gray-800 text-white placeholder:text-gray-600"
          />
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(post => {
              const isOpen = expandedId === post.id;
              const kws = keywords[post.id] || [];
              const s = suggestions[post.id];
              return (
                <div key={post.id} className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                  {/* Post header */}
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/40 transition-colors"
                    onClick={() => setExpandedId(isOpen ? null : post.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{post.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{post.category} · {post.published_at}</p>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 ml-3 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-3 shrink-0" />}
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-5 pb-6 border-t border-gray-800 pt-5 space-y-5">
                      {/* Current */}
                      <div className="space-y-2 text-xs">
                        <p className="text-gray-500 font-medium uppercase tracking-wide">Aktuell</p>
                        <div className="bg-gray-800/60 rounded-lg p-3 space-y-1.5">
                          <p><span className="text-gray-500">Meta Title:</span> <span className="text-gray-200">{post.meta_title || post.title}</span> <span className="text-gray-600">({(post.meta_title || post.title)?.length}/60)</span></p>
                          <p><span className="text-gray-500">Meta Desc:</span> <span className="text-gray-200">{post.meta_description || post.excerpt}</span> <span className="text-gray-600">({(post.meta_description || post.excerpt)?.length}/160)</span></p>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Ziel-Keywords</p>
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
                          <Button onClick={() => addKeyword(post.id)} size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-white h-9">
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Analyze button */}
                      <Button
                        onClick={() => analyze(post)}
                        disabled={kws.length === 0 || analyzing[post.id]}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-medium"
                      >
                        {analyzing[post.id] ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Analysiere...</> : <><Sparkles className="w-4 h-4 mr-2" />SEO analysieren</>}
                      </Button>

                      {/* Suggestions */}
                      {s && (
                        <div className="space-y-4">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">KI-Vorschläge</p>

                          {[
                            { label: 'Titel', field: 'optimized_title', val: s.optimized_title, limit: null },
                            { label: 'Meta Title', field: 'optimized_meta_title', val: s.optimized_meta_title, limit: 60 },
                            { label: 'Meta Description', field: 'optimized_meta_description', val: s.optimized_meta_description, limit: 160 },
                            { label: 'Excerpt', field: 'optimized_excerpt', val: s.optimized_excerpt, limit: null },
                          ].map(({ label, field, val, limit }) => (
                            <div key={field} className="bg-gray-800/60 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-gray-400 font-medium">{label} {limit && <span className={`text-xs ${val?.length > limit ? 'text-red-400' : 'text-green-400'}`}>({val?.length}/{limit})</span>}</span>
                                <button onClick={() => copyText(post.id, field, val)} className="text-gray-500 hover:text-cyan-400 transition-colors">
                                  {copied[`${post.id}-${field}`] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <p className="text-sm text-white">{val}</p>
                            </div>
                          ))}

                          {/* Content tips */}
                          {s.content_tips?.length > 0 && (
                            <div className="bg-gray-800/60 rounded-lg p-3">
                              <p className="text-xs text-gray-400 font-medium mb-2">Content-Tipps</p>
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

                          {s.keyword_density_note && (
                            <p className="text-xs text-gray-500 italic">{s.keyword_density_note}</p>
                          )}

                          {/* Apply button */}
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