"use client";

import { useMemo, useState } from "react";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { formatCurrency, statusLabels } from "@/lib/portal-format";

export default function AdminReportsPage() {
  const { data, ready, error } = useBrowserPortalData();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const orders = useMemo(() => data.orders.filter((order) => {
    const date = order.created_at.slice(0, 10);
    return (!from || date >= from) && (!to || date <= to);
  }), [data.orders, from, to]);
  const completedValue = orders.filter((order) => order.status === "completed").reduce((sum, order) => sum + order.total, 0);
  const pendingCount = orders.filter((order) => order.status === "submitted").length;
  const exportCsv = () => {
    const rows = [["Status", "Jumlah pesanan"], ...Object.entries(statusLabels).map(([status, label]) => [label, String(orders.filter((order) => order.status === status).length)])];
    const url = URL.createObjectURL(new Blob([rows.map((row) => row.join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan-demo-man3.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Analitik lokal</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Laporan operasional</h1></div><button onClick={exportCsv} className="border border-[#BFCABF] px-4 py-2.5 text-sm text-[#0F3D2E]">Ekspor CSV</button></div>
    <p className="mt-2 text-sm text-[#66736A]">Ringkasan pesanan dalam periode yang dipilih.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2"><label className="text-xs text-[#66736A]">Dari tanggal<input aria-label="Dari tanggal" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /></label><label className="text-xs text-[#66736A]">Sampai tanggal<input aria-label="Sampai tanggal" type="date" value={to} onChange={(event) => setTo(event.target.value)} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /></label></div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Menghitung laporan...</p> : <>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Pesanan dalam periode" value={orders.length} /><Metric label="Menunggu diproses" value={pendingCount} /><Metric label="Nilai semua pesanan" value={formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))} /><Metric label="Nilai selesai" value={formatCurrency(completedValue)} /></div>
      <div className="mt-6 border border-[#DDE3DD] bg-white p-5"><h2 className="font-serif text-xl text-[#0F3D2E]">Pesanan berdasarkan status</h2><div className="mt-4 space-y-3">{Object.entries(statusLabels).map(([status, label]) => {
        const count = orders.filter((order) => order.status === status).length;
        const width = orders.length ? `${Math.max(count / orders.length * 100, count ? 4 : 0)}%` : "0%";
        return <div key={status} className="grid grid-cols-[150px_1fr_32px] items-center gap-3 text-sm"><span>{label}</span><div className="h-2 bg-[#EDF0ED]"><div className="h-2 bg-[#0F3D2E]" style={{ width }} /></div><strong className="text-right">{count}</strong></div>;
      })}</div></div>
    </>}
  </section>;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="border border-[#DDE3DD] bg-white p-4"><p className="text-xs text-[#66736A]">{label}</p><p className="mt-2 text-xl font-semibold text-[#0F3D2E]">{value}</p></div>;
}
