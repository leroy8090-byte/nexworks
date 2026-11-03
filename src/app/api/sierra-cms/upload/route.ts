import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest) {
  return req.cookies.get("sierra_preview_ok")?.value === "1";
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (file.size > 8_000_000) {
    return NextResponse.json({ error: "Image trop lourde (max 8 Mo)" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const name = `up-${Date.now()}-${randomBytes(3).toString("hex")}.webp`;

  try {
    const dir = join(process.cwd(), "public", "sierra-immobilier", "uploads");
    mkdirSync(dir, { recursive: true });
    const out = join(dir, name);
    await sharp(buf).resize({ width: 1600, height: 1200, fit: "cover", position: "attention" }).webp({ quality: 84 }).toFile(out);
    return NextResponse.json({ ok: true, url: `/sierra-immobilier/uploads/${name}` });
  } catch {
    // Vercel often blocks writes under public/ — fallback /tmp is not publicly served
    return NextResponse.json(
      {
        error:
          "Impossible d'enregistrer l'image sur ce serveur. Utilisez une URL d'image (https://...) dans le formulaire.",
      },
      { status: 503 },
    );
  }
}
