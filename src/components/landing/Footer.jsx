import React from 'react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-[#0a0a0f] border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png"
                alt="Jakub Kaczmarek Logo"
                className="w-10 h-10 rounded-xl object-cover"
                width="40"
                height="40"
                loading="lazy"
              />
              <span className="text-base font-bold text-white">Jakub Kaczmarek</span>
            </div>
            <p className="text-gray-400 text-sm">
              Anfragen für Handwerksbetriebe in Donau-Ries.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Navigation</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={createPageUrl('Home') + '#mechanismus'} className="hover:text-cyan-400 transition-colors">So funktioniert's</a></li>
              <li><a href={createPageUrl('Home') + '#ergebnisse'} className="hover:text-cyan-400 transition-colors">Ergebnisse</a></li>
              <li><a href={createPageUrl('Home') + '#about'} className="hover:text-cyan-400 transition-colors">Über mich</a></li>
              <li><a href={createPageUrl('Blog')} className="hover:text-cyan-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Kontakt</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="tel:+4917643942729" className="hover:text-cyan-400 transition-colors">
                  +49 176 43942729
                </a>
              </li>
              <li>
                <a href="mailto:jakub.kaczmarek669@gmail.com" className="hover:text-cyan-400 transition-colors">
                  jakub.kaczmarek669@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Adresse */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Adresse</h3>
            <p className="text-sm text-gray-400">
              Sebastian-Frank-Str. 11<br />
              86609 Donauwörth<br />
              Deutschland
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-800 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Jakub Kaczmarek. Alle Rechte vorbehalten.
            </p>
            <a href={createPageUrl('Datenschutz')} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Datenschutz
            </a>
            <a href={createPageUrl('Impressum')} className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Impressum
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="Nach oben scrollen"
          >
            Nach oben ↑
          </button>
        </div>
      </div>
    </footer>
  );
}