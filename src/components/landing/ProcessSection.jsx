import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Cog, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analyse',
    description: 'Wir analysieren deine Prozesse und identifizieren Automationspotenziale.',
    color: 'cyan',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'System Design',
    description: 'Ich entwickle ein individuelles KI-System für dein Unternehmen.',
    color: 'blue',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Implementierung',
    description: 'Die Automationen werden integriert und getestet.',
    color: 'purple',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Skalierung',
    description: 'Dein Unternehmen spart Zeit und wächst schneller.',
    color: 'pink',
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            So läuft die
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Zusammenarbeit</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ein klarer Prozess für messbare Ergebnisse
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector dot */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-gray-700 hidden lg:flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${
                    step.color === 'cyan' ? 'bg-cyan-400' :
                    step.color === 'blue' ? 'bg-blue-400' :
                    step.color === 'purple' ? 'bg-purple-400' :
                    'bg-pink-400'
                  }`} />
                </div>

                <div className="group h-full p-8 bg-gradient-to-br from-gray-900/60 to-gray-900/20 border border-gray-800 rounded-3xl hover:border-gray-700 transition-all duration-300 text-center">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                    step.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    step.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-pink-500/10 text-pink-400'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Number badge */}
                  <div className="text-4xl font-bold text-gray-800 mb-4 group-hover:text-gray-700 transition-colors">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}