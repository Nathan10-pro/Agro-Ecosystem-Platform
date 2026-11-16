export const statusLabels: Record<string, string> = {
  pending_review: "Menunggu persetujuan",
  active: "Aktif",
  rejected: "Ditolak",
  suspended: "Ditangguhkan",
  submitted: "Pesanan diajukan",
  awaiting_confirmation: "Menunggu konfirmasi",
  confirmed: "Pesanan dikonfirmasi",
  preparing: "Sedang disiapkan",
  packed: "Dikemas",
  in_delivery: "Dalam pengiriman",
  delivered: "Terkirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value));
}

export function partnershipDuration(startDate: string, now = new Date()) {
  const start = new Date(`${startDate}T00:00:00`);
  if (!Number.isFinite(start.getTime()) || start > now) return null;
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0 && remainingMonths === 0) return "Kurang dari 1 bulan";
  const parts: string[] = [];
  if (years) parts.push(`${years} tahun`);
  if (remainingMonths) parts.push(`${remainingMonths} bulan`);
  return parts.join(" ");
}
