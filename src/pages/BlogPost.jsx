import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SEOMeta from '@/components/SEOMeta';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ExternalLink, Tag, Calendar, CheckCircle } from 'lucide-react';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ProductBox from '@/components/blog/ProductBox';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const blogHtmlStyles = `
  .blog-html-content .lead {
    font-size: 1.15rem;
    line-height: 1.9;
    color: #cbd5e1;
    margin-bottom: 2rem;
  }
  .blog-html-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(6,182,212,0.3);
  }
  .blog-html-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #67e8f9;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }
  .blog-html-content p {
    color: #cbd5e1;
    line-height: 1.85;
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
  }
  .blog-html-content strong {
    color: #fff;
    font-weight: 700;
  }
  .blog-html-content a {
    color: #22d3ee;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .blog-html-content ul, .blog-html-content ol {
    margin: 1rem 0 1.5rem 1.25rem;
    color: #cbd5e1;
  }
  .blog-html-content li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }
  .blog-html-content hr {
    border: none;
    border-top: 1px solid #1e293b;
    margin: 2.5rem 0;
  }
  /* Tool Card */
  .blog-html-content .tool-card {
    background: rgba(15,23,42,0.8);
    border: 1px solid #1e293b;
    border-radius: 1rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .blog-html-content .tool-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .blog-html-content .tool-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
  }
  .blog-html-content .tool-badge {
    background: rgba(6,182,212,0.15);
    color: #22d3ee;
    border: 1px solid rgba(6,182,212,0.3);
    border-radius: 9999px;
    padding: 0.2rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .blog-html-content .pro-con-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
  @media (max-width: 640px) {
    .blog-html-content .pro-con-grid { grid-template-columns: 1fr; }
  }
  .blog-html-content .pro-box, .blog-html-content .con-box {
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .blog-html-content .pro-box { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); }
  .blog-html-content .con-box { background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.2); }
  .blog-html-content .box-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }
  .blog-html-content .pro-box .box-label { color: #34d399; }
  .blog-html-content .con-box .box-label { color: #f87171; }
  .blog-html-content .box-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .blog-html-content .box-list li {
    color: #94a3b8;
    font-size: 0.9rem;
    margin-bottom: 0.35rem;
    padding-left: 1.1rem;
    position: relative;
  }
  .blog-html-content .pro-box .box-list li::before { content: "✓"; position: absolute; left: 0; color: #34d399; }
  .blog-html-content .con-box .box-list li::before { content: "✗"; position: absolute; left: 0; color: #f87171; }
  /* Callout */
  .blog-html-content .callout {
    background: rgba(6,182,212,0.07);
    border-left: 3px solid #22d3ee;
    border-radius: 0 0.75rem 0.75rem 0;
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
  }
  .blog-html-content .callout-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #22d3ee;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .blog-html-content .callout p { color: #94a3b8; margin: 0; font-size: 0.95rem; }
  /* Table */
  .blog-html-content .table-wrap {
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    border: 1px solid #1e293b;
  }
  .blog-html-content table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .blog-html-content thead { background: #0f172a; }
  .blog-html-content th {
    color: #fff;
    font-weight: 700;
    padding: 0.85rem 1rem;
    text-align: left;
    border-bottom: 1px solid #1e293b;
  }
  .blog-html-content td {
    color: #94a3b8;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #0f172a;
  }
  .blog-html-content tr:hover td { background: rgba(255,255,255,0.02); }
  .blog-html-content .badge-good { background: rgba(16,185,129,0.15); color: #34d399; border-radius: 0.35rem; padding: 0.15rem 0.5rem; font-size: 0.8rem; font-weight: 600; }
  .blog-html-content .badge-mid { background: rgba(234,179,8,0.15); color: #fbbf24; border-radius: 0.35rem; padding: 0.15rem 0.5rem; font-size: 0.8rem; font-weight: 600; }
  .blog-html-content .badge-bad { background: rgba(239,68,68,0.12); color: #f87171; border-radius: 0.35rem; padding: 0.15rem 0.5rem; font-size: 0.8rem; font-weight: 600; }
  /* Read Also */
  .blog-html-content .read-also {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(15,23,42,0.6);
    border: 1px solid #1e293b;
    border-radius: 0.75rem;
    padding: 0.85rem 1.25rem;
    margin: 1.25rem 0;
  }
  .blog-html-content .read-also-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #22d3ee;
    white-space: nowrap;
  }
  .blog-html-content .read-also a { color: #94a3b8; text-decoration: none; font-size: 0.95rem; }
  .blog-html-content .read-also a:hover { color: #22d3ee; }
  /* FAQ */
  .blog-html-content .faq-list { margin: 1rem 0 1.5rem 0; }
  .blog-html-content .faq-item {
    border: 1px solid #1e293b;
    border-radius: 0.75rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }
  .blog-html-content .faq-question {
    width: 100%;
    background: rgba(15,23,42,0.6);
    border: none;
    color: #e2e8f0;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 1.25rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .blog-html-content .faq-question:hover { background: rgba(15,23,42,0.9); }
  .blog-html-content .faq-icon { font-size: 1.25rem; color: #22d3ee; flex-shrink: 0; transition: transform 0.2s; }
  .blog-html-content .faq-answer {
    display: none;
    padding: 1rem 1.25rem;
    background: rgba(2,8,23,0.5);
    border-top: 1px solid #1e293b;
  }
  .blog-html-content .faq-answer.open { display: block; }
  .blog-html-content .faq-answer p { color: #94a3b8; margin: 0; }
  /* Fazit Box */
  .blog-html-content .fazit-box {
    background: linear-gradient(135deg, rgba(6,182,212,0.08), rgba(59,130,246,0.08));
    border: 1px solid rgba(6,182,212,0.2);
    border-radius: 1.25rem;
    padding: 2rem;
    margin-top: 2.5rem;
    text-align: center;
  }
  .blog-html-content .fazit-box h2 {
    border: none;
    margin-top: 0;
    font-size: 1.5rem;
  }
  .blog-html-content .fazit-box p { color: #94a3b8; margin-bottom: 1.5rem; }
  .blog-html-content .btn {
    display: inline-block;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    color: #fff;
    font-weight: 700;
    padding: 0.75rem 1.75rem;
    border-radius: 0.75rem;
    text-decoration: none;
    margin: 0.25rem;
    font-size: 0.95rem;
  }
  .blog-html-content .btn-ghost {
    display: inline-block;
    border: 1px solid #334155;
    color: #94a3b8;
    font-weight: 600;
    padding: 0.75rem 1.75rem;
    border-radius: 0.75rem;
    text-decoration: none;
    margin: 0.25rem;
    font-size: 0.95rem;
  }
  .blog-html-content .btn-ghost:hover { color: #fff; border-color: #22d3ee; }
`;

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');
  answer.classList.toggle('open', !isOpen);
  if (icon) icon.textContent = isOpen ? '+' : '−';
}

