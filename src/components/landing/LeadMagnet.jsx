import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function LeadMagnet() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f]">
      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Garantie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Das Risiko liegt bei{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              mir
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-8 sm:p-12"
        >
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Wenn Sie in 60 Tagen keine 10 qualifizierten Anfragen haben, arbeite ich
              ohne Retainer weiter, bis Sie sie haben.
            </p>
            <p>
              Keine Mindestlaufzeit. Monatlich kündbar. Wenn es nicht läuft, sollen Sie
              gehen können.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}