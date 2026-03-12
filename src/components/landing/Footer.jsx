import React from 'react';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-[#0a0a0f] border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png"
                alt="Jakub Kaczmarek Logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-base font-bold text-white">Jakub Kaczmarek</span>
            </div>
            <p className="text-gray-400 text-sm">
              KI Systeme für Unternehmen, die Zeit sparen und Umsatz bringen.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={createPageUrl('Service') + '?service=ai-marketing'} className="hover:text-cyan-400 transition-colors">AI Marketing</a></li>
              <li><a href={createPageUrl('Service') + '?service=lead-generation'} className="hover:text-cyan-400 transition-colors">Lead Generation</a></li>
              <li><a href={createPageUrl('Service') + '?service=sales-automation'} className="hover:text-cyan-400 transition-colors">Sales Automation</a></li>
              <li><a href={createPageUrl('Service') + '?service=workflow-automation'} className="hover:text-cyan-400 transition-colors">Workflow Automation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Ressourcen</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#automations" className="hover:text-cyan-400 transition-colors">Beispiele</a></li>
              <li><a href={createPageUrl('Blog')} className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href={createPageUrl('KiAgentur')} className="hover:text-cyan-400 transition-colors">KI Agentur</a></li>
            </ul>
          </div>

          {/* Best Of Tools */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Best Of</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={createPageUrl('BlogPost') + '?slug=beste-ki-marketing-tools'} className="hover:text-cyan-400 transition-colors">Beste Marketing Tools</a></li>
              <li><a href={createPageUrl('BlogPost') + '?slug=beste-ki-content-creator-tools'} className="hover:text-cyan-400 transition-colors">Beste Content Creator Tools</a></li>
              <li><a href={createPageUrl('BlogPost') + '?slug=beste-ki-produktivitaets-tools'} className="hover:text-cyan-400 transition-colors">Beste Produktivitäts-Tools</a></li>
              <li><a href={createPageUrl('Blog')} className="hover:text-cyan-400 transition-colors">Alle KI-Tools</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">KI Agentur Städte</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['berlin','hamburg','muenchen','koeln','frankfurt'].map(slug => (
                <li key={slug}>
                  <a href={createPageUrl('KiAgentur') + '?city=' + slug} className="hover:text-cyan-400 transition-colors capitalize">
                    KI Agentur {slug.charAt(0).toUpperCase() + slug.slice(1).replace('muenchen','München').replace('koeln','Köln')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 text-base">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:kontakt@example.com" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  kontakt@example.com
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors" aria-label="LinkedIn Profil besuchen">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-800 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} AI Automation. Alle Rechte vorbehalten.
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