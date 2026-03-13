"use client";

import { Bell } from "lucide-react";
import { useNotif } from "@/components/dashboard/NotifContext.js";

export default function Topbar({ role }) {
  const notif = useNotif();

  return (
    <div className="h-22 border-b border-[#2c333b] bg-[#20262d] flex items-center justify-between px-8">

      <div className="text-sm text-gray-400">
        Admin Panel
      </div>

      <div className="flex items-center gap-6">

        {/* Blockchain address */}
        <div className="text-gray-400 text-sm font-mono">
          0x7F3a...c8D2
        </div>

        {/* Role badge */}
        <div className="bg-[#00ADB5]/10 text-[#00ADB5] px-3 py-1 rounded-full text-xs font-semibold border border-[#00ADB5]/20">
          Admin
        </div>

        {/* Bell — opens notification panel */}
        <button
          onClick={() => notif?.setOpen(true)}
          className="relative text-gray-400 hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/5"
        >
          <Bell size={18} />
          {/* Unread dot — always show for demo */}
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00ADB5] border-2 border-[#20262d]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#00ADB5]/20 flex items-center justify-center text-xs font-semibold text-[#00ADB5] cursor-pointer hover:bg-[#00ADB5]/30 transition-colors duration-150">
          RK
        </div>

      </div>
    </div>
  );
}