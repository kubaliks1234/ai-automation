import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEOMeta from '../components/SEOMeta';

export default function Impressum() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <SEOMeta
                title="Impressum | Jakub Kaczmarek – AI Automation"
                description="Impressum von Jakub Kaczmarek – KI Automatisierung. Angaben gemäß § 5 TMG."
                canonical="https://jakubkaczmarek.de/impressum"
                noIndex={true}
            />
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 pt-36 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Impressum</h1>
                    <p className="text-gray-500 text-sm mb-10">Angaben gemäß § 5 TMG</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Anbieter</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Jakub Kaczmarek<br />
                            Sebastian-Frank-Str. 11<br />
                            86609 Donauwörth<br />
                            Deutschland
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Kontakt</h2>
                        <p className="text-gray-400 leading-relaxed">
                            E-Mail: <a href="mailto:jk@jakubkaczmarek.de" className="text-cyan-400 hover:underline">jk@jakubkaczmarek.de</a><br /> className="text-cyan-400 hover:underline">jk@jakubkaczmarek.de</a><br /> className="text-cyan-400 hover:underline">jakub.kaczmarek669@gmail.com</a><br />
                            Telefon: 017643942729
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Umsatzsteuer-ID</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                            Steuer-ID beantragt
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Berufsrechtliche Angaben</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Tätigkeitsbereich: KI-Automatisierung und digitale Beratung
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Jakub Kaczmarek<br />
                            Sebastian-Frank-Str. 11<br />
                            86609 Donauwörth
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">EU-Streitschlichtung</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                            <a
                                href="https://ec.europa.eu/consumers/odr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:underline"
                            >
                                https://ec.europa.eu/consumers/odr/
                            </a>
                            <br />
                            Unsere E-Mail-Adresse finden Sie oben im Impressum.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Verbraucherstreitbeilegung</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Haftung für Inhalte</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Haftung für Links</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">Urheberrecht</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </section>


                </motion.div>
            </div>
            <Footer />
        </div>
    );
}