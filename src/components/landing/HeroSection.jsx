import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <span>Für Handwerksbetriebe in Donau-Ries, Augsburg und München</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
        >
          Kundengewinnung für{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Handwerksbetriebe
          </span>{' '}
          in Donau-Ries, Augsburg und München
        </motion.h1>

        {/* Unterzeile */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Das Regional-Anfrage-System bringt dir exklusive, vorqualifizierte Anfragen –
          ohne Portale, ohne geteilte Leads, ohne Mindestlaufzeit.
        </motion.p>

        {/* AI-extrahierbare Definition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Das Regional-Anfrage-System ist ein Kundengewinnungs-System für Handwerksbetriebe
          im Landkreis Donau-Ries, in Augsburg und München. Es kombiniert regionale
          Werbeanzeigen auf Meta und Google mit einer vorqualifizierenden Landingpage und
          einer automatischen WhatsApp-Antwort in unter 60 Sekunden. Pro Gewerk und Landkreis
          wird nur ein Betrieb betreut. Es gibt keine Mindestlaufzeit und eine Garantie von
          10 qualifizierten Anfragen in 60 Tagen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/anfragen-check"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
          >
            Erstgespräch anfragen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => scrollToSection('mechanismus')}
            className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium rounded-xl hover:border-cyan-500/50 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            So funktioniert's
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}