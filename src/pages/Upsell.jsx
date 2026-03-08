import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, Briefcase, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { createPageUrl } from '@/utils';

const modules = [
  { num: '01', title: 'KI Automationen verstehen', desc: 'Welche Prozesse sich automatisieren lassen und wo du sofort anfangen kannst.' },
  { num: '02', title: 'Content Automation', desc: 'KI erstellt Content automatisch – für Social Media, Blog und E-Mail.' },
  { num: '03', title: 'Lead Generation Systeme', desc: 'Leads automatisch finden, ansprechen und qualifizieren.' },
  { num: '04', title: 'AI Workflow Automationen', desc: 'Marketing und Sales vollständig automatisieren.' },
  { num: '05', title: 'AI Business Systeme', desc: 'Wie du Automationen als Service an Unternehmen verkaufen kannst.' },
];

const bonuses = [
  { emoji: '🗂️', title: '20 AI Automation Templates', desc: 'Fertige Automationen für Unternehmen – direkt einsetzbar.' },
  { emoji: '🛠️', title: 'AI Tool Stack', desc: 'Die besten Tools für Automationen, übersichtlich kuratiert.' },
  { emoji: '✅', title: 'Automation Setup Checkliste', desc: 'Schritt-für-Schritt Anleitung für deinen ersten Automatismus.' },
];

