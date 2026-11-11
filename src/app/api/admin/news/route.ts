import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteFile } from "@/lib/storage";

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

  const allNews = await db.table("News").list();
  allNews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return NextResponse.json({ news: allNews });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { title, excerpt, content, thumbnail_path, category, status } = await req.json();

  const validThumbnail =
    thumbnail_path === undefined ||
    thumbnail_path === "" ||
    (typeof thumbnail_path === "string" &&
      (/^\/uploads\/[A-Za-z0-9._-]+$/.test(thumbnail_path) || /^https:\/\//i.test(thumbnail_path)));
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    !title.trim() ||
    !content.trim() ||
    title.length > 180 ||
    content.length > 20000 ||
    (excerpt !== undefined && (typeof excerpt !== "string" || excerpt.length > 500)) ||
    (category !== undefined && (typeof category !== "string" || category.length > 80)) ||
    (status !== undefined && status !== "draft" && status !== "published") ||
    !validThumbnail
  ) {
    return NextResponse.json({ error: "Judul dan konten berita wajib diisi." }, { status: 400 });
  }

  // Generate URL slug
  const slug = String(title)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const newPost = await db.table("News").create({
    title: String(title).trim(),
    slug: `${slug}-${Date.now().toString(36)}`,
    excerpt: String(excerpt || "").trim(),
    content: String(content).trim(),
    thumbnail_path: typeof thumbnail_path === "string" ? thumbnail_path : "",
    category: typeof category === "string" && category.trim() ? category.trim() : "Umum",
    status: status === "draft" ? "draft" : "published",
    author_id: admin.id,
  });

  return NextResponse.json({ success: true, news: newPost });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { id, title, excerpt, content, thumbnail_path, category, status } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID berita diperlukan." }, { status: 400 });
  }

  const target = await db.table("News").get(id);
  if (!target) {
    return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
  }

  if (title !== undefined && (typeof title !== "string" || !title.trim() || title.length > 180)) {
    return NextResponse.json({ error: "Judul berita harus diisi (maksimal 180 karakter)." }, { status: 400 });
  }
  if (excerpt !== undefined && (typeof excerpt !== "string" || excerpt.length > 500)) {
    return NextResponse.json({ error: "Ringkasan maksimal 500 karakter." }, { status: 400 });
  }
  if (content !== undefined && (typeof content !== "string" || !content.trim() || content.length > 20000)) {
    return NextResponse.json({ error: "Konten wajib diisi dan maksimal 20.000 karakter." }, { status: 400 });
  }
  if (category !== undefined && (typeof category !== "string" || category.length > 80)) {
    return NextResponse.json({ error: "Kategori maksimal 80 karakter." }, { status: 400 });
  }
  if (status !== undefined && status !== "draft" && status !== "published") {
    return NextResponse.json({ error: "Status berita tidak valid." }, { status: 400 });
  }
  if (thumbnail_path !== undefined && typeof thumbnail_path !== "string") {
    return NextResponse.json({ error: "Path thumbnail tidak valid." }, { status: 400 });
  }
  if (
    typeof thumbnail_path === "string" &&
    thumbnail_path !== "" &&
    !/^\/uploads\/[A-Za-z0-9._-]+$/.test(thumbnail_path) &&
    !/^https:\/\//i.test(thumbnail_path)
  ) {
    return NextResponse.json({ error: "Thumbnail harus berupa path upload lokal atau URL HTTPS." }, { status: 400 });
  }

  const updates: any = {};
  if (title) updates.title = String(title).trim();
  if (excerpt !== undefined) updates.excerpt = String(excerpt).trim();
  if (content !== undefined) updates.content = String(content).trim();
  if (thumbnail_path !== undefined) updates.thumbnail_path = thumbnail_path;
  if (category) updates.category = category;
  if (status) updates.status = status;

  const updated = await db.table("News").update(id, updates);
  return NextResponse.json({ success: true, news: updated });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID berita wajib disertakan." }, { status: 400 });
  }

  const target = await db.table("News").get(id);
  if (!target) {
    return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
  }

  if (
    target.thumbnail_path &&
    (target.thumbnail_path.startsWith("/uploads/") ||
      target.thumbnail_path.startsWith("https://drive.google.com/"))
  ) {
    try {
      await deleteFile(target.thumbnail_path);
    } catch (error) {
      console.error("Gagal menghapus thumbnail berita:", error);
      return NextResponse.json({ error: "Thumbnail gagal dihapus; berita tidak jadi dihapus." }, { status: 502 });
    }
  }

  await db.table("News").delete(id);
  return NextResponse.json({ success: true, message: "Berita berhasil dihapus." });
}
