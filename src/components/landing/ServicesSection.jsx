import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
  'Aufbau und laufende Betreuung Ihrer Anzeigen (Meta und Google)',
  'Landingpage mit Vorqualifizierung, auf Ihren Betrieb zugeschnitten',
  'Automatische Antwort in unter 60 Sekunden, per WhatsApp und E-Mail',
  'Nachfass-Sequenz für alle, die nicht sofort reagieren',
  'Optimierung Ihres Google-Unternehmensprofils',
  'Automatische Bewertungsanfrage nach abgeschlossenem Auftrag',
  'Monatlicher Report auf einer Seite: Anfragen, Kosten pro Anfrage, Aufträge',
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f]">
      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Was Sie{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              bekommen
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
          <ul className="space-y-5">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-lg text-gray-300 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-gray-800">
            <p className="text-center text-lg text-white font-medium">
              Ihr Aufwand: 60 Minuten Onboarding. Danach fassen Sie nichts mehr an.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}