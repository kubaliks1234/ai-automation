import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';

const messages = [
  { from: 'in', text: 'Hallo, ich bräuchte einen Trockenbauer für eine Sanierung in Nördlingen, ca. 120 m²,-start in 4 Wochen.', time: '20:14' },
  { from: 'out', text: 'Hallo Herr Bauer, danke für Ihre Anfrage! Trockenbau/Sanierung 120 m² in Nördlingen, Start in 4 Wochen passt. Ich habe zwei Terminvorschläge für die Vor-Ort-Besichtigung: Mi 11:00 oder Do 14:00. Welche passt Ihnen?', time: '20:14', double: true },
];

export default function WhatsAppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[300px]"
    >
      <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl" />
      <div className="relative bg-[#0b141a] rounded-[2rem] border border-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2c33] border-b border-black/20">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            JK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Jakub Kaczmarek</p>
            <p className="text-green-400 text-xs">online</p>
          </div>
          <span className="text-white/30 text-xs">20:14</span>
        </div>

        {/* Messages */}
        <div className="px-3 py-4 space-y-2 min-h-[260px] flex flex-col justify-end bg-[#0b141a]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'out' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-snug shadow ${
                  m.from === 'out'
                    ? 'bg-[#005c4b] text-white rounded-tr-sm'
                    : 'bg-[#1f2c33] text-gray-100 rounded-tl-sm'
                }`}
              >
                <p>{m.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${m.from === 'out' ? 'justify-end' : 'justify-end'}`}>
                  <span className="text-[10px] text-white/50">{m.time}</span>
                  {m.double && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-start pt-1">
            <div className="bg-[#1f2c33] rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#1f2c33] border-t border-black/20">
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
            <span className="text-gray-500 text-sm">Nachricht</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}