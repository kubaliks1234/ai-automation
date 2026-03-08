import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

const featuredCities = [
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'muenchen', name: 'München' },
  { slug: 'koeln', name: 'Köln' },
  { slug: 'frankfurt', name: 'Frankfurt' },
  { slug: 'stuttgart', name: 'Stuttgart' },
  { slug: 'duesseldorf', name: 'Düsseldorf' },
  { slug: 'leipzig', name: 'Leipzig' },
];

export default function CityLinksSection() {
  return (
    <section className="py-16 px-6 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6"
        >
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h2 className="text-white font-semibold text-lg">KI Agenturen in Deutschland</h2>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {featuredCities.map((city, i) => (
            <motion.a
              key={city.slug}
              href={createPageUrl('KiAgentur') + '?city=' + city.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-800 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              KI Agentur {city.name}
              <ArrowRight className="w-3 h-3" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}