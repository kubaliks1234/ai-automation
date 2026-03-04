import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkAnimation from './NetworkAnimation';

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f]" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
      
      {/* Network Animation */}
      <NetworkAnimation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Business Solutions</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            KI Automationen
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              für Unternehmen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Ich baue AI Systeme, die Marketing, Leadgenerierung und Vertrieb automatisieren – 
            damit Unternehmen mehr Kunden gewinnen und weniger manuelle Arbeit haben.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              onClick={() => scrollToSection('cta')}
            >
              Kostenlose KI Analyse
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300"
              onClick={() => scrollToSection('automations')}
            >
              Beispiele ansehen
            </Button>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative w-[500px] h-[500px]">
            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse" />
            </div>
            
            {/* Orbiting elements */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                  style={{
                    transform: `translateX(${80 + i * 30}px) translateY(-50%)`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Floating cards */}
            {[
              { text: 'Marketing', delay: 0, x: -180, y: -100 },
              { text: 'Leads', delay: 0.5, x: 180, y: -80 },
              { text: 'Vertrieb', delay: 1, x: -150, y: 120 },
              { text: 'Workflow', delay: 1.5, x: 170, y: 100 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + item.delay * 0.2, duration: 0.5 }}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`,
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
                  className="px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg text-sm text-gray-300 backdrop-blur-sm"
                >
                  {item.text}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}