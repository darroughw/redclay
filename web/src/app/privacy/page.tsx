import type { Metadata } from "next";
import { Header } from "@/components/interactive";
import { Footer } from "@/components/sections";
import { getContent, telHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Red Clay Crawlspace Repair does with the information you send through the inspection request form.",
  alternates: { canonical: "/privacy" },
};

// Plain-language policy describing what the site actually does. If analytics or ad
// tracking is ever added, update the "What we don't do" section.
export default async function Privacy() {
  const c = await getContent();
  const b = c.business;
  const tel = telHref(b.phone);
  const h2 = "mt-10 font-slab text-[24px] font-bold text-ink-900";
  const p = "mt-3 font-body text-[17px] leading-[1.6] text-ink-700";

  return (
    <>
      <a href="#main" className="sr-only z-50 bg-ink-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header phone={b.phone} tel={tel} home="/" />
      <main id="main" tabIndex={-1} className="bg-sand-100 py-14 focus:outline-none lg:py-20">
        <article className="wrap max-w-[860px]">
          <h1 className="font-slab text-[36px] font-bold leading-[1.1] text-ink-900 lg:text-[47px]">Privacy Policy</h1>
          <p className={p}>
            This page explains what {b.name} does with the information you send us through this website. In short: we use it to call you back
            about your home, and nothing else.
          </p>

          <h2 className={h2}>What we collect</h2>
          <p className={p}>
            When you request a free inspection, we receive what you type into the form: your name, phone number, email (if you give it), your
            address or ZIP code, the service you need and any message. We also record when the request was sent.
          </p>

          <h2 className={h2}>How we use it</h2>
          <p className={p}>
            Only to contact you about your request: to call or text you back, set up an inspection and send your written quote. We don’t add you
            to a mailing list.
          </p>

          <h2 className={h2}>Where it’s kept</h2>
          <p className={p}>
            Requests are stored in our website’s content system (Sanity) and may be emailed to us so we can respond quickly. The website is hosted
            by Netlify. These companies process the information on our behalf and don’t use it for anything else.
          </p>

          <h2 className={h2}>What we don’t do</h2>
          <p className={p}>
            We don’t sell or share your information with anyone else. This site doesn’t use advertising trackers or cookies to follow you around
            the web.
          </p>

          <h2 className={h2}>Your choices</h2>
          <p className={p}>
            Want us to delete your request, or see what we have? Call or text us at{" "}
            <a href={tel} className="font-semibold text-clay-500 underline">
              {b.phone}
            </a>{" "}
            and we’ll take care of it.
          </p>

          <p className="mt-10 font-body text-[15px] text-ink-500">Last updated November 2026.</p>
        </article>
      </main>
      <Footer c={c} home="/" />
    </>
  );
}
