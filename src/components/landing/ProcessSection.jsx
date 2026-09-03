import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Anfragen-Check, 20 Minuten',
    description: 'Wir schauen uns gemeinsam Ihren Google-Auftritt an, und ich zeige Ihnen live, welche Anzeigen Ihre Konkurrenz gerade schaltet. Kostet nichts, verpflichtet zu nichts.',
  },
  {
    number: '2',
    title: 'Aufbau, 7–10 Tage',
    description: 'Ich baue Anzeigen, Landingpage und die automatische Antwort auf. Sie geben mir 60 Minuten für Fotos, Referenzen und Zielaufträge.',
  },
  {
    number: '3',
    title: 'Start',
    description: 'Die Anzeigen gehen live. Erste Anfragen kommen in der Regel innerhalb von 14 Tagen.',
  },
  {
    number: '4',
    title: 'Laufender Betrieb',
    description: 'Ich optimiere wöchentlich. Sie bekommen monatlich einen Report auf einer Seite.',
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            So{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              läuft es ab
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 text-xl font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Investition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-3xl p-8 sm:p-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Investition</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">Aufbau</p>
                <p className="text-sm text-gray-500">einmalig</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-400">500 €</p>
                <p className="text-sm text-gray-500 line-through">regulär 2.000 €</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">Betreuung</p>
                <p className="text-sm text-gray-500">pro Monat, erste sechs Monate</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-400">490 €</p>
                <p className="text-sm text-gray-500 line-through">regulär 990 €</p>
              </div>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-white font-medium">Werbebudget</p>
                <p className="text-sm text-gray-500">direkt an Facebook & Google</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-300">800–1.500 €</p>
                <p className="text-sm text-gray-500">Empfehlung pro Monat</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-400 leading-relaxed">
              <span className="text-white font-medium">Im Gegenzug:</span> Ich darf Ihre Zahlen als Referenz nutzen und bekomme nach
              60 Tagen ein ehrliches Testimonial – auch wenn es kritisch ausfällt.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}