import { NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  }

  const [partnerResult, orderResult, productResult] = await Promise.all([
    context.supabase.from("partners").select("id,partnership_status,is_demo"),
    context.supabase.from("orders").select("id,total_amount,order_status,is_demo"),
    context.supabase.from("products").select("id,available_stock,status,is_demo"),
  ]);
  const error = partnerResult.error || orderResult.error || productResult.error;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const allPartners = partnerResult.data || [];
  const allOrders = orderResult.data || [];
  const allProducts = productResult.data || [];
  const partners = allPartners.filter((partner) => !partner.is_demo);
  const orders = allOrders.filter((order) => !order.is_demo);
  const products = allProducts.filter((product) => !product.is_demo);
  const activeOrders = orders.filter((order) => !["completed", "cancelled", "rejected"].includes(order.order_status));
  return NextResponse.json({
    metrics: {
      total_partners: partners.length,
      active_partners: partners.filter((partner) => partner.partnership_status === "active").length,
      pending_partners: partners.filter((partner) => partner.partnership_status === "pending_review").length,
      total_orders: orders.length,
      active_orders: activeOrders.length,
      completed_orders: orders.filter((order) => order.order_status === "completed").length,
      total_order_value: orders.reduce((sum, order) => sum + Number(order.total_amount), 0),
      available_products: products.filter((product) => product.status === "available").length,
      action_required: partners.filter((partner) => partner.partnership_status === "pending_review").length +
        orders.filter((order) => order.order_status === "submitted" || order.order_status === "awaiting_confirmation").length,
      demo_records: allPartners.filter((partner) => partner.is_demo).length +
        allOrders.filter((order) => order.is_demo).length +
        allProducts.filter((product) => product.is_demo).length,
    },
  });
}
