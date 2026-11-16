"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/portal-format";

type Order = { order_number: string; created_at: string; total_amount: number; order_status: string; is_demo: boolean; partner: { company_name: string }; order_items: Array<{ product_name_snapshot: string; quantity: number; line_total: number }> };
export default function AdminReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [movements, setMovements] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [includeDemo, setIncludeDemo] = useState(false);
  useEffect(() => {
    Promise.all([fetch("/api/admin/portal/orders"), fetch("/api/admin/portal/inventory-movements")]).then(async ([ordersResponse, movementsResponse]) => {
      const orderResult = await ordersResponse.json();
      const movementResult = await movementsResponse.json();
      if (!ordersResponse.ok) throw new Error(orderResult.error);
      if (!movementsResponse.ok) throw new Error(movementResult.error);
      setOrders(orderResult.orders);
      setMovements(movementResult.movements);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Laporan belum dapat dimuat."));
  }, []);
  const filtered = useMemo(() => orders.filter((order) =>
    (includeDemo || !order.is_demo) &&
    (!from || order.created_at.slice(0, 10) >= from) && (!to || order.created_at.slice(0, 10) <= to)
  ), [orders, from, to, includeDemo]);
  const monthly = new Map<string, { count: number; total: number }>();
  const products = new Map<string, number>();
  for (const order of filtered) {
    const month = order.created_at.slice(0, 7);
    const current = monthly.get(month) || { count: 0, total: 0 };
    current.count += 1; current.total += Number(order.total_amount); monthly.set(month, current);
    for (const item of order.order_items) products.set(item.product_name_snapshot, (products.get(item.product_name_snapshot) || 0) + Number(item.quantity));
  }
  const topProducts = [...products.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const visibleMovements = movements.filter((movement) =>
    (includeDemo || !movement.is_demo) &&
    (!from || movement.created_at.slice(0, 10) >= from) &&
    (!to || movement.created_at.slice(0, 10) <= to)
  );
  const completed = filtered.filter((order) => order.order_status === "completed").length;
  const cancelled = filtered.filter((order) => order.order_status === "cancelled").length;
  function exportCsv() {
    const rows = [["Bulan","Jumlah Pesanan","Nilai Pesanan"], ...[...monthly.entries()].map(([month, value]) => [month, String(value.count), String(value.total)])];
    const csv = rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "laporan-pesanan-man3.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Analisis operasional</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Laporan & analitik</h1></div><button onClick={exportCsv} disabled={!filtered.length} className="border border-[#BFCABF] px-4 py-2.5 text-sm text-[#0F3D2E] disabled:opacity-40">Ekspor CSV bulanan</button></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2"><label className="text-xs text-[#66736A]">Dari<input type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /></label><label className="text-xs text-[#66736A]">Sampai<input type="date" value={to} onChange={(event) => setTo(event.target.value)} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /></label><label className="flex items-center gap-2 text-sm text-[#536158] sm:col-span-2"><input type="checkbox" checked={includeDemo} onChange={(event) => setIncludeDemo(event.target.checked)} />Sertakan data demo dalam laporan</label></div>
    {includeDemo && <p className="mt-3 text-xs text-[#80543A]">Laporan ini menyertakan catatan yang ditandai DEMO DATA.</p>}
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!error && filtered.length === 0 ? <p className="mt-6 border border-[#DDE3DD] bg-white p-6 text-sm text-[#66736A]">Belum ada data pesanan pada rentang tanggal ini.</p> : <div className="mt-6 grid gap-5 lg:grid-cols-2">
      <section className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Pesanan dan nilai per bulan</h2><div className="mt-3 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-[#EDF0ED] text-xs text-[#66736A]"><tr><th>Bulan</th><th>Pesanan</th><th>Nilai</th></tr></thead><tbody className="divide-y divide-[#EDF0ED]">{[...monthly.entries()].sort(([a],[b]) => b.localeCompare(a)).map(([month, value]) => <tr key={month}><td>{month}</td><td>{value.count}</td><td>{formatCurrency(value.total)}</td></tr>)}</tbody></table></div></section>
      <section className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Produk paling dipesan</h2>{topProducts.length ? <ol className="mt-3 space-y-3">{topProducts.map(([name, quantity]) => <li key={name} className="flex justify-between gap-3 border-b border-[#EDF0ED] pb-2 text-sm"><span>{name}</span><strong>{quantity}</strong></li>)}</ol> : <p className="mt-3 text-sm text-[#66736A]">Belum ada data produk.</p>}</section>
      <section className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Penyelesaian & pembatalan</h2><dl className="mt-3 space-y-3 text-sm"><Line label="Total pesanan periode ini" value={String(filtered.length)} /><Line label="Pesanan selesai" value={`${completed} (${filtered.length ? Math.round(completed / filtered.length * 100) : 0}%)`} /><Line label="Pesanan dibatalkan" value={String(cancelled)} /><Line label="Nilai pesanan tercatat" value={formatCurrency(filtered.reduce((sum, order) => sum + Number(order.total_amount), 0))} /></dl></section>
      <section className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Aktivitas mitra</h2><p className="mt-3 text-sm text-[#66736A]">{new Set(filtered.map((order) => order.partner?.company_name).filter(Boolean)).size} mitra memiliki pesanan pada periode yang dipilih.</p></section>
      <section className="border border-[#DDE3DD] bg-white p-5 lg:col-span-2"><h2 className="font-semibold text-[#0F3D2E]">Pergerakan inventori terbaru</h2>{visibleMovements.length ? <div className="mt-3 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-[#EDF0ED] text-xs text-[#66736A]"><tr><th>Waktu</th><th>Produk</th><th>Jenis</th><th>Jumlah</th><th>Referensi</th></tr></thead><tbody className="divide-y divide-[#EDF0ED]">{visibleMovements.slice(0, 20).map((movement) => <tr key={movement.id}><td>{new Date(movement.created_at).toLocaleString("id-ID")}</td><td>{movement.product?.name || "Produk"} {movement.is_demo && <span className="text-[10px] font-semibold text-[#80543A]">DEMO</span>}</td><td>{movement.movement_type}</td><td>{movement.quantity}</td><td>{movement.reference_order_id || movement.notes || "—"}</td></tr>)}</tbody></table></div> : <p className="mt-3 text-sm text-[#66736A]">Belum ada pergerakan stok pada rentang data ini.</p>}</section>
    </div>}
  </section>;
}
function Line({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4"><dt className="text-[#66736A]">{label}</dt><dd className="font-medium text-[#27362D]">{value}</dd></div>; }
