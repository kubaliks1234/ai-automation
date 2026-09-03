import React from 'react';
import { motion } from 'framer-motion';

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

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Sie sind gut. Das Problem ist nur:{' '}
            <span className="text-red-400">keiner fragt Sie.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto"
        >
          <p>
            Die meisten Betriebe in Donau-Ries leben von Empfehlung. Das funktioniert –
            bis zwei große Aufträge wegfallen und plötzlich Lücken im Kalender stehen.
          </p>
          <p>
            Portale wie MyHammer liefern Anfragen, aber die falschen: Preisdrücker,
            Kleinkram, fünf Betriebe im selben Angebot.
          </p>
          <p>
            Und wenn doch mal jemand über die Website anfragt, ruft man abends um
            halb acht zurück. Da hat der Interessent längst mit jemand anderem
            telefoniert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20 rounded-3xl">
            <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              Es fehlt Ihnen kein Können. Es fehlt eine zweite Leitung, die Sie an- und
              ausschalten können.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}