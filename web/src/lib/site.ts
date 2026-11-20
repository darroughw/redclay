// The site's absolute address, for canonical URLs, share images and structured data.
// Same approach as Stansky: Netlify sets URL (the site's main address) on every build,
// so nothing needs configuring. NEXT_PUBLIC_SITE_URL overrides it, e.g. for the real
// domain at launch. A malformed value is ignored with a warning rather than failing the build.
const FALLBACK = "http://localhost:3000";

function valid(value: string | undefined, name: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.origin;
  } catch {}
  console.warn(`[site] Ignoring ${name}="${value}": not a full URL like https://example.com`);
  return undefined;
}

export const siteUrl =
  valid(process.env.NEXT_PUBLIC_SITE_URL, "NEXT_PUBLIC_SITE_URL") ?? valid(process.env.URL, "URL") ?? FALLBACK;
