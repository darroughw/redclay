import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

// Lets the site be saved to a phone's home screen with the shield icon.
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { business: b } = await getContent();
  return {
    name: b.name,
    short_name: "Red Clay",
    description: b.seoDescription,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1f1f1f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
