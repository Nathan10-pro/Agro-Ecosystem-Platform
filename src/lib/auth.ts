import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET wajib dikonfigurasi di production.");
  }
  if (secret && secret.length < 32 && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET harus memiliki minimal 32 karakter di production.");
  }
  return new TextEncoder().encode(secret || "man3-local-development-only-secret-key");
}

export const COOKIE_NAME = "man3_session";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | string;
}

/**
 * Hash password polos menggunakan bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}

/**
 * Verifikasi kecocokan password polos terhadap hash
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

/**
 * Membuat Signed JWT token untuk sesi pengguna (berlaku 7 hari)
 */
export async function signSessionToken(payload: UserSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

/**
 * Memverifikasi Signed JWT token
 */
export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (
      typeof payload.id !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Mengambil data sesi saat ini dari HTTP-Only Cookie (Server Components & API Routes)
 */
export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;

  const account = await db.table("Users").get(session.id);
  if (!account || account.status !== "active") return null;

  const role = account.role_id
    ? await db.table("Roles").get(account.role_id)
    : null;

  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: role?.name || "user",
  };
}
