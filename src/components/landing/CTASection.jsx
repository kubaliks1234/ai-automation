import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ein Betrieb pro Gewerk.{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Pro Landkreis.
              </span>
            </h2>

            <div className="space-y-4 text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              <p>
                Für Trockenbau- und Sanierungsbetriebe in Donau-Ries ist der Platz aktuell frei.
              </p>
              <p>
                Der Anfragen-Check dauert 20 Minuten, kostet nichts und Sie sehen dabei
                schwarz auf weiß, was Ihre Konkurrenz gerade macht. Wenn Sie danach nicht
                weitermachen wollen, haben Sie trotzdem etwas mitgenommen.
              </p>
            </div>

            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              onClick={handleCTA}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Termin für den Anfragen-Check wählen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+4917643942729"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">Oder anrufen: +49 176 43942729</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}