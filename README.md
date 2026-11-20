# Red Clay Crawlspace Repair

The website for Red Clay Crawlspace Repair, Kerney's crawlspace and basement moisture company serving Stokes, Surry, Forsyth and Yadkin counties in North Carolina. Designed and built by Darrough West.

It's a single, fast landing page built from the approved Figma design, with a lead form for free inspections, and an editor Kerney can use from his phone.

| | |
|---|---|
| Design | [Figma: Red Clay](https://www.figma.com/design/5ui3QKy3DZkivc9TApdIcK/Red-Clay) (desktop 1440 and mobile 390 frames) |
| Repo | https://github.com/darroughw/redclay |
| Hosting | Netlify (Git-connected, settings in `netlify.toml`); preview link once connected |
| Editor (Sanity Studio) | _not set up yet_ |
| Production domain | _to be decided_ |

## For Kerney: editing the site

_Once the editor is set up_, sign in to Sanity Studio. Everything on the page that changes lives there:

- **Business info:** phone, counties served, Facebook link, footer text. Shows on every part of the page and is what Google reads.
- **Home page:** headline, intro, the four "What's going on" tiles, warning signs, before-and-after photos, the four steps, the project photo gallery and the About section.
- **Services:** title, short and long description, and photo for each service. Drag to reorder.
- **Reviews:** copy them word for word from Facebook or Google.
- **Inspection requests:** every form submission lands here with the homeowner's name, phone, address and what they need.

Nothing goes live until you click **Publish**. After that the change is on the site within a minute. Every edit has a history, so anything can be undone.

## How it works

1. Content is edited in **Sanity**.
2. The **Next.js** site in `web/` reads published content from Sanity and caches the page. It's prerendered as static HTML, and photos are resized and served as AVIF/WebP.
3. Publishing in Sanity fires a webhook at `/api/revalidate`, which marks the cached content stale. The next visitor gets the update, with no full rebuild.
4. The inspection form posts to a Next.js server action. It validates the fields, filters bots with a honeypot, and saves the request into Sanity. In production it only reports success if the request was actually saved, so a misconfiguration can't silently drop leads.

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
```

### Environment variables

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project. Leave empty to run on the built-in copy. |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production`. |
| `SANITY_WRITE_TOKEN` | Server-only Editor token so the form can save requests. |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the publish webhook (`Authorization: Bearer …`). |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for metadata and structured data. |
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
  public/images, logo, icons  photos and artwork exported from Figma
studio/                       the editor (Sanity Studio), coming next
```

## Status

- [x] Home page built from Figma, desktop and mobile
- [x] Content layer with Sanity + defaults fallback, publish webhook
- [x] Inspection form (server action, validation, honeypot, saves to Sanity)
- [ ] Sanity Studio: schemas, singleton docs, seed import from `defaults.ts`
- [ ] Create the Sanity project and hosted Studio
- [x] Netlify config (`netlify.toml`)
- [ ] Connect repo in Netlify, publish webhook, email notification for new leads
- [ ] Domain, `SITE_LIVE=true`, privacy page, analytics
