"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Shield } from "lucide-react";

interface RoleRecord {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: boolean;
}

const PERMISSIONS = [
  { value: "read", label: "Baca saja" },
  { value: "manage_news", label: "Kelola berita" },
  { value: "manage_users", label: "Kelola pengguna" },
  { value: "all", label: "Semua akses" },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [form, setForm] = useState({ name: "", description: "", permissions: "read" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadRoles() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/roles", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Daftar role gagal dimuat.");
      setRoles(data.roles);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Daftar role gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadRoles(); }, []);

  async function createRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Role gagal dibuat.");
      setForm({ name: "", description: "", permissions: "read" });
      setMessage("Role berhasil dibuat.");
      await loadRoles();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Role gagal dibuat.");
    } finally {
      setSaving(false);
    }
  }

  async function saveRole(role: RoleRecord) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/roles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: role.id, description: role.description, permissions: role.permissions }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Role gagal diperbarui.");
      setMessage(`Role "${role.name}" berhasil diperbarui.`);
      await loadRoles();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Role gagal diperbarui.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRole(role: RoleRecord) {
    if (!window.confirm(`Hapus role "${role.name}"?`)) return;
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/roles?id=${encodeURIComponent(role.id)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Role gagal dihapus.");
      setMessage("Role berhasil dihapus.");
      await loadRoles();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Role gagal dihapus.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#52B788]">Hak akses</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#1B4332]">Manajemen Role</h1>
        <p className="mt-2 text-sm text-[#1B4332]/60">Role sistem admin dan user tetap dilindungi agar tidak terhapus.</p>
      </header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{message}</p>}

      <form onSubmit={createRole} className="grid gap-3 rounded-2xl border border-[#1B4332]/10 bg-white p-5 shadow-sm md:grid-cols-2">
        <h2 className="flex items-center gap-2 font-semibold text-[#1B4332] md:col-span-2"><Shield className="h-4 w-4" /> Tambahkan role</h2>
        <label className="text-xs font-medium text-[#1B4332]/70">Nama role
          <input required pattern="[A-Za-z0-9_-]{2,30}" title="2-30 huruf, angka, tanda hubung, atau garis bawah" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70">Permission
          <select value={form.permissions} onChange={(event) => setForm({ ...form, permissions: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 bg-white px-3 py-2 text-sm">
            {PERMISSIONS.map((permission) => <option key={permission.value} value={permission.value}>{permission.label}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70 md:col-span-2">Deskripsi
          <input maxLength={250} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm" />
        </label>
        <button disabled={saving} className="rounded-lg bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 md:col-span-2">{saving ? "Menyimpan…" : "Buat role"}</button>
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold text-[#1B4332]">Role terdaftar</h2>
        {loading ? <div className="flex items-center gap-2 rounded-xl bg-white p-8 text-sm text-[#1B4332]/60"><Loader2 className="h-4 w-4 animate-spin" /> Memuat role…</div> : roles.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-[#1B4332]/50">Belum ada role.</p>
        ) : roles.map((role) => (
          <article key={role.id} className="grid gap-4 rounded-2xl border border-[#1B4332]/10 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-2"><h3 className="font-semibold text-[#1B4332]">{role.name}</h3>{role.is_system && <span className="rounded-full bg-[#E8FFEF] px-2 py-0.5 text-[10px] font-bold uppercase text-[#2D6A4F]">Sistem</span>}</div>
              <label className="mt-2 block text-xs text-[#1B4332]/60">Deskripsi
                <input disabled={role.is_system} value={role.description || ""} onChange={(event) => setRoles((items) => items.map((item) => item.id === role.id ? { ...item, description: event.target.value } : item))} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm disabled:bg-gray-50" />
              </label>
            </div>
            <label className="text-xs text-[#1B4332]/60">Permission
              <select disabled={role.is_system} value={role.permissions || "read"} onChange={(event) => setRoles((items) => items.map((item) => item.id === role.id ? { ...item, permissions: event.target.value } : item))} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 bg-white px-3 py-2 text-sm disabled:bg-gray-50">
                {PERMISSIONS.map((permission) => <option key={permission.value} value={permission.value}>{permission.label}</option>)}
              </select>
            </label>
            <div className="flex gap-3">
              {!role.is_system && <button onClick={() => void saveRole(role)} disabled={saving} className="text-sm font-semibold text-[#2D6A4F] disabled:opacity-50">Simpan</button>}
              {!role.is_system && <button onClick={() => void deleteRole(role)} className="text-sm font-semibold text-red-600">Hapus</button>}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
