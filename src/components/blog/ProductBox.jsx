import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, BookOpen, List, Star, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { icon: BookOpen, color: 'text-cyan-400', label: '📘 E-Book', desc: 'Mit KI dein erstes Einkommen', value: '29€' },
  { icon: Zap, color: 'text-purple-400', label: '⚡ Prompt-Bibliothek', desc: '100+ ChatGPT Prompts', value: '49€' },
  { icon: List, color: 'text-green-400', label: '✅ Checklisten-Paket', desc: 'Schritt-für-Schritt Anleitungen', value: '19€' },
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

    // Check if running in iframe (preview) - block checkout
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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm">🔥 Limitiertes Angebot — Nur heute!</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          ))}
          <span className="text-white text-sm ml-1">5.0</span>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left – Value Stack */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
              KI Starter Bundle
            </h2>
            <p className="text-cyan-400 font-semibold text-lg mb-6">Mit KI dein erstes Einkommen</p>

            <div className="space-y-4 mb-8">
              {items.map(({ icon: Icon, color, label, desc, value }) => (
                <div key={label} className="flex items-center gap-4 bg-gray-800/50 rounded-2xl px-4 py-3 border border-gray-700/40">
                  <div className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-gray-500 text-xs">{desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-500 line-through text-xs">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="flex items-center gap-4 bg-gray-800/80 rounded-2xl px-5 py-4 border border-gray-700">
              <div>
                <p className="text-gray-500 text-sm">Gesamtwert</p>
                <p className="text-gray-400 line-through text-lg">97€</p>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div>
                <p className="text-gray-500 text-sm">Dein Preis heute</p>
                <p className="text-3xl font-bold text-cyan-400">17€</p>
              </div>
              <div className="ml-auto bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/30">
                -83%
              </div>
            </div>
          </div>

          {/* Right – CTA */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
              <p className="text-white font-semibold mb-4 text-center">Sofort-Download nach Kauf</p>

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
                  '🚀 Jetzt für 17€ kaufen'
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-3 text-gray-600 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sichere Zahlung via Stripe · Sofortiger Download
              </div>
            </div>

            <div className="space-y-2">
              {[
                'Sofortiger Zugang nach Zahlung',
                'Lifetime-Zugriff auf alle Dateien',
                'Kein Abo, einmalige Zahlung',
                '30-Tage-Geld-zurück-Garantie',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}