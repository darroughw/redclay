import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Montserrat, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

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

const description =
  "Stokes County owned crawlspace and basement repair: encapsulation, vapor barriers, footings, drainage, sump pumps, framing and masonry for Stokes, Surry, Forsyth & Yadkin counties, NC. Free inspections.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crawlspace Repair & Encapsulation in Stokes, Surry, Forsyth & Yadkin, NC | Red Clay",
    template: "%s | Red Clay Crawlspace Repair",
  },
  description,
  applicationName: "Red Clay Crawlspace Repair",
  alternates: { canonical: "/" },
  // Until launch (SITE_LIVE=true), keep preview copies out of search results.
  robots: process.env.SITE_LIVE === "true" ? { index: true, follow: true, "max-image-preview": "large" } : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Red Clay Crawlspace Repair",
    title: "Red Clay Crawlspace Repair: Protecting Homes from the Ground Up",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Clay Crawlspace Repair: Protecting Homes from the Ground Up",
    description,
  },
  formatDetection: { telephone: true, address: false, email: false },
  category: "home improvement",
  // Local-search hints some engines and AI crawlers still read.
  other: {
    "geo.region": "US-NC",
    "geo.placename": "Pfafftown, North Carolina",
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
