"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PartnerStatus = "pending_review" | "active" | "rejected" | "suspended";
export type OrderStatus =
  | "submitted"
  | "confirmed"
  | "preparing"
  | "in_delivery"
  | "completed"
  | "cancelled";

export interface DemoPartner {
  id: string;
  profile_id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  business_type: string;
  city: string;
  address: string;
  status: PartnerStatus;
  partnership_start_date: string;
  notes: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  price: number;
  stock: number;
  minimum: number;
  status: "available" | "unavailable" | "archived";
}

export interface DemoOrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DemoOrder {
  id: string;
  order_number: string;
  partner_id: string;
  created_at: string;
  status: OrderStatus;
  delivery_slot: string;
  notes: string;
  items: DemoOrderItem[];
  total: number;
  tracking: Array<{ status: OrderStatus; note: string; created_at: string }>;
}

export interface DemoLog {
  id: string;
  created_at: string;
  actor: string;
  action: string;
  detail: string;
}

export interface BrowserPortalData {
  partners: DemoPartner[];
  products: DemoProduct[];
  orders: DemoOrder[];
  logs: DemoLog[];
  settings: { organization_name: string; contact_email: string; tax_percent: number };
}

const STORAGE_KEY = "man3_portal_demo_data";
const CHANGE_EVENT = "man3-portal-demo-data-change";

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

export function createSeedPortalData(): BrowserPortalData {
  const partners: DemoPartner[] = [
    {
      id: "partner-demo-1", profile_id: "demo-mitra", full_name: "Mitra Demo MAN3",
      email: "mitra@demo.man3", phone: "0812-0000-0001", company_name: "Restoran Contoh",
      business_type: "Restoran", city: "Bandung", address: "Jl. Contoh No. 10",
      status: "active", partnership_start_date: "2025-01-15", notes: "",
    },
    {
      id: "partner-demo-2", profile_id: "demo-mitra-2", full_name: "Rina Pratama",
      email: "rina@demo.man3", phone: "0812-0000-0002", company_name: "Dapur Lestari",
      business_type: "Catering", city: "Bogor", address: "Jl. Melati No. 8",
      status: "pending_review", partnership_start_date: "", notes: "Tertarik pasokan mingguan.",
    },
    {
      id: "partner-demo-3", profile_id: "demo-mitra-3", full_name: "Budi Santoso",
      email: "budi@demo.man3", phone: "0812-0000-0003", company_name: "Hotel Puncak",
      business_type: "Hotel", city: "Cianjur", address: "Jl. Raya Puncak No. 21",
      status: "active", partnership_start_date: "2025-06-01", notes: "",
    },
  ];
  const products: DemoProduct[] = [
    { id: "product-demo-1", name: "Daging sapi pasture-fed", category: "Daging Sapi", description: "Potongan daging sapi untuk kebutuhan dapur profesional.", unit: "kg", price: 245000, stock: 42, minimum: 2, status: "available" },
    { id: "product-demo-2", name: "Paket sayuran segar", category: "Sayuran", description: "Pilihan sayuran musiman dalam satu paket.", unit: "paket", price: 85000, stock: 20, minimum: 1, status: "available" },
    { id: "product-demo-3", name: "Ayam kampung", category: "Unggas", description: "Ayam kampung bersih untuk menu harian.", unit: "ekor", price: 82000, stock: 16, minimum: 2, status: "available" },
    { id: "product-demo-4", name: "Telur ayam kampung", category: "Telur", description: "Telur ayam kampung, kemasan 10 butir.", unit: "pak", price: 48000, stock: 0, minimum: 1, status: "unavailable" },
  ];
  const createOrder = (
    id: string,
    number: string,
    partnerId: string,
    productIndex: number,
    quantity: number,
    status: OrderStatus,
    days: number,
  ): DemoOrder => {
    const product = products[productIndex];
    const created = daysAgo(days);
    return {
      id, order_number: number, partner_id: partnerId, created_at: created, status,
      delivery_slot: "Subuh", notes: "Pesanan contoh untuk pratinjau.",
      items: [{ product_id: product.id, name: product.name, quantity, price: product.price }],
      total: product.price * quantity,
      tracking: [{ status, note: "Status contoh.", created_at: created }],
    };
  };
  return {
    partners,
    products,
    orders: [
      createOrder("order-demo-1", "DEMO-MAN3-001", "partner-demo-1", 0, 2, "confirmed", 1),
      createOrder("order-demo-2", "DEMO-MAN3-002", "partner-demo-1", 1, 5, "in_delivery", 4),
      createOrder("order-demo-3", "DEMO-MAN3-003", "partner-demo-3", 2, 4, "completed", 8),
    ],
    logs: [
      { id: "log-demo-1", created_at: daysAgo(1), actor: "Admin Demo", action: "Data contoh dimuat", detail: "Portal demo siap digunakan." },
    ],
    settings: { organization_name: "MAN3 Agro-Ecosystem", contact_email: "kemitraan@man3.id", tax_percent: 11 },
  };
}

export function readPortalData(): BrowserPortalData {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createSeedPortalData();
  const parsed: unknown = JSON.parse(raw);
  if (
    typeof parsed !== "object" || parsed === null ||
    !("partners" in parsed) || !Array.isArray(parsed.partners) ||
    !("products" in parsed) || !Array.isArray(parsed.products) ||
    !("orders" in parsed) || !Array.isArray(parsed.orders) ||
    !("logs" in parsed) || !Array.isArray(parsed.logs) ||
    !("settings" in parsed) || typeof parsed.settings !== "object" || parsed.settings === null
  ) {
    return createSeedPortalData();
  }
  return parsed as BrowserPortalData;
}

export function savePortalData(data: BrowserPortalData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useBrowserPortalData() {
  const [data, setData] = useState<BrowserPortalData>(() => createSeedPortalData());
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const currentData = useRef(data);
  currentData.current = data;

  const refresh = useCallback(() => {
    try {
      const next = readPortalData();
      currentData.current = next;
      setData(next);
      setError("");
      setReady(true);
    } catch {
      setError("Data lokal tidak dapat dibaca. Penyimpanan browser mungkin dinonaktifkan atau rusak.");
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const updateData = useCallback((update: (current: BrowserPortalData) => BrowserPortalData) => {
    try {
      const next = update(currentData.current);
      savePortalData(next);
      currentData.current = next;
      setData(next);
      setError("");
      return true;
    } catch {
      setError("Perubahan tidak dapat disimpan di penyimpanan browser.");
      return false;
    }
  }, []);

  const resetData = useCallback(() => {
    try {
      const seed = createSeedPortalData();
      savePortalData(seed);
      currentData.current = seed;
      setData(seed);
      setError("");
      return true;
    } catch {
      setError("Data demo tidak dapat diatur ulang.");
      return false;
    }
  }, []);

  return { data, ready, error, updateData, resetData };
}

export function addPortalLog(
  data: BrowserPortalData,
  actor: string,
  action: string,
  detail: string,
): BrowserPortalData {
  return {
    ...data,
    logs: [
      { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, created_at: new Date().toISOString(), actor, action, detail },
      ...data.logs,
    ],
  };
}
