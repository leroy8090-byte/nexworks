import { NextResponse, type NextRequest } from "next/server";
import { createProperty, listAll, listPublished, readCms, replaceAll, storageInfo, type CmsProperty } from "@/lib/sierra-cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest) {
  return req.cookies.get("sierra_preview_ok")?.value === "1";
}

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "1";
  if (all && !isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const properties = all ? listAll() : listPublished();
  return NextResponse.json({
    updatedAt: readCms().updatedAt,
    count: properties.length,
    storage: storageInfo(),
    properties,
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  // Import bulk
  if (Array.isArray((body as { properties?: unknown }).properties)) {
    const props = (body as { properties: CmsProperty[] }).properties;
    const db = replaceAll(props);
    return NextResponse.json({ ok: true, imported: db.properties.length, updatedAt: db.updatedAt });
  }

  if (!(body as { title?: string }).title) {
    return NextResponse.json({ error: "Le titre est obligatoire." }, { status: 400 });
  }

  const created = createProperty(body as Parameters<typeof createProperty>[0]);
  return NextResponse.json({ ok: true, property: created }, { status: 201 });
}
