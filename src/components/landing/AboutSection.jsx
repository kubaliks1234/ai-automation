import React from 'react';
import { motion } from 'framer-motion';
import { Bot, TrendingUp, Users, Briefcase } from 'lucide-react';

const highlights = [
  { icon: Bot, text: 'AI Automationen' },
  { icon: TrendingUp, text: 'Vertrieb' },
  { icon: Users, text: 'Recruiting' },
  { icon: Briefcase, text: 'Marketing' },
];

export default function AboutSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              
              {/* Main card */}
              <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-center">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                  <Bot className="w-16 h-16 text-cyan-400" />
                </div>

                {/* Expertise tags */}
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                    >
                      <item.icon className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Über
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> mich</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Ich beschäftige mich mit <span className="text-white font-medium">AI Automationen</span> und 
                <span className="text-white font-medium"> digitalen Systemen</span> für Unternehmen.
              </p>
              
              <p>
                Mein Fokus liegt darauf, KI nicht nur als Tool zu nutzen, sondern 
                <span className="text-cyan-400"> echte Systeme zu bauen</span>, die Arbeit automatisieren 
                und Wachstum ermöglichen.
              </p>
              
              <p>
                Mit Erfahrung in <span className="text-white font-medium">Vertrieb, Recruiting und Marketing</span> weiß ich, 
                welche Prozesse Unternehmen wirklich bremsen – und wie man sie automatisiert.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-800">
              {[
                { value: '50+', label: 'Automationen' },
                { value: '100%', label: 'Individuell' },
                { value: '24/7', label: 'Aktiv' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}