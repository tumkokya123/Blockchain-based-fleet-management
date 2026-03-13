"use client";

import { useState } from "react";
import {
  Search, Plus, Shield, Navigation,
  Store, Send, UserCheck, UserX,
  Copy, Users,
} from "lucide-react";
import AddUserModal from "@/components/dashboard/ui/AddUserModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const USERS_INITIAL = [
  { initials: "AM", name: "Anil Mehta",       email: "anil.mehta@fleetchain.in",  role: "admin",    wallet: "0x4a2b...8f1c", status: "active",   lastActive: "2 min ago"  },
  { initials: "PS", name: "Priya Sharma",     email: "priya.sharma@fleetchain.in",role: "admin",    wallet: "0x7d3e...2a5b", status: "active",   lastActive: "15 min ago" },
  { initials: "RP", name: "Rajesh Patil",     email: "rajesh.patil@fleetchain.in",role: "driver",   wallet: "0x1f8c...9d4e", status: "active",   lastActive: "Just now"   },
  { initials: "SJ", name: "Sunil Jadhav",     email: "sunil.jadhav@fleetchain.in",role: "driver",   wallet: "0x5b2a...3f7c", status: "active",   lastActive: "8 min ago"  },
  { initials: "VS", name: "Vikram Singh",     email: "vikram.singh@fleetchain.in",role: "driver",   wallet: "0x9e4d...1a6b", status: "inactive", lastActive: "2 days ago" },
  { initials: "AN", name: "AutoCare Nagpur",  email: "ops@autocare.in",           role: "vendor",   wallet: "0x3c7f...5e2a", status: "active",   lastActive: "1 hr ago"   },
  { initials: "SP", name: "SpeedFix Pune",    email: "ops@speedfix.in",           role: "vendor",   wallet: "0x8a1b...4d9c", status: "active",   lastActive: "3 hrs ago"  },
  { initials: "RS", name: "Rohit Sharma",     email: "rohit.sharma@tata.com",     role: "receiver", wallet: "—",             status: "active",   lastActive: "1 day ago"  },
  { initials: "DT", name: "Deepak Thakur",    email: "deepak@reliance.com",       role: "sender",   wallet: "—",             status: "active",   lastActive: "5 hrs ago"  },
];

// ─── Role config ──────────────────────────────────────────────────────────────
const ROLE_CFG = {
  admin:    { label: "Admin",    icon: <Shield className="w-3 h-3" />,     badge: "bg-[#0d3d3d] text-[#00ADB5] border border-[#00ADB5]/30",      pill: "bg-[#0d3d3d]/60 border-[#00ADB5]/20 text-[#00ADB5]"    },
  driver:   { label: "Driver",   icon: <Navigation className="w-3 h-3" />, badge: "bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30",   pill: "bg-[#0d3d1f]/60 border-emerald-400/20 text-emerald-400" },
  vendor:   { label: "Vendor",   icon: <Store className="w-3 h-3" />,      badge: "bg-[#1e1535] text-purple-400 border border-purple-400/30",     pill: "bg-[#1e1535]/60 border-purple-400/20 text-purple-400"   },
  sender:   { label: "Sender",   icon: <Send className="w-3 h-3" />,       badge: "bg-[#3d2d00] text-yellow-400 border border-yellow-400/30",    pill: "bg-[#3d2d00]/60 border-yellow-400/20 text-yellow-400"   },
  receiver: { label: "Receiver", icon: <UserCheck className="w-3 h-3" />,  badge: "bg-[#0d2535] text-sky-400 border border-sky-400/30",          pill: "bg-[#0d2535]/60 border-sky-400/20 text-sky-400"         },
};

const ALL_ROLES = ["All Roles", "admin", "driver", "vendor", "sender", "receiver"];

function Avatar({ initials, role }) {
  const colors = {
    admin:    "bg-[#0d3d3d] text-[#00ADB5] border border-[#00ADB5]/20",
    driver:   "bg-[#0d3d1f] text-emerald-400 border border-emerald-400/20",
    vendor:   "bg-[#1e1535] text-purple-400 border border-purple-400/20",
    sender:   "bg-[#3d2d00] text-yellow-400 border border-yellow-400/20",
    receiver: "bg-[#0d2535] text-sky-400 border border-sky-400/20",
  };
  return (
    <div className={`w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ${colors[role] ?? colors.admin}`}>
      {initials}
    </div>
  );
}

function RoleBadge({ role }) {
  const cfg = ROLE_CFG[role] ?? ROLE_CFG.admin;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${cfg.badge}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

function StatusBadge({ status }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-transparent text-gray-400 border border-gray-600 whitespace-nowrap">
      <UserX className="w-3 h-3" />inactive
    </span>
  );
}

