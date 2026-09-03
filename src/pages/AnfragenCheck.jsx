import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, CheckCircle, MapPin } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function AnfragenCheck() {
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
              <Clock className="w-4 h-4" />
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

          {/* Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="rounded-3xl border border-gray-800 overflow-hidden bg-[#0f172a]">
              <div className="p-6 text-center">
                <h2 className="text-lg font-bold text-white mb-4">Termin buchen</h2>
                <p className="text-gray-400 mb-6 text-sm">
                  Wählen Sie einen Termin, der Ihnen passt. Das Gespräch findet per Telefon statt.
                </p>
                <a
                  href="https://calendly.com/jakub-kaczmarek/anfragen-check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
                >
                  <Clock className="w-5 h-5" />
                  Termin auswählen
                </a>
              </div>
            </div>
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