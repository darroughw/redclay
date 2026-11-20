// JSON-LD for search engines and AI assistants. Built from the same Sanity content as the
// page, so structured data can never drift from what visitors see.
import type { SiteContent } from "@/content/types";
import { siteUrl } from "./site";

const listJoin = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} & ${items.at(-1)}` : (items[0] ?? "");

export const businessId = `${siteUrl}/#business`;

export function siteSchema(c: SiteContent) {
  const b = c.business;
  const counties = b.counties.map((county) => ({
    "@type": "AdministrativeArea",
    name: `${county} County, ${b.region}`,
    containedInPlace: { "@type": "State", name: "North Carolina" },
  }));

  const business = {
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: b.name,
    alternateName: "Red Clay",
    description: `${b.name} is a ${b.city}, ${b.region} crawlspace and basement repair company, owned and operated in Stokes County. It fixes wet crawlspaces, failing footings and sagging floors for homeowners in ${listJoin(b.counties)} counties, with free inspections.`,
    slogan: c.hero.headline,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo/shield.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: b.phone,
    priceRange: "Free inspections; quoted per job",
    address: { "@type": "PostalAddress", addressLocality: b.city, addressRegion: b.region, addressCountry: "US" },
    areaServed: counties,
    knowsAbout: [
      "Crawlspace encapsulation",
      "Vapor barriers",
      "Crawlspace dehumidification",
      "Foundation footing repair",
      "Block foundation walls",
      "French drains and grading",
      "Sump pumps",
      "Floor joist and sill repair",
      "Brick and block masonry",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Crawlspace & basement moisture solutions",
      itemListElement: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          itemOffered: {
            "@type": "Service",
            name: "Free crawlspace inspection",
            description: c.steps[0]?.detail ?? "We crawl under, take photos and show you exactly what we find.",
          },
        },
        ...c.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            serviceType: s.title,
            areaServed: counties,
            provider: { "@id": businessId },
          },
        })),
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Request a free crawlspace inspection",
      target: `${siteUrl}/#inspection`,
    },
    sameAs: [b.facebookUrl].filter((u) => u && !/facebook\.com\/?$/.test(u)),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: b.name,
    url: `${siteUrl}/`,
    inLanguage: "en-US",
    publisher: { "@id": businessId },
  };

  const page = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: `${b.name} | Crawlspace & Basement Moisture Solutions`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": businessId },
    primaryImageOfPage: `${siteUrl}/opengraph-image`,
    inLanguage: "en-US",
  };

  // The process, as a HowTo-style list AI assistants can quote step by step.
  const process = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#process`,
    name: `How ${b.name} works`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: c.steps.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, description: s.detail })),
  };

  return { "@context": "https://schema.org", "@graph": [business, website, page, process] };
}
