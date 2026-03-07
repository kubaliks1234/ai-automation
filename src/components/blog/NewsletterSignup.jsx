import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function NewsletterSignup({ variant = 'inline', source = 'blog' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await base44.functions.invoke('subscribeNewsletter', { email, source });
    setResult(res.data);
    setLoading(false);
  };

  if (variant === 'sidebar') {
    return (
      <div className="p-5 bg-gray-900/60 border border-gray-800 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-white">KI-Newsletter</span>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Neue KI-Artikel, Tutorials & Tools direkt ins Postfach.
        </p>
        {result ? (
          <div className="flex items-center gap-2 text-green-400 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{result.message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm rounded-xl h-9"
            >
              {loading ? 'Wird angemeldet...' : 'Anmelden'}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // inline / article-end variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8 sm:p-10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-3xl text-center"
    >
      <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Mail className="w-6 h-6 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Keine KI-News mehr verpassen</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
        Neue Artikel über KI-Tools, Tutorials und Automatisierungen – direkt in dein Postfach. Kostenlos.
      </p>
      {result ? (
        <div className="flex items-center justify-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>{result.message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl px-6"
          >
            {loading ? 'Lädt...' : (
              <>Anmelden <ArrowRight className="w-4 h-4 ml-1" /></>
            )}
          </Button>
        </form>
      )}
      <p className="text-xs text-gray-600 mt-4">Kein Spam. Jederzeit abmeldbar.</p>
    </motion.div>
  );
}