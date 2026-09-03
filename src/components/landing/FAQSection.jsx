import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '„Wir sind ohnehin ausgelastet."',
    answer: 'Die Frage ist nicht ob, sondern womit. Die meisten Betriebe sind mit Kleinkram ausgelastet und hätten lieber zwei große Aufträge. Genau das lässt sich über die Ausrichtung der Anzeigen steuern.',
  },
  {
    question: '„Wir haben das schon mit einer Agentur versucht, hat nichts gebracht."',
    answer: 'Höre ich ständig. Fast immer war das Problem nicht die Anzeige, sondern was danach passiert ist: Die Anfragen kamen, aber der Rückruf kam erst abends. Deshalb ist die Antwort in unter 60 Sekunden bei mir kein Extra, sondern der Kern.',
  },
  {
    question: '„Was kostet das Werbebudget?"',
    answer: '800 bis 1.500 € im Monat sind für Donau-Ries realistisch. Sie zahlen das direkt an Facebook und Google, nicht an mich. Ich verdiene nichts daran, wenn Sie mehr ausgeben.',
  },
  {
    question: '„Wie lange bin ich gebunden?"',
    answer: 'Gar nicht. Monatlich kündbar.',
  },
  {
    question: '„Was ist, wenn es nicht funktioniert?"',
    answer: 'Keine 10 qualifizierten Anfragen in 60 Tagen: Ich arbeite ohne Retainer weiter, bis sie da sind.',
  },
  {
    question: '„Machen Sie auch Mitarbeitergewinnung?"',
    answer: 'Aktuell konzentriere ich mich auf Kundenanfragen. Mitarbeitergewinnung biete ich Bestandskunden ab 2027 an.',
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-gray-800 rounded-2xl overflow-hidden bg-gray-900/40"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-900/60 transition-colors"
      >
        <span className="text-lg font-medium text-white">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f]">
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Häufige{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Fragen
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}