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
      "sameAs": ["https://github.com/kubaliks1234"]
    },
    {
      "@type": "WebSite",
      "@id": "https://jakubkaczmarek.de/#website",
      "url": "https://jakubkaczmarek.de",
      "name": "Jakub Kaczmarek",
      "inLanguage": "de-DE"
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
        title="Mehr Anfragen für Handwerksbetriebe in Donau-Ries | Jakub Kaczmarek"
        description="Planbar qualifizierte Anfragen für Handwerksbetriebe in Donau-Ries. Jede Anfrage in unter 60 Sekunden beantwortet. Kostenloser Anfragen-Check in 20 Minuten."
        keywords="Anfragen Handwerk, Kundengewinnung Handwerk, Marketing Handwerksbetrieb, Google Ads Handwerker, Meta Ads Handwerk, Leads Trockenbau, Aufträge Sanierung, Donau-Ries, Donauwörth"
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
    </div>
  );
}