"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Search, UserPlus, Users } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role_id: string;
  role: string;
  status: "active" | "inactive";
  created_at: string;
}

interface RoleRecord {
  id: string;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role_id: "role-user" });
  const [creating, setCreating] = useState(false);

  async function loadUsers(search = query) {
    setLoading(true);
    setError("");
    try {
      const [userResponse, roleResponse] = await Promise.all([
        fetch(`/api/admin/users?q=${encodeURIComponent(search)}`, { cache: "no-store" }),
        fetch("/api/admin/roles", { cache: "no-store" }),
      ]);
      const userData = await userResponse.json();
      const roleData = await roleResponse.json();
      if (!userResponse.ok || !roleResponse.ok) {
        throw new Error(userData.error || roleData.error || "Daftar pengguna gagal dimuat.");
      }
      setUsers(userData.users);
      setRoles(roleData.roles);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Daftar pengguna gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers("");
  }, []);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Pengguna gagal ditambahkan.");
      setForm({ name: "", email: "", password: "", role_id: roles.find((role) => role.name === "user")?.id || "" });
      setMessage("Pengguna berhasil ditambahkan.");
      await loadUsers();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Pengguna gagal ditambahkan.");
    } finally {
      setCreating(false);
    }
  }

  async function updateUser(user: UserRecord) {
    setSavingId(user.id);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, role_id: user.role_id, status: user.status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Perubahan pengguna gagal disimpan.");
      setMessage("Perubahan pengguna tersimpan.");
      await loadUsers();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Perubahan pengguna gagal disimpan.");
    } finally {
      setSavingId("");
    }
  }

  async function deleteUser(user: UserRecord) {
    if (!window.confirm(`Hapus akun ${user.name} (${user.email})? Tindakan ini tidak dapat dibatalkan.`)) return;
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Pengguna gagal dihapus.");
      setMessage("Pengguna berhasil dihapus.");
      await loadUsers();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Pengguna gagal dihapus.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#52B788]">Akses & akun</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#1B4332]">Manajemen User</h1>
          <p className="mt-2 text-sm text-[#1B4332]/60">Cari pengguna, atur role dan status, atau buat akun baru.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-[#1B4332] shadow-sm">
          <Users className="h-4 w-4" /> {users.length} pengguna ditemukan
        </div>
      </header>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{message}</p>}

      <form onSubmit={createUser} className="grid gap-3 rounded-2xl border border-[#1B4332]/10 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-5">
        <h2 className="flex items-center gap-2 font-semibold text-[#1B4332] md:col-span-2 xl:col-span-5">
          <UserPlus className="h-4 w-4" /> Tambahkan pengguna
        </h2>
        <label className="text-xs font-medium text-[#1B4332]/70">Nama
          <input required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70">Email
          <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70">Password sementara
          <input required minLength={6} maxLength={72} type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70">Role
          <select value={form.role_id} onChange={(event) => setForm({ ...form, role_id: event.target.value })} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 bg-white px-3 py-2 text-sm">
            {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
          </select>
        </label>
        <button disabled={creating || roles.length === 0} className="self-end rounded-lg bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {creating ? "Menyimpan…" : "Buat akun"}
        </button>
      </form>

      <section className="overflow-hidden rounded-2xl border border-[#1B4332]/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B4332]/10 p-4">
          <h2 className="font-semibold text-[#1B4332]">Daftar pengguna</h2>
          <form onSubmit={(event) => { event.preventDefault(); void loadUsers(); }} className="flex gap-2">
            <label className="sr-only" htmlFor="user-search">Cari nama atau email</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B4332]/40" />
              <input id="user-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau email" className="rounded-lg border border-[#1B4332]/20 py-2 pl-9 pr-3 text-sm" />
            </div>
            <button className="rounded-lg border border-[#1B4332]/20 px-4 text-sm font-medium text-[#1B4332]">Cari</button>
          </form>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-[#1B4332]/60"><Loader2 className="h-4 w-4 animate-spin" /> Memuat pengguna…</div>
        ) : users.length === 0 ? (
          <p className="p-12 text-center text-sm text-[#1B4332]/50">Belum ada pengguna yang cocok.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#F5FDF8] text-xs uppercase text-[#1B4332]/60">
                <tr><th className="px-5 py-3">Pengguna</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Terdaftar</th><th className="px-5 py-3">Aksi</th></tr>
              </thead>
              <tbody className="divide-y divide-[#1B4332]/5">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-4"><div className="font-semibold text-[#1B4332]">{user.name}</div><div className="text-xs text-[#1B4332]/50">{user.email}</div></td>
                    <td className="px-5 py-4">
                      <label className="sr-only" htmlFor={`role-${user.id}`}>Role {user.name}</label>
                      <select id={`role-${user.id}`} value={user.role_id} onChange={(event) => setUsers((items) => items.map((item) => item.id === user.id ? { ...item, role_id: event.target.value } : item))} className="rounded-lg border border-[#1B4332]/20 bg-white px-2 py-1.5">
                        {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <label className="sr-only" htmlFor={`status-${user.id}`}>Status {user.name}</label>
                      <select id={`status-${user.id}`} value={user.status} onChange={(event) => setUsers((items) => items.map((item) => item.id === user.id ? { ...item, status: event.target.value as UserRecord["status"] } : item))} className="rounded-lg border border-[#1B4332]/20 bg-white px-2 py-1.5">
                        <option value="active">Aktif</option><option value="inactive">Nonaktif</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#1B4332]/60">{user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => void updateUser(user)} disabled={savingId === user.id} className="font-semibold text-[#2D6A4F] disabled:opacity-50">{savingId === user.id ? "Menyimpan…" : "Simpan"}</button>
                        <button onClick={() => void deleteUser(user)} className="font-semibold text-red-600">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
