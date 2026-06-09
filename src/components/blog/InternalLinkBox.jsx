import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, BookOpen } from 'lucide-react';

/**
 * Zeigt 3-4 thematisch passende Artikel innerhalb des Artikelinhalts.
 * Matching-Priorität: 1. gleiche Kategorie, 2. Tag-Überschneidung, 3. neueste Artikel
 */
export default function InternalLinkBox({ currentPost, maxLinks = 4 }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!currentPost) return;
    loadLinks();
  }, [currentPost?.id]);

  const loadLinks = async () => {
    const allPosts = await base44.entities.BlogPost.filter(
      { status: 'published' },
      '-published_at',
      50
    );

    const others = allPosts.filter(p => p.id !== currentPost.id);

    // Score each post by relevance
    const scored = others.map(p => {
      let score = 0;
      if (p.category === currentPost.category) score += 10;
      if (currentPost.tags?.length && p.tags?.length) {
        const shared = p.tags.filter(t => currentPost.tags.includes(t)).length;
        score += shared * 3;
      }
      // Boost recent articles
      if (p.published_at) {
        const daysDiff = (Date.now() - new Date(p.published_at).getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff < 30) score += 2;
        else if (daysDiff < 90) score += 1;
      }
      return { post: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setLinks(scored.slice(0, maxLinks).map(s => s.post));
  };

  if (links.length === 0) return null;

  return (
    <div className="my-8 p-5 bg-gray-900/60 border border-cyan-500/20 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Weiterführende Artikel</span>
      </div>
      <ul className="space-y-2.5">
        {links.map(post => (
          <li key={post.id}>
            <a
              href={`/blog/${post.slug}`}
              className="flex items-start gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-sm group"
            >
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-snug">{post.h1 || post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}