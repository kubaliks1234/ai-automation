import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Tag, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';

const categoryColors = {
  Marketing: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Vertrieb: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Produktivität: 'bg-green-500/10 text-green-400 border-green-500/20',
  Content: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Analyse: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Automatisierung: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Allgemein: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const pricingColors = {
  Kostenlos: 'bg-green-500/10 text-green-400 border-green-500/20',
  Freemium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Kostenpflichtig: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.06, 0.4) }}
      className="group relative h-full"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className="relative h-full flex flex-col bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all duration-300 cursor-pointer"
        onClick={() => { window.location.href = createPageUrl('BlogPost') + '?slug=' + post.slug; }}
      >
        {/* Cover Image */}
        <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex-shrink-0">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold bg-gradient-to-br from-cyan-500/20 to-blue-500/20 w-full h-full flex items-center justify-center text-gray-700">
                {post.ai_tool_name?.[0] || post.title?.[0] || 'AI'}
              </div>
            </div>
          )}

          {/* Overlay badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${categoryColors[post.category] || categoryColors['Allgemein']}`}>
              {post.category}
            </span>
            {post.pricing && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${pricingColors[post.pricing]}`}>
                {post.pricing}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Tool name + rating */}
          {post.ai_tool_name && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-cyan-400">{post.ai_tool_name}</span>
              {post.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.round(post.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <h2 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded-md">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-500 rounded-md">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-600">
              {post.published_at ? new Date(post.published_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
            </span>
            <span className="flex items-center gap-1 text-xs text-cyan-400 group-hover:gap-2 transition-all">
              Mehr lesen <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}