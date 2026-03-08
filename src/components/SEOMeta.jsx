import { useEffect } from 'react';

export default function SEOMeta({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a7f4930f0e951070ab8bb0/54bf8e1a5_generated_image.png',
  noIndex = false,
  structuredData = null,
}) {
  useEffect(() => {
    // Title
    document.title = title;
    document.documentElement.lang = 'de';

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Primary
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('author', 'Jakub Kaczmarek');
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical
    if (canonical) setLink('canonical', canonical);

    // Open Graph
    setMeta('og:type', 'website', true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:locale', 'de_DE', true);
    setMeta('og:site_name', 'Jakub Kaczmarek – AI Automation', true);
    if (canonical) setMeta('og:url', canonical, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Structured Data
    if (structuredData) {
      const id = 'structured-data-json';
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // cleanup structured data on unmount
      const script = document.getElementById('structured-data-json');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonical, ogImage, noIndex]);

  return null;
}