import { getContent, telHref } from "@/lib/content";
import { siteSchema } from "@/lib/schema";
import { Header, StickyCta } from "@/components/interactive";
import {
  About,
  BeforeAfter,
  FinalCta,
  Footer,
  Hero,
  ProblemPicker,
  Process,
  RecentWork,
  Review,
  Services,
  UtilityBar,
  WarningSigns,
} from "@/components/sections";

export default async function Home() {
  const c = await getContent();
  const tel = telHref(c.business.phone);

  const jsonLd = siteSchema(c);

  return (
    <>
      <a href="#main" className="sr-only z-50 bg-ink-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to content
      </a>
      <UtilityBar c={c} />
      <Header phone={c.business.phone} tel={tel} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero c={c} />
        <ProblemPicker c={c} />
        <WarningSigns c={c} />
        <Services c={c} />
        <BeforeAfter c={c} />
        <Process c={c} />
        <RecentWork c={c} />
        <About c={c} />
        <Review c={c} />
        <FinalCta c={c} />
      </main>
      <Footer c={c} />
      <StickyCta tel={tel} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
