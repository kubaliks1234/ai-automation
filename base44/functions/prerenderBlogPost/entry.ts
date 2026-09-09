import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Diese Funktion gibt vollständiges HTML für einen Blog-Post zurück.
// Crawler (Googlebot) bekommen echtes HTML mit Titel, Description, H1, Body-Text.
// Aufruf: POST { slug: "mein-artikel-slug" }

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    let slug;

    // Support both GET (?slug=...) and POST ({slug: ...})
    const urlObj = new URL(req.url);
    slug = urlObj.searchParams.get('slug');

    if (!slug && req.method === 'POST') {
      try {
        const body = await req.json();
        slug = body.slug;
      } catch { /* ignore */ }
    }

    if (!slug) {
      return Response.json({ error: 'slug required' }, { status: 400 });
    }

    console.log(`[prerenderBlogPost] Looking for slug: "${slug}"`);
    
    // Try exact slug match first
    let results = await base44.asServiceRole.entities.BlogPost.filter(
      { slug, status: 'published' },
      '-published_at',
      1
    );
    console.log(`[prerenderBlogPost] Filter result count: ${results.length}`);

    // Fallback: search all published posts and match slug manually
    if (!results.length) {
      const allPosts = await base44.asServiceRole.entities.BlogPost.filter(
        { status: 'published' },
        '-published_at',
        500
      );
      // Log first 3 slugs for debugging
      console.log('[DEBUG] Sample slugs:', allPosts.slice(0, 3).map(p => ({ id: p.id, slug: p.slug, title: p.title?.slice(0, 40) })));
      results = allPosts.filter(p => p.slug === slug);
    }

    if (!results.length) {
      console.log(`[prerenderBlogPost] No post found for slug: "${slug}"`);
      return new Response(`<!DOCTYPE html><html><head><title>Nicht gefunden</title></head><body><h1>Artikel nicht gefunden</h1><a href="/blog">Zum Blog</a></body></html>`, {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const post = results[0];
    // Canonical MUST use lowercase /blog/ path (not /Blog/)
    const canonical = `https://jakubkaczmarek.de/blog/${post.slug}`;
    const title = `${post.meta_title || post.title} | Jakub Kaczmarek – KI Automatisierung`;
    const description = post.meta_description || post.excerpt || post.answer_block || '';
    const image = post.cover_image || 'https://jakubkaczmarek.de/og-image.jpg';
    const published = post.published_at || post.created_date || '';

    // Strip HTML tags for plain text preview in meta (sauber für description)
    const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // Simple Markdown-to-HTML converter for prerendered content
    const markdownToHtml = (md) => {
      if (!md) return '';
      // If already HTML, return as-is
      if (/<[a-z][\s\S]*>/i.test(md)) return md;
      const lines = md.split('\n');
      let html = '';
      let inList = false;
      let inOl = false;
      let inTable = false;
      let tableHeader = false;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Table separator row
        if (/^\|[\s\-:|]+\|?\s*$/.test(line)) { continue; }
        // Table row
        if (line.trim().startsWith('|')) {
          const cells = line.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
          if (!inTable) { html += '<table>'; inTable = true; tableHeader = true; }
          if (tableHeader) {
            html += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
            tableHeader = false;
          } else {
            html += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
          }
          continue;
        }
        if (inTable) { html += '</tbody></table>'; inTable = false; }
        // Headings
        if (line.startsWith('### ')) { if (inList) { html += '</ul>'; inList = false; } if (inOl) { html += '</ol>'; inOl = false; } html += `<h3>${line.slice(4)}</h3>`; continue; }
        if (line.startsWith('## ')) { if (inList) { html += '</ul>'; inList = false; } if (inOl) { html += '</ol>'; inOl = false; } html += `<h2>${line.slice(3)}</h2>`; continue; }
        if (line.startsWith('# ')) { if (inList) { html += '</ul>'; inList = false; } if (inOl) { html += '</ol>'; inOl = false; } html += `<h1>${line.slice(2)}</h1>`; continue; }
        // Ordered list
        if (/^\d+\.\s/.test(line)) {
          if (!inOl) { if (inList) { html += '</ul>'; inList = false; } html += '<ol>'; inOl = true; }
          html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`; continue;
        }
        // Unordered list
        if (/^[-*]\s/.test(line)) {
          if (!inList) { if (inOl) { html += '</ol>'; inOl = false; } html += '<ul>'; inList = true; }
          html += `<li>${line.replace(/^[-*]\s/, '')}</li>`; continue;
        }
        if (inList) { html += '</ul>'; inList = false; }
        if (inOl) { html += '</ol>'; inOl = false; }
        // Empty line
        if (line.trim() === '') { continue; }
        // Paragraph
        html += `<p>${line}</p>`;
      }
      if (inList) html += '</ul>';
      if (inOl) html += '</ol>';
      if (inTable) html += '</tbody></table>';
      // Inline: bold, links
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      return html;
    };

    const bodyHtml = markdownToHtml(post.body_html || post.content || '');
    const bodyText = stripHtml(post.body_html || post.content || '');
    const previewText = bodyText.slice(0, 300);

    const articleSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.meta_title || post.title,
      "description": description,
      "image": image,
      "author": { "@type": "Person", "name": "Jakub Kaczmarek", "url": "https://jakubkaczmarek.de" },
      "publisher": { "@type": "Organization", "name": "Jakub Kaczmarek – AI Automation", "url": "https://jakubkaczmarek.de" },
      "datePublished": published,
      "dateModified": post.updated_date || published,
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
    });

    const breadcrumbSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://jakubkaczmarek.de" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jakubkaczmarek.de/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": canonical }
      ]
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Jakub Kaczmarek" />
  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${(post.meta_title || post.title).replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Jakub Kaczmarek – AI Automation" />
  <meta property="article:published_time" content="${published}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${(post.meta_title || post.title).replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${image}" />

  <script type="application/ld+json">${articleSchema}</script>
  <script type="application/ld+json">${breadcrumbSchema}</script>
  <script>
    (function() {
      var ua = navigator.userAgent.toLowerCase();
      var isBot = ua.indexOf('googlebot') > -1 || ua.indexOf('bingbot') > -1 ||
                  ua.indexOf('bot') > -1 || ua.indexOf('crawler') > -1 ||
                  ua.indexOf('spider') > -1 || ua.indexOf('slurp') > -1 ||
                  ua.indexOf('duckduckbot') > -1 || ua.indexOf('baiduspider') > -1 ||
                  ua.indexOf('yandexbot') > -1 || ua.indexOf('facebookexternalhit') > -1 ||
                  ua.indexOf('twitterbot') > -1 || ua.indexOf('linkedinbot') > -1 ||
                  ua.indexOf('whatsapp') > -1 || ua.indexOf('telegrambot') > -1 ||
                  ua.indexOf('applebot') > -1 || ua.indexOf('bytespider') > -1;
      if (!isBot) {
        var url = new URL(window.location.href);
        url.searchParams.set('app', '1');
        window.location.replace(url.toString());
      }
    })();
  </script>
</head>
<body>
  <article>
    <nav>
      <a href="/">Startseite</a> /
      <a href="/blog">Blog</a> /
      <span>${post.title}</span>
    </nav>

    <h1>${post.h1 || post.title}</h1>
    <p><strong>${post.excerpt || post.answer_block || ''}</strong></p>
    ${post.cover_image ? `<img src="${post.cover_image}" alt="${(post.h1 || post.title).replace(/"/g, '&quot;')} – Jakub Kaczmarek KI Automatisierung" />` : ''}
    <p>Veröffentlicht am: ${published}</p>
    <p>Kategorie: ${post.category || ''}</p>

    <div>${bodyHtml || previewText}</div>

    <footer>
      <p>Autor: Jakub Kaczmarek | <a href="https://jakubkaczmarek.de">jakubkaczmarek.de</a></p>
    </footer>
  </article>

</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'index, follow',
      }
    });

  } catch (error) {
    console.error('prerenderBlogPost error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});