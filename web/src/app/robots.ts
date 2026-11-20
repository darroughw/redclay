import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Crawlers (search and AI assistants alike) are allowed everywhere. Until launch every page
// carries a noindex meta tag instead (see layout.tsx); robots.txt stays open so crawlers can
// actually see that tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
