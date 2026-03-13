import AdminOverview from "@/components/dashboard/roles/AdminOverview";
import DriverOverview from "@/components/dashboard/roles/DriverOverview";
import VendorOverview from "@/components/dashboard/roles/VendorOverview";

export default async function DashboardPage({ params }) {
  const { role } = await params; 

  if (role === "admin") {
    return <AdminOverview />;
  }

  if (role === "driver") {
    return <DriverOverview />;
  }

  if (role === "vendor") {
    return <VendorOverview />;
  }

  return (
    <div className="text-white text-lg">
      Dashboard for <span className="text-[#00ADB5]">{role}</span> is not implemented yet.
    </div>
  );
}