import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, TrendingUp, Workflow, CheckCircle2, ArrowRight, ArrowLeft, Zap, Users, BarChart3, Clock } from 'lucide-react';
import { createPageUrl } from '@/utils';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SEOMeta from '@/components/SEOMeta';

const serviceData = {
  'ai-marketing': {
    slug: 'ai-marketing',
    title: 'AI Marketing Systeme',
    metaTitle: 'AI Marketing Systeme – Automatisierte Content-Maschinen | Jakub Kaczmarek',
    metaDescription: 'Automatisierte AI Marketing Systeme von Jakub Kaczmarek: Content-Erstellung, Verteilung und Performance-Analyse mit künstlicher Intelligenz.',
    icon: Megaphone,
    gradient: 'from-cyan-500 to-blue-500',
    bgGlow: 'bg-cyan-500/20',
    tagline: 'Mehr Reichweite. Weniger Aufwand.',
    description: 'Moderne Unternehmen verlieren täglich Stunden mit manueller Content-Erstellung. AI Marketing Systeme automatisieren den gesamten Prozess – von der Ideenfindung bis zur Veröffentlichung und Analyse.',
    benefits: [
      { icon: Clock, label: 'Bis zu 80% Zeitersparnis bei Content-Erstellung' },
      { icon: BarChart3, label: '3× mehr Content-Output bei gleichem Team' },
      { icon: Zap, label: 'Konsistente Markenstimme auf allen Kanälen' },
      { icon: Users, label: 'Personalisierte Inhalte für jede Zielgruppe' },
    ],
    features: [
      { title: 'Automatische Content-Erstellung', desc: 'AI generiert täglich Blogartikel, Social Media Posts und E-Mail-Newsletter – vollständig auf Ihre Marke abgestimmt.' },
      { title: 'Multi-Channel-Distribution', desc: 'Ein Knopfdruck verteilt Inhalte automatisch auf LinkedIn, Instagram, E-Mail und weitere Kanäle.' },
      { title: 'Performance-Analyse & Optimierung', desc: 'AI analysiert, welcher Content funktioniert und optimiert die Strategie kontinuierlich.' },
      { title: 'SEO-optimierter Content', desc: 'Alle Inhalte werden automatisch für Suchmaschinen optimiert und mit relevantem Keywords versehen.' },
    ],
    useCases: ['E-Commerce Unternehmen', 'B2B SaaS', 'Agenturen', 'Coaches & Berater', 'Dienstleister'],
    faq: [
      { q: 'Wie schnell kann ein AI Marketing System live gehen?', a: 'In der Regel ist ein vollständiges System in 2–4 Wochen einsatzbereit.' },
      { q: 'Muss ich selbst Texte überprüfen?', a: 'Sie definieren den Rahmen und Stil. Das System liefert fertige Entwürfe – final oder direkt publishing.' },
      { q: 'Funktioniert das auch auf Deutsch?', a: 'Ja, alle Systeme sind vollständig auf Deutsche Sprache und den DACH-Markt ausgelegt.' },
    ],
  },
  'lead-generation': {
    slug: 'lead-generation',
    title: 'AI Lead Generation',
    metaTitle: 'AI Lead Generation – Automatisch neue Kunden finden | Jakub Kaczmarek',
    metaDescription: 'Mit AI Lead Generation automatisch qualifizierte Leads finden, ansprechen und Termine buchen. LinkedIn-Automationen und KI-Qualifizierung von Jakub Kaczmarek.',
    icon: Target,
    gradient: 'from-blue-500 to-purple-500',
    bgGlow: 'bg-blue-500/20',
    tagline: 'Volle Pipeline. Automatisch.',
    description: 'Manuelle Kaltakquise ist zeitintensiv und ineffizient. AI Lead Generation Systeme identifizieren automatisch potenzielle Kunden, sprechen sie zur richtigen Zeit an und qualifizieren Leads – ohne manuellen Aufwand.',
    benefits: [
      { icon: Clock, label: '10× mehr Leads bei gleichem Zeitaufwand' },
      { icon: BarChart3, label: 'Höhere Abschlussquoten durch bessere Qualifizierung' },
      { icon: Zap, label: '24/7 aktive Lead-Generierung' },
      { icon: Users, label: 'Personalisierte Ansprache für jeden Lead' },
    ],
    features: [
      { title: 'LinkedIn Lead Automation', desc: 'AI identifiziert und kontaktiert täglich qualifizierte Leads auf LinkedIn – vollständig automatisiert und DSGVO-konform.' },
      { title: 'Intelligente Lead-Qualifizierung', desc: 'AI bewertet jeden Lead nach Ihren Kriterien und priorisiert die vielversprechendsten Kontakte.' },
      { title: 'Automatische Terminbuchung', desc: 'Interessierte Leads werden direkt in Ihren Kalender gebucht – ohne manuellen Eingriff.' },
      { title: 'CRM-Integration', desc: 'Alle Lead-Daten fließen automatisch in Ihr CRM und werden kontinuierlich aktualisiert.' },
    ],
    useCases: ['B2B Vertrieb', 'Unternehmensberatung', 'SaaS Anbieter', 'Recruiting', 'Immobilien'],
    faq: [
      { q: 'Ist LinkedIn Automation legal?', a: 'Ja, mit den richtigen Tools und Einstellungen ist LinkedIn Automation vollständig regelkonform.' },
      { q: 'Wie viele Leads kann das System pro Monat generieren?', a: 'Je nach Zielgruppe und Markt zwischen 50 und 500+ qualifizierte Leads pro Monat.' },
      { q: 'Funktioniert das auch im B2C-Bereich?', a: 'Der Fokus liegt auf B2B, aber wir können auch B2C-Systeme individuell entwickeln.' },
    ],
  },
  'sales-automation': {
    slug: 'sales-automation',
    title: 'AI Sales Automationen',
    metaTitle: 'AI Sales Automation – Vertrieb automatisieren | Jakub Kaczmarek',
    metaDescription: 'AI Sales Automationen von Jakub Kaczmarek: Automatische Follow-ups, CRM-Automationen und intelligente Lead-Qualifizierung für mehr Umsatz.',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    bgGlow: 'bg-purple-500/20',
    tagline: 'Mehr Abschlüsse. Weniger Aufwand.',
    description: 'Vertriebsteams verlieren wertvolle Zeit mit manuellen Aufgaben. AI Sales Automationen übernehmen Follow-ups, CRM-Pflege und Qualifizierung – damit Ihr Team sich auf den Abschluss konzentrieren kann.',
    benefits: [
      { icon: Clock, label: 'Bis zu 60% weniger Zeit für manuelle Vertriebsaufgaben' },
      { icon: BarChart3, label: 'Höhere Abschlussquoten durch schnellere Reaktionen' },
      { icon: Zap, label: 'Kein Lead fällt mehr durchs Raster' },
      { icon: Users, label: 'Skalierung ohne zusätzliches Personal' },
    ],
    features: [
      { title: 'Automatische Follow-Up Sequenzen', desc: 'Das System erkennt, wann ein Lead kontaktiert werden sollte und sendet personalisierte Nachrichten zum optimalen Zeitpunkt.' },
      { title: 'CRM Automatisierung', desc: 'Alle Kontakte, Notizen und Aktivitäten werden automatisch in Ihrem CRM gepflegt – ohne manuelle Eingaben.' },
      { title: 'KI-gestützte Angebotsqualifizierung', desc: 'AI bewertet eingehende Anfragen und priorisiert Leads nach Abschlusswahrscheinlichkeit.' },
      { title: 'Upsell & Cross-Sell Automationen', desc: 'Bestehende Kunden erhalten zur richtigen Zeit personalisierte Angebote für weitere Produkte.' },
    ],
    useCases: ['Vertriebsteams', 'Außendienst', 'E-Commerce', 'SaaS Unternehmen', 'Finanzdienstleister'],
    faq: [
      { q: 'Welche CRM-Systeme werden unterstützt?', a: 'HubSpot, Salesforce, Pipedrive, Monday.com und viele weitere – fast jedes CRM lässt sich integrieren.' },
      { q: 'Klingt die KI-Kommunikation natürlich?', a: 'Ja, alle Nachrichten werden auf Basis Ihres Stils und Ihrer Sprache trainiert.' },
      { q: 'Wie lange dauert die Implementierung?', a: 'Typischerweise 1–3 Wochen, abhängig von der Komplexität Ihres Vertriebsprozesses.' },
    ],
  },
  'workflow-automation': {
    slug: 'workflow-automation',
    title: 'Workflow Automationen',
    metaTitle: 'Workflow Automation – Interne Prozesse automatisieren | Jakub Kaczmarek',
    metaDescription: 'Workflow Automationen von Jakub Kaczmarek: Dokumentenverarbeitung, Datenintegration und AI Assistenten für effizientere interne Abläufe.',
    icon: Workflow,
    gradient: 'from-pink-500 to-orange-500',
    bgGlow: 'bg-pink-500/20',
    tagline: 'Weniger Routinearbeit. Mehr Ergebnisse.',
    description: 'Repetitive interne Prozesse kosten Unternehmen täglich Stunden produktiver Zeit. Workflow Automationen mit AI übernehmen Routineaufgaben vollständig – von der Dokumentenverarbeitung bis zur Datenintegration.',
    benefits: [
      { icon: Clock, label: 'Bis zu 70% Zeitersparnis bei Routineprozessen' },
      { icon: BarChart3, label: 'Fehlerquote sinkt auf nahezu null' },
      { icon: Zap, label: 'Prozesse laufen 24/7 ohne Unterbrechung' },
      { icon: Users, label: 'Mitarbeiter fokussieren sich auf wertschöpfende Aufgaben' },
    ],
    features: [
      { title: 'Automatische Dokumentenverarbeitung', desc: 'AI liest, klassifiziert und verarbeitet eingehende Dokumente – Rechnungen, Verträge, Formulare – vollständig automatisiert.' },
      { title: 'Datenintegration & Synchronisierung', desc: 'Daten fließen automatisch zwischen Ihren Systemen – kein manuelles Copy-Paste mehr zwischen Tools.' },
      { title: 'AI Assistenten für Teams', desc: 'Individuelle AI Assistenten beantworten Fragen, erstellen Berichte und unterstützen Teams in Echtzeit.' },
      { title: 'Automatisierte Reporting-Systeme', desc: 'Berichte und Dashboards werden täglich automatisch erstellt und an die richtigen Personen versendet.' },
    ],
    useCases: ['Verwaltung & HR', 'Buchhaltung & Finanzen', 'Kundendienst', 'Logistik', 'Gesundheitswesen'],
    faq: [
      { q: 'Welche Tools können verbunden werden?', a: 'Über 5.000 Apps über Zapier, Make, n8n und direkte API-Integrationen.' },
      { q: 'Sind die Daten sicher?', a: 'Alle Systeme werden DSGVO-konform und auf europäischen Servern betrieben.' },
      { q: 'Was wenn ein Prozess komplex ist?', a: 'Je komplexer der Prozess, desto größer die Zeitersparnis. Wir analysieren Ihren Workflow kostenlos.' },
    ],
  },
};

