import type { MetadataRoute } from "next";

// Lets the site be saved to a phone's home screen with the shield icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Red Clay Crawlspace Repair",
    short_name: "Red Clay",
    description: "Crawlspace & basement moisture solutions. Free inspections in Stokes, Surry, Forsyth & Yadkin counties, NC.",
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
