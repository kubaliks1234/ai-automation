import React, { useMemo } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SEOMeta from '@/components/SEOMeta';
import CityHero from '@/components/city/CityHero';
import CityServices from '@/components/city/CityServices';
import CityWhy from '@/components/city/CityWhy';
import CityIndustries from '@/components/city/CityIndustries';
import CityCTA from '@/components/city/CityCTA';
import CityCitiesNav from '@/components/city/CityCitiesNav';
import { getCityBySlug, cities } from '@/components/city/cityData';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

// Overview page when no city is selected
function CityOverview() {
  return (
    <>
      <SEOMeta
        title="KI Agentur Deutschland – KI Automatisierung für Unternehmen | Jakub Kaczmarek"
        description="KI Agentur für Unternehmen in ganz Deutschland. Berlin, Hamburg, München, Köln, Frankfurt und mehr. Maßgeschneiderte KI-Automatisierung & AI Lösungen."
        keywords="KI Agentur Deutschland, AI Agentur, KI Beratung, KI Automatisierung, KI Lösungen, künstliche Intelligenz Unternehmen"
        canonical="https://jakubkaczmarek.de/ki-agentur"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "KI Agentur Deutschland",
          "provider": { "@type": "Person", "name": "Jakub Kaczmarek" },
          "areaServed": "DE",
          "description": "KI-Automatisierung und AI-Lösungen für Unternehmen in ganz Deutschland."
        }}
      />

      <div className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              KI Agenturen in Deutschland
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              KI Agentur Deutschland –{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI Lösungen für jede Stadt
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Wir helfen Unternehmen in ganz Deutschland, durch KI-Automatisierung Zeit zu sparen,
              Kosten zu senken und schneller zu wachsen. Wähle deine Stadt:
            </p>
          </motion.div>

          {/* City Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {cities.map((city, i) => (
              <motion.a
                key={city.slug}
                href={createPageUrl('KiAgentur') + '?city=' + city.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group block bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:bg-gray-900/80"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h2 className="text-white font-bold text-lg mb-1">{city.title}</h2>
                <p className="text-gray-500 text-sm mb-3">{city.region}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{city.description}</p>
                <div className="mt-4 text-cyan-400 text-sm font-medium group-hover:underline">
                  Mehr erfahren →
                </div>
              </motion.a>
            ))}
          </div>

          {/* Internal link section */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Du findest deine Stadt nicht?{' '}
              <a href={createPageUrl('Analyse')} className="text-cyan-400 hover:underline">
                Kontaktiere uns direkt →
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function KiAgentur() {
  const urlParams = new URLSearchParams(window.location.search);
  const citySlug = urlParams.get('city');
  const city = useMemo(() => citySlug ? getCityBySlug(citySlug) : null, [citySlug]);

  if (!citySlug) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <main><CityOverview /></main>
        <Footer />
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="pt-36 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Stadt nicht gefunden</h1>
          <a href={createPageUrl('KiAgentur')} className="text-cyan-400 hover:underline">
            Alle Städte ansehen →
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `KI Agentur ${city.name} – Jakub Kaczmarek`,
        "description": city.metaDesc,
        "url": `https://jakubkaczmarek.de/ki-agentur-${city.slug}`,
        "areaServed": city.name,
        "serviceType": ["KI Automatisierung", "AI Chatbot", "Marketing Automation", "KI Beratung"],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "DE"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Was macht eine KI Agentur in ${city.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Eine KI Agentur in ${city.name} hilft Unternehmen dabei, Geschäftsprozesse mit künstlicher Intelligenz zu automatisieren – von Chatbots und Marketing-Automation bis hin zu individuellen KI-Workflows.`
            }
          },
          {
            "@type": "Question",
            "name": `Was kostet KI Automatisierung in ${city.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Kosten hängen vom Umfang des Projekts ab. Wir bieten eine kostenlose Erstanalyse an, um den genauen Bedarf zu ermitteln."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title={city.metaTitle}
        description={city.metaDesc}
        keywords={city.keywords}
        canonical={`https://jakubkaczmarek.de/ki-agentur-${city.slug}`}
        structuredData={structuredData}
      />
      <Navbar />
      <main>
        <CityHero city={city} />
        <CityServices city={city} />
        <CityWhy city={city} />
        <CityIndustries city={city} />
        <CityCTA city={city} />
        <CityCitiesNav currentSlug={city.slug} />
      </main>
      <Footer />
    </div>
  );
}