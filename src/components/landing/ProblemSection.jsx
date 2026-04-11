import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Users, TrendingDown, XCircle } from 'lucide-react';

const problems = [
  { icon: Clock, text: 'Du weißt dass du mehr Leads haben könntest. Aber du hast keine Zeit das System dafür aufzubauen.' },
  { icon: Users, text: 'Jede Woche gibst du Stunden für Aufgaben aus, die eine Maschine in Minuten erledigen würde.' },
  { icon: TrendingDown, text: 'Dein Marketing läuft nicht ohne dich. Wenn du aufhörst zu posten, hört alles auf.' },
  { icon: XCircle, text: 'Interessenten fallen durch das Raster, weil kein System sie automatisch weiterführt.' },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f]">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Erkennst du dich wieder?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Du arbeitest hart.
            <span className="block text-red-400 mt-2">Aber dein Business arbeitet nicht für dich.</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Das Problem ist nicht fehlende Motivation.
            <span className="text-white font-medium"> Das Problem sind fehlende Systeme.</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-5 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-red-500/30 transition-all duration-300">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <problem.icon className="w-7 h-7" />
                </div>
                <p className="text-base text-gray-300 group-hover:text-white transition-colors leading-relaxed pt-1">
                  {problem.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-3xl">
            <p className="text-sm text-red-400 uppercase tracking-wider mb-3">Die Folge</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              Wachstum hängt an dir – nicht an deinem Business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
