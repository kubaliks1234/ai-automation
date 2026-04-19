import React, { useState, useMemo, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import SEOMeta from '@/components/SEOMeta';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BlogHero from '@/components/blog/BlogHero';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogCard from '@/components/blog/BlogCard';
import { Loader2, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [activePricing, setActivePricing] = useState('Alle');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BlogPost.filter({ status: 'published' }, '-published_at');
    setPosts(data);
    setLoading(false);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'Alle' || post.category === activeCategory;
      const matchesPricing = activePricing === 'Alle' || post.pricing === activePricing;
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        post.title?.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.ai_tool_name?.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.category?.toLowerCase().includes(searchLower);

      return matchesCategory && matchesPricing && matchesSearch;
    });
  }, [posts, search, activeCategory, activePricing]);

  const blogListSchema = posts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KI Tools Blog",
    "description": "Die besten KI Tools für Unternehmen – getestet und bewertet",
    "url": "https://jakubkaczmarek.de/Blog",
    "itemListElement": posts.slice(0, 20).map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": post.title,
      "description": post.excerpt,
      "url": `https://jakubkaczmarek.de/blog/${post.slug}`
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEOMeta
        title="KI Tools Blog 2026 | Beste AI Tools für Unternehmen getestet | Jakub Kaczmarek"
        description="Entdecke die besten KI Tools 2026 für Marketing, Vertrieb und Automatisierung. Ehrlich getestet und bewertet für Unternehmen. Über 50 AI Tools im Vergleich – kostenlos & kostenpflichtig."
        keywords="KI Tools, AI Tools, Künstliche Intelligenz, AI Blog, KI Software Vergleich, Automatisierung Tools, beste KI Tools 2026, KI Agentur Deutschland, KI Tool Vergleich, kostenlose KI Tools, AI Software, ChatGPT Alternative, Automatisierung Software"
        canonical="https://jakubkaczmarek.de/Blog"
        structuredData={blogListSchema}
      />
      <Navbar />
      
      <main>
        <BlogHero postCount={posts.filter(p => p.status === 'published').length} />

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <BlogFilters
            search={search}
            setSearch={setSearch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activePricing={activePricing}
            setActivePricing={setActivePricing}
          />
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-gray-500">Artikel werden geladen...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 gap-4 text-center"
            >
              <SearchX className="w-12 h-12 text-gray-700" />
              <p className="text-xl font-medium text-gray-400">Keine Artikel gefunden</p>
              <p className="text-gray-600">Versuche einen anderen Suchbegriff oder Filter</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}