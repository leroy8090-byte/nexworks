import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "sierra_preview_ok";
const REALM = "Sierra Immobilier — accès privé";

function unauthorized() {
  return new NextResponse("Accès privé — identifiants requis.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/sierra-immobilier")) return NextResponse.next();

  // Allow logo/assets used by the gate itself
  if (pathname.startsWith("/sierra-immobilier/") && /\.(png|webp|jpg|jpeg|svg)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const user = process.env.SIERRA_PREVIEW_USER || "client";
  const pass = process.env.SIERRA_PREVIEW_PASSWORD || "sierra-prive-2026";

  if (req.cookies.get(COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const i = decoded.indexOf(":");
      const u = decoded.slice(0, i);
      const p = decoded.slice(i + 1);
      if (u === user && p === pass) {
        const res = NextResponse.next();
        res.cookies.set(COOKIE, "1", {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 14,
        });
        return res;
      }
    } catch {
      /* fallthrough */
    }
  }

  return unauthorized();
}

export const config = {
  matcher: ["/sierra-immobilier", "/sierra-immobilier/:path*"],
};
