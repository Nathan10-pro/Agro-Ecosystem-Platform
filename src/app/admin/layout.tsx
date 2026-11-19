import PortalShell from "@/components/portal/PortalShell";

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell role="admin">{children}</PortalShell>;
}
