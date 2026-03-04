import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

export default function BlogHero({ postCount }) {
  return (
    <div className="relative pt-32 pb-16 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8">
          <BookOpen className="w-4 h-4" />
          <span>AI Tools & Wissen</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Die besten
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
            KI Tools & Systeme
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Entdecke KI-Tools für Marketing, Vertrieb und Automatisierung – 
          getestet und bewertet für Unternehmen.
        </p>

        {postCount > 0 && (
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>{postCount} Artikel verfügbar</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}