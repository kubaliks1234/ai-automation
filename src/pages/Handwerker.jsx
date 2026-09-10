import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const handwerkerSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jakubkaczmarek.de/handwerker#service",
      "name": "Regional-Anfrage-System",
      "serviceType": "Kundengewinnung für Handwerksbetriebe",
      "url": "https://jakubkaczmarek.de/handwerker",
      "description": "Das Regional-Anfrage-System erzeugt exklusive, vorqualifizierte Kundenanfragen für Handwerksbetriebe. Bausteine: regionale Meta- und Google-Ads, vorqualifizierende Landingpage, automatische WhatsApp-Antwort in unter 60 Sekunden. Nur ein Betrieb pro Gewerk und Landkreis.",
      "provider": { "@id": "https://jakubkaczmarek.de/#organization" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
        { "@type": "City", "name": "Augsburg" },
        { "@type": "City", "name": "München" }
      ],
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Handwerksbetriebe: Trockenbau, Renovierung, Maler, Sanitär, Heizung, Elektro, Fliesenleger, Dachdecker"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bausteine des Regional-Anfrage-Systems",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Regionale Meta- und Google-Ads", "description": "Anzeigen nur im Einzugsgebiet des Betriebs, Budget läuft direkt über das Werbekonto des Betriebs." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vorqualifizierende Landingpage", "description": "Sortiert Preisvergleicher, falsches Gewerk und Anfragen außerhalb der Region vor dem Kontakt aus." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automatische WhatsApp-Antwort", "description": "Jeder Interessent bekommt in unter 60 Sekunden eine Antwort – auch wenn der Betrieb auf der Baustelle ist." } }
        ]
      },
      "termsOfService": "Keine Mindestlaufzeit. Exklusivität: ein Betrieb pro Gewerk und Landkreis. Garantie: 10 qualifizierte Anfragen in 60 Tagen, sonst Weiterbetreuung ohne Retainer."
    },
    {
      "@type": "FAQPage",
      "@id": "https://jakubkaczmarek.de/handwerker#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Was ist das Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Kundengewinnungs-System für Handwerksbetriebe aus drei Bausteinen: regionale Meta- und Google-Ads, eine vorqualifizierende Landingpage und eine automatische WhatsApp-Antwort in unter 60 Sekunden. Der Betrieb bekommt exklusive Anfragen unter seiner eigenen Marke, keine geteilten Portal-Leads." } },
        { "@type": "Question", "name": "Für welche Gewerke funktioniert das Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Trockenbau, Renovierung, Maler, Sanitär und Heizung, Elektro, Fliesenleger, Dachdecker und Bodenleger. Grundsätzlich jedes Gewerk, bei dem Privatkunden oder Gewerbekunden regional nach einem Betrieb suchen." } },
        { "@type": "Question", "name": "Was ist der Unterschied zu MyHammer, Blauarbeit oder Aroundhome?", "acceptedAnswer": { "@type": "Answer", "text": "Portale verkaufen dieselbe Anfrage an mehrere Betriebe, die dann um den Kunden konkurrieren. Beim Regional-Anfrage-System laufen Anzeigen und Landingpage unter der Marke des Betriebs. Jede Anfrage ist exklusiv, und die Kundendaten gehören dem Betrieb." } },
        { "@type": "Question", "name": "In welchen Regionen ist das Regional-Anfrage-System verfügbar?", "acceptedAnswer": { "@type": "Answer", "text": "Aktuell im Landkreis Donau-Ries (Nördlingen, Donauwörth und Umgebung), Augsburg und München. Pro Gewerk und Landkreis wird nur ein Betrieb betreut." } },
        { "@type": "Question", "name": "Gibt es eine Mindestlaufzeit?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Die Zusammenarbeit ist monatlich kündbar." } },
        { "@type": "Question", "name": "Welche Garantie gibt es?", "acceptedAnswer": { "@type": "Answer", "text": "10 qualifizierte Anfragen innerhalb von 60 Tagen. Wird das nicht erreicht, läuft die Betreuung ohne Retainer weiter, bis die Zahl erreicht ist." } },
        { "@type": "Question", "name": "Warum eine automatische WhatsApp-Antwort in unter 60 Sekunden?", "acceptedAnswer": { "@type": "Answer", "text": "Handwerker sind tagsüber auf der Baustelle und erreichen Anfragen nicht sofort. Interessenten, die keine Antwort bekommen, fragen beim nächsten Betrieb an. Die automatische WhatsApp-Antwort bestätigt die Anfrage sofort, stellt die wichtigsten Rückfragen und hält den Kunden, bis der Betrieb Zeit hat." } },
        { "@type": "Question", "name": "Was bedeutet „qualifizierte Anfrage\"?", "acceptedAnswer": { "@type": "Answer", "text": "Eine Anfrage aus dem definierten Einzugsgebiet, für das richtige Gewerk, mit konkretem Projekt und Kontaktdaten, bei der der Interessent die Vorqualifizierung auf der Landingpage durchlaufen hat. Preisvergleicher und Anfragen außerhalb der Region zählen nicht." } },
        { "@type": "Question", "name": "Wer steckt hinter dem Regional-Anfrage-System?", "acceptedAnswer": { "@type": "Answer", "text": "Jakub Kaczmarek aus Nördlingen, Marketing- und KI-Automation-Spezialist mit über 7 Jahren Erfahrung in Performance-Marketing (Meta Ads, Google Ads) und Recruiting-Marketing für die Personaldienstleistung. Die WhatsApp-Automation ist eine Eigenentwicklung." } },
        { "@type": "Question", "name": "Wie hoch ist das Werbebudget?", "acceptedAnswer": { "@type": "Answer", "text": "Das Werbebudget zahlt der Betrieb direkt an Meta und Google, ohne Aufschlag. Die Höhe hängt von Gewerk und Region ab und wird im Erstgespräch festgelegt." } }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://jakubkaczmarek.de/" },
        { "@type": "ListItem", "position": 2, "name": "Regional-Anfrage-System für Handwerker", "item": "https://jakubkaczmarek.de/handwerker" }
      ]
    }
  ]
};

