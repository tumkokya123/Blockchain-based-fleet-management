"use client";

import { useState } from "react";
import {
  Clock, Wrench, CheckCircle2, AlertTriangle,
  Search, ChevronDown, Truck, IndianRupee,
  Filter, Calendar, Building2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const RECORDS = [
  { id: 1,  task: "Engine Oil Change",     vehicle: "MH31-AB-1234", vendor: "AutoCare Nagpur",      date: "05 Mar 2026", priority: "medium",   cost: 4500,  status: "scheduled"   },
  { id: 2,  task: "Brake Pad Replacement", vehicle: "MH12-CD-5678", vendor: "SpeedFix Pune",        date: "03 Mar 2026", priority: "high",     cost: 8200,  status: "in-progress" },
  { id: 3,  task: "Tyre Rotation",         vehicle: "MH04-EF-9012", vendor: "TyreMaster Mumbai",    date: "01 Mar 2026", priority: "low",      cost: 3000,  status: "completed"   },
  { id: 4,  task: "Transmission Repair",   vehicle: "MH14-GH-3456", vendor: "HeavyDuty Aurangabad", date: "02 Mar 2026", priority: "critical", cost: 22000, status: "in-progress" },
  { id: 5,  task: "AC Compressor",         vehicle: "MH31-IJ-7890", vendor: "CoolTech Nashik",      date: "06 Mar 2026", priority: "medium",   cost: 6800,  status: "scheduled"   },
  { id: 6,  task: "Battery Replacement",   vehicle: "MH43-KL-2345", vendor: "PowerCell Kolhapur",   date: "28 Feb 2026", priority: "high",     cost: 12500, status: "completed"   },
  { id: 7,  task: "Suspension Check",      vehicle: "MH20-MN-6789", vendor: "AutoCare Nagpur",      date: "07 Mar 2026", priority: "low",      cost: 2200,  status: "scheduled"   },
  { id: 8,  task: "Clutch Plate",          vehicle: "MH15-OP-1122", vendor: "SpeedFix Pune",        date: "27 Feb 2026", priority: "high",     cost: 9800,  status: "completed"   },
];

const STATUS_OPTIONS   = ["All Status", "scheduled", "in-progress", "completed"];
const PRIORITY_OPTIONS = ["All Priority", "low", "medium", "high", "critical"];

// ─── Config maps ──────────────────────────────────────────────────────────────
const STATUS_CFG = {
  scheduled:   { label: "Scheduled",    icon: <Clock className="w-3.5 h-3.5" />,        row: "bg-[#2a3038]", iconWrap: "bg-[#1f252b] text-yellow-400 border-[#2f363e]",  badge: "border border-[#3a3a3a] text-gray-300 bg-transparent" },
  "in-progress":{ label: "In-Progress", icon: <Wrench className="w-3.5 h-3.5" />,       row: "bg-[#2a3038]", iconWrap: "bg-[#1f252b] text-[#00ADB5] border-[#2f363e]",  badge: "border border-[#3a3a3a] text-gray-300 bg-transparent" },
  completed:   { label: "Completed",    icon: <CheckCircle2 className="w-3.5 h-3.5" />, row: "bg-[#2a3038]", iconWrap: "bg-[#1f252b] text-emerald-400 border-[#2f363e]", badge: "border border-[#3a3a3a] text-gray-300 bg-transparent" },
};

const PRIORITY_CFG = {
  low:      { badge: "bg-transparent border border-gray-600 text-gray-400",         dot: "bg-gray-400"    },
  medium:   { badge: "bg-[#0d3d3d] border border-[#00ADB5]/40 text-[#00ADB5]",      dot: "bg-[#00ADB5]"   },
  high:     { badge: "bg-[#3d2d00] border border-yellow-500/40 text-yellow-400",    dot: "bg-yellow-400"  },
  critical: { badge: "bg-[#3d1515] border border-red-500/40 text-red-400",          dot: "bg-red-400"     },
};

// ─── Badges ───────────────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CFG[priority] ?? PRIORITY_CFG.medium;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.scheduled;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${cfg.badge}`}>
      {cfg.label}
    </span>
  );
}

