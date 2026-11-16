"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/portal-format";

type Product = { id: string; name: string; category: string; description: string; unit: string; price: number; available_stock: number; minimum_order_quantity: number; specifications: Record<string, unknown> };
export default function PartnerProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [slot, setSlot] = useState("subuh");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    Promise.all([fetch("/api/portal/products"), fetch("/api/portal/summary")]).then(async ([productsResponse, summaryResponse]) => {
      const productResult = await productsResponse.json();
      const summaryResult = await summaryResponse.json();
      if (!productsResponse.ok) throw new Error(productResult.error);
      if (!summaryResponse.ok) throw new Error(summaryResult.error);
      setProducts(productResult.products);
      setAccountStatus(summaryResult.profile.account_status);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Katalog belum dapat dimuat."));
  }, []);
  const selected = useMemo(() => products.flatMap((product) => {
    const quantity = Number(quantities[product.id] || 0);
    return quantity > 0 ? [{ product, quantity }] : [];
  }), [products, quantities]);
  const subtotal = selected.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  async function submitOrder() {
    setError(""); setStatus(""); setBusy(true);
    try {
      const response = await fetch("/api/portal/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivery_slot: slot, notes, items: selected.map(({ product, quantity }) => ({ product_id: product.id, quantity })) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Pesanan tidak dapat dikirim.");
      setStatus("Pesanan berhasil diajukan. Tim MAN3 akan meninjau permintaan Anda.");
      setQuantities({});
      router.push("/mitra/orders");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Pesanan tidak dapat dikirim.");
    } finally { setBusy(false); }
  }

  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Produk MAN3</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Katalog & pemesanan</h1>
    <p className="mt-2 text-sm text-[#66736A]">Harga dan ketersediaan ditampilkan sesuai data produk saat ini. Stok diperiksa kembali saat pesanan diproses.</p>
    {accountStatus !== "active" && <p className="mt-5 border border-[#D7C6A0] bg-[#FCF8ED] p-4 text-sm text-[#705A2A]">Akun mitra belum aktif. Katalog dapat dilihat, tetapi pesanan hanya dapat diajukan oleh mitra yang telah disetujui.</p>}
    {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {status && <p role="status" className="mt-5 border border-[#A9C6B1] bg-[#F2F7F2] p-4 text-sm text-[#0F3D2E]">{status}</p>}
    <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-3 md:grid-cols-2">{products.map((product) => <article key={product.id} className="border border-[#DDE3DD] bg-white p-5">
        <p className="text-xs text-[#66736A]">{product.category}</p><h2 className="mt-2 font-serif text-xl text-[#0F3D2E]">{product.name}</h2>
        <p className="mt-2 text-sm leading-6 text-[#66736A]">{product.description || "Spesifikasi produk tersedia melalui tim MAN3."}</p>
        {Object.keys(product.specifications || {}).length > 0 && <dl className="mt-3 space-y-1 text-xs text-[#536158]">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="flex gap-2"><dt className="font-semibold">{key}:</dt><dd>{String(value)}</dd></div>)}</dl>}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#EDF0ED] pt-3"><div><p className="font-semibold text-[#0F3D2E]">{formatCurrency(product.price)} / {product.unit}</p><p className="mt-1 text-xs text-[#66736A]">Tersedia {product.available_stock} · Minimum {product.minimum_order_quantity}</p></div>
          <label className="text-xs text-[#66736A]">Jumlah<input type="number" min={product.minimum_order_quantity} max={product.available_stock} step="any" value={quantities[product.id] || ""} onChange={(event) => setQuantities((current) => ({ ...current, [product.id]: event.target.value }))} disabled={accountStatus !== "active" || product.available_stock <= 0} className="mt-1 w-24 border border-[#C9D2CB] px-2 py-2 text-sm text-[#27362D] disabled:bg-[#F3F4F2]" /></label>
        </div>
      </article>)}
      {!products.length && !error && <p className="border border-[#DDE3DD] bg-white p-5 text-sm text-[#66736A]">Belum ada produk yang tersedia.</p>}</div>
      <aside className="border border-[#DDE3DD] bg-white p-5 lg:sticky lg:top-6"><h2 className="font-semibold text-[#0F3D2E]">Pesanan baru</h2>
        {selected.length ? <ul className="mt-4 divide-y divide-[#EDF0ED]">{selected.map(({ product, quantity }) => <li key={product.id} className="flex justify-between gap-3 py-2 text-sm"><span>{product.name} × {quantity}</span><span>{formatCurrency(product.price * quantity)}</span></li>)}</ul> : <p className="mt-3 text-sm text-[#66736A]">Pilih jumlah produk untuk memulai.</p>}
        <p className="mt-4 flex justify-between border-t border-[#DDE3DD] pt-3 text-sm font-semibold"><span>Subtotal estimasi</span><span>{formatCurrency(subtotal)}</span></p><p className="mt-1 text-xs text-[#66736A]">Pajak dihitung pada saat pengajuan. Pengiriman ditentukan terpisah.</p>
        <label className="mt-4 block text-sm">Slot pengiriman<select value={slot} onChange={(event) => setSlot(event.target.value)} className="mt-2 w-full border border-[#C9D2CB] bg-white px-3 py-2.5"><option value="subuh">Subuh</option><option value="siang">Siang</option></select></label>
        <label className="mt-4 block text-sm">Catatan<textarea value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={1000} rows={3} className="mt-2 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
        <button onClick={submitOrder} disabled={!selected.length || busy || accountStatus !== "active"} className="mt-4 w-full bg-[#0F3D2E] px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">{busy ? "Mengirim pesanan..." : "Ajukan pesanan"}</button>
        {accountStatus !== "active" && <p className="mt-2 text-xs text-[#66736A]">Fitur pesan tersedia setelah akun disetujui.</p>}
      </aside>
    </div>
  </section>;
}
