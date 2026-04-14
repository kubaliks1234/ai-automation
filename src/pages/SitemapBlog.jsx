import { useEffect } from "react";

export default function SitemapBlog() {
  useEffect(() => {
    window.location.replace("https://jakubkaczmarek.de/functions/generateSitemap?base_url=https://jakubkaczmarek.de");
  }, []);

  return null;
}