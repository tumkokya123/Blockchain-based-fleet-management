"use client";

import { useState } from "react";
import {
  Wrench, MapPin, Star, Phone, Mail,
  Search, ChevronDown, Plus, Briefcase,
  Zap, CheckCircle2, XCircle,
} from "lucide-react";
import AddVendorModal from "@/components/dashboard/ui/AddvendorModal";

// ─── Initial Data ─────────────────────────────────────────────────────────────
const VENDORS_INITIAL = [
  { id: 1, name: "AutoCare Nagpur",      city: "Nagpur, MH",     rating: 4.8, jobs: 142, active: 3, specialty: "General Service",      phone: "+91 98234 56789", email: "service@autocare.in",  status: "active"   },
  { id: 2, name: "SpeedFix Pune",        city: "Pune, MH",       rating: 4.6, jobs: 98,  active: 2, specialty: "Brake & Clutch",        phone: "+91 97654 32100", email: "ops@speedfix.in",       status: "active"   },
  { id: 3, name: "TyreMaster Mumbai",    city: "Mumbai, MH",     rating: 4.9, jobs: 215, active: 1, specialty: "Tyre & Alignment",      phone: "+91 98765 43210", email: "support@tyremaster.in", status: "active"   },
  { id: 4, name: "HeavyDuty Aurangabad", city: "Aurangabad, MH", rating: 4.3, jobs: 67,  active: 1, specialty: "Transmission",          phone: "+91 93456 78901", email: "heavyduty@mail.in",     status: "active"   },
  { id: 5, name: "CoolTech Nashik",      city: "Nashik, MH",     rating: 4.5, jobs: 84,  active: 0, specialty: "AC & Electrical",       phone: "+91 92345 67890", email: "info@cooltech.in",      status: "inactive" },
  { id: 6, name: "PowerCell Kolhapur",   city: "Kolhapur, MH",   rating: 4.7, jobs: 56,  active: 0, specialty: "Battery & Electrical",  phone: "+91 91234 56780", email: "power@cell.in",         status: "inactive" },
];

const STATUS_OPTIONS = ["All Status", "active", "inactive"];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-transparent text-gray-400 border border-gray-600">
      inactive
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
      <span className="text-sm font-bold text-yellow-400">{rating}</span>
    </div>
  );
}