const faqs = [
  { q: 'Brauche ich Programmierkenntnisse?', a: 'Nein. Alles wird Schritt für Schritt erklärt – ohne Code.' },
  { q: 'Wann bekomme ich Zugriff?', a: 'Sofort nach dem Kauf erhältst du deinen Zugang.' },
  { q: 'Für wen ist der Kurs?', a: 'Für Freelancer, Unternehmer und Anfänger, die mit KI skalieren wollen.' },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border cursor-pointer transition-all duration-200"
      style={{ background: '#0f172a', borderColor: open ? '#22d3ee' : 'rgba(34,211,238,0.2)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-white font-semibold text-sm">{q}</p>
        {open ? <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </div>
      {open && <p className="text-gray-400 text-sm px-5 pb-4">{a}</p>}
    </div>
  );
}

export default function Upsell() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('from') === 'purchase';

  const handleAccept = () => {
    if (window.self !== window.top) {
      alert('Der Kauf ist nur in der veröffentlichten App möglich.');
      return;
    }
    // Placeholder – add upsell Stripe checkout here
    alert('Upsell Checkout kommt hier');
  };

  const handleDecline = () => {
    window.location.href = createPageUrl('Home');
  };

  return (
    <div className="min-h-screen" style={{ background: '#020617', color: '#e2e8f0' }}>

      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-white font-bold text-sm">🔥 Einmaliges Angebot – nur auf dieser Seite verfügbar</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />)}
          <span className="text-white text-sm ml-1 font-semibold">4.9/5 Bewertung</span>
        </div>
      </div>

      {/* SUCCESS NOTICE */}
      {paymentSuccess && (
        <div className="bg-green-500/10 border-b border-green-500/30 px-4 py-3 text-center">
          <p className="text-green-400 text-sm font-semibold">✅ Kauf erfolgreich! Dein KI Starter Bundle wurde per E-Mail zugeschickt.</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* HEADLINE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="font-bold text-white mb-5 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Baue echte KI-Automationen –<br className="hidden sm:block" /> nicht nur Prompts
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Du hast gerade gelernt, wie du mit KI Geld verdienen kannst. Jetzt zeige ich dir, wie du echte Automationen baust, die Marketing, Content und Leadgenerierung automatisieren.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {['Keine Programmierkenntnisse nötig', 'Schritt-für-Schritt Videoanleitungen', 'Automationen die sofort einsetzbar sind'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </motion.div>

        {/* VIDEO PLACEHOLDER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex justify-center mb-14">
          <div
            className="w-full rounded-2xl border flex items-center justify-center relative overflow-hidden"
            style={{ maxWidth: '70%', aspectRatio: '16/9', background: '#0f172a', borderColor: 'rgba(34,211,238,0.3)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/20" />
            <div className="relative flex flex-col items-center gap-3 text-center px-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}
              >
                <Play className="w-7 h-7 text-white ml-1" />
              </div>
              <p className="text-gray-400 text-sm">Video: Warum Automationen der nächste Schritt sind</p>
              <p className="text-gray-600 text-xs">Füge hier deine Video-URL ein</p>
            </div>
          </div>
        </motion.div>

        {/* PRICE BOX – Mobile first */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-14">
          <div className="rounded-2xl border p-6 sm:p-8 text-center" style={{ background: '#0f172a', borderColor: 'rgba(34,211,238,0.4)' }}>
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-wider">Gesamtwert</p>
            <div className="flex flex-col items-center gap-1 mb-4 text-gray-500 text-sm">
              {[['AI Automation Starter Kurs', '149€'], ['AI Automation Templates', '79€'], ['AI Tool Stack', '29€']].map(([l, v]) => (
                <div key={l} className="flex justify-between w-full max-w-xs">
                  <span>{l}</span>
                  <span className="line-through">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm line-through mb-1">Gesamtwert: 257€</p>
            <p className="text-gray-400 text-base mb-2">🔥 Nur heute</p>
            <p className="font-bold text-cyan-400" style={{ fontSize: '48px', lineHeight: 1 }}>47€</p>
            <div className="mt-3">
              <span className="bg-green-500/20 text-green-400 text-sm font-bold px-4 py-1.5 rounded-full border border-green-500/30">
                🟢 Du sparst 210€
              </span>
            </div>

            <button
              onClick={handleAccept}
              className="mt-6 w-full rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-105"
              style={{
                height: '60px',
                background: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
              }}
            >
              🚀 Ja – ich will KI Automationen lernen
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              {['Sofortiger Zugriff', 'Einmalzahlung', 'Kein Abo'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* MODULES */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-14">
          <h2 className="text-white font-bold text-2xl text-center mb-8">Das lernst du im AI Automation Starter Kurs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <div
                key={m.num}
                className="rounded-xl p-5 border transition-all duration-200 hover:border-cyan-400"
                style={{ background: '#0f172a', borderColor: 'rgba(34,211,238,0.2)' }}
              >
                <p className="text-cyan-400 font-bold text-sm mb-2">Modul {m.num}</p>
                <p className="text-white font-semibold text-sm mb-2">{m.title}</p>
                <p className="text-gray-500 text-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BONUSES */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-14">
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,200,87,0.05)', border: '1px solid #FFC857' }}>
            <h2 className="text-yellow-400 font-bold text-xl text-center mb-6">🎁 Bonus Inhalte</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {bonuses.map((b) => (
                <div key={b.title} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,200,87,0.05)', border: '1px solid rgba(255,200,87,0.2)' }}>
                  <p className="text-3xl mb-3">{b.emoji}</p>
                  <p className="text-white font-semibold text-sm mb-2">{b.title}</p>
                  <p className="text-gray-500 text-xs">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SOCIAL PROOF */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-14 py-5 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
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

        {/* FAQ */}
        <div className="mb-14 max-w-2xl mx-auto">
          <h2 className="text-white font-bold text-xl text-center mb-6">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map((f) => <FAQ key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>

        {/* SECOND CTA */}
        <div className="text-center mb-8">
          <button
            onClick={handleAccept}
            className="w-full max-w-lg rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-105 mx-auto"
            style={{
              height: '60px',
              background: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
              boxShadow: '0 0 20px rgba(34,211,238,0.3)',
            }}
          >
            🚀 Ja – ich will KI Automationen lernen
          </button>
        </div>

        {/* DECLINE */}
        <div className="text-center pb-12">
          <button onClick={handleDecline} className="text-gray-600 text-xs hover:text-gray-400 transition-colors underline">
            Nein danke, ich verzichte auf dieses Angebot
          </button>
        </div>

      </div>
    </div>
  );
}