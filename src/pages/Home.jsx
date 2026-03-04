import React from 'react';
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
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