if (typeof window !== 'undefined') {
  window.toggleFaq = toggleFaq;
}

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

  const routeParams = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const paymentStatus = queryParams.get('payment');
  const slug = routeParams.slug || queryParams.get('slug');

  useEffect(() => {
    if (slug) loadPost(slug);
    else setLoading(false);
  }, [slug]);

  const loadPost = async (slug) => {
    setLoading(true);
    const results = await base44.entities.BlogPost.filter({ slug, status: 'published' });
    if (results.length > 0) setPost(results[0]);
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
    // Payment Success Page
    if (paymentStatus === 'success') {
      return (
        <div className="min-h-screen bg-[#0a0a0f]">
          <Navbar />
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Zahlung erfolgreich! 🎉</h1>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                Vielen Dank für deinen Kauf! Du erhältst in Kürze eine E-Mail mit deinen Download-Links.
              </p>
              <p className="text-gray-500 text-sm mb-10">
                Bitte prüfe auch deinen Spam-Ordner, falls du keine E-Mail erhältst.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = createPageUrl('Blog')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 rounded-xl"
                >
                  Zum Blog
                </Button>
                <Button
                  onClick={() => window.location.href = createPageUrl('Home')}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white px-8 py-3 rounded-xl"
                >
                  Zur Startseite
                </Button>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      );
    }

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

  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.meta_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.cover_image || '',
    "author": {
      "@type": "Person",
      "name": "Jakub Kaczmarek",
      "url": "https://jakubkaczmarek.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jakub Kaczmarek – AI Automation",
      "url": "https://jakubkaczmarek.de"
    },
    "datePublished": post.published_at || post.created_date,
    "dateModified": post.updated_date || post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jakubkaczmarek.de/blog/${post.slug}`
    }
  } : null;

  const breadcrumbSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://jakubkaczmarek.de" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jakubkaczmarek.de/Blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://jakubkaczmarek.de/blog/${post.slug}` }
    ]
  } : null;

  const reviewSchema = (post && post.rating && post.ai_tool_name) ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": post.ai_tool_name,
      "applicationCategory": "BusinessApplication",
      "url": post.ai_tool_url || ''
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": post.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": { "@type": "Person", "name": "Jakub Kaczmarek" },
    "publisher": { "@type": "Organization", "name": "jakubkaczmarek.de" }
  } : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {post && (
        <SEOMeta
          title={post.meta_title || post.title}
          description={post.meta_description || post.excerpt}
          keywords={post.tags?.join(', ')}
          canonical={`https://jakubkaczmarek.de/blog/${post.slug}`}
          ogImage={post.cover_image}
          structuredData={articleSchema}
        />
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-600 mb-6">
          <a href="/" className="hover:text-cyan-400 transition-colors">Startseite</a>
          <span>/</span>
          <a href="/Blog" className="hover:text-cyan-400 transition-colors">Blog</a>
          <span>/</span>
          <span className="text-gray-500 truncate max-w-[200px]">{post?.title}</span>
        </nav>

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
            {post.h1 || post.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Cover image */}
          {post.cover_image && (
            <div className="relative rounded-3xl overflow-hidden mb-10 aspect-video">
              <img src={post.cover_image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
              {(post.affiliate_url || post.ai_tool_url) && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl flex-shrink-0"
                >
                  <a href={post.affiliate_url || post.ai_tool_url} target="_blank" rel="noopener noreferrer sponsored">
                    {post.affiliate_url ? '🔗 Jetzt ausprobieren*' : 'Tool besuchen'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              {post.affiliate_url && (
                <p className="text-xs text-gray-600 mt-1">*Affiliate-Link</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-none"
        >
          <style dangerouslySetInnerHTML={{ __html: blogHtmlStyles }} />
          {post.body_html ? (
            <div
              className="blog-html-content"
              dangerouslySetInnerHTML={{ __html: post.body_html }}
            />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-14 mb-5 leading-tight">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-5 pb-3 border-b-2 border-cyan-500/30">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold text-cyan-300 mt-8 mb-3">{children}</h3>,
                p: ({children}) => <p className="text-gray-300 text-base sm:text-lg leading-[1.85] mb-5">{children}</p>,
                strong: ({children}) => <strong className="text-white font-bold">{children}</strong>,
                a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-medium underline underline-offset-2 hover:text-cyan-300 transition-colors">{children}</a>,
                ul: ({children}) => <ul className="mb-6 mt-3 space-y-2 ml-5 list-none">{children}</ul>,
                ol: ({children}) => <ol className="mb-6 mt-3 space-y-3 ml-5 list-decimal">{children}</ol>,
                li: ({children}) => <li className="text-gray-300 text-base sm:text-lg leading-relaxed flex items-start gap-3"><span className="text-cyan-400 font-bold flex-shrink-0 mt-1">•</span><span>{children}</span></li>,
                hr: () => <hr className="border-gray-700 my-10" />,
                blockquote: ({children}) => <blockquote className="border-l-4 border-cyan-500 pl-5 py-4 my-6 bg-cyan-500/5 rounded-r-xl"><span className="text-gray-300 italic text-lg leading-relaxed">{children}</span></blockquote>,
                code: ({inline, children}) => inline ? <code className="text-cyan-300 bg-gray-800 px-2 py-0.5 rounded text-sm font-mono">{children}</code> : <pre className="bg-gray-900 border border-gray-700 rounded-2xl p-5 overflow-x-auto my-6 text-sm"><code className="text-cyan-300 font-mono">{children}</code></pre>,
                table: ({children}) => <div className="overflow-x-auto my-8 rounded-xl border border-gray-700"><table className="w-full border-collapse text-sm sm:text-base">{children}</table></div>,
                thead: ({children}) => <thead className="bg-gray-800">{children}</thead>,
                th: ({children}) => <th className="text-white font-bold px-5 py-4 text-left border-b border-gray-700">{children}</th>,
                td: ({children}) => <td className="text-gray-300 px-5 py-3.5 border-b border-gray-800">{children}</td>,
                tr: ({children}) => <tr className="hover:bg-gray-800/40 transition-colors">{children}</tr>,
              }}
            >{(post.content || '_Noch kein Inhalt vorhanden._').replace(/\\n/g, '\n')}</ReactMarkdown>
          )}
        </motion.div>

        <RelatedPosts currentPost={post} />

        {/* Product Box */}
        <ProductBox />

        {/* Newsletter */}
        <NewsletterSignup variant="inline" source="blog-artikel" />

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