import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const allNews = await db.table("News").list();
    const published = allNews.filter((n) => n.status === "published");
    // Sort descending by created_at
    published.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const news = published.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt || "",
      thumbnail_path: item.thumbnail_path || "",
      category: item.category || "Umum",
      created_at: item.created_at,
      author_name: "Tim Editorial (simulasi)",
    }));
    return NextResponse.json({ news });
  } catch (err: any) {
    console.error("Public news list error:", err);
    return NextResponse.json({ error: "Berita sedang tidak dapat dimuat. Silakan coba lagi." }, { status: 500 });
  }
}
