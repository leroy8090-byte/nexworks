import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CAPITAL_PROPERTIES_TAG } from "@/lib/capital-properties";

/** Appelé par NEXWORKS ESTATE à chaque changement de bien. Signature : HMAC-SHA256 du corps brut. */
export async function POST(req: NextRequest) {
  const secret = process.env.ESTATE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });
  const body = await req.text();
  const expected = Buffer.from(createHmac("sha256", secret).update(body).digest("hex"));
  const received = Buffer.from(req.headers.get("x-estate-signature") ?? "");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }
  // expire: 0 : la visite suivante voit déjà le bien à jour, jamais l'ancienne version.
  revalidateTag(CAPITAL_PROPERTIES_TAG, { expire: 0 });
  return NextResponse.json({ ok: true });
}
