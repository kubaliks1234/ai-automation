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
      "@type": "Person",
      "@id": "https://jakubkaczmarek.de/#person",
      "name": "Jakub Kaczmarek",
      "jobTitle": "Anfragen-Systeme für Handwerksbetriebe",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sebastian-Frank-Str. 11",
        "addressLocality": "Donauwörth",
        "postalCode": "86609",
        "addressCountry": "DE"
      },
      "url": "https://jakubkaczmarek.de",
      "knowsAbout": ["Google Ads", "Meta Ads", "Lead Generation für Handwerk", "Marketing Automatisierung", "Landingpage-Optimierung"]
    },
    {
      "@type": "LocalBusiness",
      "name": "Jakub Kaczmarek",
      "description": "Planbar qualifizierte Anfragen für Handwerksbetriebe in Donau-Ries. Anzeigen, Landingpage und automatische Antwort in unter 60 Sekunden.",
      "url": "https://jakubkaczmarek.de",
      "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png",
      "email": "jakub.kaczmarek669@gmail.com",
      "telephone": "+4917643942729",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sebastian-Frank-Str. 11",
        "addressLocality": "Donauwörth",
        "postalCode": "86609",
        "addressCountry": "DE"
      },
      "areaServed": "Donau-Ries",
      "serviceType": ["Anfragen für Handwerksbetriebe", "Google Ads für Handwerker", "Meta Ads für Handwerk", "Landingpage für Handwerk"],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+4917643942729",
        "contactType": "customer service",
        "availableLanguage": "German"
      },
      "priceRange": "$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://jakubkaczmarek.de/#website",
      "url": "https://jakubkaczmarek.de",
      "name": "Jakub Kaczmarek",
      "inLanguage": "de-DE",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://jakubkaczmarek.de/blog?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
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