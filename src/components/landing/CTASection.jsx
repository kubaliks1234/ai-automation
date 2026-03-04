import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background effects */}
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
          {/* Glow border effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-sm opacity-50" />
          
          <div className="relative p-10 sm:p-16 bg-gradient-to-br from-gray-900/95 to-[#0a0a0f]/95 rounded-3xl border border-gray-800 backdrop-blur-sm text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Jetzt starten</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bereit für
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> KI Automationen?</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Lass uns herausfinden, welche Prozesse in deinem Unternehmen automatisiert werden können.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Deine E-Mail Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-6 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:border-cyan-500 focus:ring-cyan-500/20"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  Kostenlose KI Analyse
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-cyan-400"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg">Danke! Wir melden uns bald bei dir.</span>
              </motion.div>
            )}

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-gray-800">
              {[
                'Kostenlos & unverbindlich',
                'Persönliche Beratung',
                'Innerhalb 24h',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
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