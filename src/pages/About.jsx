import SEOMeta from '@/components/SEOMeta';

export default function About() {
  return (
    <>
      <SEOMeta
        title="Über uns – KI-Automatisierung mit Jakub Kaczmarek"
        description="Erfahre mehr über Jakub Kaczmarek und seine Mission, Unternehmen mit KI-Automatisierung effizienter zu machen."
        canonical="https://jakubkaczmarek.de/about"
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Über uns</h1>
        <p className="text-lg text-gray-700 mb-4">
          Diese Plattform ist dein zentraler Anlaufpunkt rund um KI-Tools, Automatisierung und digitale Produktivität. 
          Hier findest du praxisnahe Artikel, ehrliche Bewertungen und konkrete Anleitungen, mit denen du KI gewinnbringend 
          in deinen Alltag oder dein Unternehmen integrieren kannst.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Das Projekt richtet sich an Selbstständige, Unternehmer, Marketing-Teams und alle, die verstehen wollen, 
          wie künstliche Intelligenz heute schon praktisch eingesetzt werden kann – ohne Programmierkenntnisse, 
          ohne großes Budget, aber mit echtem Mehrwert.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Hinter dieser Plattform steht <strong>Jakub Kaczmarek</strong>, KI-Stratege und Automatisierungsexperte 
          aus Deutschland. Jakub begleitet Unternehmen dabei, Workflows zu automatisieren, Content-Prozesse zu skalieren 
          und KI-Tools sinnvoll einzusetzen. Mit jahrelanger Erfahrung in digitalem Marketing und Prozessoptimierung 
          verbindet er technisches Know-how mit unternehmerischem Denken.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Auf dem Blog werden regelmäßig neue KI-Tools vorgestellt, Vergleiche erstellt und Schritt-für-Schritt-Anleitungen 
          veröffentlicht. Ziel ist es, die besten und nützlichsten Werkzeuge verständlich zu erklären – damit du schneller 
          entscheiden kannst, was wirklich zu dir passt.
        </p>
        <p className="text-lg text-gray-700">
          Wenn du Fragen hast, eine Zusammenarbeit anfragen möchtest oder einfach in Kontakt treten willst, 
          schau auf der <a href="/contact" className="text-blue-600 underline">Kontaktseite</a> vorbei.
        </p>
      </div>
    </>
  );
}