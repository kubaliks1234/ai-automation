import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const genericIndustries = [
  'Startups & Gründer',
  'Mittelstand & KMU',
  'Online Shops & E-Commerce',
  'Marketing- & Werbeagenturen',
  'Dienstleistungsunternehmen',
  'Beratung & Coaching',
];

export default function CityIndustries({ city }) {
  const industries = city.industries || genericIndustries;

  return (
    <section className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Für welche Unternehmen eignet sich KI in {city.name}?
            </h2>
            <p className="text-gray-400 mb-8">
              KI-Automatisierung ist für Unternehmen jeder Größe geeignet. Besonders profitieren Unternehmen in {city.name} aus diesen Branchen:
            </p>
            <ul className="space-y-3">
              {industries.map((ind) => (
                <li key={ind} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  {ind}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Beispiel KI Lösungen für {city.name}
            </h2>
            <p className="text-gray-400 mb-8">
              Konkrete Projekte, die wir für Unternehmen in {city.region} umgesetzt haben:
            </p>
            <div className="space-y-4">
              {city.examples.map((ex, i) => (
                <div
                  key={i}
                  className="border border-gray-800 rounded-xl p-5 bg-gray-900/50"
                >
                  <h3 className="text-white font-semibold mb-1">{ex.title}</h3>
                  <p className="text-gray-400 text-sm">{ex.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}