"use client";

import { FormEvent, useState } from "react";
import { addPortalLog, DemoProduct, useBrowserPortalData } from "@/lib/portal/browser-data";
import { formatCurrency } from "@/lib/portal-format";

const blankProduct = { name: "", category: "", description: "", unit: "kg", price: "", stock: "0", minimum: "1", status: "available" as DemoProduct["status"] };

export default function AdminProductsPage() {
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [form, setForm] = useState(blankProduct);
  const [editing, setEditing] = useState("");
  const [message, setMessage] = useState("");

  function save(event: FormEvent) {
    event.preventDefault();
    const product: DemoProduct = {
      id: editing || `product-${Date.now()}`,
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      minimum: Number(form.minimum),
    };
    if (!product.name.trim() || !product.category.trim() || !Number.isFinite(product.price) || product.price < 0 || product.stock < 0 || product.minimum < 1) {
      setMessage("Lengkapi nama, kategori, harga, stok, dan minimum order dengan nilai yang valid.");
      return;
    }
    const saved = updateData((current) => addPortalLog({
      ...current,
      products: editing
        ? current.products.map((item) => item.id === editing ? product : item)
        : [product, ...current.products],
    }, "Admin Demo", editing ? "Produk diperbarui" : "Produk ditambahkan", product.name));
    if (saved) {
      setMessage(editing ? "Produk diperbarui di browser ini." : "Produk ditambahkan ke katalog demo.");
      setForm(blankProduct);
      setEditing("");
    }
  }

  function edit(product: DemoProduct) {
    setEditing(product.id);
    setForm({ name: product.name, category: product.category, description: product.description, unit: product.unit, price: String(product.price), stock: String(product.stock), minimum: String(product.minimum), status: product.status });
    setMessage("");
  }

  function archive(product: DemoProduct) {
    updateData((current) => addPortalLog({
      ...current,
      products: current.products.map((item) => item.id === product.id ? { ...item, status: "archived" } : item),
    }, "Admin Demo", "Produk diarsipkan", product.name));
  }

  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Katalog demo</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Produk & persediaan</h1>
    <p className="mt-2 text-sm text-[#66736A]">Kelola produk, harga, dan persediaan.</p>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    <form onSubmit={save} className="mt-5 grid gap-3 border border-[#DDE3DD] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="Nama produk" value={form.name} onChange={(name) => setForm({ ...form, name })} />
      <Field label="Kategori" value={form.category} onChange={(category) => setForm({ ...form, category })} />
      <Field label="Satuan" value={form.unit} onChange={(unit) => setForm({ ...form, unit })} />
      <Field label="Harga (Rp)" type="number" value={form.price} onChange={(price) => setForm({ ...form, price })} />
      <Field label="Stok" type="number" value={form.stock} onChange={(stock) => setForm({ ...form, stock })} />
      <Field label="Minimum order" type="number" value={form.minimum} onChange={(minimum) => setForm({ ...form, minimum })} />
      <label className="block text-xs text-[#66736A]">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as DemoProduct["status"] })} className="mt-1 w-full border border-[#C9D2CB] bg-white px-2 py-2 text-sm"><option value="available">Tersedia</option><option value="unavailable">Tidak tersedia</option><option value="archived">Arsip</option></select></label>
      <label className="block text-xs text-[#66736A] sm:col-span-2 lg:col-span-4">Deskripsi<textarea rows={2} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
      <div className="flex gap-2 sm:col-span-2 lg:col-span-4"><button className="bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white">{editing ? "Simpan perubahan" : "Tambah produk"}</button>{editing && <button type="button" onClick={() => { setEditing(""); setForm(blankProduct); }} className="border border-[#C9D2CB] px-4 py-2.5 text-sm">Batal</button>}</div>
    </form>
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Memuat katalog...</p> : <div className="mt-5 overflow-x-auto border border-[#DDE3DD] bg-white">
      <table className="min-w-[760px] w-full text-left text-sm"><thead className="border-b border-[#DDE3DD] bg-[#F7F8F5] text-xs uppercase text-[#66736A]"><tr>{["Produk", "Kategori", "Harga", "Stok", "Minimum", "Status", "Aksi"].map((item) => <th key={item} className="px-4 py-3">{item}</th>)}</tr></thead>
        <tbody className="divide-y divide-[#EDF0ED]">{data.products.map((product) => <tr key={product.id}><td className="px-4 py-3 font-medium">{product.name}</td><td className="px-4 py-3">{product.category}</td><td className="px-4 py-3">{formatCurrency(product.price)} / {product.unit}</td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3">{product.minimum}</td><td className="px-4 py-3">{product.status}</td><td className="px-4 py-3 whitespace-nowrap"><button onClick={() => edit(product)} className="mr-3 text-[#0F3D2E] underline">Edit</button>{product.status !== "archived" && <button onClick={() => archive(product)} className="text-[#80543A] underline">Arsipkan</button>}</td></tr>)}</tbody>
      </table>
      {data.products.length === 0 && <p className="p-5 text-sm text-[#66736A]">Belum ada produk.</p>}
    </div>}
  </section>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-xs text-[#66736A]">{label}<input required type={type} min={type === "number" ? 0 : undefined} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>;
}
