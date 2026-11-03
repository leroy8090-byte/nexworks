import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "sierra_preview_ok";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/sierra-immobilier")) return NextResponse.next();

  // Static assets + login page always open
  if (/\.(png|webp|jpg|jpeg|svg|ico)$/i.test(pathname)) return NextResponse.next();
  if (pathname === "/sierra-immobilier/acces" || pathname.startsWith("/sierra-immobilier/acces/")) {
    return NextResponse.next();
  }

  if (req.cookies.get(COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/sierra-immobilier/acces";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/sierra-immobilier", "/sierra-immobilier/:path*"],
};
