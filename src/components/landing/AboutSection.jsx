import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Wer{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              das macht
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png"
                  alt="Jakub Kaczmarek"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Ich bin Jakub Kaczmarek. Seit über sieben Jahren arbeite ich im Marketing
                und in der Personalvermittlung – ich habe Anzeigen in sieben Ländern
                geschaltet, Bewerberprozesse automatisiert und Systeme gebaut, die Anfragen
                in Sekunden statt in Stunden beantworten.
              </p>
              <p>
                Das Gleiche baue ich jetzt für{' '}
                <span className="text-white font-medium">Handwerksbetriebe in Donau-Ries</span>.
              </p>
              <p>
                Ich bin keine Agentur mit zwölf Leuten und Etage in München. Sie reden mit
                mir, ich baue es, ich betreue es. Deshalb nehme ich pro Gewerk und Landkreis
                nur einen Betrieb – alles andere wäre unseriös gegenüber dem Ersten,
                der unterschrieben hat.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}