function StatusIcon({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.scheduled;
  return (
    <div className={`w-9 h-9 flex-shrink-0 rounded-xl border flex items-center justify-center ${cfg.iconWrap}`}>
      {cfg.icon}
    </div>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────
function SummaryCards({ records }) {
  const scheduled   = records.filter(r => r.status === "scheduled").length;
  const inProgress  = records.filter(r => r.status === "in-progress").length;
  const completed   = records.filter(r => r.status === "completed").length;
  const totalCost   = records.reduce((s, r) => s + r.cost, 0);

  const cards = [
    { icon: <Clock className="w-5 h-5" />,        value: scheduled,  label: "Scheduled",   iconColor: "text-yellow-400",  iconBg: "bg-[#1f252b] border border-[#2f363e]" },
    { icon: <Wrench className="w-5 h-5" />,        value: inProgress, label: "In Progress", iconColor: "text-[#00ADB5]",   iconBg: "bg-[#1f252b] border border-[#2f363e]" },
    { icon: <CheckCircle2 className="w-5 h-5" />,  value: completed,  label: "Completed",   iconColor: "text-emerald-400", iconBg: "bg-[#1f252b] border border-[#2f363e]" },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      value: `₹${(totalCost / 1000).toFixed(0)},000`,
      label: "Total Cost",
      iconColor: "text-gray-400",
      iconBg: "bg-[#1f252b] border border-[#2f363e]",
      isRupee: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-[#2a3038] border border-[#2f363e] rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-4">
          <div className={`w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center ${c.iconBg} ${c.iconColor}`}>
            {c.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-white leading-tight truncate">
              {c.isRupee ? <span>₹{totalCost.toLocaleString("en-IN")}</span> : c.value}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop Row ──────────────────────────────────────────────────────────────
function DesktopRow({ r, isOdd }) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-b border-[#2f363e] last:border-0 hover:bg-[#2e3640] transition-colors cursor-pointer ${isOdd ? "bg-[#1f252b]/20" : ""}`}>
      {/* Icon */}
      <StatusIcon status={r.status} />

      {/* Task + Vehicle */}
      <div className="w-[200px] flex-shrink-0 min-w-0">
        <p className="text-sm font-bold text-white truncate">{r.task}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Truck className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <p className="text-xs text-gray-500 font-mono truncate">{r.vehicle}</p>
        </div>
      </div>

      {/* Vendor + Date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">{r.vendor}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <p className="text-xs text-gray-500">{r.date}</p>
        </div>
      </div>

      {/* Priority */}
      <div className="w-[90px] flex-shrink-0">
        <PriorityBadge priority={r.priority} />
      </div>

      {/* Cost */}
      <div className="w-[90px] flex-shrink-0 text-right">
        <p className="text-sm font-semibold text-gray-200">₹{r.cost.toLocaleString("en-IN")}</p>
      </div>

      {/* Status */}
      <div className="w-[110px] flex-shrink-0 flex justify-end">
        <StatusBadge status={r.status} />
      </div>
    </div>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────
function MobileCard({ r }) {
  return (
    <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl p-4 hover:border-[#00ADB5]/30 hover:bg-[#2e3640] transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <StatusIcon status={r.status} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{r.task}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Truck className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <p className="text-xs text-gray-500 font-mono">{r.vehicle}</p>
            </div>
          </div>
        </div>
        <PriorityBadge priority={r.priority} />
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-3">
        <div className="flex items-center gap-1.5 text-gray-400 min-w-0">
          <Building2 className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="truncate text-xs">{r.vendor}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="text-xs">{r.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#2f363e]">
        <p className="text-base font-bold text-white">₹{r.cost.toLocaleString("en-IN")}</p>
        <StatusBadge status={r.status} />
      </div>
    </div>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full sm:w-auto flex items-center justify-between gap-2 bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-300 hover:border-[#00ADB5]/40 transition-colors sm:min-w-[148px]"
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1.5 w-full sm:w-48 bg-[#2a3038] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt ? "text-[#00ADB5] bg-[#00ADB5]/10" : "text-gray-400 hover:bg-[#1f252b] hover:text-white"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MaintenancePage() {
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState("All Status");
  const [priority, setPriority] = useState("All Priority");

  const filtered = RECORDS.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = q === "" || r.task.toLowerCase().includes(q) || r.vehicle.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q);
    const matchStatus   = status   === "All Status"   || r.status   === status;
    const matchPriority = priority === "All Priority" || r.priority === priority;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalCost = filtered.reduce((s, r) => s + r.cost, 0);

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Maintenance</h1>
          <p className="text-gray-400 text-sm">Vehicle service records and upcoming schedules</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 self-start sm:self-auto bg-[#2a3038] border border-[#2f363e] rounded-xl px-3 py-2">
          <Wrench className="w-4 h-4 text-[#00ADB5]" />
          <span>{RECORDS.length} total records</span>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards records={RECORDS} />

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search task, vehicle, or vendor..."
            className="w-full bg-[#2a3038] border border-[#2f363e] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ADB5]/50 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <Dropdown value={status}   options={STATUS_OPTIONS}   onChange={setStatus}   />
          <Dropdown value={priority} options={PRIORITY_OPTIONS} onChange={setPriority} />
        </div>
      </div>

      {/* Results + cost summary */}
      <div className="flex items-center justify-between -mt-2">
        <p className="text-xs text-gray-500">
          Showing <span className="text-gray-300">{filtered.length}</span> of {RECORDS.length} records
        </p>
        {filtered.length > 0 && (
          <p className="text-xs text-gray-500">
            Filtered total: <span className="text-white font-semibold">₹{totalCost.toLocaleString("en-IN")}</span>
          </p>
        )}
      </div>

      {/* ── DESKTOP LIST (sm+) ────────────────────────────────────────────────── */}
      <div className="hidden sm:block bg-[#2a3038] border border-[#2f363e] rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-[#2f363e]">
          <div className="w-9 flex-shrink-0" />
          <div className="w-[200px] flex-shrink-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Task / Vehicle</span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Vendor / Date</span>
          </div>
          <div className="w-[90px] flex-shrink-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</span>
          </div>
          <div className="w-[90px] flex-shrink-0 text-right">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cost</span>
          </div>
          <div className="w-[110px] flex-shrink-0 text-right">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
          </div>
        </div>

        {filtered.length > 0
          ? filtered.map((r, i) => <DesktopRow key={r.id} r={r} isOdd={i % 2 !== 0} />)
          : (
            <div className="px-5 py-16 text-center text-gray-500 text-sm">
              No records match your filters.
            </div>
          )
        }
      </div>

      {/* ── MOBILE CARDS (< sm) ──────────────────────────────────────────────── */}
      <div className="sm:hidden space-y-3">
        {filtered.length > 0
          ? filtered.map(r => <MobileCard key={r.id} r={r} />)
          : <p className="text-center py-16 text-gray-500 text-sm">No records match your filters.</p>
        }
      </div>

    </div>
  );
}