# Red Clay Crawlspace Repair

The website for Red Clay Crawlspace Repair, Kerney's crawlspace and basement moisture company serving Stokes, Surry, Forsyth and Yadkin counties in North Carolina. Designed and built by Darrough West.

It's a single, fast landing page built from the approved Figma design, with a lead form for free inspections, and an editor Kerney can use from his phone.

| | |
|---|---|
| Design | [Figma: Red Clay](https://www.figma.com/design/5ui3QKy3DZkivc9TApdIcK/Red-Clay) (desktop 1440 and mobile 390 frames) |
| Repo | https://github.com/darroughw/redclay |
| Preview site | https://redclaycrawlspace.netlify.app (Netlify, Git-connected, settings in `netlify.toml`) |
| Editor (Sanity Studio) | https://redclay.sanity.studio |
| Sanity project | `taiaxmef`, dataset `production` (on Darrough's account for now) |
| Production domain | redclaycrawlspace.com (registered at Squarespace, DNS at Wix, email on Google Workspace; still points at the old Wix site) |

## For Kerney: editing the site

Sign in at **redclay.sanity.studio**. Everything on the page that changes lives there:

- **Business info:** phone, counties served, Facebook link, footer text. Shows on every part of the page and is what Google reads.
- **Home page:** headline, intro, the four "What's going on" tiles, warning signs, before-and-after photos, the four steps, the project photo gallery and the About section.
- **Services:** title, short and long description, and photo for each service. Change **Position** to reorder (1 shows first).
- **Reviews:** copy them word for word from Facebook or Google.
- **Inspection requests:** every form submission lands here, newest first, with the homeowner's name, phone, address and what they need. Mark each one Called back, Inspection booked or Closed as you go.

On photos, drag the circle (the hotspot) onto the important part of the picture. The site keeps that part in view when it crops the photo for phones and computers.

Nothing goes live until you click **Publish**. After that the change is on the site within a minute. Every edit has a history, so anything can be undone.

## How it works

1. Content is edited in **Sanity**.
2. The **Next.js** site in `web/` reads published content from Sanity and caches the page. It's prerendered as static HTML, and photos are resized and served as AVIF/WebP.
3. Publishing in Sanity fires a webhook at `/api/revalidate`, which marks the cached content stale. The next visitor gets the update, with no full rebuild.
4. The inspection form posts to a Next.js server action. It validates the fields, filters bots with a honeypot, then saves the request into Sanity **and** emails it to Kerney (Resend). It reports success if either worked, and only shows the homeowner an error if both failed, so a lead is never lost silently.

### Search, sharing and AI assistants

- Page metadata, canonical URL, Open Graph and Twitter tags in `layout.tsx`. Every page is `noindex` until `SITE_LIVE=true`.
- Branded 1200×630 share card (`opengraph-image.tsx`), served as a ~100 KB JPEG.
- Favicons, Apple touch icon and web manifest, generated from `public/logo/shield.svg` (the Figma logo layers combined).
- `robots.txt`, `sitemap.xml`, and JSON-LD (`src/lib/schema.ts`): HomeAndConstructionBusiness with service area, services and the free-inspection offer, plus WebSite, WebPage and the 4-step process.
- `/llms.txt`: a plain-text summary for AI assistants, built from the same Sanity content.

If Sanity isn't configured (or is down), the site falls back to the approved Figma copy in `web/src/content/defaults.ts`. Empty fields in Sanity fall back the same way, so a half-filled document never leaves a hole in the page.

## Running it locally

Node 22 or newer.

```sh
cd web
cp .env.example .env.local   # optional: runs on the built-in copy with no keys
npm install
npm run dev                  # site at http://localhost:3000
npm run build                # production build
npm run lint
npm run test:a11y            # after a build: axe WCAG 2.1 AA in Chrome, desktop + phone
npm run icons                # regenerate favicons/app icons from public/logo/shield.svg

cd ../studio
npm install
npm run dev                  # editor at http://localhost:3333
npx sanity deploy            # publish editor changes to redclay.sanity.studio
npx sanity exec scripts/import-defaults.ts --with-user-token   # seed content (only fills what's missing)
```

The publish webhook ("Refresh website on publish") is set up in Sanity under **API → Webhooks**. It POSTs to `/api/revalidate` with `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`, and only for business, homePage, service and review documents. New leads don't refresh the site.

### Environment variables

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project. Leave empty to run on the built-in copy. |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production`. |
| `SANITY_WRITE_TOKEN` | Server-only Editor token so the form can save requests. |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the publish webhook (`Authorization: Bearer …`). |
| `NEXT_PUBLIC_SITE_URL` | Optional full address (`https://…`). On Netlify it defaults to the site's own address; set it only for the real domain at launch. |
| `RESEND_API_KEY` | Resend API key for new-lead email alerts. |
| `LEAD_NOTIFY_TO` | Who gets lead alerts (comma-separate several). |
| `LEAD_EMAIL_FROM` | Optional sender. Leave empty until the domain is verified in Resend. |
| `SITE_LIVE` | Set to `true` on production once the real domain points here. Until then every page is `noindex`. |

## Project layout

```text
web/                          the website (Next.js 16, App Router, Tailwind 4)
  src/app/page.tsx            the home page: sections in Figma order + LocalBusiness structured data
  src/app/actions.ts          inspection form server action
  src/app/api/revalidate/     Sanity publish webhook
  src/components/sections.tsx one component per Figma section, desktop and mobile layouts
  src/components/LeadForm.tsx the form (problem tiles and "Get a quote" links preselect a service)
  src/components/interactive.tsx  header + mobile menu, problem tiles, mobile sticky Call/Inspection bar
  src/components/ui.tsx       logo shield, wordmark, buttons, eyebrow, check items
  src/content/                content types and the approved Figma copy (defaults + Sanity seed)
  src/lib/content.ts          one cached GROQ query, merged over the defaults
  src/lib/sanity.ts           Sanity client and photo helper (crop + hotspot)
  src/lib/notify.ts           new-lead email (Resend)
  src/lib/schema.ts           JSON-LD
  src/app/opengraph-image.tsx share card; robots.ts, sitemap.ts, manifest.ts, llms.txt/
  scripts/a11y.mjs            accessibility check; make-icons.mjs regenerates icons
  public/images, logo, icons  photos and artwork exported from Figma
studio/                       the editor (Sanity Studio)
  schemaTypes/                the editing forms, written for Kerney
  sanity.config.ts            sidebar order, singletons (Business info, Home page)
  scripts/import-defaults.ts  one-time seed of the Figma copy and photos (safe to re-run)
```

## Status

- [x] Home page built from Figma, desktop and mobile
- [x] Content layer with Sanity + defaults fallback, publish webhook
- [x] Inspection form (server action, validation, honeypot, saves to Sanity)
- [x] Sanity Studio: schemas, singleton docs, seed import from `defaults.ts`
- [x] Sanity project, hosted Studio, content seeded, publish webhook
- [x] Netlify site connected (`netlify.toml`)
- [x] Sanity env vars set in Netlify; tested live: content from Sanity, publish refresh (~10s), form → Inspection requests
- [x] Email notification for new leads (code done; needs Resend account + env vars)
- [x] SEO, share card, icons, structured data, llms.txt, privacy page
- [x] Accessibility: axe WCAG 2.1 AA clean at desktop and phone (`npm run test:a11y`)
- [ ] Invite Kerney to the Sanity project
- [ ] Domain, `SITE_LIVE=true`, analytics