function WalletCell({ wallet }) {
  const [copied, setCopied] = useState(false);
  if (wallet === "—") return <span className="text-gray-500 text-sm">—</span>;
  return (
    <button onClick={() => { navigator.clipboard.writeText(wallet).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-1.5 group">
      <span className="text-sm font-mono text-gray-400 group-hover:text-gray-200 transition-colors">{wallet}</span>
      <Copy className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${copied ? "text-emerald-400" : "text-gray-600 group-hover:text-gray-400"}`} />
    </button>
  );
}

function RoleSummaryStrip({ users }) {
  const roles = ["admin", "driver", "vendor", "sender", "receiver"];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {roles.map(role => {
        const cfg = ROLE_CFG[role];
        const count = users.filter(u => u.role === role).length;
        return (
          <div key={role} className="bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-3 flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cfg.pill}`}>
              {cfg.icon}{cfg.label}
            </span>
            <span className="text-xl font-bold text-white">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl p-4 hover:border-[#00ADB5]/30 hover:bg-[#2e3640] transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar initials={user.initials} role={user.role} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#2f363e]">
        <RoleBadge role={user.role} />
        <div className="text-right">
          <WalletCell wallet={user.wallet} />
          <p className="text-xs text-gray-500 mt-1">{user.lastActive}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [users,      setUsers]     = useState(USERS_INITIAL);
  const [search,     setSearch]    = useState("");
  const [roleFilter, setRole]      = useState("All Roles");
  const [dropdown,   setDropdown]  = useState(false);
  const [showModal,  setShowModal] = useState(false);   // ← modal state

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = q === "" || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    const matchRole   = roleFilter === "All Roles" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Called when modal successfully creates a user
  const handleUserCreated = (data) => {
    const initials = data.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setUsers(prev => [{
      initials,
      name:       data.name,
      email:      data.email,
      role:       data.role,
      wallet:     data.wallet || "—",
      status:     "active",
      lastActive: "Just now",
    }, ...prev]);
  };

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">User Management</h1>
          <p className="text-gray-400 text-sm">Provision and manage platform access — Admin only</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="self-start sm:self-auto flex items-center gap-2 bg-[#00ADB5] hover:bg-[#009aa1] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#00ADB5]/20"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Role Summary Strip */}
      <RoleSummaryStrip users={users} />

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full bg-[#2a3038] border border-[#2f363e] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ADB5]/50 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdown(o => !o)}
            className="w-full sm:w-auto flex items-center justify-between gap-2 bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-300 hover:border-[#00ADB5]/40 transition-colors sm:min-w-[148px]"
          >
            <span className="capitalize">{roleFilter}</span>
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdown ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-1.5 w-full sm:w-48 bg-[#2a3038] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl">
              {ALL_ROLES.map(opt => (
                <button key={opt} onClick={() => { setRole(opt); setDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${roleFilter === opt ? "text-[#00ADB5] bg-[#00ADB5]/10" : "text-gray-400 hover:bg-[#1f252b] hover:text-white"}`}>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 -mt-2">
        Showing <span className="text-gray-300">{filtered.length}</span> of {users.length} users
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#2a3038] border border-[#2f363e] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#2f363e]">
                {["User", "Role", "Wallet", "Status", "Last Active"].map(col => (
                  <th key={col} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-4 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((u, i) => (
                <tr key={u.email} className={`border-b border-[#2f363e] last:border-0 hover:bg-[#2e3640] transition-colors cursor-pointer ${i % 2 !== 0 ? "bg-[#1f252b]/20" : ""}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials={u.initials} role={u.role} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white leading-tight">{u.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap"><RoleBadge role={u.role} /></td>
                  <td className="px-5 py-4 whitespace-nowrap"><WalletCell wallet={u.wallet} /></td>
                  <td className="px-5 py-4 whitespace-nowrap"><StatusBadge status={u.status} /></td>
                  <td className="px-5 py-4 whitespace-nowrap"><span className="text-sm text-gray-400">{u.lastActive}</span></td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-5 py-16 text-center text-gray-500 text-sm">No users match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0
          ? filtered.map(u => <UserCard key={u.email} user={u} />)
          : <div className="text-center py-16 text-gray-500 text-sm flex flex-col items-center gap-3"><Users className="w-8 h-8 text-gray-600" />No users match your search.</div>
        }
      </div>

      {/* Add User Modal */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSuccess={handleUserCreated}
        />
      )}

    </div>
  );
}