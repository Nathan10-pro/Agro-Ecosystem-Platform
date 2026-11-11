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

  const orders = await db.table("Orders").list();
  return NextResponse.json({
    orders: [...orders].sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { id, status, notes } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID pemesanan diperlukan." }, { status: 400 });
  }

  const target = await db.table("Orders").get(id);
  if (!target) {
    return NextResponse.json({ error: "Pemesanan tidak ditemukan." }, { status: 404 });
  }

  if (status !== undefined && !["pending", "confirmed", "processing", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Status pemesanan tidak valid." }, { status: 400 });
  }

  if (notes !== undefined && (typeof notes !== "string" || notes.length > 1000)) {
    return NextResponse.json({ error: "Catatan maksimal 1000 karakter." }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  const updated = await db.table("Orders").update(id, updates);
  return NextResponse.json({ success: true, order: updated });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID pemesanan wajib disertakan." }, { status: 400 });
  }

  const target = await db.table("Orders").get(id);
  if (!target) {
    return NextResponse.json({ error: "Pemesanan tidak ditemukan." }, { status: 404 });
  }

  await db.table("Orders").delete(id);
  return NextResponse.json({ success: true, message: "Pemesanan berhasil dihapus." });
}
