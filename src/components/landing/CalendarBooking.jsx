import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, Loader2, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { format, isSameDay, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

export default function CalendarBooking({ guestEmail = '', guestName = '', onBooked }) {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [step, setStep] = useState('pick'); // 'pick' | 'confirm' | 'done'
    const [booking, setBooking] = useState(false);
    const [email, setEmail] = useState(guestEmail);
    const [name, setName] = useState(guestName);
    const [bookedEvent, setBookedEvent] = useState(null);

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {
        setLoading(true);
        const res = await base44.functions.invoke('getCalendarSlots', {});
        setSlots(res.data.slots || []);
        setLoading(false);
    };

    // Group slots by day
    const days = slots.reduce((acc, slot) => {
        const day = format(parseISO(slot.start), 'yyyy-MM-dd');
        if (!acc[day]) acc[day] = [];
        acc[day].push(slot);
        return acc;
    }, {});

    const dayKeys = Object.keys(days);

    const handleBook = async () => {
        if (!selectedSlot || !email) return;
        setBooking(true);
        const res = await base44.functions.invoke('bookCalendarSlot', {
            start: selectedSlot.start,
            end: selectedSlot.end,
            guestEmail: email,
            guestName: name,
        });
        setBooking(false);
        if (res.data.success) {
            setBookedEvent(res.data);
            setStep('done');
            if (onBooked) onBooked();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mr-3" />
                <span className="text-gray-400">Freie Termine werden geladen...</span>
            </div>
        );
    }

    if (step === 'done') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
            >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Termin bestätigt! 🎉</h3>
                <p className="text-gray-400 mb-4">
                    Du erhältst in Kürze eine Kalender-Einladung an <strong className="text-white">{email}</strong>.
                </p>
                <p className="text-sm text-gray-500">
                    {format(parseISO(selectedSlot.start), "EEEE, dd. MMMM 'um' HH:mm 'Uhr'", { locale: de })}
                </p>
                {bookedEvent?.meetLink && (
                    <a
                        href={bookedEvent.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm hover:bg-blue-500/30 transition-colors"
                    >
                        <Video className="w-4 h-4" /> Google Meet öffnen
                    </a>
                )}
            </motion.div>
        );
    }

    return (
        <div>
            <AnimatePresence mode="wait">
                {step === 'pick' && (
                    <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Day selector */}
                        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                            {dayKeys.map(day => (
                                <button
                                    key={day}
                                    onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                                    className={`flex-shrink-0 px-4 py-3 rounded-xl border text-center min-w-[80px] transition-all ${
                                        selectedDay === day
                                            ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                                            : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600'
                                    }`}
                                >
                                    <div className="text-xs font-medium">{format(parseISO(day), 'EEE', { locale: de })}</div>
                                    <div className="text-lg font-bold">{format(parseISO(day), 'd')}</div>
                                    <div className="text-xs">{format(parseISO(day), 'MMM', { locale: de })}</div>
                                </button>
                            ))}
                        </div>

                        {/* Time slots */}
                        {selectedDay && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-3 gap-2 mb-4"
                            >
                                {days[selectedDay].map((slot, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                                            selectedSlot === slot
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                                : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-cyan-500/50'
                                        }`}
                                    >
                                        {format(parseISO(slot.start), 'HH:mm')}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {!selectedDay && (
                            <p className="text-gray-500 text-sm text-center py-4">👆 Wähle einen Tag aus</p>
                        )}

                        <Button
                            onClick={() => setStep('confirm')}
                            disabled={!selectedSlot}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl disabled:opacity-40"
                        >
                            Weiter
                        </Button>
                    </motion.div>
                )}

                {step === 'confirm' && (
                    <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button
                            onClick={() => setStep('pick')}
                            className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" /> Zurück
                        </button>

                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-medium">
                                        {format(parseISO(selectedSlot.start), "EEEE, dd. MMMM", { locale: de })}
                                    </p>
                                    <p className="text-cyan-400 text-sm">
                                        {format(parseISO(selectedSlot.start), 'HH:mm')} – {format(parseISO(selectedSlot.end), 'HH:mm')} Uhr • 30 Min
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <Input
                                placeholder="Dein Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
                            />
                            <Input
                                type="email"
                                placeholder="Deine E-Mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
                                required
                            />
                        </div>

                        <Button
                            onClick={handleBook}
                            disabled={booking || !email}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl disabled:opacity-40"
                        >
                            {booking ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Wird gebucht...</>
                            ) : (
                                'Termin jetzt bestätigen'
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}