import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { notFound } from "next/navigation";

const allowedRoles = ["admin", "vendor", "driver", "sender", "receiver"];
const portalRoles  = ["driver", "vendor", "sender", "receiver"];

export default async function RoleLayout({ children, params }) {
  const { role } = await params;

  if (!allowedRoles.includes(role)) {
    notFound();
  }

  // Portal roles render their own sidebar/topbar — skip DashboardLayout
  if (portalRoles.includes(role)) {
    return <>{children}</>;
  }

  // Admin only gets the full DashboardLayout
  return (
    <DashboardLayout role={role}>
      {children}
    </DashboardLayout>
  );
}