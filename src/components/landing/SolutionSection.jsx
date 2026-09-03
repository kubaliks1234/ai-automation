import React from 'react';
import { motion } from 'framer-motion';
import { Target, Filter, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Target,
    title: 'Anzeigen in Ihrem Umkreis',
    description: 'Ihre Anzeigen laufen auf Facebook, Instagram und Google – nur im Umkreis, den Sie bedienen, und ausgerichtet auf die Aufträge, die Sie wirklich wollen. Keine Kleinaufträge, wenn Sie Sanierungen suchen.',
  },
  {
    number: '02',
    icon: Filter,
    title: 'Eine Seite, die vorsortiert',
    description: 'Interessenten landen auf einer Seite, die vier Fragen stellt: Was, wie groß, wo, bis wann. Wer keine ernsthafte Absicht hat, füllt das nicht aus. Das ist Absicht.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Antwort in unter 60 Sekunden',
    description: 'Jede Anfrage bekommt sofort eine WhatsApp mit Terminvorschlag – auch nachts, auch sonntags. Sie bekommen die Zusammenfassung aufs Handy und rufen nur noch die an, bei denen es sich lohnt.',
  },
];

export default function SolutionSection() {
  return (
    <section id="mechanismus" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f] overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Das{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Regional-Anfrage-System
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Drei Bausteine. Läuft nach dem Onboarding ohne Ihr Zutun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <span className="text-4xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          <p className="text-base text-gray-400 leading-relaxed">
            Schritt 3 ist der Grund, warum das funktioniert. Studien und Praxis sagen
            dasselbe: Wer innerhalb von Minuten reagiert, gewinnt den Auftrag. Wer nach
            vier Stunden zurückruft, redet mit jemandem, der schon woanders unterschrieben hat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}