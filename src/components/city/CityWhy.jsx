import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Clock, Users } from 'lucide-react';

const reasons = [
  { icon: TrendingUp, title: 'Wettbewerbsvorteil', desc: 'Unternehmen, die heute auf KI setzen, haben morgen einen messbaren Vorsprung gegenüber der Konkurrenz.' },
  { icon: Clock, title: 'Zeitersparnis', desc: 'Automatisierte Prozesse laufen rund um die Uhr – ohne Urlaub, ohne Krankheit und ohne Fehler.' },
  { icon: Users, title: 'Fachkräftemangel lösen', desc: 'KI übernimmt repetitive Aufgaben und entlastet dein Team für wertschöpfende Tätigkeiten.' },
  { icon: Shield, title: 'Skalierbarkeit', desc: 'Wachse ohne proportional steigende Personalkosten – KI skaliert mit deinem Unternehmen.' },
];

export default function CityWhy({ city }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Warum eine KI Agentur in {city.name}?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              {city.whyCity}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {city.intro}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/60 border border-gray-800 rounded-xl p-5"
              >
                <reason.icon className="w-6 h-6 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}