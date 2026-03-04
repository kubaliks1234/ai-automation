import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, TrendingUp, Workflow, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'AI Marketing Systeme',
    description: 'Automatisierte Content- und Marketingmaschinen.',
    examples: [
      'AI erstellt Content automatisch',
      'AI verteilt Content auf Plattformen',
      'AI analysiert Performance',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    bgGlow: 'bg-cyan-500/20',
  },
  {
    icon: Target,
    title: 'AI Lead Generation',
    description: 'KI findet automatisch neue Leads.',
    examples: [
      'LinkedIn Lead Automationen',
      'Lead Qualifizierung mit AI',
      'Automatische Terminbuchung',
    ],
    gradient: 'from-blue-500 to-purple-500',
    bgGlow: 'bg-blue-500/20',
  },
  {
    icon: TrendingUp,
    title: 'AI Sales Automationen',
    description: 'Vertriebssysteme mit KI.',
    examples: [
      'Automatische Follow Ups',
      'Lead Qualifizierung',
      'CRM Automationen',
    ],
    gradient: 'from-purple-500 to-pink-500',
    bgGlow: 'bg-purple-500/20',
  },
  {
    icon: Workflow,
    title: 'Workflow Automationen',
    description: 'Automatisierung interner Prozesse.',
    examples: [
      'Dokumentverarbeitung',
      'Datenintegration',
      'AI Assistenten für Teams',
    ],
    gradient: 'from-pink-500 to-orange-500',
    bgGlow: 'bg-pink-500/20',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            AI Systeme für
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Unternehmen</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Maßgeschneiderte KI-Lösungen für jeden Bereich Ihres Unternehmens
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-px ${service.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
              
              <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
                {/* Icon */}
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                {/* Examples */}
                <div className="space-y-3">
                  {service.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}