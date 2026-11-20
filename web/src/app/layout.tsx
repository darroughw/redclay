import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Montserrat, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { getContent } from "@/lib/content";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});
// Only used for the "CRAWLSPACE REPAIR" line of the wordmark.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"],
});

// Title, description and location come from Sanity (Business info), so Kerney's wording
// is what Google, link previews and AI assistants see.
export async function generateMetadata(): Promise<Metadata> {
  const { business: b, hero } = await getContent();
  const shareTitle = `${b.name}: ${hero.headline.replace(/\.$/, "")}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${b.seoTitle} | Red Clay`, template: `%s | ${b.name}` },
    description: b.seoDescription,
    applicationName: b.name,
    alternates: { canonical: "/" },
    // Until launch (SITE_LIVE=true), keep preview copies out of search results.
    robots:
      process.env.SITE_LIVE === "true" ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: false },
    openGraph: { type: "website", url: "/", siteName: b.name, title: shareTitle, description: b.seoDescription, locale: "en_US" },
    twitter: { card: "summary_large_image", title: shareTitle, description: b.seoDescription },
    formatDetection: { telephone: true, address: false, email: false },
    category: "home improvement",
    // Local-search hints some engines and AI crawlers still read.
    other: { "geo.region": `US-${b.region}`, "geo.placename": `${b.city}, ${b.region}` },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f1f1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${robotoSlab.variable} ${barlow.variable} ${barlowCondensed.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
