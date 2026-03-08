import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Megaphone, Users, BarChart3, Wrench, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'KI Automatisierung',
    desc: 'Automatisiere repetitive Geschäftsprozesse – von der Buchhaltung bis zum Kundenservice. Spare bis zu 80% der manuellen Arbeitszeit.',
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    desc: 'Intelligente Chatbots, die Kundenfragen beantworten, Termine buchen und Leads qualifizieren – rund um die Uhr.',
  },
  {
    icon: Megaphone,
    title: 'AI Marketing',
    desc: 'Automatische Content-Erstellung, personalisierte Kampagnen und KI-gestütztes Social Media Management.',
  },
  {
    icon: Users,
    title: 'Lead Generation',
    desc: 'KI-gestützte Leadgenerierung auf LinkedIn, per E-Mail und über andere Kanäle – vollautomatisch und skalierbar.',
  },
  {
    icon: BarChart3,
    title: 'Prozessautomatisierung',
    desc: 'Vernetzung deiner Tools und Systeme über intelligente Workflows. Keine manuellen Datenübertragungen mehr.',
  },
  {
    icon: Lightbulb,
    title: 'KI Beratung',
    desc: 'Strategische Beratung: Wir analysieren deine Prozesse und zeigen dir, wo KI den größten Hebel hat.',
  },
];

export default function CityServices({ city }) {
  return (
    <section id="leistungen" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Unsere KI Leistungen in {city.name}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Maßgeschneiderte KI-Lösungen für Unternehmen in {city.name} – von der Strategie bis zur Umsetzung.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}