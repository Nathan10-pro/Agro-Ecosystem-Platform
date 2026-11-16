"use client";

import { useEffect, useState } from "react";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/portal/activity-logs").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setLogs(result.logs);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Log aktivitas gagal dimuat."));
  }, []);
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Audit sistem</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Log aktivitas admin</h1><p className="mt-2 text-sm text-[#66736A]">Catatan dibuat di database saat tindakan operasional penting terjadi dan tidak dapat diubah melalui portal.</p>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="mt-6 overflow-x-auto border border-[#DDE3DD] bg-white"><table className="min-w-[760px] text-left text-sm"><thead className="border-b border-[#DDE3DD] bg-[#F7F8F5] text-xs uppercase text-[#66736A]"><tr><th className="px-4">Admin</th><th className="px-4">Tindakan</th><th className="px-4">Target</th><th className="px-4">Detail</th><th className="px-4">Waktu</th></tr></thead><tbody className="divide-y divide-[#EDF0ED]">{logs.map((log) => <tr key={log.id}><td className="px-4">{log.admin?.full_name || "Akun sistem"}{log.is_demo && <span className="ml-1 text-[10px] font-semibold text-[#80543A]">DEMO</span>}<br /><span className="text-xs text-[#66736A]">{log.admin?.email || ""}</span></td><td className="px-4 font-medium">{log.action}</td><td className="px-4">{log.target_type} · {log.target_id || "—"}</td><td className="max-w-sm px-4"><pre className="whitespace-pre-wrap break-words font-sans text-xs">{JSON.stringify(log.details)}</pre></td><td className="px-4">{new Date(log.created_at).toLocaleString("id-ID")}</td></tr>)}</tbody></table>{logs.length === 0 && !error && <p className="p-5 text-sm text-[#66736A]">Belum ada aktivitas tercatat.</p>}</div>
  </section>;
}
