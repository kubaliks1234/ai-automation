import React from 'react';
import { Bot, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-[#0a0a0f] border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Automation</span>
            </div>
            <p className="text-gray-500 text-sm">
              KI Systeme für Unternehmen, die Zeit sparen und Umsatz bringen.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">AI Marketing</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Lead Generation</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Sales Automation</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Workflow Automation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Ressourcen</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#automations" className="hover:text-cyan-400 transition-colors">Beispiele</a></li>
              <li><a href={createPageUrl('Blog')} className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href={createPageUrl('KiAgentur')} className="hover:text-cyan-400 transition-colors">KI Agentur</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-medium mb-4">KI Agentur Städte</h4>
            <ul className="space-y-3 text-sm text-gray-500">
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
            <h4 className="text-white font-medium mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:kontakt@example.com" className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  kontakt@example.com
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors">
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
            <a href={createPageUrl('Datenschutz')} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
              Datenschutz
            </a>
            <a href={createPageUrl('Impressum')} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
              Impressum
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
          >
            Nach oben ↑
          </button>
        </div>
      </div>
    </footer>
  );
}