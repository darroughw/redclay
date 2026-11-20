// Accessibility check: runs axe-core (WCAG 2.1 A and AA rules) on every page of the
// production build, at desktop and phone widths, in the installed Google Chrome.
// Same approach as the Stansky Construction site.
//
//   npm run build && npm run test:a11y
//
// Uses system Chrome rather than Playwright's bundled Chromium. Set CHROME_PATH to point
// somewhere else. Exits 1 on any violation.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4330;
const origin = `http://localhost:${PORT}`;

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "phone", width: 390, height: 844 },
];
// Each check: a page, plus optional setup to reach a state worth testing (e.g. menu open).
const checks = [
  { path: "/" },
  { path: "/privacy" },
  { path: "/", label: "mobile menu open", only: "phone", setup: (page) => page.getByRole("button", { name: "Open menu" }).click() },
  {
    path: "/",
    label: "form errors shown",
    setup: async (page) => {
      await page.locator("#inspection button[type=submit]").click();
      await page.locator("#inspection [role=alert]").waitFor({ timeout: 10000 });
    },
  },
];

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
const stop = () => server.kill();
for (let i = 0; ; i++) {
  try {
    if ((await fetch(origin)).ok) break;
  } catch {}
  if (i > 60) {
    stop();
    throw new Error("next start didn't come up. Run `npm run build` first.");
  }
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await chromium.launch({ executablePath: chromePath });
let failures = 0;
let ran = 0;
try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    for (const check of checks) {
      if (check.only && check.only !== viewport.name) continue;
      await page.goto(origin + check.path, { waitUntil: "networkidle" });
      if (check.setup) await check.setup(page);
      await page.addScriptTag({ content: axeSource });
      const { violations } = await page.evaluate(() =>
        // @ts-ignore injected above
        window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } }),
      );
      ran++;
      const name = `${check.path}${check.label ? ` [${check.label}]` : ""} (${viewport.name})`;
      if (!violations.length) {
        console.log(`✓ ${name}`);
        continue;
      }
      failures += violations.length;
      console.log(`\n✗ ${name}`);
      for (const v of violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
        for (const node of v.nodes.slice(0, 5)) {
          console.log(`    ${node.target.join(" ")}`);
          if (node.failureSummary) console.log(`      ${node.failureSummary.split("\n").slice(1).join("; ").trim()}`);
        }
        if (v.nodes.length > 5) console.log(`    …and ${v.nodes.length - 5} more`);
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  stop();
}

if (failures) {
  console.log(`\n${failures} accessibility violation(s) across ${ran} checks.`);
  process.exit(1);
}
console.log(`\nNo WCAG 2.1 A/AA violations in ${ran} checks.`);
