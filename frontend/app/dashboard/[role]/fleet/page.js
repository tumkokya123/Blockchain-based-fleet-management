"use client";

import { useState, useEffect } from "react";
import {
  MapPin, Truck, Fuel, Clock, Gauge,
  Search, ChevronDown, Activity, TrendingUp,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const VEHICLES = [
  { id: "MH31-AB-1234", driver: "Rajesh Patil",    from: "Nagpur",     to: "Mumbai",    eta: "4h 12m", fuel: 68, speed: 72, status: "in-transit", dot: { x: 32, y: 38 } },
  { id: "MH12-CD-5678", driver: "Sunil Jadhav",    from: "Pune",       to: "Hyderabad", eta: "6h 30m", fuel: 45, speed: 65, status: "in-transit", dot: { x: 60, y: 30 } },
  { id: "MH04-EF-9012", driver: "Vikram Singh",    from: "Mumbai",     to: "Ahmedabad", eta: "3h 45m", fuel: 82, speed: 58, status: "in-transit", dot: { x: 42, y: 47 } },
  { id: "MH14-GH-3456", driver: "Amit Deshmukh",  from: "Nagpur",     to: "Delhi",     eta: "—",      fuel: 34, speed: 0,  status: "stopped",    dot: { x: 70, y: 47 } },
  { id: "MH31-IJ-7890", driver: "Pravin Wagh",     from: "Nashik",     to: "Nagpur",    eta: "5h 20m", fuel: 55, speed: 70, status: "in-transit", dot: { x: 50, y: 60 } },
  { id: "MH43-KL-2345", driver: "Ganesh Kulkarni", from: "Kolhapur",   to: "Pune",      eta: "Arrived",fuel: 22, speed: 0,  status: "completed",  dot: { x: 22, y: 52 } },
  { id: "MH20-MN-6789", driver: "Ramesh Pawar",    from: "Aurangabad", to: "Mumbai",    eta: "2h 50m", fuel: 71, speed: 60, status: "in-transit", dot: { x: 38, y: 70 } },
  { id: "MH15-OP-1122", driver: "Deepak Thakur",   from: "Solapur",    to: "Pune",      eta: "—",      fuel: 90, speed: 0,  status: "stopped",    dot: { x: 78, y: 62 } },
];

const STATUS_OPTIONS = ["All Status", "in-transit", "stopped", "completed"];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    "in-transit": "bg-[#0d3d3d] text-[#00ADB5] border border-[#00ADB5]/30",
    stopped:      "bg-[#3d1515] text-red-400 border border-red-400/30",
    completed:    "bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ${map[status] ?? map["in-transit"]}`}>
      {status}
    </span>
  );
}