const slugToKey = {
  'ai-marketing': 'ai-marketing',
  'lead-generation': 'lead-generation',
  'sales-automation': 'sales-automation',
  'workflow-automation': 'workflow-automation',
};

export default function ServicePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('service');
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-6">Service nicht gefunden.</p>
          <a href={createPageUrl('Home')} className="text-cyan-400 hover:underline">Zurück zur Startseite</a>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Person",
      "name": "Jakub Kaczmarek",
      "url": "https://jakubkaczmarek.de"
    },
    "areaServed": "DE",
    "inLanguage": "de"
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={`https://jakubkaczmarek.de/service?service=${service.slug}`}
        structuredData={structuredData}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] ${service.bgGlow} blur-[120px] opacity-20 pointer-events-none`} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <a href={createPageUrl('Home') + '#services'} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Alle Services
            </a>
            <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-3xl bg-gradient-to-br ${service.gradient} mb-8`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Zap className="w-3 h-3" /> {service.tagline}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              {service.description}
            </p>
            <a
              href={createPageUrl('Analyse')}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white font-semibold text-lg hover:opacity-90 transition-opacity`}
            >
              Kostenlose Analyse anfragen <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-900/50 border border-gray-800">
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient}`}>
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center">
            Was das System leistet
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-8">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Für wen ist das geeignet?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {service.useCases.map((uc, i) => (
              <span key={i} className={`px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r ${service.gradient} text-white`}>
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Häufige Fragen</h2>
          <div className="space-y-5">
            {service.faq.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gray-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bereit für {service.title}?</h2>
          <p className="text-gray-400 mb-8">Buchen Sie eine kostenlose 30-minütige Analyse und erfahren Sie, wie ich {service.title.toLowerCase()} für Ihr Unternehmen implementiere.</p>
          <a
            href={createPageUrl('Analyse')}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white font-semibold text-lg hover:opacity-90 transition-opacity`}
          >
            Kostenlose Analyse buchen <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 px-6 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8">Weitere Services</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.values(serviceData).filter(s => s.slug !== service.slug).map((s, i) => {
              const SIcon = s.icon;
              return (
                <a key={i} href={createPageUrl('Service') + '?service=' + s.slug}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
                  <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient}`}>
                    <SIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">{s.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}