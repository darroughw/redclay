// Loads all page content from Sanity in one query, cached under the "content" tag.
// Publishing in Sanity calls /api/revalidate, which marks the tag stale, so edits show up
// on the next visit without a rebuild. Anything empty in Sanity falls back to the defaults.
import { cacheLife, cacheTag } from "next/cache";
import { defaults } from "@/content/defaults";
import type { Photo, SiteContent } from "@/content/types";
import { PHOTO, sanity, toPhoto } from "./sanity";

export const CONTENT_TAG = "content";

const QUERY = `{
  "business": *[_id == "business"][0]{
    name, phone, city, region, counties, utilityText, footerTagline, footerBlurb, facebookUrl
  },
  "home": *[_id == "homePage"][0]{
    hero{eyebrow, headline, intro, introShort, checks, photo${PHOTO}},
    problemTiles[]{title, detail, service},
    warningSigns[]{title, detail},
    beforeAfter{heading, intro, before${PHOTO}, after${PHOTO}},
    steps[]{title, detail, detailShort},
    gallery[]${PHOTO},
    galleryTags,
    about{heading, body, values, photo${PHOTO}}
  },
  "services": *[_type == "service" && defined(slug.current)] | order(order asc){
    "id": slug.current, title, summary, summaryShort, photo${PHOTO}
  },
  "reviews": *[_type == "review"] | order(featured desc, _createdAt desc){quote, source, detail}
}`;

/** Drops null/empty values so `{...defaults, ...fromSanity}` keeps the default. */
function clean<T extends object>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)),
  ) as Partial<T>;
}

const photoOr = (p: unknown, fallback: Photo) => toPhoto(p as never) ?? fallback;
const listOr = <T,>(list: T[] | null | undefined, fallback: T[]) => (list?.length ? list : fallback);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge(data: any): SiteContent {
  const home = data?.home ?? {};
  const d = defaults;
  return {
    business: { ...d.business, ...clean(data?.business) },
    hero: {
      ...d.hero,
      ...clean(home.hero),
      checks: listOr(home.hero?.checks, d.hero.checks),
      photo: photoOr(home.hero?.photo, d.hero.photo),
    },
    problemTiles: listOr(home.problemTiles, d.problemTiles),
    warningSigns: listOr(home.warningSigns, d.warningSigns),
    services: data?.services?.length
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? data.services.map((s: any, i: number) => {
          const fallback = d.services.find((x) => x.id === s.id) ?? d.services[i % d.services.length];
          return {
            ...fallback,
            ...clean(s),
            summaryShort: s.summaryShort || s.summary || fallback.summaryShort,
            photo: photoOr(s.photo, fallback.photo),
          };
        })
      : d.services,
    beforeAfter: {
      ...d.beforeAfter,
      ...clean(home.beforeAfter),
      before: photoOr(home.beforeAfter?.before, d.beforeAfter.before),
      after: photoOr(home.beforeAfter?.after, d.beforeAfter.after),
    },
    steps: listOr(home.steps, d.steps),
    gallery: listOr(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (home.gallery ?? []).map((p: any) => toPhoto(p)).filter(Boolean) as Photo[],
      d.gallery,
    ),
    galleryTags: home.galleryTags || d.galleryTags,
    about: {
      ...d.about,
      ...clean(home.about),
      values: listOr(home.about?.values, d.about.values),
      photo: photoOr(home.about?.photo, d.about.photo),
    },
    reviews: listOr(data?.reviews, d.reviews),
  };
}

export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("max");
  if (!sanity) return defaults;
  try {
    return merge(await sanity.fetch(QUERY));
  } catch (err) {
    // A Sanity outage should never take the site down; serve the last-known-good defaults.
    console.error("Sanity fetch failed, using defaults", err);
    return defaults;
  }
}

export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "").replace(/^1/, "")}`;
export const smsHref = (phone: string) => `sms:+1${phone.replace(/\D/g, "").replace(/^1/, "")}`;