// ─── Summary Strip ────────────────────────────────────────────────────────────
function SummaryStrip({ vendors }) {
  const totalActive   = vendors.filter(v => v.status === "active").length;
  const totalInactive = vendors.filter(v => v.status === "inactive").length;
  const totalJobs     = vendors.reduce((s, v) => s + v.jobs, 0);
  const avgRating     = vendors.length
    ? (vendors.reduce((s, v) => s + v.rating, 0) / vendors.length).toFixed(1)
    : "0.0";

  const items = [
    { label: "Active Vendors",   value: totalActive,   icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-400" },
    { label: "Inactive Vendors", value: totalInactive, icon: <XCircle className="w-4 h-4" />,      color: "text-gray-400"    },
    { label: "Total Jobs Done",  value: totalJobs,     icon: <Briefcase className="w-4 h-4" />,    color: "text-[#00ADB5]"   },
    { label: "Avg Rating",       value: avgRating,     icon: <Star className="w-4 h-4" />,         color: "text-yellow-400"  },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(item => (
        <div key={item.label} className="bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-3 flex items-center gap-3">
          <div className={`${item.color} opacity-80 flex-shrink-0`}>{item.icon}</div>
          <div className="min-w-0">
            <p className={`text-xl font-bold leading-tight ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Vendor Card ──────────────────────────────────────────────────────────────
function VendorCard({ vendor }) {
  const isActive = vendor.status === "active";
  return (
    <div className={`bg-[#2a3038] border rounded-2xl p-5 flex flex-col gap-4 hover:bg-[#2e3640] transition-all duration-200 cursor-pointer group ${isActive ? "border-[#2f363e] hover:border-[#00ADB5]/40" : "border-[#2f363e] opacity-80 hover:opacity-100"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 flex-shrink-0 rounded-xl border flex items-center justify-center transition-colors ${isActive ? "bg-[#1f252b] border-[#2f363e] text-[#00ADB5] group-hover:border-[#00ADB5]/40" : "bg-[#1f252b] border-[#2f363e] text-gray-500"}`}>
            <Wrench className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-tight truncate">{vendor.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <p className="text-xs text-gray-500 truncate">{vendor.city}</p>
            </div>
          </div>
        </div>
        <StatusBadge status={vendor.status} />
      </div>

      <div className="flex items-center gap-4">
        <StarRating rating={vendor.rating} />
        <div className="flex items-center gap-1 text-gray-400">
          <Briefcase className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-sm">{vendor.jobs} jobs</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className={`w-3.5 h-3.5 ${vendor.active > 0 ? "text-[#00ADB5]" : "text-gray-600"}`} />
          <span className={`text-sm ${vendor.active > 0 ? "text-[#00ADB5]" : "text-gray-500"}`}>
            {vendor.active} active
          </span>
        </div>
      </div>

      <div className="border-t border-[#2f363e]" />

      <div className="space-y-2">
        <p className="text-sm font-semibold text-white">{vendor.specialty}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <Phone className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="text-xs truncate">{vendor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="text-xs truncate">{vendor.email}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VendorsPage() {
  const [vendors,    setVendors]  = useState(VENDORS_INITIAL);
  const [search,     setSearch]   = useState("");
  const [status,     setStatus]   = useState("All Status");
  const [dropdown,   setDropdown] = useState(false);
  const [showModal,  setShowModal] = useState(false);   // ← modal state

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = q === "" || v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q) || v.specialty.toLowerCase().includes(q);
    const matchStatus = status === "All Status" || v.status === status;
    return matchSearch && matchStatus;
  });

  // Append new vendor from modal
  const handleVendorAdded = (data) => {
    setVendors(prev => [{
      id:        prev.length + 1,
      name:      data.name,
      city:      data.city,
      rating:    data.rating || 0,
      jobs:      0,
      active:    0,
      specialty: data.specialty,
      phone:     data.phone,
      email:     data.email,
      status:    "active",
    }, ...prev]);
  };

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Vendors</h1>
          <p className="text-gray-400 text-sm">Registered maintenance and service partners</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="self-start sm:self-auto flex items-center gap-2 bg-[#00ADB5] hover:bg-[#009aa1] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#00ADB5]/20"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      {/* Summary Strip */}
      <SummaryStrip vendors={vendors} />

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vendor, city, or specialty..."
            className="w-full bg-[#2a3038] border border-[#2f363e] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ADB5]/50 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdown(o => !o)}
            className="w-full sm:w-auto flex items-center justify-between gap-2 bg-[#2a3038] border border-[#2f363e] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-gray-300 hover:border-[#00ADB5]/40 transition-colors sm:min-w-[148px]"
          >
            <span>{status}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdown ? "rotate-180" : ""}`} />
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-1.5 w-full sm:w-48 bg-[#2a3038] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl">
              {STATUS_OPTIONS.map(opt => (
                <button key={opt} onClick={() => { setStatus(opt); setDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${status === opt ? "text-[#00ADB5] bg-[#00ADB5]/10" : "text-gray-400 hover:bg-[#1f252b] hover:text-white"}`}>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 -mt-2">
        Showing <span className="text-gray-300">{filtered.length}</span> of {vendors.length} vendors
      </p>

      {/* Vendor Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(v => <VendorCard key={v.id} vendor={v} />)}
        </div>
      ) : (
        <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl py-20 flex flex-col items-center gap-3">
          <Wrench className="w-8 h-8 text-gray-600" />
          <p className="text-gray-500 text-sm">No vendors match your search.</p>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showModal && (
        <AddVendorModal
          onClose={() => setShowModal(false)}
          onSuccess={handleVendorAdded}
        />
      )}

    </div>
  );
}