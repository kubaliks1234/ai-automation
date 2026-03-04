import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Rocket, Users } from 'lucide-react';

const benefits = [
  { icon: Clock, text: 'Weniger manuelle Arbeit', color: 'cyan' },
  { icon: Zap, text: 'Schnellere Prozesse', color: 'blue' },
  { icon: Users, text: 'Mehr Leads und Kunden', color: 'purple' },
];

export default function SolutionSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
            <Rocket className="w-4 h-4" />
            <span>Die Lösung</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ich baue KI Systeme,
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
              die Arbeit übernehmen
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mit modernen AI Automationen lassen sich komplette Geschäftsprozesse automatisieren.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative w-full sm:w-auto"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${
                benefit.color === 'cyan' ? 'from-cyan-500/20' :
                benefit.color === 'blue' ? 'from-blue-500/20' :
                'from-purple-500/20'
              } to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative flex items-center gap-4 p-6 bg-gray-900/60 border border-gray-800 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${
                  benefit.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                  benefit.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  <benefit.icon className="w-7 h-7" />
                </div>
                <p className="text-lg font-medium text-white">
                  {benefit.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual connector */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden sm:block h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-16 max-w-2xl mx-auto"
        />
      </div>
    </section>
  );
}