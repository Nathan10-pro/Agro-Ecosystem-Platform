import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") return null;
  return new TextEncoder().encode(secret || "man3-local-development-only-secret-key");
}

const COOKIE_NAME = "man3_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(COOKIE_NAME)?.value;

  let sessionUser: { role?: unknown } | null = null;
  if (token) {
    try {
      const secret = getJwtSecret();
      if (!secret) throw new Error("JWT_SECRET is not configured.");
      const { payload } = await jwtVerify(token, secret);
      sessionUser = { role: payload.role };
    } catch {
      sessionUser = null;
    }
  }

  // 1. Proteksi Halaman Dashboard: Hanya Admin yang Boleh Mengakses
  if (pathname.startsWith("/dashboard")) {
    if (!sessionUser) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (sessionUser.role !== "admin") {
      // User biasa mencoba mengetik URL dashboard langsung -> tolak ke halaman utama
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
