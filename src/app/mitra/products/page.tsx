"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addPortalLog, DemoOrder, useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";
import { formatCurrency } from "@/lib/portal-format";

export default function PartnerProductsPage() {
  const router = useRouter();
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [slot, setSlot] = useState("Subuh");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const session = typeof window === "undefined" ? null : readDemoPortalSession();
  const partner = data.partners.find((item) => item.profile_id === session?.id);
  const active = partner?.status === "active";
  const products = data.products.filter((product) => product.status === "available" && product.stock > 0 && `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()));
  const selected = useMemo(() => products.flatMap((product) => {
    const quantity = Number(quantities[product.id] || 0);
    return quantity > 0 ? [{ product, quantity }] : [];
  }), [products, quantities]);
  const subtotal = selected.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function submitOrder() {
    if (!partner || !active) {
      setMessage("Akun demo mitra belum aktif. Minta admin mengaktifkan mitra sebelum memesan.");
      return;
    }
    if (!selected.length) {
      setMessage("Pilih setidaknya satu produk dan jumlah yang valid.");
      return;
    }
    const invalid = selected.find(({ product, quantity }) => quantity < product.minimum || quantity > product.stock);
    if (invalid) {
      setMessage(`${invalid.product.name}: jumlah harus ${invalid.product.minimum}–${invalid.product.stock} ${invalid.product.unit}.`);
      return;
    }
    const now = new Date().toISOString();
    const newOrder: DemoOrder = {
      id: `order-${Date.now()}`,
      order_number: `DEMO-${Date.now().toString().slice(-6)}`,
      partner_id: partner.id,
      created_at: now,
      status: "submitted",
      delivery_slot: slot,
      notes: notes.trim(),
      items: selected.map(({ product, quantity }) => ({ product_id: product.id, name: product.name, quantity, price: product.price })),
      total: subtotal,
      tracking: [{ status: "submitted", note: "Pesanan dibuat oleh mitra demo.", created_at: now }],
    };
    const saved = updateData((current) => addPortalLog({
      ...current,
      orders: [newOrder, ...current.orders],
    }, partner.full_name, "Pesanan demo dibuat", newOrder.order_number));
    if (saved) {
      setMessage("Pesanan demo berhasil dibuat dan tersimpan di browser ini.");
      setQuantities({});
      router.push("/mitra/orders");
    }
  }

  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!ready || !partner) return <p role="status" className="py-16 text-sm text-[#66736A]">Memuat katalog demo...</p>;
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Katalog demo</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Katalog & pemesanan</h1>
    <p className="mt-2 text-sm text-[#66736A]">Pilih produk untuk membuat pesanan.</p>
    {!active && <p className="mt-4 border border-[#D7C6A0] bg-[#FCF8ED] p-4 text-sm text-[#705A2A]">Akun menunggu persetujuan admin.</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        <input aria-label="Cari produk" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk atau kategori..." className="mb-3 w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" />
        <div className="grid gap-3 md:grid-cols-2">{products.map((product) => <article key={product.id} className="border border-[#DDE3DD] bg-white p-5"><p className="text-xs text-[#66736A]">{product.category}</p><h2 className="mt-2 font-serif text-xl text-[#0F3D2E]">{product.name}</h2><p className="mt-2 text-sm leading-6 text-[#66736A]">{product.description}</p><div className="mt-4 flex items-end justify-between gap-3 border-t border-[#EDF0ED] pt-3"><div><p className="font-semibold text-[#0F3D2E]">{formatCurrency(product.price)} / {product.unit}</p><p className="mt-1 text-xs text-[#66736A]">Stok {product.stock} · Minimum {product.minimum}</p></div><label className="text-xs text-[#66736A]">Jumlah<input type="number" min={product.minimum} max={product.stock} step="1" value={quantities[product.id] || ""} onChange={(event) => setQuantities({ ...quantities, [product.id]: event.target.value })} disabled={!active} className="mt-1 block w-24 border border-[#C9D2CB] px-2 py-2 text-sm disabled:bg-[#F3F4F2]" /></label></div></article>)}
          {products.length === 0 && <p className="border border-[#DDE3DD] bg-white p-5 text-sm text-[#66736A]">Produk tidak ditemukan atau tidak tersedia.</p>}
        </div>
      </div>
      <aside className="border border-[#DDE3DD] bg-white p-5 lg:sticky lg:top-6"><h2 className="font-semibold text-[#0F3D2E]">Pesanan baru</h2>{selected.length ? <ul className="mt-4 divide-y divide-[#EDF0ED]">{selected.map(({ product, quantity }) => <li key={product.id} className="flex justify-between gap-3 py-2 text-sm"><span>{product.name} × {quantity}</span><span>{formatCurrency(product.price * quantity)}</span></li>)}</ul> : <p className="mt-3 text-sm text-[#66736A]">Pilih jumlah produk untuk memulai.</p>}
        <p className="mt-4 flex justify-between border-t border-[#DDE3DD] pt-3 text-sm font-semibold"><span>Total</span><span>{formatCurrency(subtotal)}</span></p>
        <label className="mt-4 block text-sm">Slot pengiriman<select value={slot} onChange={(event) => setSlot(event.target.value)} className="mt-2 w-full border border-[#C9D2CB] bg-white px-3 py-2.5"><option>Subuh</option><option>Siang</option></select></label>
        <label className="mt-4 block text-sm">Catatan<textarea value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={500} rows={3} className="mt-2 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
        <button onClick={submitOrder} disabled={!selected.length || !active} className="mt-4 w-full bg-[#0F3D2E] px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Ajukan pesanan</button>
      </aside>
    </div>
  </section>;
}
