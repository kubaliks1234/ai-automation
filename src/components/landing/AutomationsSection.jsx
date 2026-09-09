import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppMockup from './WhatsAppMockup';
import ReportMockup from './ReportMockup';

export default function AutomationsSection() {
  return (
    <section id="ergebnisse" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            So sieht es{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              aus
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Die automatische WhatsApp-Antwort und der monatliche Report – so bekommen
            Sie es bei jedem Betrieb, den ich betreue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* WhatsApp */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-3">
                Antwort in unter 60 Sekunden
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">Jede Anfrage sofort beantwortet</h3>
              <p className="text-gray-400 leading-relaxed">
                Der Interessent bekommt innerhalb einer Minute einen Terminvorschlag
                per WhatsApp – auch nachts, auch sonntags. Sie sehen die Zusammenfassung
                und rufen nur die an, bei denen es sich lohnt.
              </p>
            </motion.div>
            <WhatsAppMockup />
          </div>

          {/* Report */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-3">
                Report auf einer Seite
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">Monatlich schwarz auf weiß</h3>
              <p className="text-gray-400 leading-relaxed">
                Anfragen, Kosten pro Anfrage, gewonnene Aufträge – jeden Monat automatisch
                per E-Mail. Keine Excel-Chaos, keine endlosen Calls.
              </p>
            </motion.div>
            <ReportMockup />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-8 sm:p-10">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}