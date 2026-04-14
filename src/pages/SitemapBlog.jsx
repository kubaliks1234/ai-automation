import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function SitemapBlog() {
  const [xml, setXml] = useState(null);

  useEffect(() => {
    base44.functions.invoke("generateSitemap", { base_url: "https://jakubkaczmarek.de" })
      .then(res => {
        const xmlContent = typeof res.data === "string" ? res.data : res.data?.xml || "";
        setXml(xmlContent);
        // Replace the entire document with raw XML
        document.open("application/xml");
        document.write(xmlContent);
        document.close();
      })
      .catch(err => {
        document.open();
        document.write("<error>Failed to load sitemap: " + err.message + "</error>");
        document.close();
      });
  }, []);

  return null;
}