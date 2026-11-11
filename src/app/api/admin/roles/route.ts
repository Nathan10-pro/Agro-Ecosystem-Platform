import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const roles = await db.table("Roles").list();
  return NextResponse.json({ roles });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { name, description, permissions } = await req.json();

  if (typeof name !== "string" || !/^[a-z0-9_-]{2,30}$/i.test(name.trim())) {
    return NextResponse.json({ error: "Nama role harus berisi 2-30 huruf, angka, tanda hubung, atau garis bawah." }, { status: 400 });
  }

  const cleanName = String(name).trim().toLowerCase();
  const existing = await db.table("Roles").find((r) => r.name.toLowerCase() === cleanName);
  if (existing) {
    return NextResponse.json({ error: "Nama role sudah ada." }, { status: 409 });
  }

  const permissionValue = permissions || "read";
  if (!["read", "manage_news", "manage_users", "all"].includes(permissionValue)) {
    return NextResponse.json({ error: "Permission role tidak valid." }, { status: 400 });
  }

  const newRole = await db.table("Roles").create({
    name: cleanName,
    description: String(description || "").trim().slice(0, 250),
    permissions: permissionValue,
    is_system: false,
  });

  return NextResponse.json({ success: true, role: newRole });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { id, description, permissions } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID role wajib disertakan." }, { status: 400 });
  }

  const target = await db.table("Roles").get(id);
  if (!target) {
    return NextResponse.json({ error: "Role tidak ditemukan." }, { status: 404 });
  }

  if (target.is_system) {
    return NextResponse.json({ error: "Permission role sistem tidak dapat diubah." }, { status: 400 });
  }
  if (permissions !== undefined && !["read", "manage_news", "manage_users", "all"].includes(permissions)) {
    return NextResponse.json({ error: "Permission role tidak valid." }, { status: 400 });
  }
  if (description !== undefined && (typeof description !== "string" || description.length > 250)) {
    return NextResponse.json({ error: "Deskripsi maksimal 250 karakter." }, { status: 400 });
  }

  const updated = await db.table("Roles").update(id, {
    description: description !== undefined ? String(description).trim() : target.description,
    permissions: permissions !== undefined ? permissions : target.permissions,
  });

  return NextResponse.json({ success: true, role: updated });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID role wajib disertakan." }, { status: 400 });
  }

  const target = await db.table("Roles").get(id);
  if (!target) {
    return NextResponse.json({ error: "Role tidak ditemukan." }, { status: 404 });
  }

  if (target.is_system) {
    return NextResponse.json(
      { error: "Role sistem bawaan (admin/user) tidak boleh dihapus." },
      { status: 400 }
    );
  }

  const assignedUser = await db.table("Users").find((user) => user.role_id === id);
  if (assignedUser) {
    return NextResponse.json({ error: "Role masih digunakan oleh pengguna dan tidak dapat dihapus." }, { status: 400 });
  }

  await db.table("Roles").delete(id);
  return NextResponse.json({ success: true, message: "Role berhasil dihapus." });
}
