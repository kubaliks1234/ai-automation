import React from 'react';
import { cities } from './cityData';
import { createPageUrl } from '@/utils';
import { MapPin } from 'lucide-react';

export default function CityCitiesNav({ currentSlug }) {
  return (
    <section className="py-12 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h3 className="text-gray-400 text-sm font-medium">KI Agentur in anderen Städten</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {cities.filter(c => c.slug !== currentSlug).map((city) => (
            <a
              key={city.slug}
              href={createPageUrl('KiAgentur') + '?city=' + city.slug}
              className="px-4 py-2 rounded-full border border-gray-800 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors text-sm"
            >
              KI Agentur {city.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}