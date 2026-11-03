import { NextResponse, type NextRequest } from "next/server";
import { deleteProperty, updateProperty } from "@/lib/sierra-cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

function isAuthed(req: NextRequest) {
  return req.cookies.get("sierra_preview_ok")?.value === "1";
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  const updated = updateProperty(decodeURIComponent(id), body);
  if (!updated) return NextResponse.json({ error: "Bien introuvable" }, { status: 404 });
  return NextResponse.json({ ok: true, property: updated });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const ok = deleteProperty(decodeURIComponent(id));
  if (!ok) return NextResponse.json({ error: "Bien introuvable" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
