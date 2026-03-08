import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, BookOpen, List, Star, ShieldCheck, AlertCircle, Gift, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  {
    icon: BookOpen,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    label: '📘 AI Income Blueprint',
    bullets: ['Wie du KI nutzt um Geld zu verdienen', 'Welche Geschäftsmodelle funktionieren', 'Wie du dein erstes Angebot aufbaust'],
    value: '49€',
  },
  {
    icon: Zap,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    label: '⚡ 100+ AI Money Prompts',
    bullets: ['Content Erstellung & Marketing', 'Leadgenerierung & Verkauf', 'Automationen – spart dir Stunden Arbeit'],
    value: '79€',
  },
  {
    icon: List,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    label: '✅ AI Business Setup Checklisten',
    bullets: ['Erstes KI Angebot erstellen', 'Kunden gewinnen', 'Marketing automatisieren'],
    value: '39€',
  },
];

const bonuses = [
  { label: '50 AI Business Ideen', sub: 'Starte sofort mit erprobten Ideen' },
  { label: '10 AI Automationen für Unternehmen', sub: 'Spare Zeit & skaliere schneller' },
];

const targetAudience = [
  'Anfänger, die mit KI Geld verdienen wollen',
  'Freelancer',
  'Unternehmer',
  'Content Creator',
];

const results = [
  'wie du mit KI Geld verdienen kannst',
  'welche AI Geschäftsmodelle funktionieren',
  'wie du dein erstes Angebot erstellst',
  'wie du Kunden gewinnst',
];

export default function ProductBox() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuy = async () => {
    if (window.self !== window.top) {
      alert('Der Kauf ist nur in der veröffentlichten App möglich, nicht in der Vorschau.');
      return;
    }
    setError('');
    setLoading(true);
    const currentUrl = window.location.href.split('?')[0];
    const response = await base44.functions.invoke('createCheckout', {
      email,
      success_url: currentUrl + '?payment=success',
      cancel_url: currentUrl + '?payment=cancelled',
    });
    setLoading(false);
    if (response.data?.url) {
      window.location.href = response.data.url;
    } else {
      setError('Fehler beim Starten des Checkouts. Bitte versuche es erneut.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-16 rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-gray-900/90 to-[#0a0a0f] shadow-2xl shadow-cyan-500/10"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <span className="text-white font-bold text-sm">🔥 Launch Angebot – nur heute 17€</span>
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          ))}
          <span className="text-white text-sm font-semibold ml-1">4.9/5</span>
          <span className="text-white/70 text-xs ml-2">· 1.200+ Nutzer</span>
        </div>
      </div>

      <div className="p-6 sm:p-10">

        {/* HERO HEADLINE */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Verdiene dein erstes Geld mit KI –<br className="hidden sm:block" /> auch ohne Vorkenntnisse
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-5">
            Schritt-für-Schritt System mit Prompts, Strategien und KI-Workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            {['Keine technischen Kenntnisse nötig', 'Sofort umsetzbare KI Strategien', 'Erste Ergebnisse oft innerhalb weniger Tage'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 py-4 border-y border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="font-semibold">4.9/5 Bewertung</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">1.200+ Käufer</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="font-semibold">Von Freelancern & Unternehmern genutzt</span>
          </div>
        </div>

        {/* MAIN GRID – Mobile: CTA first, then content */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* RIGHT – CTA (comes first on mobile via order) */}
          <div className="flex flex-col gap-5 order-first lg:order-last">

            {/* Price Box */}
            <div className="bg-gray-800/80 rounded-2xl px-5 py-5 border border-gray-700">
              <div className="space-y-1 mb-4">
                {[
                  { label: 'AI Income Blueprint', val: '49€' },
                  { label: 'AI Money Prompts', val: '79€' },
                  { label: 'AI Business Checklisten', val: '39€' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="text-gray-500 line-through">{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Gesamtwert</p>
                  <p className="text-gray-400 line-through text-xl" style={{ opacity: 0.5 }}>167€</p>
                  <p className="text-gray-400 text-sm mt-1">🔥 Launch Angebot – nur heute</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cyan-400" style={{ fontSize: '42px', lineHeight: 1 }}>17€</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="bg-green-500/20 text-green-400 text-sm font-bold px-4 py-1.5 rounded-full border border-green-500/30">
                  🟢 Du sparst 150€
                </span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleBuy}
                disabled={loading}
                style={{
                  height: '56px',
                  background: loading ? '#374151' : 'linear-gradient(90deg, #3B82F6, #22D3EE)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.4)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                className="w-full text-white rounded-xl text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Weiterleitung...
                  </span>
                ) : (
                  '🚀 Jetzt mein erstes KI Einkommen starten'
                )}
              </button>

              {/* Trust Triggers */}
              <div className="mt-4 space-y-2">
                {['Sichere Zahlung via Stripe', 'Sofortiger Download', '30 Tage Geld zurück Garantie'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT – Value Stack */}
          <div className="order-last lg:order-first">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Was du bekommst</p>
            <div className="space-y-5 mb-6">
              {items.map(({ icon: Icon, color, bg, label, bullets, value }) => (
                <div
                  key={label}
                  className="rounded-2xl p-6 border transition-all duration-200 cursor-default group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(0,200,255,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid #00D1FF';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0,200,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(0,200,255,0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <p className="text-white font-semibold text-sm">{label}</p>
                    </div>
                    <span className="text-gray-500 line-through text-xs flex-shrink-0">{value}</span>
                  </div>
                  <ul className="space-y-1.5 ml-13 pl-1">
                    {bullets.map((b) => (
                      <li key={b} className="text-gray-400 text-xs flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bonuses – Golden Highlight */}
            <div
              className="rounded-2xl p-5 mb-6"
              style={{
                background: 'rgba(255,200,87,0.05)',
                border: '1px solid #FFC857',
              }}
            >
              <p className="text-yellow-400 font-bold text-sm mb-3">🔥 Gratis Bonus (nur heute)</p>
              <div className="space-y-3">
                {bonuses.map((b) => (
                  <div key={b.label} className="flex items-start gap-3">
                    <Gift className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-semibold">🎁 {b.label}</p>
                      <p className="text-gray-500 text-xs">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ERGEBNIS SECTION */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <h3 className="text-white font-bold text-xl text-center mb-2">Was du nach diesem Bundle kannst</h3>
          <p className="text-gray-500 text-sm text-center mb-6">Nach diesem Bundle wirst du wissen:</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {results.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-4 py-3 border border-gray-700/30">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FÜR WEN SECTION */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <h3 className="text-white font-bold text-xl text-center mb-6">Für wen ist das Bundle?</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {targetAudience.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-200 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <CheckCircle className="w-7 h-7 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Dieses Bundle ist perfekt, wenn du mit KI Geld verdienen willst – unabhängig von deinem aktuellen Stand.
          </p>
        </div>

      </div>
    </motion.div>
  );
}