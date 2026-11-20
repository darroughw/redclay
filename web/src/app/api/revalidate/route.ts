// Called by a Sanity webhook on every publish. Marks the cached content stale so the next
// visitor gets the update (served stale-while-revalidate, so nobody waits on Sanity).
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { CONTENT_TAG } from "@/lib/content";

function authorized(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || given.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(secret));
}

export async function POST(req: Request) {
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 });
  revalidateTag(CONTENT_TAG, "max");
  return Response.json({ ok: true, revalidated: CONTENT_TAG });
}
