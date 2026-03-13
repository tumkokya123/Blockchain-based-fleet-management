"use client";

import { useState } from "react";
import {
  Search, ChevronDown, Copy, Package,
  Truck, MapPin, Calendar, Weight,
  CheckCircle2, Clock, XCircle, AlertCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SHIPMENTS = [
  { id: "SHP-2024-0891", sender: "Tata Steel Ltd",      from: "Nagpur",     to: "Mumbai",    weight: "12,400 kg", status: "in-transit", txHash: "0x8f3a...e21b", date: "28 Feb 2026" },
  { id: "SHP-2024-0890", sender: "Reliance Industries",  from: "Pune",       to: "Hyderabad", weight: "8,200 kg",  status: "in-transit", txHash: "0x7c1d...a44f", date: "27 Feb 2026" },
  { id: "SHP-2024-0889", sender: "Mahindra Logistics",   from: "Mumbai",     to: "Ahmedabad", weight: "5,600 kg",  status: "delivered",  txHash: "0x2e9f...b71c", date: "26 Feb 2026" },
  { id: "SHP-2024-0888", sender: "Godrej & Boyce",       from: "Nashik",     to: "Nagpur",    weight: "3,100 kg",  status: "in-transit", txHash: "0x5a4b...d82e", date: "26 Feb 2026" },
  { id: "SHP-2024-0887", sender: "Larsen & Toubro",      from: "Kolhapur",   to: "Pune",      weight: "18,900 kg", status: "delivered",  txHash: "0x1f6c...c93a", date: "25 Feb 2026" },
  { id: "SHP-2024-0886", sender: "Cipla Ltd",            from: "Aurangabad", to: "Mumbai",    weight: "1,200 kg",  status: "pending",    txHash: null,            date: "25 Feb 2026" },
  { id: "SHP-2024-0885", sender: "Tata Motors",          from: "Nagpur",     to: "Delhi",     weight: "7,800 kg",  status: "cancelled",  txHash: "0x9d2e...f15b", date: "24 Feb 2026" },
  { id: "SHP-2024-0884", sender: "ITC Limited",          from: "Solapur",    to: "Pune",      weight: "4,500 kg",  status: "delivered",  txHash: "0x3b7a...e68d", date: "24 Feb 2026" },
];

const STATUS_OPTIONS = ["All Status", "in-transit", "delivered", "pending", "cancelled"];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  "in-transit": { badge: "bg-[#0d3d3d] text-[#00ADB5] border border-[#00ADB5]/30",    icon: <Clock className="w-3 h-3" />,         dot: "bg-[#00ADB5]"   },
  delivered:    { badge: "bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30", icon: <CheckCircle2 className="w-3 h-3" />,   dot: "bg-emerald-400" },
  pending:      { badge: "bg-[#3d2d00] text-yellow-400 border border-yellow-400/30",   icon: <AlertCircle className="w-3 h-3" />,    dot: "bg-yellow-400"  },
  cancelled:    { badge: "bg-[#3d1515] text-red-400 border border-red-400/30",         icon: <XCircle className="w-3 h-3" />,        dot: "bg-red-400"     },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["in-transit"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ${cfg.badge}`}>
      {cfg.icon}{status}
    </span>
  );
}

// ─── Summary strip ────────────────────────────────────────────────────────────
function SummaryStrip({ shipments }) {
  const counts = {
    "in-transit": shipments.filter(s => s.status === "in-transit").length,
    delivered:    shipments.filter(s => s.status === "delivered").length,
    pending:      shipments.filter(s => s.status === "pending").length,
    cancelled:    shipments.filter(s => s.status === "cancelled").length,
  };
  const items = [
    { label: "In Transit",  value: counts["in-transit"], color: "text-[#00ADB5]",   bar: "bg-[#00ADB5]"   },
    { label: "Delivered",   value: counts.delivered,     color: "text-emerald-400", bar: "bg-emerald-400" },
    { label: "Pending",     value: counts.pending,       color: "text-yellow-400",  bar: "bg-yellow-400"  },
    { label: "Cancelled",   value: counts.cancelled,     color: "text-red-400",     bar: "bg-red-400"     },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(item => (
        <div key={item.label} className="bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-3">
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          <div className="mt-2 h-1 bg-[#1f252b] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${item.bar} transition-all duration-500`}
              style={{ width: `${(item.value / shipments.length) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TX Hash ──────────────────────────────────────────────────────────────────
function TxHash({ hash }) {
  const [copied, setCopied] = useState(false);
  if (!hash) return <span className="text-gray-500 text-sm select-none">—</span>;
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hash).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1.5 group"
    >
      <span className="text-sm text-[#00ADB5] font-mono">{hash}</span>
      <Copy className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${copied ? "text-emerald-400" : "text-gray-500 group-hover:text-[#00ADB5]"}`} />
    </button>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────
function ShipmentCard({ s }) {
  return (
    <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl p-4 hover:border-[#00ADB5]/40 hover:bg-[#2e3640] transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#1f252b] border border-[#2f363e] flex items-center justify-center">
            <Truck className="w-4 h-4 text-[#00ADB5]" />
          </div>
          <span className="text-sm font-bold text-white font-mono truncate">{s.id}</span>
        </div>
        <StatusBadge status={s.status} />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Package className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
          <span className="truncate">{s.sender}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
          <span>{s.from}<span className="text-gray-500 mx-1">→</span>{s.to}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#2f363e]">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Weight className="w-3.5 h-3.5" />
            <span>{s.weight}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{s.date}</span>
          </div>
        </div>
        {s.txHash && (
          <div className="pt-1">
            <TxHash hash={s.txHash} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ShipmentsPage() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("All Status");
  const [dropdownOpen, setDropdown] = useState(false);

  const filtered = SHIPMENTS.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = q === "" || s.id.toLowerCase().includes(q) || s.sender.toLowerCase().includes(q) || s.from.toLowerCase().includes(q) || s.to.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Shipments</h1>
          <p className="text-gray-400 text-sm">Track and manage all shipment records</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 self-start sm:self-auto bg-[#2a3038] border border-[#2f363e] rounded-xl px-3 py-2">
          <Package className="w-4 h-4 text-[#00ADB5]" />
          <span>{SHIPMENTS.length} total shipments</span>
        </div>
      </div>

      {/* Summary Strip */}
      <SummaryStrip shipments={SHIPMENTS} />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, sender, or destination..."
            className="w-full bg-[#2a3038] border border-[#2f363e] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ADB5]/50 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdown(o => !o)}
            className="w-full sm:w-auto flex items-center justify-between gap-2 bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-300 hover:border-[#00ADB5]/40 transition-colors sm:min-w-[148px]"
          >
            <span>{statusFilter}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-full sm:w-48 bg-[#2a3038] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl">
              {STATUS_OPTIONS.map(opt => (
                <button key={opt} onClick={() => { setStatus(opt); setDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === opt ? "text-[#00ADB5] bg-[#00ADB5]/10" : "text-gray-400 hover:bg-[#1f252b] hover:text-white"}`}>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 -mt-2">
        Showing <span className="text-gray-300">{filtered.length}</span> of {SHIPMENTS.length} shipments
      </p>

      {/* ── DESKTOP TABLE (md+) ─────────────────────────────────────────────── */}
      <div className="hidden md:block bg-[#2a3038] border border-[#2f363e] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#2f363e]">
                {["Shipment ID", "Sender", "Route", "Weight", "Status", "TX Hash", "Date"].map(col => (
                  <th key={col} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-4 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((s, i) => (
                <tr key={s.id}
                  className={`border-b border-[#2f363e] last:border-0 hover:bg-[#2e3640] transition-colors cursor-pointer ${i % 2 !== 0 ? "bg-[#1f252b]/30" : ""}`}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-white font-mono">{s.id}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">{s.sender}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {s.from}<span className="text-gray-500 mx-1.5">→</span>{s.to}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300 font-mono">{s.weight}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <TxHash hash={s.txHash} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">{s.date}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-gray-500 text-sm">
                    No shipments match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS (< md) ──────────────────────────────────────────────── */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0
          ? filtered.map(s => <ShipmentCard key={s.id} s={s} />)
          : <p className="text-center py-16 text-gray-500 text-sm">No shipments match your search.</p>
        }
      </div>

    </div>
  );
}