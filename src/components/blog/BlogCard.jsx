import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const categoryColors = {
  Marketing: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Vertrieb: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Produktivität: 'bg-green-500/10 text-green-400 border-green-500/20',
  Content: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Analyse: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Automatisierung: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Allgemein: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function BlogCard({ post, index }) {
  const excerpt = post.answer_block || post.excerpt || '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.06, 0.4) }}
      className="group relative h-full"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <a
        href={`/blog/${post.slug}`}
        className="relative h-full flex flex-col bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all duration-300"
      >
        {/* Cover Image */}
        <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex-shrink-0">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.cover_image_alt || post.h1 || post.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-full h-full flex items-center justify-center text-gray-700">
                {post.h1?.[0] || post.title?.[0] || 'H'}
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${categoryColors[post.category] || categoryColors['Allgemein']}`}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h2 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {post.h1 || post.title}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>
                {post.published_at ? new Date(post.published_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
              </span>
              {post.reading_time > 0 && (
                <>
                  <span className="text-gray-700">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.reading_time} Min
                  </span>
                </>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-cyan-400 group-hover:gap-2 transition-all">
              Mehr lesen <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}