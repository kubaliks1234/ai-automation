import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Video } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import CalendarBooking from '../components/landing/CalendarBooking';

export default function Analyse() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 pt-36 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                            <Calendar className="w-4 h-4" />
                            <span>Kostenlos & unverbindlich</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Kostenlose KI-Analyse buchen
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Ich analysiere kostenlos, welche Automationen in deinem Unternehmen am meisten Sinn machen.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { icon: Clock, label: '30 Minuten' },
                            { icon: Video, label: 'Google Meet' },
                            { icon: CheckCircle, label: 'Kostenlos' },
                        ].map(({ icon: Icon, label }, i) => (
                            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                                <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                                <p className="text-gray-300 text-sm font-medium">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Calendar */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8">
                        <CalendarBooking />
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}