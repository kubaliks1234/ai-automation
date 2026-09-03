import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Handwerker-Marketing Donau-Ries – Jakub Kaczmarek",
  "description": "Planbar qualifizierte Anfragen für Handwerksbetriebe im Landkreis Donau-Ries. Anzeigen, Landingpage und automatische Antwort in unter 60 Sekunden.",
  "url": "https://jakubkaczmarek.de/handwerker-marketing-donau-ries",
  "telephone": "+4917643942729",
  "areaServed": { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
  "priceRange": "€€"
};

export default function HandwerkerMarketingDonauRies() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="Handwerker-Marketing Donau-Ries | Jakub Kaczmarek"
        description="Planbar qualifizierte Anfragen für Handwerksbetriebe im Landkreis Donau-Ries. Anzeigen, Landingpage und automatische Antwort in unter 60 Sekunden."
        keywords="handwerker marketing donau-ries, kundengewinnung handwerk donauwörth, werbung handwerksbetrieb donau-ries, aufträge gewinnen handwerk nordschwaben"
        canonical="https://jakubkaczmarek.de/handwerker-marketing-donau-ries"
        structuredData={structuredData}
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              <span>Landkreis Donau-Ries</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Handwerker-Marketing im{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Landkreis Donau-Ries
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Die meisten Betriebe im Landkreis Donau-Ries leben von Empfehlung. Das funktioniert –
              bis zwei große Aufträge wegfallen und plötzlich Lücken im Kalender stehen. Hier kommt
              eine zweite Leitung, die Sie an- und ausschalten können.
            </p>
          </motion.div>

          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Die Ausgangslage im Landkreis</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Donau-Ries ist ein Landkreis mit rund 132.000 Einwohnern. Die kreisfreie Stadt
                Donauwörth ist das Oberzentrum, Nördlingen im Süden das zweite Zentrum. Dazwischen:
                Rain, Harburg, Monheim, Wemding, Oettingen – Orte, in denen Handwerksbetriebe
                überwiegend regional arbeiten.
              </p>
              <p>
                Die Wettbewerbslage ist überschaubar, aber das macht sie nicht einfacher. Wer bei
                Google nach „Trockenbau Donauwörth“ oder „Sanierung Nördlingen“ sucht, findet
                drei bis fünf Betriebe – und meistens eine MyHammer-Anzeige ganz oben. Wer nicht
                auf der ersten Seite steht, existiert nicht. Wer dort steht, aber die Anfrage
                erst abends zurückruft, verliert sie an den Zweiten.
              </p>
              <p>
                Portale wie MyHammer und Check24 Profis liefern Anfragen, aber die falschen:
                Preisdrücker, Kleinkram, fünf Betriebe im selben Angebot. Wer im Landkreis
                Donau-Ries Trockenbau oder Sanierung im größeren Rahmen macht, verdient nicht an
                Kleinaufträgen mit 20 % Portalkosten.
              </p>
            </div>
          </motion.div>

          {/* Lösung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Das Regional-Anfrage-System</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Drei Bausteine, die nach dem Onboarding ohne Ihr Zutun laufen:
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="text-white font-medium">Anzeigen in Ihrem Umkreis</span> – Meta und Google, ausgerichtet auf die Aufträge, die Sie wirklich wollen. Keine Kleinaufträge, wenn Sie Sanierungen suchen.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="text-white font-medium">Eine Seite, die vorsortiert</span> – vier Fragen: Was, wie groß, wo, bis wann. Wer keine ernsthafte Absicht hat, füllt das nicht aus.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="text-white font-medium">Antwort in unter 60 Sekunden</span> – jede Anfrage bekommt sofort eine WhatsApp mit Terminvorschlag. Auch nachts, auch sonntags.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lokale Bezüge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Was im Landkreis Donau-Ries anders ist</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Donau-Ries ist dünn besiedelt. Werbebudget, das in München 1.500 € pro Monat
                braucht, reicht hier oft mit 600–800 € – weil die Konkurrenz weniger schaltet und
                die Klickkosten niedriger sind. Eine Anfrage im Trockenbau kostet im Landkreis
                erfahrungsgemäß zwischen 30 und 70 €, je nach Gewerk und Saisonalität.
              </p>
              <p>
                Die typische Auftragsgröße unterscheidet sich zwischen Nordkreis (Nördlingen,
                Oettingen – eher ländlich, kleinere Aufträge) und Südkreis (Donauwörth, Rain –
                näher an Augsburg, größere Gewerbeaufträge). Die Anzeigen-Ausrichtung passt sich
                dem an: Sie entscheiden, wo Sie fahren, und ich stelle sicher, dass nur da
                Anzeigen laufen.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ein Betrieb pro Gewerk. Pro Landkreis.</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Für Trockenbau- und Sanierungsbetriebe im Landkreis Donau-Ries ist der Platz aktuell frei.
              Der Anfragen-Check dauert 20 Minuten und kostet nichts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/jakub-kaczmarek/anfragen-check"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
              >
                <Clock className="w-5 h-5" />
                Anfragen-Check buchen
              </a>
              <a
                href="tel:+4917643942729"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium rounded-xl hover:border-cyan-500/50 transition-all"
              >
                <Phone className="w-5 h-5" />
                +49 176 43942729
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              <a href="/" className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors">
                Zur Startseite <ArrowRight className="w-3 h-3" />
              </a>
            </p>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}