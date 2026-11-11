import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak: Hanya admin yang diizinkan." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase();

  const users = await db.table("Users").list();
  const roles = await db.table("Roles").list();
  const roleMap = new Map(roles.map((r) => [r.id, r.name]));

  let sanitized = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role_id: u.role_id,
    role: roleMap.get(u.role_id) || "user",
    status: u.status || "active",
    created_at: u.created_at,
    updated_at: u.updated_at,
  }));

  if (q) {
    sanitized = sanitized.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ users: sanitized });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { name, email, password, role_id, status } = await req.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    password.length < 6 ||
    password.length > 72
  ) {
    return NextResponse.json({ error: "Nama, email, dan password wajib diisi." }, { status: 400 });
  }

  const cleanEmail = email.trim().toLowerCase();
  const existing = await db.table("Users").find((u) => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });
  }

  const requestedRole = await db.table("Roles").get(role_id || "role-user");
  if (!requestedRole) {
    return NextResponse.json({ error: "Role yang dipilih tidak ditemukan." }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  const newUser = await db.table("Users").create({
    name: name.trim(),
    email: cleanEmail,
    password_hash: passwordHash,
    role_id: requestedRole.id,
    status: status === "inactive" ? "inactive" : "active",
  });

  return NextResponse.json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role_id: newUser.role_id,
      status: newUser.status,
    },
  });
}

export async function PUT(req: NextRequest) {
  const currentAdmin = await requireAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { id, name, role_id, status, password } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "User ID diperlukan." }, { status: 400 });
  }

  const targetUser = await db.table("Users").get(id);
  if (!targetUser) {
    return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
  }

  // Proteksi: Admin tidak bisa menonaktifkan akunnya sendiri
  if (id === currentAdmin.id && status === "inactive") {
    return NextResponse.json(
      { error: "Anda tidak dapat menonaktifkan akun admin yang sedang Anda gunakan." },
      { status: 400 }
    );
  }

  const targetRole = role_id ? await db.table("Roles").get(role_id) : null;
  if (role_id && !targetRole) {
    return NextResponse.json({ error: "Role yang dipilih tidak ditemukan." }, { status: 400 });
  }
  if (password !== undefined && (typeof password !== "string" || password.length < 6 || password.length > 72)) {
    return NextResponse.json({ error: "Password harus berisi 6-72 karakter." }, { status: 400 });
  }
  if (name !== undefined && (typeof name !== "string" || !name.trim() || name.trim().length > 100)) {
    return NextResponse.json({ error: "Nama pengguna tidak valid." }, { status: 400 });
  }

  const demotingOrDisablingAdmin =
    targetUser.role_id === "role-admin" &&
    targetUser.status === "active" &&
    ((role_id && targetRole?.name !== "admin") || status === "inactive");
  if (demotingOrDisablingAdmin) {
    const allUsers = await db.table("Users").list();
    const adminCount = allUsers.filter(
      (u) => u.role_id === targetUser.role_id && u.status === "active"
    ).length;
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "Tidak dapat mengubah role: Minimal harus ada 1 admin aktif dalam sistem." },
        { status: 400 }
      );
    }
  }

  const updates: Record<string, unknown> = {};
  if (name) updates.name = String(name).trim();
  if (role_id) updates.role_id = role_id;
  if (status !== undefined) {
    if (status !== "active" && status !== "inactive") {
      return NextResponse.json({ error: "Status pengguna tidak valid." }, { status: 400 });
    }
    updates.status = status;
  }
  if (password) updates.password_hash = await hashPassword(password);

  const updated = await db.table("Users").update(id, updates);

  return NextResponse.json({
    success: true,
    user: {
      id: updated?.id,
      name: updated?.name,
      email: updated?.email,
      role_id: updated?.role_id,
      status: updated?.status,
    },
  });
}

export async function DELETE(req: NextRequest) {
  const currentAdmin = await requireAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID pengguna wajib disertakan." }, { status: 400 });
  }

  // Proteksi: Admin tidak bisa menghapus dirinya sendiri
  if (id === currentAdmin.id) {
    return NextResponse.json(
      { error: "Anda tidak dapat menghapus akun Anda sendiri." },
      { status: 400 }
    );
  }

  const target = await db.table("Users").get(id);
  if (!target) {
    return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
  }

  // Proteksi admin terakhir
  if (target.role_id === "role-admin" && target.status === "active") {
    const allUsers = await db.table("Users").list();
    const adminCount = allUsers.filter((u) => u.role_id === "role-admin" && u.status === "active").length;
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus admin terakhir dalam sistem." },
        { status: 400 }
      );
    }
  }

  await db.table("Users").delete(id);
  return NextResponse.json({ success: true, message: "Pengguna berhasil dihapus." });
}
