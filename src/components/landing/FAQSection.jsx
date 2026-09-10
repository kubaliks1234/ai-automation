import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Was ist das Regional-Anfrage-System?',
    answer: 'Ein Kundengewinnungs-System für Handwerksbetriebe aus drei Bausteinen: regionale Meta- und Google-Ads, eine vorqualifizierende Landingpage und eine automatische WhatsApp-Antwort in unter 60 Sekunden. Der Betrieb bekommt exklusive Anfragen unter seiner eigenen Marke, keine geteilten Portal-Leads.',
  },
  {
    question: 'Für welche Gewerke funktioniert das Regional-Anfrage-System?',
    answer: 'Trockenbau, Renovierung, Maler, Sanitär und Heizung, Elektro, Fliesenleger, Dachdecker und Bodenleger. Grundsätzlich jedes Gewerk, bei dem Privatkunden oder Gewerbekunden regional nach einem Betrieb suchen.',
  },
  {
    question: 'Was ist der Unterschied zu MyHammer, Blauarbeit oder Aroundhome?',
    answer: 'Portale verkaufen dieselbe Anfrage an mehrere Betriebe, die dann um den Kunden konkurrieren. Beim Regional-Anfrage-System laufen Anzeigen und Landingpage unter der Marke des Betriebs. Jede Anfrage ist exklusiv, und die Kundendaten gehören dem Betrieb.',
  },
  {
    question: 'In welchen Regionen ist das Regional-Anfrage-System verfügbar?',
    answer: 'Aktuell im Landkreis Donau-Ries (Nördlingen, Donauwörth und Umgebung), Augsburg und München. Pro Gewerk und Landkreis wird nur ein Betrieb betreut.',
  },
  {
    question: 'Gibt es eine Mindestlaufzeit?',
    answer: 'Nein. Die Zusammenarbeit ist monatlich kündbar.',
  },
  {
    question: 'Welche Garantie gibt es?',
    answer: '10 qualifizierte Anfragen innerhalb von 60 Tagen. Wird das nicht erreicht, läuft die Betreuung ohne Retainer weiter, bis die Zahl erreicht ist.',
  },
  {
    question: 'Warum eine automatische WhatsApp-Antwort in unter 60 Sekunden?',
    answer: 'Handwerker sind tagsüber auf der Baustelle und erreichen Anfragen nicht sofort. Interessenten, die keine Antwort bekommen, fragen beim nächsten Betrieb an. Die automatische WhatsApp-Antwort bestätigt die Anfrage sofort, stellt die wichtigsten Rückfragen und hält den Kunden, bis der Betrieb Zeit hat.',
  },
  {
    question: 'Was bedeutet „qualifizierte Anfrage"?',
    answer: 'Eine Anfrage aus dem definierten Einzugsgebiet, für das richtige Gewerk, mit konkretem Projekt und Kontaktdaten, bei der der Interessent die Vorqualifizierung auf der Landingpage durchlaufen hat. Preisvergleicher und Anfragen außerhalb der Region zählen nicht.',
  },
  {
    question: 'Wer steckt hinter dem Regional-Anfrage-System?',
    answer: 'Jakub Kaczmarek aus Nördlingen, Marketing- und KI-Automation-Spezialist mit über 7 Jahren Erfahrung in Performance-Marketing (Meta Ads, Google Ads) und Recruiting-Marketing für die Personaldienstleistung. Die WhatsApp-Automation ist eine Eigenentwicklung.',
  },
  {
    question: 'Wie hoch ist das Werbebudget?',
    answer: 'Das Werbebudget zahlt der Betrieb direkt an Meta und Google, ohne Aufschlag. Die Höhe hängt von Gewerk und Region ab und wird im Erstgespräch festgelegt.',
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
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