"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Eye, Loader2, Newspaper, Pencil, Plus, Trash2, Upload, X } from "lucide-react";

interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  category: string;
  status: "draft" | "published";
  created_at: string;
}

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  thumbnail_path: "",
  category: "Umum",
  status: "draft" as "draft" | "published",
};

export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsRecord[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadNews() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/news", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Daftar berita gagal dimuat.");
      setNews(data.news);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Daftar berita gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadNews(); }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId("");
    setPreview(false);
  }

  function editNews(item: NewsRecord) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      excerpt: item.excerpt || "",
      content: item.content,
      thumbnail_path: item.thumbnail_path || "",
      category: item.category || "Umum",
      status: item.status,
    });
    setPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadThumbnail(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const payload = new FormData();
      payload.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: payload });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gambar gagal diunggah.");
      setForm((current) => ({ ...current, thumbnail_path: data.url }));
      setMessage("Thumbnail berhasil diunggah.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Gambar gagal diunggah.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function saveNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/news", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Berita gagal disimpan.");
      setMessage(editingId ? "Perubahan berita berhasil disimpan." : "Berita berhasil dibuat.");
      resetForm();
      await loadNews();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Berita gagal disimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteNews(item: NewsRecord) {
    if (!window.confirm(`Hapus berita "${item.title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/news?id=${encodeURIComponent(item.id)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Berita gagal dihapus.");
      setMessage("Berita berhasil dihapus.");
      if (editingId === item.id) resetForm();
      await loadNews();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Berita gagal dihapus.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#52B788]">Publikasi</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#1B4332]">Berita & Konten</h1>
        <p className="mt-2 text-sm text-[#1B4332]/60">Buat berita, simpan sebagai draft, atau tampilkan langsung di halaman utama.</p>
      </header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{message}</p>}

      <form onSubmit={saveNews} className="space-y-4 rounded-2xl border border-[#1B4332]/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-semibold text-[#1B4332]"><Newspaper className="h-4 w-4" /> {editingId ? "Ubah berita" : "Tulis berita baru"}</h2>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPreview((value) => !value)} className="inline-flex items-center gap-1 rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm text-[#1B4332]"><Eye className="h-4 w-4" /> {preview ? "Edit" : "Pratinjau"}</button>
            {editingId && <button type="button" onClick={resetForm} aria-label="Batalkan edit" className="rounded-lg border border-[#1B4332]/20 p-2 text-[#1B4332]"><X className="h-4 w-4" /></button>}
          </div>
        </div>
        {preview ? (
          <article className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-[#1B4332]/10">
            {form.thumbnail_path && <img src={form.thumbnail_path} alt="" className="aspect-[16/7] w-full object-cover" />}
            <div className="space-y-3 p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2D6A4F]">{form.category} · {form.status === "published" ? "Dipublikasikan" : "Draft"}</p>
              <h3 className="font-serif text-2xl font-bold text-[#1B4332]">{form.title || "Judul berita"}</h3>
              <p className="text-sm text-[#1B4332]/60">{form.excerpt || "Ringkasan berita"}</p>
              <p className="whitespace-pre-wrap text-sm leading-7 text-[#1B4332]/80">{form.content || "Konten berita"}</p>
            </div>
          </article>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-xs font-medium text-[#1B4332]/70 md:col-span-2">Judul
                <input required maxLength={180} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
              </label>
              <label className="text-xs font-medium text-[#1B4332]/70">Kategori
                <input maxLength={80} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
              </label>
              <label className="text-xs font-medium text-[#1B4332]/70">Status
                <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as "draft" | "published" })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 bg-white px-3 py-2.5 text-sm">
                  <option value="draft">Draft</option><option value="published">Publikasikan</option>
                </select>
              </label>
              <label className="text-xs font-medium text-[#1B4332]/70 md:col-span-2">Ringkasan
                <textarea maxLength={500} rows={2} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
              </label>
              <label className="text-xs font-medium text-[#1B4332]/70 md:col-span-2">Isi berita
                <textarea required maxLength={20000} rows={8} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
              </label>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#1B4332]/70">Thumbnail (JPG, PNG, atau WEBP; maks. 5 MB)
                  <span className="mt-1 flex flex-wrap items-center gap-3">
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadThumbnail(event)} className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#E8FFEF] file:px-3 file:py-2 file:text-[#1B4332]" />
                    {uploading && <Loader2 className="h-4 w-4 animate-spin text-[#2D6A4F]" />}
                    {form.thumbnail_path && <span className="inline-flex items-center gap-1 text-xs text-[#2D6A4F]"><Upload className="h-3 w-3" /> Siap dipakai</span>}
                  </span>
                </label>
                {form.thumbnail_path && <img src={form.thumbnail_path} alt="Pratinjau thumbnail yang dipilih" className="mt-3 h-28 w-48 rounded-lg object-cover" />}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-lg bg-[#1B4332] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {saving ? "Menyimpan…" : editingId ? "Simpan perubahan" : "Simpan berita"}
              </button>
              {editingId && <button type="button" onClick={resetForm} className="rounded-lg border border-[#1B4332]/20 px-4 py-2.5 text-sm text-[#1B4332]">Batal</button>}
            </div>
          </>
        )}
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold text-[#1B4332]">Semua berita ({news.length})</h2>
        {loading ? <div className="flex items-center gap-2 rounded-xl bg-white p-8 text-sm text-[#1B4332]/60"><Loader2 className="h-4 w-4 animate-spin" /> Memuat berita…</div> : news.length === 0 ? (
          <p className="rounded-xl bg-white p-10 text-center text-sm text-[#1B4332]/50">Belum ada berita. Gunakan formulir di atas untuk membuat artikel pertama.</p>
        ) : news.map((item) => (
          <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-[#1B4332]/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            {item.thumbnail_path && <img src={item.thumbnail_path} alt="" className="h-24 w-full rounded-lg object-cover sm:w-36" />}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${item.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{item.status === "published" ? "Dipublikasikan" : "Draft"}</span><span className="text-xs text-[#1B4332]/50">{item.category}</span></div>
              <h3 className="mt-2 font-serif text-lg font-bold text-[#1B4332]">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-[#1B4332]/60">{item.excerpt}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button onClick={() => editNews(item)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D6A4F]"><Pencil className="h-4 w-4" /> Edit</button>
              <button onClick={() => void deleteNews(item)} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600"><Trash2 className="h-4 w-4" /> Hapus</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
