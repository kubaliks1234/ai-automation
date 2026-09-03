import React from 'react';
import { motion } from 'framer-motion';

export default function AutomationsSection() {
  return (
    <section id="ergebnisse" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Der{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              aktuelle Stand
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-8 sm:p-12"
        >
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
            <p>
              Ich baue dieses Angebot gerade aus meinem Hauptjob heraus auf und suche die
              ersten drei Betriebe in Donau-Ries.
            </p>
            <p>
              Bei TL-Bau, einem Trockenbau- und Sanierungsbetrieb, kamen bisher zwei bis
              drei Anfragen pro Monat rein – rein organisch über die Website, ohne einen
              Cent Werbebudget. Genau da läuft aktuell der erste Test.
            </p>
            <p>
              Deshalb bekommen die ersten drei Betriebe Konditionen, die ich in sechs
              Monaten nicht mehr anbiete. Und deshalb trage ich das Risiko, nicht Sie.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}