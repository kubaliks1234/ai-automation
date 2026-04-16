import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';

export default function SeoAdmin() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [summary, setSummary] = useState(null);
  const LIMIT = 10;

  const runInspection = async (newOffset = offset) => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('requestGoogleIndexing', { offset: newOffset, limit: LIMIT });
      setResults(res.data.results);
      setSummary({ indexed: res.data.indexed, notIndexed: res.data.notIndexed, total: res.data.total });
      setOffset(newOffset);
    } finally {
      setLoading(false);
    }
  };

  const inspectSingle = async (slug) => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('requestGoogleIndexing', { slug });
      const r = res.data.results[0];
      setResults(prev => prev.map(p => p.slug === slug ? { ...p, ...r } : p));
    } finally {
      setLoading(false);
    }
  };

  const verdictBadge = (verdict) => {
    if (verdict === 'PASS') return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Indexiert</Badge>;
    if (verdict === 'FAIL') return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Nicht indexiert</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Unbekannt</Badge>;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">SEO Index-Status</h1>
      <p className="text-gray-500 mb-6 text-sm">Prüft den Google-Indexierungsstatus der Blog-Posts via Search Console API (10 pro Batch).</p>

      <div className="flex items-center gap-3 mb-6">
        <Button onClick={() => runInspection(0)} disabled={loading}>
          {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Batch prüfen (Posts {offset + 1}–{offset + LIMIT})
        </Button>
        <Button variant="outline" onClick={() => runInspection(Math.max(0, offset - LIMIT))} disabled={loading || offset === 0}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={() => runInspection(offset + LIMIT)} disabled={loading}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        {summary && (
          <span className="text-sm text-gray-500 ml-2">
            ✅ {summary.indexed} indexiert · ❌ {summary.notIndexed} nicht indexiert
          </span>
        )}
      </div>

      {results.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Slug</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Letzter Crawl</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 font-mono text-xs text-gray-700 max-w-xs truncate">{r.slug}</td>
                  <td className="p-3">{verdictBadge(r.verdict)}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {r.lastCrawled ? new Date(r.lastCrawled).toLocaleDateString('de-DE') : '—'}
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="ghost" onClick={() => inspectSingle(r.slug)} disabled={loading}>
                      Neu prüfen
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-400">
          Klicke auf "Batch prüfen" um den Index-Status zu laden.
        </div>
      )}
    </div>
  );
}