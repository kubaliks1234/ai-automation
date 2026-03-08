import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = ['Alle', 'Marketing', 'Vertrieb', 'Produktivität', 'Content', 'Analyse', 'Automatisierung'];
const pricingOptions = ['Alle', 'Kostenlos', 'Freemium', 'Kostenpflichtig'];

export default function BlogFilters({ search, setSearch, activeCategory, setActiveCategory, activePricing, setActivePricing }) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="KI-Tool oder Anwendungsfall suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-12 py-5 bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-500 rounded-2xl focus:border-cyan-500 focus:ring-cyan-500/20 text-base"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x justify-start sm:justify-center sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 snap-start px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-gray-900/60 border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pricing Filter */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide justify-start sm:justify-center sm:flex-wrap">
        {pricingOptions.map((price) => (
          <button
            key={price}
            onClick={() => setActivePricing(price)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${
              activePricing === price
                ? 'bg-gray-700 text-white border border-gray-600'
                : 'bg-gray-900/40 border border-gray-800 text-gray-500 hover:text-gray-300'
            }`}
          >
            {price}
          </button>
        ))}
      </div>
    </div>
  );
}