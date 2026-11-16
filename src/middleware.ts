import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";
import { createServerClient } from "@supabase/ssr";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") return null;
  return new TextEncoder().encode(secret || "man3-local-development-only-secret-key");
}

const COOKIE_NAME = "man3_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let response = NextResponse.next({ request: req });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getUser();
  }

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

  // 2. Proteksi Halaman Login & Register (jika sudah login, alihkan otomatis)
  if (pathname === "/login" || pathname === "/register") {
    if (sessionUser) {
      if (sessionUser.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/mitra/:path*", "/admin/:path*", "/api/portal/:path*", "/auth/:path*", "/login", "/register"],
};
