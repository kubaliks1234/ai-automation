import { useEffect } from 'react';

/**
 * Setzt ein noindex,nofollow Meta-Tag für Admin- und interne Seiten.
 * Entfernt das Tag beim Unmount.
 */
export default function NoIndex() {
  useEffect(() => {
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');

    return () => {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    };
  }, []);

  return null;
}