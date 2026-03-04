import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Calendar, BarChart3, ArrowRight } from 'lucide-react';

const automations = [
  {
    icon: Linkedin,
    title: 'LinkedIn Content Automation',
    description: 'AI erstellt automatisch LinkedIn Content und plant Posts für mehrere Wochen.',
    tags: ['Content', 'Scheduling', 'LinkedIn'],
    color: 'cyan',
  },
  {
    icon: Calendar,
    title: 'Lead Qualifizierung & Buchung',
    description: 'AI qualifiziert Leads automatisch und bucht Termine direkt im Kalender.',
    tags: ['Leads', 'Termine', 'CRM'],
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Marketing Analyse',
    description: 'AI analysiert Marketingdaten und gibt Optimierungsvorschläge.',
    tags: ['Analytics', 'Optimierung', 'Reports'],
    color: 'purple',
  },
];

export default function AutomationsSection() {
  return (
    <section id="automations" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Beispiele für
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> KI Automationen</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Echte Automatisierungen, die Unternehmen Zeit sparen und Ergebnisse liefern
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {automations.map((automation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${
                automation.color === 'cyan' ? 'from-cyan-500/50 to-cyan-500/0' :
                automation.color === 'blue' ? 'from-blue-500/50 to-blue-500/0' :
                'from-purple-500/50 to-purple-500/0'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              
              <div className="relative h-full p-8 bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-gray-700 transition-all duration-300 flex flex-col">
                {/* Number badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700 text-gray-400 text-sm font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${
                  automation.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                  automation.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-purple-500/10 text-purple-400'
                } mb-6`}>
                  <automation.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {automation.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">
                  {automation.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {automation.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-800/80 text-gray-400 rounded-full border border-gray-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection lines (visual decoration) */}
        <div className="hidden md:flex justify-center mt-12">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}