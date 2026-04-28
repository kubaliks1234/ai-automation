import { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, RefreshCw, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';

const BATCH_SIZE = 10;

export default function SeoAdmin() {
  // Inspection tab
  const [inspectResults, setInspectResults] = useState([]);
  const [inspectLoading, setInspectLoading] = useState(false);
  const [inspectOffset, setInspectOffset] = useState(0);
  const [inspectSummary, setInspectSummary] = useState(null);

  // Bulk crawl tab
  const [crawlResults, setCrawlResults] = useState([]);
  const [crawlRunning, setCrawlRunning] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState({ done: 0, total: 0, succeeded: 0, failed: 0 });
  const crawlStopped = useRef(false);

  const [activeTab, setActiveTab] = useState('crawl');

  // ── Inspection ──────────────────────────────────────────────
  const runInspection = async (newOffset = inspectOffset) => {
    setInspectLoading(true);
    try {
      const res = await base44.functions.invoke('requestGoogleIndexing', { offset: newOffset, limit: BATCH_SIZE });
      setInspectResults(res.data.results);
      setInspectSummary({ indexed: res.data.indexed, notIndexed: res.data.notIndexed });
      setInspectOffset(newOffset);
    } finally {
      setInspectLoading(false);
    }
  };

  const inspectSingle = async (slug) => {
    setInspectLoading(true);
    try {
      const res = await base44.functions.invoke('requestGoogleIndexing', { slug });
      const r = res.data.results[0];
      if (r) setInspectResults(prev => prev.map(p => p.slug === slug ? { ...p, ...r } : p));
    } finally {
      setInspectLoading(false);
    }
  };

  // ── Bulk Crawl ───────────────────────────────────────────────
  const startBulkCrawl = async () => {
    setCrawlRunning(true);
    crawlStopped.current = false;
    setCrawlResults([]);

    // Get total count first
    const firstBatch = await base44.functions.invoke('requestGoogleIndexing', { offset: 0, limit: 1 });
    // We'll run until we get empty results
    let offset = 0;
    let totalDone = 0;
    let totalSucceeded = 0;
    let totalFailed = 0;
    const allResults = [];

    while (!crawlStopped.current) {
      const res = await base44.functions.invoke('requestGoogleIndexing', { offset, limit: BATCH_SIZE });
      const batch = res.data.results;
      if (!batch || batch.length === 0) break;

      allResults.push(...batch);
      totalDone += batch.length;
      totalSucceeded += res.data.indexed;
      totalFailed += res.data.notIndexed;

      setCrawlResults([...allResults]);
      setCrawlProgress({ done: totalDone, total: totalDone, succeeded: totalSucceeded, failed: totalFailed });

      if (batch.length < BATCH_SIZE) break; // last batch
      offset += BATCH_SIZE;

      // Small delay between batches to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }

    setCrawlRunning(false);
  };

  const stopCrawl = () => {
    crawlStopped.current = true;
    setCrawlRunning(false);
  };

  const verdictBadge = (verdict) => {
    if (verdict === 'PASS') return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Indexiert</Badge>;
    if (verdict === 'FAIL') return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Nicht indexiert</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Unbekannt</Badge>;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">SEO Index-Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Google Search Console Integration – Indexierungsstatus und Crawl-Anfragen</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('crawl')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'crawl' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          📊 Index-Status prüfen (alle Posts)
        </button>
        <button
          onClick={() => setActiveTab('inspect')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'inspect' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          🔍 Einzelne Batches prüfen
        </button>
      </div>

      {/* ── TAB: Bulk Crawl ── */}
      {activeTab === 'crawl' && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
            <strong>Wie es funktioniert:</strong> Lädt alle veröffentlichten Blog-Posts und fragt für jeden den aktuellen Google-Indexierungsstatus ab.
            Posts mit Status "Nicht indexiert" (FAIL/UNKNOWN) solltest du in der Search Console manuell zur Indexierung einreichen oder die Sitemap neu einreichen.
          </div>

          <div className="flex items-center gap-3 mb-6">
            {!crawlRunning ? (
              <Button onClick={startBulkCrawl} className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Alle Posts prüfen
              </Button>
            ) : (
              <Button onClick={stopCrawl} variant="destructive">
                <Pause className="w-4 h-4 mr-2" />
                Stoppen
              </Button>
            )}
            {crawlProgress.done > 0 && (
              <span className="text-sm text-gray-600">
                {crawlProgress.done} geprüft · ✅ {crawlProgress.succeeded} indexiert · ❌ {crawlProgress.failed} nicht indexiert
              </span>
            )}
            {crawlRunning && (
              <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
            )}
          </div>

          {crawlResults.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-600">Slug</th>
                    <th className="text-left p-3 font-medium text-gray-600">Status</th>
                    <th className="text-left p-3 font-medium text-gray-600">Letzter Crawl</th>
                  </tr>
                </thead>
                <tbody>
                  {crawlResults.map((r, i) => (
                    <tr key={r.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-mono text-xs text-gray-700 max-w-xs truncate">{r.slug}</td>
                      <td className="p-3">{verdictBadge(r.verdict)}</td>
                      <td className="p-3 text-xs text-gray-500">
                        {r.lastCrawled ? new Date(r.lastCrawled).toLocaleDateString('de-DE') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {crawlResults.length === 0 && !crawlRunning && (
            <div className="text-center py-12 text-gray-400">
              Klicke auf "Alle Posts prüfen" um den Index-Status zu laden.
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Einzelne Batches ── */}
      {activeTab === 'inspect' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Button onClick={() => runInspection(0)} disabled={inspectLoading}>
              {inspectLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Batch {inspectOffset + 1}–{inspectOffset + BATCH_SIZE} prüfen
            </Button>
            <Button variant="outline" onClick={() => runInspection(Math.max(0, inspectOffset - BATCH_SIZE))} disabled={inspectLoading || inspectOffset === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => runInspection(inspectOffset + BATCH_SIZE)} disabled={inspectLoading}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            {inspectSummary && (
              <span className="text-sm text-gray-500">
                ✅ {inspectSummary.indexed} indexiert · ❌ {inspectSummary.notIndexed} nicht indexiert
              </span>
            )}
          </div>

          {inspectResults.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-600">Slug</th>
                    <th className="text-left p-3 font-medium text-gray-600">Status</th>
                    <th className="text-left p-3 font-medium text-gray-600">Letzter Crawl</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {inspectResults.map((r, i) => (
                    <tr key={r.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-mono text-xs text-gray-700 max-w-xs truncate">{r.slug}</td>
                      <td className="p-3">{verdictBadge(r.verdict)}</td>
                      <td className="p-3 text-xs text-gray-500">
                        {r.lastCrawled ? new Date(r.lastCrawled).toLocaleDateString('de-DE') : '—'}
                      </td>
                      <td className="p-3">
                        <Button size="sm" variant="ghost" onClick={() => inspectSingle(r.slug)} disabled={inspectLoading}>
                          Neu prüfen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {inspectResults.length === 0 && !inspectLoading && (
            <div className="text-center py-12 text-gray-400">
              Klicke auf "Batch prüfen" um den Index-Status zu laden.
            </div>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <strong>💡 Tipp:</strong> Google indexiert SPAs (Single Page Apps) oft verzögert, da JavaScript gerendert werden muss.
        Stelle sicher, dass deine <code className="bg-amber-100 px-1 rounded">prerenderBlogPost</code> Funktion für Crawler erreichbar ist und korrekte Canonical-Tags setzt.
        Die Sitemap unter <a href="/sitemap-blog" className="underline font-medium">/sitemap-blog</a> sollte regelmäßig bei Search Console eingereicht werden.
      </div>
    </div>
  );
}