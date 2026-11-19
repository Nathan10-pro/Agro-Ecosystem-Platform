import PortalShell from "@/components/portal/PortalShell";

export default async function MitraLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell role="mitra">{children}</PortalShell>;
}
