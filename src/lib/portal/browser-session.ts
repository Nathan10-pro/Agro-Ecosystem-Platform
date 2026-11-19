export type PortalRole = "admin" | "mitra";

export interface PortalSession {
  id: string;
  email: string;
  full_name: string;
  role: PortalRole;
  account_status: "active";
  is_demo: true;
}

const STORAGE_KEY = "man3_portal_demo_session";
const ACCOUNTS_KEY = "man3_portal_demo_accounts";
const DEMO_PASSWORD = "demo123";

const demoAccounts: Record<string, PortalSession> = {
  "admin@demo.man3": {
    id: "demo-admin",
    email: "admin@demo.man3",
    full_name: "Administrator Demo MAN3",
    role: "admin",
    account_status: "active",
    is_demo: true,
  },
  "mitra@demo.man3": {
    id: "demo-mitra",
    email: "mitra@demo.man3",
    full_name: "Mitra Demo MAN3",
    role: "mitra",
    account_status: "active",
    is_demo: true,
  },
  "rina@demo.man3": {
    id: "demo-mitra-2",
    email: "rina@demo.man3",
    full_name: "Rina Pratama",
    role: "mitra",
    account_status: "active",
    is_demo: true,
  },
  "budi@demo.man3": {
    id: "demo-mitra-3",
    email: "budi@demo.man3",
    full_name: "Budi Santoso",
    role: "mitra",
    account_status: "active",
    is_demo: true,
  },
};

export function loginToDemoPortal(email: string, password: string): PortalSession {
  const normalizedEmail = email.trim().toLowerCase();
  const account = demoAccounts[normalizedEmail];
  if (account && password === DEMO_PASSWORD) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    return account;
  }
  const customAccounts = readCustomAccounts();
  const custom = customAccounts.find((item) => item.session.email === normalizedEmail && item.password === password);
  if (!custom) {
    throw new Error("Email demo atau password tidak sesuai.");
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(custom.session));
  return custom.session;
}

export function registerDemoPartner(input: {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  business_type: string;
  city: string;
  address: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  if (demoAccounts[email] || readCustomAccounts().some((item) => item.session.email === email)) {
    throw new Error("Email ini sudah digunakan pada browser ini.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Format email tidak valid.");
  if (input.password.length < 8) throw new Error("Password demo minimal 8 karakter.");
  const id = `demo-mitra-${Date.now()}`;
  const session: PortalSession = {
    id,
    email,
    full_name: input.full_name.trim(),
    role: "mitra",
    account_status: "active",
    is_demo: true,
  };
  const partner = {
    id: `partner-${id}`,
    profile_id: id,
    full_name: session.full_name,
    email,
    phone: input.phone.trim(),
    company_name: input.company_name.trim(),
    business_type: input.business_type,
    city: input.city.trim(),
    address: input.address.trim(),
    status: "pending_review" as const,
    partnership_start_date: "",
    notes: "Pendaftaran demo menunggu tinjauan admin.",
  };
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([
    ...readCustomAccounts(),
    { session, password: input.password },
  ]));
  return { session, partner };
}

export function readDemoPortalSession(): PortalSession | null {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  const session: unknown = JSON.parse(saved);
  if (
    typeof session !== "object" ||
    session === null ||
    !("role" in session) ||
    (session.role !== "admin" && session.role !== "mitra") ||
    !("email" in session) ||
    typeof session.email !== "string"
  ) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
  return demoAccounts[session.email] || readCustomAccounts().find((item) => item.session.email === session.email)?.session || null;
}

export function logoutFromDemoPortal() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function resetCustomDemoAccounts() {
  window.localStorage.removeItem(ACCOUNTS_KEY);
}

function readCustomAccounts(): Array<{ session: PortalSession; password: string }> {
  const raw = window.localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    window.localStorage.removeItem(ACCOUNTS_KEY);
    return [];
  }
  return parsed.filter((item): item is { session: PortalSession; password: string } =>
    typeof item === "object" && item !== null &&
    "password" in item && typeof item.password === "string" &&
    "session" in item && typeof item.session === "object" && item.session !== null &&
    "email" in item.session && typeof item.session.email === "string" &&
    "role" in item.session && item.session.role === "mitra" &&
    "id" in item.session && typeof item.session.id === "string" &&
    "full_name" in item.session && typeof item.session.full_name === "string"
  );
}
