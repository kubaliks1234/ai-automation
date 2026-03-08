import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, BookOpen, List, Star, ShieldCheck, AlertCircle, Gift, Users } from 'lucide-react';
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
  { label: '🎁 Bonus 1: 50 AI Business Ideen', sub: 'Starte sofort mit erprobten Ideen' },
  { label: '🎁 Bonus 2: 10 AI Automationen für Unternehmen', sub: 'Spare Zeit & skaliere schneller' },
];

const targetAudience = [
  'Anfänger, die mit KI Geld verdienen wollen',
  'Freelancer',
  'Unternehmer',
  'Content Creator',
];

export default function ProductBox() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuy = async () => {
    if (!email || !email.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
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
            <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-300'}`} />
          ))}
          <span className="text-white text-sm font-semibold ml-1">4.9/5</span>
          <span className="text-white/70 text-xs ml-2">· 1.200+ Nutzer</span>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Verdiene dein erstes Geld mit KI –<br className="hidden sm:block" /> auch ohne Vorkenntnisse
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Schritt-für-Schritt System mit Prompts, Strategien und KI-Workflows, um dein erstes Einkommen mit AI aufzubauen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left – Value Stack */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Was du bekommst</p>
            <div className="space-y-4 mb-6">
              {items.map(({ icon: Icon, color, bg, label, bullets, value }) => (
                <div key={label} className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <p className="text-white font-semibold text-sm">{label}</p>
                    </div>
                    <span className="text-gray-500 line-through text-xs flex-shrink-0">{value}</span>
                  </div>
                  <ul className="space-y-1 ml-12">
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

            {/* Bonuses */}
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Gratis Boni</p>
            <div className="space-y-2 mb-6">
              {bonuses.map((b) => (
                <div key={b.label} className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                  <Gift className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">{b.label}</p>
                    <p className="text-gray-500 text-xs">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-800/80 rounded-2xl px-5 py-4 border border-gray-700">
              <div className="space-y-1 mb-3">
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
              <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs">Gesamtwert: <span className="line-through">167€</span></p>
                  <p className="text-gray-400 text-sm mt-0.5">🔥 Launch Angebot – nur heute</p>
                </div>
                <p className="text-4xl font-bold text-cyan-400">17€</p>
              </div>
              <div className="mt-2 text-right">
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                  Du sparst 150€
                </span>
              </div>
            </div>
          </div>

          {/* Right – CTA */}
          <div className="flex flex-col gap-5">
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
              <p className="text-white font-semibold mb-1 text-center text-lg">Jetzt starten</p>
              <p className="text-gray-500 text-xs text-center mb-5">Sofortiger Download nach Kauf</p>

              <input
                type="email"
                placeholder="Deine E-Mail für den Download"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBuy()}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
              />

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button
                onClick={handleBuy}
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Weiterleitung...
                  </span>
                ) : (
                  '🚀 Jetzt mein erstes KI Einkommen starten'
                )}
              </Button>

              {/* Trust Triggers */}
              <div className="mt-4 space-y-2">
                {['Sofortiger Download', 'Einmalzahlung – kein Abo', 'Lifetime Zugang'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sichere Zahlung via Stripe
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-4 py-3 border border-gray-700/30">
              <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-semibold">1.200+ Nutzer</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">4.9/5 Bewertung</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Whom Section */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <h3 className="text-white font-bold text-lg text-center mb-6">Für wen ist das Bundle?</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {targetAudience.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-gray-800/40 rounded-xl px-4 py-3 border border-gray-700/30">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
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