import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Beispiele', href: '#automations' },
  { label: 'Prozess', href: '#process' },
  { label: 'Über mich', href: '#about' },
  { label: 'Blog', href: '/blog', isPage: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('Home');
    if (isHomePage) {
      if (href === '#cta') {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = createPageUrl('Home') + (href === '#cta' ? '#cta' : href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-gray-800/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href={createPageUrl('Home')} className="flex items-center gap-3">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png"
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-xl font-bold text-white hidden sm:block">Jakub Kaczmarek</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isPage ? (
                  <a
                    key={link.label}
                    href={createPageUrl('Blog')}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => scrollToSection('#cta')}
                className="hidden sm:flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl text-sm px-4"
              >
                Kostenlose Analyse
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-gray-800 lg:hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                link.isPage ? (
                  <a
                    key={link.label}
                    href={createPageUrl('Blog')}
                    className="block w-full text-left text-lg text-gray-300 hover:text-white py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left text-lg text-gray-300 hover:text-white py-2"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <Button
                onClick={() => scrollToSection('#cta')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl mt-4"
              >
                Kostenlose Analyse
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}