// ─── Summary Stats Strip ──────────────────────────────────────────────────────
function StatStrip({ vehicles }) {
  const transit   = vehicles.filter(v => v.status === "in-transit").length;
  const stopped   = vehicles.filter(v => v.status === "stopped").length;
  const completed = vehicles.filter(v => v.status === "completed").length;
  const avgFuel   = Math.round(vehicles.reduce((s, v) => s + v.fuel, 0) / vehicles.length);

  const stats = [
    { label: "In Transit",  value: transit,   color: "text-[#00ADB5]",   icon: <Activity className="w-4 h-4" /> },
    { label: "Stopped",     value: stopped,   color: "text-red-400",     icon: <Gauge className="w-4 h-4" /> },
    { label: "Completed",   value: completed, color: "text-emerald-400", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Avg Fuel",    value: `${avgFuel}%`, color: "text-yellow-400", icon: <Fuel className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-3 flex items-center gap-3">
          <div className={`${s.color} opacity-70`}>{s.icon}</div>
          <div>
            <p className={`text-lg font-bold leading-tight ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Map ──────────────────────────────────────────────────────────────────────
function FleetMap({ vehicles }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const transitCount = vehicles.filter(v => v.status === "in-transit").length;

  return (
    <div className="relative w-full h-full bg-[#1f252b] rounded-xl overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fg" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2a3038" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="mg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ADB5" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#00ADB5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#fg)" />
        <rect width="100%" height="100%" fill="url(#mg)" />
        <ellipse cx="50%" cy="50%" rx="42%" ry="34%" fill="none" stroke="#00ADB5" strokeWidth="0.5" strokeOpacity="0.12" />
        <ellipse cx="50%" cy="50%" rx="27%" ry="22%" fill="none" stroke="#00ADB5" strokeWidth="0.5" strokeOpacity="0.08" />
        {vehicles.map((v, i) => {
          const color = v.status === "in-transit" ? "#00ADB5" : v.status === "stopped" ? "#f87171" : "#4ade80";
          return (
            <g key={v.id}>
              {v.status === "in-transit" && (
                <circle cx={`${v.dot.x}%`} cy={`${v.dot.y}%`} r="14"
                  fill={color} fillOpacity={tick % 3 === i % 3 ? "0.18" : "0.05"}
                  style={{ transition: "fill-opacity 0.8s" }} />
              )}
              <circle cx={`${v.dot.x}%`} cy={`${v.dot.y}%`} r="5" fill={color} fillOpacity="0.95" />
            </g>
          );
        })}
      </svg>

      {/* Legend — top right */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-[#1f252b]/90 border border-[#2a3038] rounded-lg px-3 py-2">
        {[["#00ADB5","In Transit"],["#f87171","Stopped"],["#4ade80","Completed"]].map(([c,l]) => (
          <div key={l} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
            <span className="text-xs text-gray-400">{l}</span>
          </div>
        ))}
      </div>

      {/* Center pin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-[#00ADB5]/60 bg-[#1f252b] flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-[#00ADB5]" />
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-medium bg-[#1f252b]/90 px-4 py-1.5 rounded-full border border-[#2a3038]">
            Live fleet map — {transitCount} vehicles in transit
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle }) {
  const fuelColor = vehicle.fuel <= 25 ? "text-red-400" : vehicle.fuel <= 50 ? "text-yellow-400" : "text-gray-300";

  return (
    <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl p-4 sm:p-5 hover:border-[#00ADB5]/40 hover:bg-[#2e3640] transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#1f252b] border border-[#2f363e] flex items-center justify-center group-hover:border-[#00ADB5]/40 transition-colors">
            <Truck className="w-4 h-4 text-[#00ADB5]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white font-mono leading-tight truncate">{vehicle.id}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{vehicle.driver}</p>
          </div>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        <span className="text-sm text-gray-300 truncate">
          {vehicle.from}<span className="text-gray-500 mx-1.5">→</span>{vehicle.to}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#2f363e]">
        <div className="text-center">
          <p className={`text-sm font-semibold ${fuelColor}`}>{vehicle.fuel}%</p>
          <p className="text-xs text-gray-500 mt-0.5">Fuel</p>
        </div>
        <div className="text-center border-x border-[#2f363e]">
          <p className="text-sm font-semibold text-gray-300">{vehicle.speed}<span className="text-xs text-gray-500 ml-0.5">km/h</span></p>
          <p className="text-xs text-gray-500 mt-0.5">Speed</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-300 truncate">{vehicle.eta}</p>
          <p className="text-xs text-gray-500 mt-0.5">ETA</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FleetMapPage() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("All Status");
  const [dropdownOpen, setDropdown] = useState(false);

  const filtered = VEHICLES.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = q === "" || v.id.toLowerCase().includes(q) || v.driver.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Fleet Map</h1>
          <p className="text-gray-400 text-sm">Real-time GPS positions of all active vehicles</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#00ADB5] animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Stats strip */}
      <StatStrip vehicles={VEHICLES} />

      {/* Map */}
      <div className="w-full h-[280px] sm:h-[360px] lg:h-[420px] border border-[#2f363e] rounded-2xl overflow-hidden">
        <FleetMap vehicles={VEHICLES} />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vehicle or driver..."
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
        Showing <span className="text-gray-300">{filtered.length}</span> of {VEHICLES.length} vehicles
      </p>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
        {filtered.length > 0
          ? filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)
          : (
            <div className="col-span-2 text-center py-16 text-gray-500 text-sm">
              No vehicles match your search.
            </div>
          )
        }
      </div>

    </div>
  );
}