import SEOMeta from '@/components/SEOMeta';
import { Mail, Linkedin, Calendar } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <SEOMeta
        title="Kontakt – Jakub Kaczmarek"
        description="Nimm Kontakt auf mit Jakub Kaczmarek – per E-Mail, LinkedIn oder über einen Beratungstermin."
        canonical="https://jakubkaczmarek.de/contact"
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
        <p className="text-gray-600 mb-10">
          Du hast eine Frage, möchtest eine Zusammenarbeit besprechen oder einfach Hallo sagen? 
          Ich freue mich über deine Nachricht.
        </p>

        <div className="space-y-6">
          <a
            href="mailto:hello@jakubkaczmarek.de"
            className="flex items-center gap-4 p-5 border rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">E-Mail</div>
              <div className="text-blue-600">hello@jakubkaczmarek.de</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/jakubkaczmarek"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 border rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">LinkedIn</div>
              <div className="text-blue-600">linkedin.com/in/jakubkaczmarek</div>
            </div>
          </a>

          <a
            href="/Analyse"
            className="flex items-center gap-4 p-5 border rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Kostenloses Erstgespräch</div>
              <div className="text-gray-500 text-sm">Buche direkt einen Termin für eine kostenlose KI-Analyse</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}