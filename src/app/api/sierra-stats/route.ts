import { NextResponse, type NextRequest } from "next/server";
import { getStatsSummary, trackEvent, type TrackEvent } from "@/lib/sierra-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest) {
  return req.cookies.get("sierra_preview_ok")?.value === "1";
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const summary = await getStatsSummary();
  return NextResponse.json(summary);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as TrackEvent | null;
  if (!body || typeof body !== "object" || !("type" in body)) {
    return NextResponse.json({ error: "Événement invalide" }, { status: 400 });
  }
  if (body.type === "page_view") {
    await trackEvent({ type: "page_view", path: typeof body.path === "string" ? body.path : undefined });
  } else if (body.type === "property_view" && typeof body.slug === "string") {
    await trackEvent({ type: "property_view", slug: body.slug, title: body.title });
  } else if (body.type === "property_click" && typeof body.slug === "string") {
    await trackEvent({ type: "property_click", slug: body.slug, title: body.title });
  } else {
    return NextResponse.json({ error: "Événement invalide" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
