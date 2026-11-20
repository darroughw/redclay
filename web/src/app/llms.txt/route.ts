// llms.txt (https://llmstxt.org): a plain-text summary AI assistants (ChatGPT, Claude,
// Perplexity, Google AI Overviews) can read and quote. Built from the same Sanity content
// as the page, cached under the same tag, so it refreshes when Kerney publishes.
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const listJoin = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? "");

export async function GET() {
  const c = await getContent();
  const b = c.business;
  const counties = listJoin(b.counties.map((x) => `${x} County`));

  const body = [
    `# ${b.name}`,
    "",
    `> ${b.name} is a crawlspace and basement moisture repair company based in ${b.city}, ${b.region}, owned and operated in ${b.ownedIn}. It serves homeowners in ${counties}, ${b.region}. Inspections are free.`,
    "",
    "## Key facts",
    "",
    `- Phone (call or text): ${b.phone}`,
    `- Based in: ${b.city}, ${b.region}`,
    `- Service area: ${counties}, North Carolina`,
    `- Ownership: local, owned and operated in ${b.ownedIn} (not a national franchise)`,
    "- Inspections: free, no obligation. The crew crawls under the house, takes photos and shows the homeowner what they find.",
    "- Quotes: written, with options, price and timeline up front",
    "- Work: done by the company's own crew",
    `- Request an inspection: ${siteUrl}/#inspection`,
    ...(b.facebookUrl && !/facebook\.com\/?$/.test(b.facebookUrl) ? [`- Facebook: ${b.facebookUrl}`] : []),
    "",
    "## Services",
    "",
    ...c.services.map((s) => `- ${s.title}: ${s.summary}`),
    "",
    "## Signs a crawlspace needs attention",
    "",
    ...c.warningSigns.map((w) => `- ${w.title}: ${w.detail}`),
    "",
    "## How it works",
    "",
    ...c.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`),
    "",
    "## About",
    "",
    c.about.body,
    "",
    `Values: ${c.about.values.join("; ")}.`,
    "",
    ...(c.reviews.length
      ? ["## What customers say", "", ...c.reviews.map((r) => `- "${r.quote}" (${r.source}${r.detail ? `, ${r.detail}` : ""})`), ""]
      : []),
  ];

  return new Response(body.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
