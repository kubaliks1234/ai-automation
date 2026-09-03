import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8"
        >
          <span>Für Handwerks- und Ausbaubetriebe in Donau-Ries</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
        >
          Planbar Anfragen aus Ihrer Region –{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ohne dass Sie sich um Marketing kümmern.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Ihre Anzeigen laufen. Ihre Landingpage filtert vor. Jede Anfrage bekommt in
          unter 60 Sekunden eine Antwort. Sie sehen morgens nur noch, wer wirklich will.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            onClick={() => scrollToSection('cta')}
          >
            Kostenlosen Anfragen-Check sichern
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-gray-500 max-w-md">
            20 Minuten. Kostenlos. Ich zeige Ihnen live, welche Anzeigen Ihre Konkurrenz
            in Donauwörth gerade schaltet.
          </p>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12 text-sm text-gray-500"
        >
          <span>Erste Anfragen in 14 Tagen</span>
          <span className="text-gray-700">·</span>
          <span>Nur ein Betrieb pro Gewerk und Landkreis</span>
          <span className="text-gray-700">·</span>
          <span>Keine Mindestlaufzeit</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}