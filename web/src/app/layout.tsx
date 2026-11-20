import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Montserrat, Roboto_Slab } from "next/font/google";
import "./globals.css";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Red Clay Crawlspace Repair | Crawlspace & Basement Moisture Solutions",
  description:
    "Stokes County owned crawlspace and basement repair: encapsulation, footings, drainage, framing and masonry for Stokes, Surry, Forsyth and Yadkin counties. Free inspections.",
  // Until launch (SITE_LIVE=true), keep preview copies out of search results.
  robots: process.env.SITE_LIVE === "true" ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Red Clay Crawlspace Repair",
    locale: "en_US",
  },
};

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
