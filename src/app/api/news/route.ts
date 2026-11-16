import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { initialNews } from "@/data/news";

export async function GET() {
  try {
    const allNews = await db.table("News").list();
    const published = (allNews || []).filter((n) => n.status === "published");
    
    if (published.length > 0) {
      published.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const news = published.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt || "",
        thumbnail_path: item.thumbnail_path || "",
        category: item.category || "Agro-Ekologi",
        created_at: item.created_at,
        author_name: item.author_name || "Tim Redaksi Edukasi MAN3",
        content: item.content || item.excerpt || "",
      }));
      return NextResponse.json({ news });
    }
  } catch (err: any) {
    console.warn("Public news list fallback to initialNews:", err?.message || err);
  }

  // Resilient fallback: selalu sediakan 3 artikel editorial resmi jika database belum tersedia
  const fallbackNews = initialNews.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    thumbnail_path: item.thumbnail_path,
    category: item.category,
    created_at: item.created_at,
    author_name: item.author_name,
    content: item.content,
  }));

  return NextResponse.json({ news: fallbackNews });
}
