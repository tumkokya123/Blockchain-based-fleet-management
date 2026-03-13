import AdminOverview from "@/components/dashboard/roles/AdminOverview";
import VendorOverview from "@/components/dashboard/roles/VendorOverview";
import DriverOverview from "@/components/dashboard/roles/DriverOverview";
import { notFound } from "next/navigation";

export default async function DashboardPage({ params }) {
  const { role } = await params;  // ✅ must await in Next.js 14+

  if (role === "admin")  return <AdminOverview />;
  if (role === "vendor") return <VendorOverview />;
  if (role === "driver") return <DriverOverview />;

  return notFound();
}