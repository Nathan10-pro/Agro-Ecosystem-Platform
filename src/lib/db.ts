import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface DatabaseRecord {
  id: string;
  [key: string]: any;
}

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;

const LOCAL_DB_PATH = path.join(process.cwd(), "data", "local-db.json");

// Default initial data jika lokal database diinisiasi
const INITIAL_LOCAL_DATA = {
  Roles: [
    {
      id: "role-admin",
      name: "admin",
      description: "Administrator dengan akses penuh sistem dan konten",
      permissions: "all",
      is_system: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "role-user",
      name: "user",
      description: "Pengguna terdaftar publik untuk konsultasi dan pemesanan",
      permissions: "read",
      is_system: true,
      created_at: new Date().toISOString(),
    },
  ],
  Users: [
    {
      id: "user-admin-default",
      name: "Admin Utama MAN3",
      email: "admin@gmail.com",
      // Hash untuk '123456'
      password_hash: "$2b$10$80ecv7NRBOPNDzGtHrsVoeKmpLnvJTpyHJnUILlgqu6to1YL1uDeO",
      role_id: "role-admin",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  News: [
    {
      id: "news-1",
      title: "Mengenal Rancangan Agro-Ekologi MAN3",
      slug: "sertifikasi-single-estate-organik-gede-pangrango",
      excerpt:
        "Gambaran awal tentang pendekatan agro-pangan dan konservasi yang sedang dikembangkan dalam konsep MAN3.",
      content:
        "Artikel contoh ini menjelaskan arah pengembangan konsep agro-ekologi MAN3. Rincian lokasi, metode operasional, dan dampak akan dipublikasikan setelah tersedia data yang dapat diverifikasi.",
      thumbnail_path:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      category: "Konsep & Pengembangan",
      status: "published",
      author_id: "user-admin-default",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "news-2",
      title: "Meninjau Pilihan Hijauan Tropis untuk Padang Gembala",
      slug: "inovasi-padang-gembala-rotasional-pasture-fed",
      excerpt:
        "Contoh catatan pengembangan tentang pemilihan hijauan yang sesuai kondisi lahan dan kebutuhan ternak.",
      content:
        "Brachiaria, Indigofera, dan Paspalum dapat menjadi kandidat hijauan tropis bergantung pada kondisi lokasi. Artikel ini adalah materi prototipe, bukan klaim penggunaan aktual.",
      thumbnail_path:
        "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
      category: "Peternakan Berkelanjutan",
      status: "published",
      author_id: "user-admin-default",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "news-3",
      title: "Konsep Kemitraan Pangan untuk Usaha Kuliner",
      slug: "ekspansi-kemitraan-restoran-b2b-fine-dining",
      excerpt:
        "Pratinjau alur kerja sama untuk restoran dan usaha kuliner yang sedang dirancang.",
      content:
        "Konsep kemitraan ini masih dalam tahap desain. Ketersediaan produk, standar penanganan, wilayah layanan, dan mekanisme pemesanan akan diumumkan setelah operasional siap.",
      thumbnail_path:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      category: "Kemitraan B2B",
      status: "published",
      author_id: "user-admin-default",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  Orders: [
    {
      id: "order-demo-1",
      customer_name: "Rina Suryani",
      company_name: "PT Sumber Sehat",
      email: "rina@sumbersehat.co",
      phone: "081234567890",
      delivery_slot: "subuh",
      items: [
        {
          id: "p1",
          name: "Pasture-Fed Tenderloin",
          spec: "Whole Muscle Vacuum",
          price: 385000,
          quantity: 10,
          unit: "kg",
        },
      ],
      subtotal: 3850000,
      tax: 423500,
      total: 4273500,
      notes: "Butuh estimasi pengiriman sebelum 10 pagi.",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "order-demo-2",
      customer_name: "Dimas Pratama",
      company_name: "Restaurant Atlas",
      email: "dimas@atlasresto.id",
      phone: "082345678901",
      delivery_slot: "siang",
      items: [
        {
          id: "p4",
          name: "Heirloom Microgreens Mix",
          spec: "Fresh Crisp Harvest",
          price: 45000,
          quantity: 8,
          unit: "pack",
        },
      ],
      subtotal: 360000,
      tax: 39600,
      total: 399600,
      notes: "Packaging perlu lebih kuat untuk ekspedisi satu hari.",
      status: "confirmed",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
};

function readLocalDb(): Record<string, DatabaseRecord[]> {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const dir = path.dirname(LOCAL_DB_PATH);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(INITIAL_LOCAL_DATA, null, 2), "utf8");
  }

  const raw = fs.readFileSync(LOCAL_DB_PATH, "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Format database lokal tidak valid.");
  }
  return parsed as Record<string, DatabaseRecord[]>;
}

function writeLocalDb(data: Record<string, DatabaseRecord[]>): void {
  const dir = path.dirname(LOCAL_DB_PATH);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

/**
 * Memanggil Google Apps Script Web App melalui HTTP POST
 */
export async function callAppsScript(
  action: string,
  table: string,
  payload?: Record<string, unknown>
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_SECRET) {
    throw new Error("APPS_SCRIPT_URL dan APPS_SCRIPT_SECRET harus dikonfigurasi bersama.");
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: APPS_SCRIPT_SECRET,
      action,
      table,
      ...payload,
    }),
    redirect: "follow",
    cache: "no-store",
  });

  let result: { success?: boolean; data?: unknown; error?: string };
  try {
    result = await response.json();
  } catch {
    throw new Error(`Apps Script mengembalikan respons yang tidak valid (HTTP ${response.status}).`);
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || `Permintaan Apps Script gagal (HTTP ${response.status}).`);
  }
  return { success: true, data: result.data };
}

