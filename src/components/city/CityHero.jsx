import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function CityHero({ city }) {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              KI Agentur – {city.name}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {city.title} –{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Automatisierung & KI Lösungen
            </span>{' '}
            für Unternehmen
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
            {city.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl px-8 py-6 text-lg"
            >
              <a href={createPageUrl('Analyse')}>
                Kostenlose KI-Analyse
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-white rounded-xl px-8 py-6 text-lg"
              onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-5 h-5 mr-2" />
              Unsere Leistungen
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg">
            {[
              { value: '80%', label: 'Zeitersparnis' },
              { value: '3x', label: 'Mehr Leads' },
              { value: '48h', label: 'Erstanalyse' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}