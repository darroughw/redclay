import Image from "next/image";
import type { SiteContent } from "@/content/types";
import { serviceOptions } from "@/content/defaults";
import { smsHref, telHref } from "@/lib/content";
import { LeadForm } from "./LeadForm";
import { ProblemTile, QuoteLink } from "./interactive";
import { ButtonLink, buttonClass, CheckItem, Eyebrow, H2, LogoMark, Wordmark } from "./ui";

type P = { c: SiteContent };

/** Splits "A. B." headlines at the first sentence so desktop gets the Figma two-line break. */
const splitAfterFirst = (text: string, at = ". ") => {
  const i = text.indexOf(at);
  return i === -1 ? [text] : [text.slice(0, i + 1), text.slice(i + 2)];
};

export function UtilityBar({ c }: P) {
  return (
    <div className="hidden bg-ink-900 lg:block">
      <div className="wrap flex items-center justify-between py-[10px] font-body text-[14px] text-white">
        <p className="whitespace-pre font-medium">{c.business.utilityText}</p>
        <a href={telHref(c.business.phone)} className="font-bold hover:underline">
          {c.business.phone}
        </a>
      </div>
    </div>
  );
}

export function Hero({ c }: P) {
  const { hero, business } = c;
  const tel = telHref(business.phone);
  return (
    <section id="top" aria-label="Introduction" className="relative bg-sand-200 lg:bg-ink-900">
      {/* Desktop: photo behind both columns with a left-to-right fade. */}
      <div aria-hidden className="absolute inset-0 hidden overflow-hidden lg:block">
        <Image src={hero.photo.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: hero.photo.position }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,18,0.94)_0%,rgba(20,18,18,0.72)_50%,rgba(20,18,18,0.3)_100%)]" />
      </div>

      <div className="relative lg:wrap lg:grid lg:min-h-[880px] lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-10 xl:gap-[40px]">
        {/* Copy. On phones it carries its own photo with a top-to-bottom fade. */}
        <div className="relative flex flex-col gap-5 px-5 pb-11 pt-12 lg:gap-[26px] lg:px-0 lg:pb-16 lg:pt-[170px]">
          <div aria-hidden className="absolute inset-0 overflow-hidden lg:hidden">
            <Image src={hero.photo.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: hero.photo.position }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,18,0.95)_0%,rgba(20,18,18,0.72)_100%)]" />
          </div>
          <div className="relative flex flex-col gap-5 lg:gap-[26px]">
            <Eyebrow tone="light" rule="white">
              {hero.eyebrow}
            </Eyebrow>
            <h1 className="max-w-[700px] font-slab text-[36px] font-bold leading-[1.1] text-white lg:text-[56px] lg:leading-[1.04] xl:text-[68px]">
              {hero.headline}
            </h1>
            <p className="max-w-[620px] font-body text-[17px] leading-[1.5] text-white lg:text-[20px] lg:leading-[1.55]">
              <span className="lg:hidden">{hero.introShort}</span>
              <span className="hidden lg:inline">{hero.intro}</span>
            </p>
            <div className="flex flex-col gap-3 pt-1 lg:flex-row lg:flex-wrap lg:gap-4 lg:pt-0">
              <QuoteLink className={buttonClass("primary", "w-full lg:w-auto")}>Schedule Free Inspection</QuoteLink>
              <ButtonLink href={tel} variant="outline" className="w-full lg:w-auto">
                Call or Text {business.phone}
              </ButtonLink>
            </div>
            <ul className="flex flex-col gap-[10px] pt-1 lg:flex-row lg:flex-wrap lg:gap-7 lg:pt-3">
              {hero.checks.map((t) => (
                <CheckItem key={t} tone="light">
                  {t}
                </CheckItem>
              ))}
            </ul>
          </div>
        </div>

        {/* Lead form: own sand band on phones, floating card on desktop. */}
        <div className="px-5 py-8 lg:px-0 lg:pb-16 lg:pt-[72px]">
          <LeadForm services={serviceOptions(c)} phone={business.phone} telHref={tel} />
        </div>
      </div>
    </section>
  );
}