const bausteine = [
  { title: 'Regionale Meta- und Google-Ads', desc: 'Anzeigen nur im Einzugsgebiet des Betriebs, Budget läuft direkt über das Werbekonto des Betriebs.' },
  { title: 'Vorqualifizierende Landingpage', desc: 'Sortiert Preisvergleicher, falsches Gewerk und Anfragen außerhalb der Region vor dem Kontakt aus.' },
  { title: 'Automatische WhatsApp-Antwort', desc: 'Jeder Interessent bekommt in unter 60 Sekunden eine Antwort – auch wenn der Betrieb auf der Baustelle ist.' },
];

const faqs = [
  { q: 'Was ist das Regional-Anfrage-System?', a: 'Ein Kundengewinnungs-System für Handwerksbetriebe aus drei Bausteinen: regionale Meta- und Google-Ads, eine vorqualifizierende Landingpage und eine automatische WhatsApp-Antwort in unter 60 Sekunden. Der Betrieb bekommt exklusive Anfragen unter seiner eigenen Marke, keine geteilten Portal-Leads.' },
  { q: 'Für welche Gewerke funktioniert das Regional-Anfrage-System?', a: 'Trockenbau, Renovierung, Maler, Sanitär und Heizung, Elektro, Fliesenleger, Dachdecker und Bodenleger. Grundsätzlich jedes Gewerk, bei dem Privatkunden oder Gewerbekunden regional nach einem Betrieb suchen.' },
  { q: 'Was ist der Unterschied zu MyHammer, Blauarbeit oder Aroundhome?', a: 'Portale verkaufen dieselbe Anfrage an mehrere Betriebe, die dann um den Kunden konkurrieren. Beim Regional-Anfrage-System laufen Anzeigen und Landingpage unter der Marke des Betriebs. Jede Anfrage ist exklusiv, und die Kundendaten gehören dem Betrieb.' },
  { q: 'In welchen Regionen ist das Regional-Anfrage-System verfügbar?', a: 'Aktuell im Landkreis Donau-Ries (Nördlingen, Donauwörth und Umgebung), Augsburg und München. Pro Gewerk und Landkreis wird nur ein Betrieb betreut.' },
  { q: 'Gibt es eine Mindestlaufzeit?', a: 'Nein. Die Zusammenarbeit ist monatlich kündbar.' },
  { q: 'Welche Garantie gibt es?', a: '10 qualifizierte Anfragen innerhalb von 60 Tagen. Wird das nicht erreicht, läuft die Betreuung ohne Retainer weiter, bis die Zahl erreicht ist.' },
  { q: 'Warum eine automatische WhatsApp-Antwort in unter 60 Sekunden?', a: 'Handwerker sind tagsüber auf der Baustelle und erreichen Anfragen nicht sofort. Interessenten, die keine Antwort bekommen, fragen beim nächsten Betrieb an. Die automatische WhatsApp-Antwort bestätigt die Anfrage sofort, stellt die wichtigsten Rückfragen und hält den Kunden, bis der Betrieb Zeit hat.' },
  { q: 'Was bedeutet „qualifizierte Anfrage"?', a: 'Eine Anfrage aus dem definierten Einzugsgebiet, für das richtige Gewerk, mit konkretem Projekt und Kontaktdaten, bei der der Interessent die Vorqualifizierung auf der Landingpage durchlaufen hat. Preisvergleicher und Anfragen außerhalb der Region zählen nicht.' },
  { q: 'Wer steckt hinter dem Regional-Anfrage-System?', a: 'Jakub Kaczmarek aus Nördlingen, Marketing- und KI-Automation-Spezialist mit über 7 Jahren Erfahrung in Performance-Marketing (Meta Ads, Google Ads) und Recruiting-Marketing für die Personaldienstleistung. Die WhatsApp-Automation ist eine Eigenentwicklung.' },
  { q: 'Wie hoch ist das Werbebudget?', a: 'Das Werbebudget zahlt der Betrieb direkt an Meta und Google, ohne Aufschlag. Die Höhe hängt von Gewerk und Region ab und wird im Erstgespräch festgelegt.' },
];

