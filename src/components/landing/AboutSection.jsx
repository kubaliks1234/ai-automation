import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

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
              steckt dahinter?
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
                <img
                  src="https://media.base44.com/images/public/69a7f4930f0e951070ab8bb0/b2fa5f40c_md.jpeg"
                  alt="Jakub Kaczmarek – Marketing- und KI-Automation-Spezialist"
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
                Ich bin <span className="text-white font-medium">Jakub Kaczmarek</span>,
                Marketing- und KI-Automation-Spezialist aus Nördlingen. Seit über sieben
                Jahren mache ich Performance-Marketing (Meta Ads, Google Ads) für die
                Personaldienstleistung – mehrsprachig, in mehreren europäischen Märkten,
                mit messbaren Kosten pro Anfrage. Die Automationen dahinter baue ich selbst
                (n8n, Claude API, WhatsApp Business API).
              </p>
              <p>
                Das Regional-Anfrage-System ist die Übertragung dieser Systeme auf
                Handwerksbetriebe in meiner Region.
              </p>
              <a
                href="https://www.linkedin.com/in/jakub-kaczmarek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}