export function ProblemPicker({ c }: P) {
  return (
    <section aria-labelledby="problem-heading" className="bg-sand-100 py-14 lg:bg-sand-200 lg:py-16">
      <div className="wrap flex flex-col gap-5 lg:gap-7">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <h2 id="problem-heading" className="font-slab text-[28px] font-bold leading-[1.1] text-ink-900 lg:text-[36px]">
            What’s Going On Under Your House?
          </h2>
          <p className="font-body text-[16px] font-medium text-ink-500 lg:text-[17px]">Pick one and we’ll start your free inspection request.</p>
        </div>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:gap-5">
          {c.problemTiles.map((t) => (
            <ProblemTile key={t.title} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WarningSigns({ c }: P) {
  return (
    <section aria-labelledby="signs-heading" className="bg-white py-14 lg:bg-sand-100 lg:py-[110px]">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex flex-col gap-5 lg:w-[420px] lg:shrink-0 lg:gap-6">
          <Eyebrow>The problem is below</Eyebrow>
          <h2 id="signs-heading" className="font-slab font-bold text-ink-900">
            <span className="block text-[72px] font-extrabold leading-[1.12] text-clay-500 lg:text-[96px]">MOIST.</span>
            <span className="block text-[28px] leading-[1.12] lg:text-[34px]">We hate that word, too.</span>
          </h2>
          <p className="font-body text-[17px] leading-[1.55] text-ink-500 lg:text-[18px]">
            And so does your crawlspace. These are the signs worth looking into — catch them early and the fix is simpler and less expensive.
          </p>
          <QuoteLink className={buttonClass("primary", "hidden self-start lg:inline-flex")}>Book a Free Inspection</QuoteLink>
        </div>
        <ol className="grid flex-1 gap-3 sm:grid-cols-2 lg:gap-5">
          {c.warningSigns.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[6px] border border-line bg-white px-5 py-5 lg:flex-col lg:gap-2 lg:px-7 lg:py-[26px]">
              <span className="font-slab text-[18px] font-bold tracking-[0.72px] text-clay-500">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex flex-col gap-1 lg:gap-2">
                <span className="font-slab text-[19px] font-semibold text-ink-900 lg:text-[22px]">{s.title}</span>
                <span className="font-body text-[15px] leading-[1.5] text-ink-500 lg:text-[16px]">{s.detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <QuoteLink className={buttonClass("primary", "w-full lg:hidden")}>Book a Free Inspection</QuoteLink>
      </div>
    </section>
  );
}

export function Services({ c }: P) {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-sand-100 py-14 lg:bg-white lg:py-[110px]">
      <div className="wrap flex flex-col gap-5 lg:gap-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow>What we do</Eyebrow>
            <H2 id="services-heading" className="max-w-[640px] text-ink-900">
              Crawlspace &amp; Basement Moisture Solutions
            </H2>
          </div>
          <p className="max-w-[440px] font-body text-[17px] leading-[1.5] text-ink-500 lg:text-[18px] lg:leading-[1.55]">
            Local, practical solutions with tailored recommendations for your home<span className="hidden lg:inline"> — never a one-size-fits-all package</span>.
          </p>
        </div>

        {/* Phones: compact rows */}
        <ul className="flex flex-col gap-3 md:hidden">
          {c.services.map((s) => (
            <li key={s.id}>
              <QuoteLink service={s.title} className="flex items-center gap-4 rounded-[6px] border border-line bg-white py-[10px] pl-[10px] pr-4">
                <span className="relative size-24 shrink-0 overflow-hidden rounded-[4px]">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="96px" className="object-cover" style={{ objectPosition: s.photo.position }} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-slab text-[19px] font-semibold leading-[1.15] text-ink-900">{s.title}</span>
                  <span className="font-body text-[14.5px] leading-[1.4] text-ink-500">{s.summaryShort}</span>
                </span>
              </QuoteLink>
            </li>
          ))}
        </ul>

        {/* Tablet & desktop: photo cards */}
        <ul className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s) => (
            <li key={s.id} className="flex flex-col overflow-hidden rounded-[6px] border border-line bg-white">
              <div className="relative h-60 w-full">
                <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 1024px) 384px, 50vw" className="object-cover" style={{ objectPosition: s.photo.position }} />
              </div>
              <div className="flex flex-1 flex-col items-start gap-[10px] px-7 pb-[30px] pt-[26px]">
                <h3 className="font-slab text-[24px] font-semibold leading-[1.15] text-ink-900">{s.title}</h3>
                <p className="font-body text-[16px] leading-[1.5] text-ink-500">{s.summary}</p>
                <QuoteLink service={s.title} className="font-cond text-[15px] font-bold uppercase tracking-[1.2px] text-clay-500 hover:underline">
                  Get a quote<span aria-hidden>&nbsp;&nbsp;→</span>
                  <span className="sr-only"> for {s.title}</span>
                </QuoteLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BeforeAfter({ c }: P) {
  const ba = c.beforeAfter;
  const [l1, l2] = splitAfterFirst(ba.heading, ", ");
  return (
    <section aria-labelledby="results-heading" className="bg-ink-900 py-14 lg:py-[110px]">
      <div className="wrap flex flex-col gap-6 lg:gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow tone="light">Real results</Eyebrow>
            <H2 id="results-heading" className="max-w-[600px] text-white">
              {l2 ? (
                <>
                  {l1}<br className="hidden lg:block" /> {l2}
                </>
              ) : (
                ba.heading
              )}
            </H2>
          </div>
          <p className="max-w-[460px] font-body text-[17px] leading-[1.5] text-white lg:text-[18px] lg:leading-[1.55]">{ba.intro}</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row lg:gap-6">
          {[
            { photo: ba.before, label: "In Progress", tag: "bg-ink-900" },
            { photo: ba.after, label: "Finished", tag: "bg-clay-500" },
          ].map(({ photo, label, tag }) => (
            <figure key={label} className="relative h-[260px] flex-1 overflow-hidden rounded-[6px] lg:h-[440px]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
              <figcaption className={`absolute left-4 top-4 rounded-[3px] px-[14px] py-[7px] font-cond text-[15px] font-bold uppercase tracking-[1.8px] text-white lg:left-5 lg:top-5 ${tag}`}>
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ c }: P) {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-white py-14 lg:bg-sand-100 lg:py-[110px]">
      <div className="wrap flex flex-col gap-6 lg:gap-12">
        <div className="flex flex-col gap-5 lg:items-center">
          <Eyebrow>How it works</Eyebrow>
          <H2 id="process-heading" className="text-ink-900 lg:text-center">
            Straight Answers. Solid Work.
          </H2>
        </div>
        <ol className="flex flex-col lg:flex-row lg:gap-6">
          {c.steps.map((s, i) => (
            <li
              key={s.title}
              className={`flex gap-4 pb-6 last:pb-0 lg:flex-1 lg:flex-col lg:gap-3 lg:border-t-[3px] lg:pb-0 lg:pt-7 ${i === 0 ? "lg:border-clay-500" : "lg:border-line"}`}
            >
              <span
                aria-hidden
                className={`flex size-9 shrink-0 items-center justify-center rounded-full font-slab text-[16px] font-bold text-white lg:hidden ${i === 0 ? "bg-clay-500" : "bg-ink-900"}`}
              >
                {i + 1}
              </span>
              <span className="hidden font-cond text-[16px] font-bold uppercase tracking-[1.92px] text-clay-500 lg:block">Step {i + 1}</span>
              <span className="flex flex-col gap-1 pt-[5px] lg:gap-3 lg:pt-0">
                <span className="font-slab text-[21px] font-semibold text-ink-900 lg:text-[26px]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </span>
                <span className="font-body text-[15px] leading-[1.5] text-ink-500 lg:text-[17px] lg:leading-[1.55]">
                  <span className="lg:hidden">{s.detailShort || s.detail}</span>
                  <span className="hidden lg:inline">{s.detail}</span>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RecentWork({ c }: P) {
  const [tall, ...rest] = c.gallery;
  const fb = c.business.facebookUrl;
  const img = (p: (typeof c.gallery)[number], sizes: string) => (
    <Image src={p.src} alt={p.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: p.position }} />
  );
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-sand-100 py-14 lg:bg-white lg:py-[110px]">
      <div className="wrap flex flex-col gap-3 lg:gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 lg:gap-5">
            <Eyebrow>Our work</Eyebrow>
            <H2 id="work-heading" className="text-ink-900">
              Recent Crawlspace Projects
            </H2>
          </div>
          <ButtonLink href={fb} variant="dark" target="_blank" rel="noopener" className="hidden lg:inline-flex">
            See More on Facebook
          </ButtonLink>
        </div>

        {/* Phones: tall photo first, then pairs */}
        <div className="flex flex-col gap-[10px] lg:hidden">
          {tall && <div className="relative h-[300px] overflow-hidden rounded-[6px]">{img(tall, "100vw")}</div>}
          <div className="grid grid-cols-2 gap-[10px]">
            {rest.map((p) => (
              <div key={p.src} className="relative h-[140px] overflow-hidden rounded-[6px]">
                {img(p, "50vw")}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: two stacked | one tall | two stacked */}
        <div className="hidden grid-cols-3 gap-5 lg:grid">
          {[rest.slice(0, 2), tall ? [tall] : [], rest.slice(2, 4)].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((p) => (
                <div key={p.src} className={`relative overflow-hidden rounded-[6px] ${ci === 1 ? "h-[620px]" : "h-[300px]"}`}>
                  {img(p, "400px")}
                </div>
              ))}
            </div>
          ))}
        </div>
        {rest.length > 4 && (
          <div className="hidden grid-cols-3 gap-5 lg:grid">
            {rest.slice(4).map((p) => (
              <div key={p.src} className="relative h-[300px] overflow-hidden rounded-[6px]">
                {img(p, "400px")}
              </div>
            ))}
          </div>
        )}

        <p className="hidden font-cond text-[16px] font-semibold uppercase tracking-[0.96px] text-ink-500 lg:block">{c.galleryTags}</p>
        <ButtonLink href={fb} variant="dark" target="_blank" rel="noopener" className="w-full lg:hidden">
          See More on Facebook
        </ButtonLink>
      </div>
    </section>
  );
}

export function About({ c }: P) {
  const { about, business } = c;
  const [l1, l2] = splitAfterFirst(about.heading);
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-14 lg:bg-sand-100 lg:py-[110px]">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative h-[300px] w-full shrink-0 rounded-[6px] lg:h-[520px] lg:w-[560px] lg:max-w-[45%] xl:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-[6px]">
            <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" style={{ objectPosition: about.photo.position }} />
          </div>
          <div className="absolute -bottom-5 right-4 rounded-[6px] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] lg:bottom-auto lg:left-[440px] lg:right-auto lg:top-[380px] lg:p-[22px]">
            <LogoMark width={100} fluid className="w-14 max-w-none align-top lg:w-[100px]" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:gap-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 id="about-heading" className="font-slab text-[30px] font-bold leading-[1.1] text-ink-900 lg:text-[43px]">
            {l1}
            {l2 && (
              <>
                <br className="hidden lg:block" /> {l2}
              </>
            )}
          </h2>
          <p className="font-body text-[17px] leading-[1.6] text-ink-700 lg:text-[18px]">{about.body}</p>
          <div className="flex flex-col gap-[10px]">
            <p className="font-cond text-[15px] font-bold uppercase tracking-[1.8px] text-ink-500">We believe in</p>
            <ul className="flex flex-col gap-[10px]">
              {about.values.map((v) => (
                <CheckItem key={v}>{v}</CheckItem>
              ))}
            </ul>
          </div>
          <p className="font-cond text-[15px] font-bold uppercase tracking-[1.8px] text-ink-500">Proudly serving</p>
          <ul className="flex flex-wrap gap-[10px]">
            {business.counties.map((county) => (
              <li key={county} className="rounded-[40px] border border-line bg-white px-[14px] py-2 font-body text-[15px] font-semibold text-ink-900">
                {county} County
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Review({ c }: P) {
  const r = c.reviews[0];
  if (!r) return null;
  return (
    <section id="reviews" aria-label="Customer review" className="bg-sand-100 py-14 lg:bg-white lg:py-24">
      <figure className="wrap flex flex-col items-center gap-5 text-center lg:gap-6">
        <blockquote className="max-w-[900px] font-slab text-[26px] font-semibold leading-[1.25] text-ink-900 lg:text-[36px]">
          {/* Marks are added here, so strip any Kerney typed into Sanity to avoid doubling them. */}
          <span aria-hidden className="font-bold text-clay-500">“</span>
          {r.quote.trim().replace(/^["“”]+|["“”]+$/g, "")}
          <span aria-hidden className="font-bold text-clay-500">”</span>
        </blockquote>
        <figcaption className="whitespace-pre-line font-body text-[15px] font-medium text-ink-500 lg:whitespace-pre lg:text-[17px]">
          {r.source}
          <span className="hidden lg:inline">{"  ·  "}</span>
          <span className="lg:hidden">{"\n"}</span>
          {r.detail}
        </figcaption>
      </figure>
    </section>
  );
}

export function FinalCta({ c }: P) {
  const tel = telHref(c.business.phone);
  return (
    <section aria-labelledby="cta-heading" className="bg-clay-500 py-14 lg:py-[90px]">
      <div className="wrap flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 text-white">
          <h2 id="cta-heading" className="font-slab text-[34px] font-bold leading-[1.08] lg:text-[45px]">
            Let’s Take a Look
            <br /> Under Your Home.
          </h2>
          <p className="font-body text-[17px] leading-[1.5] lg:text-[19px]">Local, practical solutions. No scare tactics.</p>
        </div>
        <div className="flex flex-col gap-[14px] lg:w-auto">
          <QuoteLink className={buttonClass("light", "w-full")}>Schedule Free Inspection</QuoteLink>
          <ButtonLink href={tel} variant="outline" className="w-full">
            Call or Text {c.business.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function Footer({ c, home = "" }: P & { home?: string }) {
  const { business, services } = c;
  const year = 2026;
  const label = "font-cond text-[15px] font-bold uppercase tracking-[2.1px] text-clay-100";
  return (
    <footer className="bg-ink-900 pb-[calc(110px+env(safe-area-inset-bottom))] pt-14 text-white lg:pb-10 lg:pt-20">
      <div className="wrap flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-5 lg:w-[320px] lg:shrink-0">
            <div className="p-2">
              <Wordmark tone="light" />
            </div>
            <p className="font-slab text-[20px] font-bold text-clay-100">{business.footerTagline}</p>
            <p className="font-body text-[16px] leading-[1.55]">{business.footerBlurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:flex-1 lg:gap-16">
            <nav aria-label="Services" className="col-span-2 flex flex-col gap-3 sm:col-span-1 lg:flex-1">
              <p className={label}>Services</p>
              <ul className="flex flex-col gap-3 font-body text-[16px] font-medium">
                {services.map((s) => (
                  <li key={s.id}>
                    <a href={`${home}#services`} className="hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3 lg:flex-1">
              <p className={label}>Service Area</p>
              <ul className="flex flex-col gap-3 font-body text-[16px] font-medium">
                {business.counties.map((county) => (
                  <li key={county}>{county} County</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 lg:flex-1">
              <p className={label}>Contact</p>
              <a href={telHref(business.phone)} className="whitespace-nowrap font-slab text-[24px] font-bold tracking-[0.52px] hover:underline lg:text-[26px]">
                {business.phone}
              </a>
              <a href={smsHref(business.phone)} className="font-body text-[16px] font-medium hover:underline">
                Send a text
              </a>
              <p className="font-body text-[16px] font-medium">
                {business.city}, {business.region}
              </p>
              <a href={business.facebookUrl} target="_blank" rel="noopener" className="font-body text-[16px] font-semibold text-clay-100 hover:underline">
                Facebook<span aria-hidden>&nbsp;&nbsp;→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white pt-6 font-body text-[14px] sm:flex-row sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

