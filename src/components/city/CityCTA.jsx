import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function CityCTA({ city }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            KI Beratung in {city.name}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Du möchtest wissen, welche KI-Automationen für dein Unternehmen in {city.name} am meisten Sinn machen? 
            Lass uns in einem kostenlosen 30-Minuten-Gespräch deine Möglichkeiten analysieren.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10 max-w-xl mx-auto">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <Phone className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Kostenlose Erstberatung</h3>
              <p className="text-gray-400 text-sm">30 Minuten, unverbindlich, per Google Meet</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <FileSearch className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
              <h3 className="text-white font-semibold mb-2">KI Potenzialanalyse</h3>
              <p className="text-gray-400 text-sm">Wir analysieren deine Prozesse und zeigen Einsparpotenziale</p>
            </div>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl px-10 py-6 text-lg"
          >
            <a href={createPageUrl('Analyse')}>
              Jetzt kostenlos Termin buchen
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}