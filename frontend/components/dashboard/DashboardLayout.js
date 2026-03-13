"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { NotifProvider } from "./NotifContext";

export default function DashboardLayout({ children, role }) {
  return (
    <NotifProvider>
      <div className="h-screen flex bg-[#1b2228] text-white overflow-hidden">

        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">

          <Topbar role={role} />

          <div className="flex-1 overflow-y-auto px-8 py-8 bg-gradient-to-br from-[#1b2228] to-[#1e2630]">
            {children}
          </div>

        </div>
      </div>
    </NotifProvider>
  );
}