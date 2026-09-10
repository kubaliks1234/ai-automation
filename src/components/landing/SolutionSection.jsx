import React from 'react';
import { motion } from 'framer-motion';
import { Target, Filter, Zap } from 'lucide-react';

const bausteine = [
  {
    icon: Target,
    num: '1',
    title: 'Regionale Anzeigen auf Meta und Google',
    desc: 'Anzeigen laufen nur in deinem Einzugsgebiet, für dein Gewerk, unter deinem Firmennamen. Das Werbebudget zahlst du direkt an Meta und Google – ohne Aufschlag.',
  },
  {
    icon: Filter,
    num: '2',
    title: 'Vorqualifizierende Landingpage',
    desc: 'Bevor jemand deine Nummer bekommt, beantwortet er drei bis fünf Fragen: Was für ein Projekt, wo, wann. Preisvergleicher, falsches Gewerk und Anfragen von außerhalb werden aussortiert, bevor sie dich Zeit kosten.',
  },
  {
    icon: Zap,
    num: '3',
    title: 'Automatische WhatsApp-Antwort',
    desc: 'Jede Anfrage wird in unter 60 Sekunden beantwortet. Die Automation ist eine Eigenentwicklung, kein gemietetes Fremdtool.',
  },
];

const comparisonRows = [
  { label: 'Anfrage geht an', portal: '3–5 Betriebe gleichzeitig', system: 'nur dich' },
  { label: 'Läuft unter', portal: 'Marke des Portals', system: 'deiner Marke' },
  { label: 'Kundendaten gehören', portal: 'dem Portal', system: 'dir' },
  { label: 'Exklusivität in deiner Region', portal: 'keine', system: 'ein Betrieb pro Gewerk und Landkreis' },
  { label: 'Antwortzeit', portal: 'wenn du Zeit hast', system: 'unter 60 Sekunden, automatisch' },
  { label: 'Laufzeit', portal: 'Jahresverträge üblich', system: 'keine Mindestlaufzeit' },
];

export default function SolutionSection() {
  return (
    <section id="mechanismus" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Wie funktioniert das */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Wie funktioniert das{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Regional-Anfrage-System?
            </span>
          </h2>

          <div className="space-y-6">
            {bausteine.map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border border-gray-800 bg-gray-900/40 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {b.num}. {b.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vergleichstabelle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Was unterscheidet das von{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MyHammer, Blauarbeit oder Aroundhome?
            </span>
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-500 font-medium text-sm">&nbsp;</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Portale</th>
                  <th className="text-left p-4 text-cyan-400 font-semibold text-sm">Regional-Anfrage-System</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-800/50 last:border-0">
                    <td className="p-4 text-gray-300 text-sm font-medium">{row.label}</td>
                    <td className="p-4 text-gray-500 text-sm">{row.portal}</td>
                    <td className="p-4 text-white text-sm font-medium">{row.system}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}