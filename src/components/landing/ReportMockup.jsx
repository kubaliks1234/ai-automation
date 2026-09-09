import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Phone, Mail, Wallet } from 'lucide-react';

const rows = [
  { date: '12.09.', source: 'Meta Ads', name: 'Bauer, Nördlingen', status: 'Termin' },
  { date: '14.09.', source: 'Google Ads', name: 'Schmidt, Donauwörth', status: 'Termin' },
  { date: '16.09.', source: 'Meta Ads', name: 'Anonym, Oettingen', status: 'Nachfass' },
  { date: '18.09.', source: 'Direkt', name: 'Wagner, Rain', status: 'Termin' },
];

export default function ReportMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Monatsreport</p>
            <p className="text-white font-bold text-lg">September 2026</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            TL-Bau
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <Phone className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <p className="text-white font-bold text-xl">11</p>
            <p className="text-gray-500 text-xs">Anfragen</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <Wallet className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <p className="text-white font-bold text-xl">42€</p>
            <p className="text-gray-500 text-xs">/ Anfrage</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center">
            <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-white font-bold text-xl">4</p>
            <p className="text-gray-500 text-xs">Aufträge</p>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-1.5">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/40 transition-colors">
              <span className="text-gray-500 text-xs w-12">{r.date}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${r.source === 'Meta Ads' ? 'bg-blue-500/15 text-blue-300' : r.source === 'Google Ads' ? 'bg-amber-500/15 text-amber-300' : 'bg-gray-700 text-gray-300'}`}>
                {r.source}
              </span>
              <span className="text-gray-300 text-sm flex-1 truncate">{r.name}</span>
              <span className={`text-xs font-medium ${r.status === 'Termin' ? 'text-green-400' : 'text-yellow-400'}`}>{r.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-800 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 text-xs">Automatisch per E-Mail am 01.10.2026</span>
        </div>
      </div>
    </motion.div>
  );
}