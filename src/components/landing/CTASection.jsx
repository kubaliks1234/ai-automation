import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const handleCTA = () => {
    window.open('https://calendly.com/jakub-kaczmarek', '_blank');
  };

  return (
    <section id="cta" className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-sm opacity-50" />

          <div className="relative p-10 sm:p-16 bg-gradient-to-br from-gray-900/95 to-[#0a0a0f]/95 rounded-3xl border border-gray-800 backdrop-blur-sm text-center">

            {/* Scarcity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Noch 2 Projektplätze frei im April 2026</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Lass dein Business
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> für dich arbeiten.</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
              Buch dir ein kostenloses 30-Minuten-Gespräch.
            </p>
            <p className="text-base text-gray-500 max-w-xl mx-auto mb-10">
              Wir schauen gemeinsam welche Prozesse bei dir automatisierbar sind – und ob eine Zusammenarbeit Sinn ergibt.
              Kein Pitch. Kein Verkaufsdruck.
            </p>

            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              onClick={handleCTA}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Kostenloses Gespräch buchen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* What happens next */}
            <div className="mt-10 pt-10 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">Was danach passiert</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {[
                  { step: '1', text: 'Du buchst einen Termin – dauert 30 Sekunden' },
                  { step: '2', text: 'Wir analysieren deine Prozesse gemeinsam' },
                  { step: '3', text: 'Du bekommst einen konkreten Plan – unverbindlich' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 text-left max-w-[200px] mx-auto sm:mx-0">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {item.step}
                    </div>
                    <p className="text-sm text-gray-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {['Kostenlos & unverbindlich', 'Innerhalb 24h Antwort', 'Setup in 2–4 Wochen'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
