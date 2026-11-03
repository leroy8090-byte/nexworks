import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const COOKIE = "sierra_preview_ok";

export async function POST(req: NextRequest) {
  let body: { user?: string; pass?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const user = process.env.SIERRA_PREVIEW_USER || "client";
  const pass = process.env.SIERRA_PREVIEW_PASSWORD || "sierra-prive-2026";

  if (body.user !== user || body.pass !== pass) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