export default function Handwerker() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="Regional-Anfrage-System: Mehr Aufträge für Handwerker in Donau-Ries | Jakub Kaczmarek"
        description="Exklusive Kundenanfragen für Trockenbau, Maler, Sanitär, Elektro & Co. in Donau-Ries, Augsburg, München. Meta- & Google-Ads + Landingpage + WhatsApp-Antwort in 60 Sek. Keine Mindestlaufzeit, 10-Anfragen-Garantie."
        canonical="https://jakubkaczmarek.de/handwerker"
        structuredData={handwerkerSchema}
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
              <span>Landkreis Donau-Ries · Augsburg · München</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Regional-Anfrage-System:{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Mehr Aufträge für Handwerker
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Das Regional-Anfrage-System erzeugt exklusive, vorqualifizierte
              Kundenanfragen für Handwerksbetriebe. Bausteine: regionale Meta- und
              Google-Ads, vorqualifizierende Landingpage, automatische WhatsApp-Antwort
              in unter 60 Sekunden. Nur ein Betrieb pro Gewerk und Landkreis.
            </p>
          </motion.div>

          {/* Bausteine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Die drei Bausteine</h2>
            <div className="space-y-4">
              {bausteine.map((b, i) => (
                <div key={i} className="flex gap-3 p-5 rounded-xl border border-gray-800 bg-gray-900/40">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{b.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Konditionen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Konditionen</h2>
            <div className="space-y-3 text-gray-400">
              <p><span className="text-white font-medium">Exklusivität:</span> nur ein Betrieb pro Gewerk und Landkreis</p>
              <p><span className="text-white font-medium">Keine Mindestlaufzeit</span> – monatlich kündbar</p>
              <p><span className="text-white font-medium">Garantie:</span> 10 qualifizierte Anfragen in 60 Tagen – sonst Weiterbetreuung ohne Retainer</p>
              <p><span className="text-white font-medium">Werbebudget:</span> wird direkt vom Betrieb an Meta/Google gezahlt, kein Aufschlag</p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Häufige Fragen</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
                  <summary className="cursor-pointer text-white font-medium text-sm">{f.q}</summary>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
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
            <h2 className="text-2xl font-bold text-white mb-4">Ist dein Gewerk in deinem Landkreis noch frei?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Schreib mir kurz Gewerk und Ort. Ich sage dir innerhalb eines Werktags,
              ob der Platz frei ist und was realistisch drin ist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/4917643942729"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="mailto:jakub.kaczmarek669@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-white font-medium rounded-xl hover:border-cyan-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
                E-Mail
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              <Link to="/" className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors">
                Zur Startseite <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}