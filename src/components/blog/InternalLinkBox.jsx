import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, BookOpen } from 'lucide-react';

/**
 * Zeigt 2-3 thematisch passende Artikel innerhalb des Artikelinhalts.
 * Wird nach dem 3. Absatz eingeblendet (als "Weiterführende Artikel").
 */
export default function InternalLinkBox({ currentPost, maxLinks = 3 }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!currentPost) return;
    loadLinks();
  }, [currentPost?.id]);

  const loadLinks = async () => {
    // Same category, different post
    const same = await base44.entities.BlogPost.filter(
      { status: 'published', category: currentPost.category },
      '-published_at',
      8
    );

    let candidates = same.filter(p => p.id !== currentPost.id);

    // If not enough, add tag matches
    if (candidates.length < maxLinks && currentPost.tags?.length > 0) {
      const all = await base44.entities.BlogPost.filter({ status: 'published' }, '-published_at', 30);
      const tagMatches = all.filter(p =>
        p.id !== currentPost.id &&
        !candidates.find(c => c.id === p.id) &&
        p.tags?.some(t => currentPost.tags.includes(t))
      );
      candidates = [...candidates, ...tagMatches];
    }

    setLinks(candidates.slice(0, maxLinks));
  };

  if (links.length === 0) return null;

  return (
    <div className="my-8 p-5 bg-gray-900/60 border border-cyan-500/20 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Weiterführende Artikel</span>
      </div>
      <ul className="space-y-2">
        {links.map(post => (
          <li key={post.id}>
            <a
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-sm group"
            >
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              <span className="line-clamp-1">{post.h1 || post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}