import React, { useEffect } from 'react';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AutomationsSection from '@/components/landing/AutomationsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import AboutSection from '@/components/landing/AboutSection';
import LeadMagnet from '@/components/landing/LeadMagnet';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import MobileCTABar from '@/components/landing/MobileCTABar';

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://jakubkaczmarek.de/#business",
      "name": "Jakub Kaczmarek – Anfragen für Handwerksbetriebe",
      "description": "Planbar qualifizierte Anfragen für Handwerks- und Ausbaubetriebe in der Region Donau-Ries, Augsburg und München.",
      "url": "https://jakubkaczmarek.de",
      "email": "jakub.kaczmarek669@gmail.com",
      "telephone": "+4917643942729",
      "image": "https://media.base44.com/images/public/69a7f4930f0e951070ab8bb0/b2fa5f40c_md.jpeg",
      "founder": { "@id": "https://jakubkaczmarek.de/#person" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sebastian-Frank-Str. 11",
        "postalCode": "86609",
        "addressLocality": "Donauwörth",
        "addressRegion": "Bayern",
        "addressCountry": "DE"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 48.7186, "longitude": 10.7772 },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
        { "@type": "City", "name": "Donauwörth" },
        { "@type": "City", "name": "Nördlingen" },
        { "@type": "City", "name": "Augsburg" },
        { "@type": "City", "name": "München" }
      ],
      "knowsAbout": [
        "Kundengewinnung Handwerk", "Meta Ads Handwerksbetriebe",
        "Google Ads Handwerk", "Lead-Automatisierung", "Speed to Lead"
      ],
      "priceRange": "€€"
    },
    {
      "@type": "Person",
      "@id": "https://jakubkaczmarek.de/#person",
      "name": "Jakub Kaczmarek",
      "jobTitle": "Spezialist für Kundengewinnung im Handwerk",
      "worksFor": { "@id": "https://jakubkaczmarek.de/#business" },
      "knowsLanguage": ["de", "pl", "en"],
      "url": "https://jakubkaczmarek.de/ueber-mich",
      "sameAs": ["https://github.com/kubaliks1234", "https://www.linkedin.com/in/jakub-kaczmarek"]
    },
    {
      "@type": "WebSite",
      "@id": "https://jakubkaczmarek.de/#website",
      "url": "https://jakubkaczmarek.de",
      "name": "Jakub Kaczmarek",
      "inLanguage": "de-DE"
    },
    {
      "@type": "Service",
      "@id": "https://jakubkaczmarek.de/#service",
      "name": "Regional-Anfrage-System",
      "description": "Kundengewinnungs-System für Handwerksbetriebe: Meta- und Google-Ads, vorqualifizierende Landingpage, automatische WhatsApp-Antwort in unter 60 Sekunden.",
      "provider": { "@id": "https://jakubkaczmarek.de/#business" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Landkreis Donau-Ries" },
        { "@type": "City", "name": "Augsburg" },
        { "@type": "City", "name": "München" }
      ],
      "url": "https://jakubkaczmarek.de/"
    },
    {
      "@type": "FAQPage",
      "@id": "https://jakubkaczmarek.de/#faq",
      "url": "https://jakubkaczmarek.de/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Wir sind ohnehin ausgelastet – bringt mir das etwas?",
          "acceptedAnswer": { "@type": "Answer", "text": "Die Frage ist nicht ob, sondern womit. Die meisten Betriebe sind mit Kleinkram ausgelastet und hätten lieber zwei große Aufträge. Genau das lässt sich über die Ausrichtung der Anzeigen steuern." }
        },
        {
          "@type": "Question",
          "name": "Wir haben das schon mit einer Agentur versucht, hat nichts gebracht.",
          "acceptedAnswer": { "@type": "Answer", "text": "Fast immer war das Problem nicht die Anzeige, sondern was danach passiert ist: Die Anfragen kamen, aber der Rückruf kam erst abends. Deshalb ist die Antwort in unter 60 Sekunden bei mir kein Extra, sondern der Kern." }
        },
        {
          "@type": "Question",
          "name": "Was kostet das Werbebudget?",
          "acceptedAnswer": { "@type": "Answer", "text": "800 bis 1.500 € im Monat sind für Donau-Ries realistisch. Sie zahlen das direkt an Facebook und Google, nicht an mich. Ich verdiene nichts daran, wenn Sie mehr ausgeben." }
        },
        {
          "@type": "Question",
          "name": "Wie lange bin ich gebunden?",
          "acceptedAnswer": { "@type": "Answer", "text": "Gar nicht. Monatlich kündbar." }
        },
        {
          "@type": "Question",
          "name": "Was ist, wenn es nicht funktioniert?",
          "acceptedAnswer": { "@type": "Answer", "text": "Keine 10 qualifizierten Anfragen in 60 Tagen: Ich arbeite ohne Retainer weiter, bis sie da sind." }
        },
        {
          "@type": "Question",
          "name": "Machen Sie auch Mitarbeitergewinnung?",
          "acceptedAnswer": { "@type": "Answer", "text": "Aktuell konzentriere ich mich auf Kundenanfragen. Mitarbeitergewinnung biete ich Bestandskunden ab 2027 an." }
        },
        {
          "@type": "Question",
          "name": "Was ist das Regional-Anfrage-System?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ein Kundengewinnungs-System für Handwerksbetriebe: Meta- und Google-Ads, vorqualifizierende Landingpage, automatische WhatsApp-Antwort in unter 60 Sekunden. Nur ein Betrieb pro Gewerk und Landkreis." }
        },
        {
          "@type": "Question",
          "name": "Für welche Gewerke funktioniert das?",
          "acceptedAnswer": { "@type": "Answer", "text": "Trockenbau, Sanierung, Maler, Elektro, SHK, Zimmerei, Fliesenleger. Am besten bei Aufträgen ab 5.000 Euro. Kleinaufträge unter 1.000 Euro lohnen sich über bezahlte Anfragen nicht." }
        },
        {
          "@type": "Question",
          "name": "Wie schnell kommen die ersten Anfragen?",
          "acceptedAnswer": { "@type": "Answer", "text": "In der Regel innerhalb von 14 Tagen nach Start der Anzeigen. Die ersten zwei Wochen sind Optimierungsphase – die Anzeigen lernen, welche Interessenten ernsthaft sind." }
        },
        {
          "@type": "Question",
          "name": "Was muss ich selbst tun?",
          "acceptedAnswer": { "@type": "Answer", "text": "60 Minuten Onboarding für Fotos, Referenzen und Zielaufträge. Danach fassen Sie nichts mehr an. Sie bekommen jede Anfrage zusammengefasst aufs Handy und entscheiden, wen Sie zurückrufen." }
        }
      ]
    }
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
        title="Kundengewinnung für Handwerksbetriebe im Landkreis Donau-Ries | Regional-Anfrage-System"
        description="Regional-Anfrage-System für Handwerksbetriebe in Donau-Ries: Meta- und Google-Ads, Landingpage, WhatsApp-Antwort unter 60 Sekunden. 10 Anfragen in 60 Tagen."
        keywords="Regional-Anfrage-System, Kundengewinnung Handwerk, Anfragen Handwerk, Marketing Handwerksbetrieb, Google Ads Handwerker, Meta Ads Handwerk, Leads Trockenbau, Aufträge Sanierung, Donau-Ries, Donauwörth"
        canonical="https://jakubkaczmarek.de/"
        structuredData={homeStructuredData}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <AutomationsSection />
        <LeadMagnet />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}