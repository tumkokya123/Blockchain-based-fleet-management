"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Package,
  Wrench,
  Users,
  Link2,
  User
} from "lucide-react";

const adminMenu = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard/admin" },
  { name: "Fleet Map", icon: Map, href: "/dashboard/admin/fleet" },
  { name: "Shipments", icon: Package, href: "/dashboard/admin/shipments" },
  { name: "Maintenance", icon: Wrench, href: "/dashboard/admin/maintenance" },
  { name: "Vendors", icon: Users, href: "/dashboard/admin/vendors" },
  { name: "Blockchain Ledger", icon: Link2, href: "/dashboard/admin/blockchain" },
  { name: "Users", icon: User, href: "/dashboard/admin/users" }
];

export default function Sidebar({ role }) {
  const pathname = usePathname();

  const menu = role === "admin" ? adminMenu : [];

  return (
    <aside className="w-64 bg-[#20262d] border-r border-[#2c333b] flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#2c333b] flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#00ADB5] flex items-center justify-center font-semibold">
          FC
        </div>
        <span className="font-semibold text-lg">FleetChain</span>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6 flex-1">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          Navigation
        </p>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${active
                    ? "bg-[#00ADB5]/10 text-[#00ADB5]"
                    : "text-gray-400 hover:bg-[#2c333b] hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}