/**
 * Database client serbaguna
 */
export const db = {
  table(tableName: string) {
    const useAppsScript = Boolean(APPS_SCRIPT_URL || APPS_SCRIPT_SECRET);
    if (!useAppsScript && process.env.NODE_ENV === "production") {
      throw new Error("APPS_SCRIPT_URL dan APPS_SCRIPT_SECRET wajib dikonfigurasi di production.");
    }

    return {
      async list(): Promise<DatabaseRecord[]> {
        if (useAppsScript) {
          const result = await callAppsScript("list", tableName);
          if (!Array.isArray(result.data)) {
            throw new Error(`Respons daftar ${tableName} dari Apps Script tidak valid.`);
          }
          return result.data as DatabaseRecord[];
        }

        const local = readLocalDb();
        return local[tableName] || [];
      },

      async get(id: string): Promise<DatabaseRecord | null> {
        if (useAppsScript) {
          const result = await callAppsScript("get", tableName, { id });
          return (result.data as DatabaseRecord | null) ?? null;
        }

        const local = readLocalDb();
        const found = (local[tableName] || []).find((r) => String(r.id) === String(id));
        return found || null;
      },

      async find(predicate: (item: DatabaseRecord) => boolean): Promise<DatabaseRecord | null> {
        const all = await this.list();
        return all.find(predicate) || null;
      },

      async create(data: Omit<DatabaseRecord, "id"> & { id?: string }): Promise<DatabaseRecord> {
        const newId = data.id || randomUUID();
        const record: DatabaseRecord = {
          ...data,
          id: newId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (useAppsScript) {
          const result = await callAppsScript("create", tableName, { data: record });
          return (result.data as DatabaseRecord | undefined) || record;
        }

        const local = readLocalDb();
        if (!local[tableName]) local[tableName] = [];
        local[tableName].push(record);
        writeLocalDb(local);

        return record;
      },

      async update(id: string, updates: Partial<DatabaseRecord>): Promise<DatabaseRecord | null> {
        if (useAppsScript) {
          await callAppsScript("update", tableName, { id, data: updates });
          const result = await callAppsScript("get", tableName, { id });
          return (result.data as DatabaseRecord | null) ?? null;
        }

        const local = readLocalDb();
        const list = local[tableName] || [];
        const index = list.findIndex((r) => String(r.id) === String(id));
        if (index === -1) return null;

        const updated: DatabaseRecord = {
          ...list[index],
          ...updates,
          updated_at: new Date().toISOString(),
        };
        list[index] = updated;
        writeLocalDb(local);

        return updated;
      },

      async delete(id: string): Promise<boolean> {
        if (useAppsScript) {
          await callAppsScript("delete", tableName, { id });
          return true;
        }

        const local = readLocalDb();
        const list = local[tableName] || [];
        const initialLen = list.length;
        local[tableName] = list.filter((r) => String(r.id) !== String(id));
        writeLocalDb(local);

        return local[tableName].length < initialLen;
      },
    };
  },
};
