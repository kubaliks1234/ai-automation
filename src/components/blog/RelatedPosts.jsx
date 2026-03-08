import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function RelatedPosts({ currentPost }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!currentPost) return;
    loadRelated();
  }, [currentPost?.id]);

  const loadRelated = async () => {
    // Fetch posts from same category, exclude current
    const posts = await base44.entities.BlogPost.filter(
      { status: 'published', category: currentPost.category },
      '-published_at',
      10
    );
    const filtered = posts
      .filter(p => p.id !== currentPost.id)
      .slice(0, 3);

    // If not enough, fill with posts sharing tags
    if (filtered.length < 3 && currentPost.tags?.length > 0) {
      const allPosts = await base44.entities.BlogPost.filter(
        { status: 'published' },
        '-published_at',
        20
      );
      const tagMatches = allPosts
        .filter(p => p.id !== currentPost.id && !filtered.find(f => f.id === p.id))
        .filter(p => p.tags?.some(t => currentPost.tags.includes(t)))
        .slice(0, 3 - filtered.length);
      filtered.push(...tagMatches);
    }

    setRelated(filtered);
  };

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6">Das könnte dich auch interessieren</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map(post => (
          <a
            key={post.id}
            href={createPageUrl('BlogPost') + '?slug=' + post.slug}
            className="group block bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1"
          >
            {post.cover_image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <span className="text-xs text-cyan-400 font-medium">{post.category}</span>
              <h4 className="text-sm font-semibold text-white mt-1 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-cyan-500 font-medium">
                Artikel lesen <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}