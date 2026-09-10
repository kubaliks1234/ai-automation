import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Warum verlieren Handwerker Anfragen,{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              obwohl sie ausgebucht sind?
            </span>
          </h2>

          <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
            <p>
              Weil die Anfrage kommt, wenn du auf der Baustelle bist. Der Interessent
              schreibt drei Betriebe an. Wer zuerst antwortet, bekommt den Termin. Bis
              du abends zurückrufst, ist der Auftrag vergeben.
            </p>
            <p>
              Das Regional-Anfrage-System löst genau das: Jeder Interessent bekommt in
              unter 60 Sekunden eine WhatsApp-Antwort mit Bestätigung und den wichtigsten
              Rückfragen. Du meldest dich, wenn du Zeit hast – der Kunde ist bis dahin
              gehalten.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}