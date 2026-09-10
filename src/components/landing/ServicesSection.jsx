import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const gewerke = [
  'Trockenbau', 'Renovierung und Sanierung', 'Maler und Lackierer',
  'Sanitär, Heizung, Klima', 'Elektro', 'Fliesenleger',
  'Dachdecker', 'Bodenleger',
];

const konditionen = [
  { label: 'Keine Mindestlaufzeit', desc: 'monatlich kündbar' },
  { label: 'Exklusivität', desc: 'ein Betrieb pro Gewerk und Landkreis; ist dein Gewerk in deinem Landkreis vergeben, kann ich dich nicht aufnehmen' },
  { label: 'Garantie', desc: '10 qualifizierte Anfragen in 60 Tagen. Wird das nicht erreicht, arbeite ich ohne Retainer weiter, bis es erreicht ist' },
  { label: 'Werbebudget', desc: 'geht direkt an Meta/Google, ohne Aufschlag; Höhe wird im Erstgespräch nach Gewerk und Region festgelegt' },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Für welche Gewerke */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Für welche{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Gewerke?
            </span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {gewerke.map((g) => (
              <span
                key={g}
                className="px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800 text-gray-300 text-sm"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Betriebe mit 1 bis 25 Mitarbeitern, die planbare Anfragen wollen statt
            Abhängigkeit von Empfehlungen oder Portalen.
          </p>
        </motion.div>

        {/* Was kostet das */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Was kostet das und welche{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Garantie gibt es?
            </span>
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {konditionen.map((k) => (
              <div key={k.label} className="flex gap-3 p-5 rounded-xl border border-gray-800 bg-gray-900/40">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{k.label}</p>
                  <p className="text-gray-400 text-sm mt-1">{k.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            Aktuell suche ich die ersten drei Betriebe im Landkreis Donau-Ries zu Startkonditionen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}