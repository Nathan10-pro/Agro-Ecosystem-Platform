import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const password = body?.password;

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.table("Users").find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password tidak sesuai." },
        { status: 401 }
      );
    }

    if (user.status !== "active") {
      return NextResponse.json(
        { error: "Akun Anda dinonaktifkan. Silakan hubungi administrator." },
        { status: 403 }
      );
    }

    const passwordMatch = await verifyPassword(password, user.password_hash || "");
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email atau password tidak sesuai." },
        { status: 401 }
      );
    }

    // Ambil detail role (default 'user' jika role_id tidak terdaftar)
    let roleName = "user";
    if (user.role_id) {
      const role = await db.table("Roles").get(user.role_id);
      if (role) roleName = role.name;
    }

    // Buat JWT token
    const sessionToken = await signSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleName,
      },
    });

    // Simpan ke HttpOnly Cookie
    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
