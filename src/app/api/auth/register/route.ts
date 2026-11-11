import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (
      !cleanName ||
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return NextResponse.json(
        { error: "Nama atau format email tidak valid." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal harus 6 karakter." },
        { status: 400 }
      );
    }

    if (password.length > 72) {
      return NextResponse.json(
        { error: "Password maksimal 72 karakter." },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existing = await db.table("Users").find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan gunakan email lain atau login." },
        { status: 409 }
      );
    }

    // Role default untuk register publik selalu 'role-user'
    const userRole = await db.table("Roles").find((r) => r.name === "user");
    if (!userRole) {
      return NextResponse.json(
        { error: "Role pengguna belum diinisialisasi. Hubungi administrator." },
        { status: 503 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await db.table("Users").create({
      name: cleanName,
      email: cleanEmail,
      password_hash: passwordHash,
      role_id: userRole.id,
      status: "active",
    });

    // Buat JWT token untuk login langsung
    const sessionToken = await signSessionToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: userRole.name,
    });

    const response = NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: userRole.name,
      },
    });

    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses pendaftaran." },
      { status: 500 }
    );
  }
}
