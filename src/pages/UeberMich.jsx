import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://jakubkaczmarek.de/#person",
  "name": "Jakub Kaczmarek",
  "jobTitle": "Spezialist für Kundengewinnung im Handwerk",
  "worksFor": { "@id": "https://jakubkaczmarek.de/#business" },
  "knowsLanguage": ["de", "pl", "en"],
  "url": "https://jakubkaczmarek.de/ueber-mich",
  "sameAs": ["https://github.com/kubaliks1234"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sebastian-Frank-Str. 11",
    "postalCode": "86609",
    "addressLocality": "Donauwörth",
    "addressRegion": "Bayern",
    "addressCountry": "DE"
  }
};

export default function UeberMich() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="Über mich – Jakub Kaczmarek | Kundengewinnung für Handwerk"
        description="Jakub Kaczmarek, Donauwörth. Seit über sieben Jahren im Marketing und in der Personalvermittlung. Jetzt: Anfragen-Systeme für Handwerksbetriebe in Donau-Ries."
        keywords="jakub kaczmarek, marketing handwerk donauwörth, kundengewinnung handwerk experte"
        canonical="https://jakubkaczmarek.de/ueber-mich"
        structuredData={structuredData}
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Über{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                mich
              </span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden">
                  <img
                    src="https://media.base44.com/images/public/69a7f4930f0e951070ab8bb0/b2fa5f40c_md.jpeg"
                    alt="Jakub Kaczmarek – Spezialist für Kundengewinnung im Handwerk"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  Ich bin Jakub Kaczmarek. Seit über sieben Jahren arbeite ich im Marketing
                  und in der Personalvermittlung – ich habe Anzeigen in sieben Ländern
                  geschaltet, Bewerberprozesse automatisiert und Systeme gebaut, die Anfragen
                  in Sekunden statt in Stunden beantworten.
                </p>
                <p>
                  Das Gleiche baue ich jetzt für{' '}
                  <span className="text-white font-medium">Handwerksbetriebe in Donau-Ries</span>.
                </p>
                <p>
                  Ich bin keine Agentur mit zwölf Leuten und Etage in München. Sie reden mit
                  mir, ich baue es, ich betreue es. Deshalb nehme ich pro Gewerk und Landkreis
                  nur einen Betrieb – alles andere wäre unseriös gegenüber dem Ersten,
                  der unterschrieben hat.
                </p>
                <p>
                  Ich spreche Deutsch, Polnisch und Englisch. Ich lebe in Donauwörth und kenne
                  die Handwerker-Landschaft im Landkreis – wer groß ist, wer empfohlen wird,
                  wo Lücken im Markt sind.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Kontakt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-12 border-t border-gray-800"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Kontakt</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="tel:+4917643942729" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+49 176 43942729</span>
              </a>
              <a href="mailto:jakub.kaczmarek669@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>jakub.kaczmarek669@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Sebastian-Frank-Str. 11, 86609 Donauwörth</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Globe className="w-5 h-5" />
                <span>jakubkaczmarek.de</span>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}