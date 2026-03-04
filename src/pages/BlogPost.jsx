import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ExternalLink, Tag, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import ReactMarkdown from 'react-markdown';

const categoryColors = {
  Marketing: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Vertrieb: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Produktivität: 'bg-green-500/10 text-green-400 border-green-500/20',
  Content: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Analyse: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Automatisierung: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Allgemein: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (slug) loadPost(slug);
  }, []);

  const loadPost = async (slug) => {
    setLoading(true);
    const results = await base44.entities.BlogPost.filter({ slug, status: 'published' });
    if (results.length > 0) {
      const p = results[0];
      setPost(p);
      // SEO
      document.title = p.meta_title || p.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
      metaDesc.setAttribute('content', p.meta_description || p.excerpt || '');
      // OG tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property', 'og:title'); document.head.appendChild(ogTitle); }
      ogTitle.setAttribute('content', p.meta_title || p.title);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property', 'og:description'); document.head.appendChild(ogDesc); }
      ogDesc.setAttribute('content', p.meta_description || p.excerpt || '');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Navbar />
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Artikel nicht gefunden</h1>
          <Button onClick={() => window.location.href = createPageUrl('Blog')} className="bg-cyan-500 hover:bg-cyan-400 text-white">
            Zurück zum Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.href = createPageUrl('Blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zum Blog
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[post.category] || categoryColors['Allgemein']}`}>
              {post.category}
            </span>
            {post.pricing && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                {post.pricing}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.published_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Cover image */}
          {post.cover_image && (
            <div className="relative rounded-3xl overflow-hidden mb-10 aspect-video">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 to-transparent" />
            </div>
          )}

          {/* Tool Info Card */}
          {post.ai_tool_name && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-gray-900/60 border border-gray-800 rounded-2xl mb-10">
              <div className="flex items-center gap-4">
                {post.ai_tool_logo ? (
                  <img src={post.ai_tool_logo} alt={post.ai_tool_name} className="w-14 h-14 rounded-xl object-contain bg-white/5 p-2" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400">
                    {post.ai_tool_name[0]}
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 mb-1">AI Tool</p>
                  <p className="text-xl font-bold text-white">{post.ai_tool_name}</p>
                  {post.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(post.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{post.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>
              {post.ai_tool_url && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl flex-shrink-0"
                >
                  <a href={post.ai_tool_url} target="_blank" rel="noopener noreferrer">
                    Tool besuchen
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-400 prose-ol:text-gray-400
            prose-li:text-gray-400 prose-li:my-1
            prose-code:text-cyan-400 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-2xl
            prose-blockquote:border-cyan-500 prose-blockquote:text-gray-400
            prose-hr:border-gray-800"
        >
          <ReactMarkdown>{post.content || '_Noch kein Inhalt vorhanden._'}</ReactMarkdown>
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Anwendungsmöglichkeiten
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-gray-800/80 text-gray-300 rounded-xl text-sm border border-gray-700/50 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 sm:p-12 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Bereit für KI Automationen?</h3>
          <p className="text-gray-400 mb-6">Lass uns herausfinden, wie du dieses Tool in deinem Unternehmen einsetzen kannst.</p>
          <Button
            onClick={() => window.location.href = createPageUrl('Home') + '#cta'}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Kostenlose KI Analyse
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}