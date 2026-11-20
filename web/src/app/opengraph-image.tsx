// Branded 1200×630 share card (Facebook, iMessage, LinkedIn, X, Google Discover).
// Text (eyebrow, headline, phone, counties) comes from Sanity; the background is the
// bundled hero photo. Note that Facebook and other apps cache cards for days, so a
// changed card can take a while to show up in shares.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getContent } from "@/lib/content";

// Fixed at build time, so keep it free of details Kerney might change.
export const alt = "Red Clay Crawlspace Repair: crawlspace and basement moisture solutions, with free inspections.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const C = { ink: "#1f1f1f", clay: "#9e3a2a", clay100: "#f5e4df", white: "#ffffff" };

export default async function OgImage() {
  const [slab, cond, body, photo, shield] = await Promise.all([
    // Literal paths so the build only bundles these files, not the whole project.
    readFile(join(process.cwd(), "assets/fonts/roboto-slab-latin-700-normal.woff")),
    readFile(join(process.cwd(), "assets/fonts/barlow-condensed-latin-700-normal.woff")),
    readFile(join(process.cwd(), "assets/fonts/barlow-latin-500-normal.woff")),
    // Downsize the hero photo to the card size before embedding it.
    readFile(join(process.cwd(), "public/images/hero.jpg")).then((b) =>
      sharp(b).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer(),
    ),
    readFile(join(process.cwd(), "public/logo/shield.svg")),
  ]);
  const c = await getContent();
  const b = c.business;
  const dataUri = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.ink }}>
        { }
        <img src={dataUri(photo, "image/jpeg")} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: "linear-gradient(90deg, rgba(20,18,18,0.96) 0%, rgba(20,18,18,0.84) 55%, rgba(20,18,18,0.5) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: C.clay }} />

        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px 56px 86px", width: "100%", height: "100%" }}>
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            { }
            <img src={dataUri(shield, "image/svg+xml")} width={74} height={85} alt="" />
            <div style={{ display: "flex", flexDirection: "column", color: C.white }}>
              <div style={{ fontFamily: "Slab", fontSize: 42, lineHeight: 1, letterSpacing: -0.4 }}>RED CLAY</div>
              <div style={{ fontFamily: "Cond", fontSize: 19, letterSpacing: 3.4, marginTop: 4 }}>CRAWLSPACE REPAIR</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 4, background: C.clay }} />
              <div style={{ fontFamily: "Cond", fontSize: 24, letterSpacing: 3.4, color: C.clay100, textTransform: "uppercase" }}>
                {c.hero.eyebrow}
              </div>
            </div>
            <div style={{ fontFamily: "Slab", fontSize: 76, lineHeight: 1.04, color: C.white, marginTop: 18, maxWidth: 820 }}>
              {c.hero.headline}
            </div>
          </div>

          {/* Footer line */}
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 34 }}>
            <div
              style={{
                display: "flex",
                background: C.clay,
                color: C.white,
                fontFamily: "Cond",
                fontSize: 26,
                letterSpacing: 1.6,
                padding: "12px 22px",
                borderRadius: 4,
              }}
            >
              {`FREE INSPECTIONS · ${b.phone}`}
            </div>
            <div style={{ fontFamily: "Body", fontSize: 24, color: C.white }}>
              {`${b.counties.join(", ").replace(/, ([^,]*)$/, " & $1")} counties, ${b.region}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Slab", data: slab, weight: 700, style: "normal" },
        { name: "Cond", data: cond, weight: 700, style: "normal" },
        { name: "Body", data: body, weight: 500, style: "normal" },
      ],
    },
  );
  // ImageResponse renders PNG, which is heavy for a photo. Re-encode as JPEG so the card
  // stays well under the ~600 KB some messaging apps (WhatsApp, iMessage) will preview.
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
