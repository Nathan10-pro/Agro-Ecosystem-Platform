"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatCurrency } from "@/lib/portal-format";

type Product = { id: string; name: string; category: string; description: string; unit: string; price: number; available_stock: number; minimum_order_quantity: number; specifications: Record<string, unknown>; image_url: string | null; status: string; is_demo: boolean };
const emptyForm = { name: "", category: "", description: "", unit: "", price: "", available_stock: "0", minimum_order_quantity: "1", specifications: "{}", image_url: "", status: "available", stock_notes: "" };
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<any>(emptyForm);
  const [editing, setEditing] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    const response = await fetch("/api/admin/portal/products"); const result = await response.json();
    if (!response.ok) throw new Error(result.error); setProducts(result.products);
  }
  useEffect(() => { load().catch((cause) => setError(cause.message || "Produk tidak dapat dimuat.")); }, []);
  function edit(product: Product) {
    setEditing(product.id);
    setForm({ ...product, price: String(product.price), available_stock: String(product.available_stock), minimum_order_quantity: String(product.minimum_order_quantity), specifications: JSON.stringify(product.specifications || {}, null, 2), image_url: product.image_url || "", stock_notes: "" });
    setMessage(""); setError("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      let specifications: unknown;
      try { specifications = JSON.parse(form.specifications); } catch { throw new Error("Spesifikasi harus berupa JSON yang valid."); }
      if (!specifications || Array.isArray(specifications) || typeof specifications !== "object") throw new Error("Spesifikasi harus berupa objek JSON.");
      const body = { ...form, id: editing || undefined, specifications };
      const response = await fetch("/api/admin/portal/products", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Produk gagal disimpan.");
      setMessage(editing ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
      setEditing(""); setForm(emptyForm); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Produk gagal disimpan."); }
    finally { setBusy(false); }
  }
  async function archive(product: Product) {
    const response = await fetch("/api/admin/portal/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...product, available_stock: undefined, status: "archived" }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Produk gagal diarsipkan."); return; }
    await load();
  }
  function set<K extends keyof typeof emptyForm>(key: K, value: string) { setForm((current: typeof emptyForm) => ({ ...current, [key]: value })); }
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Katalog operasional</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Produk & persediaan</h1><p className="mt-2 text-sm text-[#66736A]">Jumlah stok merupakan catatan operasional yang diperbarui admin, bukan sensor inventori fisik.</p>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}{message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    <form onSubmit={submit} className="mt-5 grid gap-3 border border-[#DDE3DD] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="Nama produk" value={form.name} onChange={(value) => set("name", value)} />
      <Field label="Kategori" value={form.category} onChange={(value) => set("category", value)} />
      <Field label="Satuan" value={form.unit} onChange={(value) => set("unit", value)} />
      <Field label="Harga mitra (Rp)" type="number" value={form.price} onChange={(value) => set("price", value)} />
      <Field label="Minimum order" type="number" value={form.minimum_order_quantity} onChange={(value) => set("minimum_order_quantity", value)} />
      <Field label="Stok tersedia" type="number" value={form.available_stock} onChange={(value) => set("available_stock", value)} />
      <Field label="Catatan perubahan stok" value={form.stock_notes} onChange={(value) => set("stock_notes", value)} />
      <Field label="URL gambar (opsional)" value={form.image_url} onChange={(value) => set("image_url", value)} />
      <label className="block text-xs text-[#66736A]">Status<select value={form.status} onChange={(event) => set("status", event.target.value)} className="mt-1 w-full border border-[#C9D2CB] bg-white px-2 py-2 text-sm"><option value="available">Tersedia</option><option value="unavailable">Tidak tersedia</option><option value="archived">Arsip</option></select></label>
      <label className="block text-xs text-[#66736A] sm:col-span-2">Deskripsi<textarea rows={2} value={form.description} onChange={(event) => set("description", event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
      <label className="block text-xs text-[#66736A] sm:col-span-2">Spesifikasi (JSON object)<textarea rows={2} value={form.specifications} onChange={(event) => set("specifications", event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 font-mono text-xs" /></label>
      <div className="flex gap-2 sm:col-span-2 lg:col-span-4"><button disabled={busy} className="bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Menyimpan..." : editing ? "Simpan perubahan" : "Tambah produk"}</button>{editing && <button type="button" onClick={() => { setEditing(""); setForm(emptyForm); }} className="border border-[#C9D2CB] px-4 py-2.5 text-sm">Batal</button>}</div>
    </form>
    <div className="mt-5 overflow-x-auto border border-[#DDE3DD] bg-white"><table className="min-w-[850px] text-left text-sm"><thead className="border-b border-[#DDE3DD] bg-[#F7F8F5] text-xs uppercase text-[#66736A]"><tr><th className="px-4">Produk</th><th className="px-4">Kategori</th><th className="px-4">Harga</th><th className="px-4">Stok tercatat</th><th className="px-4">Minimum</th><th className="px-4">Status</th><th className="px-4">Aksi</th></tr></thead><tbody className="divide-y divide-[#EDF0ED]">{products.map((product) => <tr key={product.id}><td className="px-4 font-medium">{product.name} {product.is_demo && <span className="text-[10px] font-semibold text-[#80543A]">DEMO</span>}</td><td className="px-4">{product.category}</td><td className="px-4">{formatCurrency(product.price)} / {product.unit}</td><td className="px-4">{product.available_stock}</td><td className="px-4">{product.minimum_order_quantity}</td><td className="px-4">{product.status}</td><td className="px-4"><button onClick={() => edit(product)} className="mr-3 text-[#0F3D2E] underline underline-offset-4">Edit</button>{product.status !== "archived" && <button onClick={() => archive(product)} className="text-[#80543A] underline underline-offset-4">Arsipkan</button>}</td></tr>)}</tbody></table>
      {products.length === 0 && <p className="p-5 text-sm text-[#66736A]">Belum ada data produk.</p>}</div>
  </section>;
}
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-xs text-[#66736A]">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>;
}
