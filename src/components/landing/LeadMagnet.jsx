import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative py-20 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl"
        >
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              <Download className="w-4 h-4" />
              <span>Kostenloses PDF</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              10 AI Automationen für Unternehmen
            </h3>

            <p className="text-gray-400 mb-6">
              Entdecke die effektivsten KI-Automationen, die Unternehmen sofort einsetzen können, 
              um Zeit zu sparen und mehr Kunden zu gewinnen.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Praxiserprobte Automationen',
                'Sofort umsetzbar',
                'Für jede Unternehmensgröße',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Form */}
          <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">PDF Guide</p>
                <p className="text-sm text-gray-500">10 Seiten • Kostenlos</p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Deine E-Mail Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-5 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-5 rounded-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Jetzt kostenlos herunterladen
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Kein Spam. Du kannst dich jederzeit abmelden.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">Download startet...</p>
                <p className="text-sm text-gray-400">Check auch dein E-Mail Postfach!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}