import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, MapPin, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function AnfragenCheck() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      await base44.functions.invoke('sendInquiryEmail', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="Anfragen-Check in 20 Minuten | Jakub Kaczmarek"
        description="Kostenloser Anfragen-Check für Handwerksbetriebe in Donau-Ries. In 20 Minuten sehen Sie schwarz auf weiß, welche Anzeigen Ihre Konkurrenz schaltet."
        keywords="anfragen check handwerk, marketing analyse handwerksbetrieb, kostenlos marketing beratung handwerk"
        canonical="https://jakubkaczmarek.de/anfragen-check"
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <CheckCircle className="w-4 h-4" />
              <span>20 Minuten · Kostenlos · Unverbindlich</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Anfragen-Check
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Wir schauen uns gemeinsam Ihren Google-Auftritt an, und ich zeige Ihnen live,
              welche Anzeigen Ihre Konkurrenz gerade schaltet. Kostet nichts, verpflichtet zu nichts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-3xl p-8 sm:p-10 mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">Was Sie mitnehmen</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Ihre aktuellen Sichtbarkeit auf Google, schwarz auf weiß</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Die Anzeigen Ihrer Konkurrenz, live eingesehen</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Drei konkrete Hebel, die Sie selbst umsetzen können</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Eine Einschätzung, ob das Regional-Anfrage-System für Ihren Betrieb passt</p>
              </div>
            </div>
          </motion.div>

          {/* Anmeldeformular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {status === 'success' ? (
              <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 sm:p-10 text-center">
                <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Anfrage gesendet!</h2>
                <p className="text-gray-400 text-sm">
                  Vielen Dank. Ich melde mich zeitnah bei Ihnen.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Weitere Anfrage senden
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-gray-800 bg-[#0f172a] p-8 sm:p-10 space-y-5"
              >
                <h2 className="text-lg font-bold text-white mb-2">Anfrage senden</h2>
                <p className="text-gray-400 text-sm -mt-2 mb-2">
                  Einfach Formular ausfüllen – ich melde mich bei Ihnen.
                </p>

                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-gray-700 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-gray-700 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Telefon</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-gray-700 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="0151 23456789"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Nachricht</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-gray-700 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Worum geht es? (Gewerk, Region, was Sie brauchen …)"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">
                    Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie an.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Anfrage absenden
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Direkt anrufen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-500 mb-3">Lieber direkt anrufen?</p>
            <a
              href="tel:+4917643942729"
              className="inline-flex items-center justify-center gap-2 text-lg text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +49 176 43942729
            </a>
            <p className="text-sm text-gray-600 mt-4 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />
              Donauwörth, Landkreis Donau-Ries
            </p>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}