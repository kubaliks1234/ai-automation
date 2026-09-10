import React, { useEffect } from 'react';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutSection from '@/components/landing/AboutSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import MobileCTABar from '@/components/landing/MobileCTABar';

const faqSchema = {
  "@type": "FAQPage",
  "@id": "https://jakubkaczmarek.de/#faq",
  "url": "https://jakubkaczmarek.de/",
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
};

export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('app')) {
      params.delete('app');
      const cleanUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="Kundengewinnung für Handwerksbetriebe in Donau-Ries, Augsburg & München | Regional-Anfrage-System"
        description="Das Regional-Anfrage-System bringt Handwerksbetrieben exklusive, vorqualifizierte Kundenanfragen: regionale Meta- & Google-Ads, Landingpage, WhatsApp-Antwort in unter 60 Sekunden. Ein Betrieb pro Gewerk und Landkreis. Garantie: 10 Anfragen in 60 Tagen."
        canonical="https://jakubkaczmarek.de/"
        structuredData={faqSchema}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}