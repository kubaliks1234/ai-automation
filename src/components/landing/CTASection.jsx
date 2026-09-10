import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
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
              Ist dein Gewerk in deinem{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Landkreis noch frei?
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Schreib mir kurz Gewerk und Ort. Ich sage dir innerhalb eines Werktags,
              ob der Platz frei ist und was realistisch drin ist.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/4917643942729"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                Verfügbarkeit prüfen – WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:jakub.kaczmarek669@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium rounded-xl hover:border-cyan-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
                E-Mail
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}