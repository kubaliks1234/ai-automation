import React from 'react';
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
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jakubkaczmarek.de/#person",
      "name": "Jakub Kaczmarek",
      "jobTitle": "KI-Automatisierungsexperte",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sebastian-Frank-Str. 11",
        "addressLocality": "Donauwörth",
        "postalCode": "86609",
        "addressCountry": "DE"
      },
      "url": "https://jakubkaczmarek.de"
    },
    {
      "@type": "LocalBusiness",
      "name": "Jakub Kaczmarek – AI Automation",
      "description": "KI-Automatisierung und digitale Systeme für Unternehmen. Spare Zeit, generiere mehr Leads und steigere deinen Umsatz.",
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
      "areaServed": "DE",
      "serviceType": ["KI Automatisierung", "AI Marketing", "Lead Generation", "Sales Automation", "Workflow Automatisierung"],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+4917643942729",
        "contactType": "customer service",
        "availableLanguage": "German"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jakubkaczmarek.de/#website",
      "url": "https://jakubkaczmarek.de",
      "name": "Jakub Kaczmarek – AI Automation",
      "inLanguage": "de-DE"
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="KI Automatisierung für Unternehmen | Jakub Kaczmarek"
        description="Jakub Kaczmarek – KI-Automatisierung und digitale Systeme für Unternehmen. Spare Zeit, generiere mehr Leads und steigere deinen Umsatz mit maßgeschneiderten AI-Workflows."
        keywords="KI Automatisierung, AI Automation, Workflow Automatisierung, Lead Generation, Sales Automation, Marketing Automatisierung, Donauwörth, Bayern"
        canonical="https://jakubkaczmarek.de/"
        structuredData={homeStructuredData}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <section id="services">
          <ServicesSection />
        </section>
        <AutomationsSection />
        <section id="process">
          <ProcessSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <LeadMagnet />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}