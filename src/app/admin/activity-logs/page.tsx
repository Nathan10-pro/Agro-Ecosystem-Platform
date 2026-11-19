"use client";

import { useState } from "react";
import { useBrowserPortalData } from "@/lib/portal/browser-data";

export default function ActivityLogsPage() {
  const { data, ready, error } = useBrowserPortalData();
  const [query, setQuery] = useState("");
  const logs = data.logs.filter((log) => `${log.actor} ${log.action} ${log.detail}`.toLowerCase().includes(query.toLowerCase()));
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Riwayat</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Log aktivitas</h1>
    <p className="mt-2 text-sm text-[#66736A]">Perubahan yang dilakukan di portal ini, tersimpan lokal di browser.</p>
    <input aria-label="Cari aktivitas" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari aktivitas..." className="mt-5 w-full border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm sm:max-w-md" />
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Memuat aktivitas...</p> : <div className="mt-4 divide-y divide-[#EDF0ED] border border-[#DDE3DD] bg-white">
      {logs.map((log) => <article key={log.id} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr]"><p className="text-xs text-[#66736A]">{new Date(log.created_at).toLocaleString("id-ID")}</p><div><h2 className="text-sm font-semibold text-[#0F3D2E]">{log.action}</h2><p className="mt-1 text-sm text-[#536158]">{log.detail}</p><p className="mt-1 text-xs text-[#66736A]">Oleh {log.actor}</p></div></article>)}
      {logs.length === 0 && <p className="p-5 text-sm text-[#66736A]">Tidak ada aktivitas yang cocok.</p>}
    </div>}
  </section>;
}
