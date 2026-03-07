import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, CheckCircle, FileText, Calendar, ArrowRight, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import CalendarBooking from './CalendarBooking';

export default function LeadMagnet() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState('form'); // 'form' | 'success' | 'calendar'
    const [loading, setLoading] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        await base44.functions.invoke('sendGuideEmail', { email, name });
        setLoading(false);
        setStep('success');
        // trigger PDF download
        window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/7d20b6d5f_KI_Automationen_Guidepdf.pdf', '_blank');
    };

    return (
        <section className="relative py-20 bg-[#0a0a0f]" id="guide">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="grid lg:grid-cols-2 gap-12 items-start p-8 sm:p-12 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl"
                >
                    {/* Left - Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
                            <Download className="w-4 h-4" />
                            <span>Kostenloses PDF</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            10 AI Automationen für Unternehmen
                        </h3>

                        <p className="text-gray-400 mb-6">
                            Entdecke die effektivsten KI-Automationen, die Unternehmen sofort einsetzen können,
                            um Zeit zu sparen und mehr Kunden zu gewinnen.
                        </p>

                        <ul className="space-y-3 mb-8">
                            {[
                                'Praxiserprobte Automationen',
                                'Sofort umsetzbar',
                                'Für jede Unternehmensgröße',
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: '10', label: 'Automationen' },
                                { value: '12+', label: 'Std/Woche gespart' },
                                { value: '5x', label: 'ROI möglich' },
                                { value: '0€', label: 'Einstiegskosten' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-gray-800/40 rounded-xl p-3 text-center border border-gray-700/30">
                                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                                    <div className="text-xs text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Form / Success / Calendar */}
                    <div>
                        <AnimatePresence mode="wait">
                            {step === 'form' && (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                                            <FileText className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">PDF Guide</p>
                                            <p className="text-sm text-gray-500">9 Seiten • Kostenlos</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <Input
                                                type="text"
                                                placeholder="Dein Name (optional)"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="pl-12 py-5 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <Input
                                                type="email"
                                                placeholder="Deine E-Mail Adresse"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-12 py-5 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white py-5 rounded-xl"
                                        >
                                            {loading ? (
                                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Wird gesendet...</>
                                            ) : (
                                                <><Download className="w-5 h-5 mr-2" /> Jetzt kostenlos herunterladen</>
                                            )}
                                        </Button>
                                        <p className="text-xs text-gray-500 text-center">
                                            Kein Spam. Du kannst dich jederzeit abmelden.
                                        </p>
                                    </form>
                                </motion.div>
                            )}

                            {step === 'success' && !showCalendar && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 text-center"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h4 className="text-white text-xl font-bold mb-2">Guide ist unterwegs! 🚀</h4>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Check dein Postfach – der Guide wurde an <strong className="text-white">{email}</strong> gesendet.
                                    </p>

                                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-left">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Calendar className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-white font-semibold">Kostenlose KI-Analyse buchen</p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    Ich analysiere kostenlos, welche Automationen in deinem Unternehmen am meisten Sinn machen.
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="space-y-1 mb-4">
                                            {['30 Minuten', 'Kostenlos & unverbindlich', 'Per Google Meet'].map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            onClick={() => setShowCalendar(true)}
                                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl"
                                        >
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Termin auswählen
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && showCalendar && (
                                <motion.div
                                    key="calendar"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <Calendar className="w-6 h-6 text-cyan-400" />
                                        <div>
                                            <h4 className="text-white font-semibold">Kostenlose KI-Analyse</h4>
                                            <p className="text-gray-500 text-sm">30 Min • Google Meet</p>
                                        </div>
                                    </div>
                                    <CalendarBooking
                                        guestEmail={email}
                                        guestName={name}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}