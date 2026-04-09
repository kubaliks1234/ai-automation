import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEOMeta from '../components/SEOMeta';

export default function Datenschutz() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <SEOMeta
                title="Datenschutzerklärung | Jakub Kaczmarek"
                description="Datenschutzerklärung von Jakub Kaczmarek – KI Automatisierung. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
                canonical="https://jakubkaczmarek.de/datenschutz"
                noIndex={true}
            />
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 pt-36 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-invert prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400 max-w-none"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Datenschutzerklärung</h1>
                    <p className="text-gray-500 text-sm mb-10">Stand: März 2026</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">1. Verantwortlicher</h2>
                        <p className="text-gray-400">
                            Jakub Kaczmarek<br />
                            Sebastian-Frank-Str. 11<br />
                            86609 Donauwörth<br />
                            Deutschland
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
                        <p className="text-gray-400">
                            Personenbezogene Daten werden nur erhoben, wenn Sie uns diese freiwillig mitteilen – zum Beispiel beim Anfordern des kostenlosen Guides oder beim Buchen eines Beratungstermins. Die erhobenen Daten (Name, E-Mail-Adresse) werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">3. Newsletter und E-Mail-Kommunikation</h2>
                        <p className="text-gray-400">
                            Wenn Sie den kostenlosen Guide anfordern, werden Ihre Daten (Name und E-Mail-Adresse) in unserer Subscriber-Liste gespeichert. Sie können sich jederzeit aus dieser Liste austragen, indem Sie uns eine E-Mail senden. Ihre Daten werden nicht an Dritte weitergegeben.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">4. Google-Dienste</h2>
                        <p className="text-gray-400">
                            Zur Terminbuchung (KI-Analyse) nutzen wir Google Calendar und Google Meet. Dabei werden Ihre Termindaten (Name, E-Mail, gewählter Zeitslot) an Google weitergegeben. Es gelten die Datenschutzbestimmungen von Google (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">policies.google.com/privacy</a>).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">5. Cookies und Tracking</h2>
                        <p className="text-gray-400">
                            Diese Website verwendet keine aktiven Tracking-Tools oder Werbe-Cookies. Es werden ausschließlich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">6. Speicherdauer</h2>
                        <p className="text-gray-400">
                            Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">7. Ihre Rechte</h2>
                        <p className="text-gray-400 mb-3">
                            Sie haben das Recht auf:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-1">
                            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        </ul>
                        <p className="text-gray-400 mt-3">
                            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:jk@jakubkaczmarek.de" className="text-cyan-400 hover:underline">jk@jakubkaczmarek.de</a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">8. Beschwerderecht</h2>
                        <p className="text-gray-400">
                            Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Die zuständige Behörde für Bayern ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-3">9. Kontakt</h2>
                        <p className="text-gray-400">
                            Bei Fragen zum Datenschutz wenden Sie sich an:<br />
                            Jakub Kaczmarek<br />
                            Sebastian-Frank-Str. 11<br />
                            86609 Donauwörth<br />
                            E-Mail: <a href="mailto:jk@jakubkaczmarek.de" className="text-cyan-400 hover:underline">jk@jakubkaczmarek.de</a>
                        </p>
                    </section>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}