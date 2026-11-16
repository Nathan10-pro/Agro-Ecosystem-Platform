import { NextResponse } from "next/server";
import { getPortalIdentity } from "@/lib/supabase/portal-auth";

export async function GET() {
  const user = await getPortalIdentity();
  if (!user) return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  return NextResponse.json({ authenticated: true, user });
}
