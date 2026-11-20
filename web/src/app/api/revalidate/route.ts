// Called by a Sanity webhook on every publish. Marks the cached content stale so the next
// visitor gets the update (served stale-while-revalidate, so nobody waits on Sanity).
import { revalidatePath, revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { CONTENT_TAG } from "@/lib/content";

/** Every URL whose output comes from Sanity content. Add new pages here. */
const CONTENT_PATHS = ["/", "/privacy", "/llms.txt", "/manifest.webmanifest"];

function authorized(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || given.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(secret));
}

export async function POST(req: Request) {
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 });
  revalidateTag(CONTENT_TAG, "max");
  // On Netlify the tag refreshes HTML pages but not prerendered route-handler output
  // (llms.txt, the manifest), so refresh every Sanity-driven path by name as well.
  for (const path of CONTENT_PATHS) revalidatePath(path);
  return Response.json({ ok: true, revalidated: [CONTENT_TAG, ...CONTENT_PATHS] });
}
