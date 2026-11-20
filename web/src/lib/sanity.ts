// Read-only Sanity access. The dataset is public, so reads need no token; only published
// documents are read. Writes (form leads) use SANITY_WRITE_TOKEN, server side only.
import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Photo } from "@/content/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";

/** Null until a Sanity project ID is configured; the site then renders the defaults. */
export const sanity: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;

export const sanityWriter: SanityClient | null =
  projectId && process.env.SANITY_WRITE_TOKEN
    ? createClient({ projectId, dataset, apiVersion, useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
    : null;

const builder = sanity ? createImageUrlBuilder(sanity) : null;

/** GROQ projection for a `photo` field. */
export const PHOTO = `{alt, crop, hotspot, asset->{_id}}`;

type SanityPhoto = {
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number };
  asset?: { _id: string };
};

/**
 * Turns a Sanity photo into something next/image can use. Kerney's crop is applied in the
 * URL and the hotspot becomes object-position, so his framing survives every card size.
 */
export function toPhoto(p: SanityPhoto | null | undefined): Photo | undefined {
  if (!p?.asset || !builder) return undefined;
  const src = builder
    .image({ asset: { _ref: p.asset._id }, crop: p.crop, hotspot: p.hotspot })
    .width(2400)
    .fit("max")
    .auto("format")
    .url();
  const position = p.hotspot ? `${Math.round(p.hotspot.x * 100)}% ${Math.round(p.hotspot.y * 100)}%` : undefined;
  return { src, alt: p.alt ?? "", position };
}
