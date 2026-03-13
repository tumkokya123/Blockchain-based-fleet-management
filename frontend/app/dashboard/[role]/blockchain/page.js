"use client";

import { useState } from "react";
import {
  Search, Copy, CheckCircle2, Clock,
  ShieldCheck, Link2, Package, MapPin,
  Truck, AlertTriangle, MessageSquare,
  CreditCard, Zap,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { txHash: "0x8f3a4b...3b2c1d", event: "Shipment Created",    shipment: "SHP-2024-0891", block: "#18,442,901", gas: "0.0021 MATIC", time: "2 min ago",  status: "confirmed" },
  { txHash: "0x7c1d3e...1e2f3a", event: "Location Updated",    shipment: "SHP-2024-0891", block: "#18,442,899", gas: "0.0018 MATIC", time: "5 min ago",  status: "confirmed" },
  { txHash: "0x2e9f8a...0a9b8c", event: "Delivery Confirmed",  shipment: "SHP-2024-0889", block: "#18,442,895", gas: "0.0034 MATIC", time: "12 min ago", status: "confirmed" },
  { txHash: "0x5a4b3c...5c4d3e", event: "Escrow Released",     shipment: "SHP-2024-0889", block: "#18,442,894", gas: "0.0045 MATIC", time: "12 min ago", status: "confirmed" },
  { txHash: "0x1f6c5d...7e6f5a", event: "Shipment Created",    shipment: "SHP-2024-0888", block: "#18,442,890", gas: "0.0021 MATIC", time: "18 min ago", status: "confirmed" },
  { txHash: "0x9d2e3f...1f2a3b", event: "IoT Alert Logged",    shipment: "SHP-2024-0887", block: "#18,442,885", gas: "0.0012 MATIC", time: "25 min ago", status: "confirmed" },
  { txHash: "0x3b7a6c...8c7d6e", event: "Complaint Registered",shipment: "SHP-2024-0885", block: "#18,442,880", gas: "0.0028 MATIC", time: "32 min ago", status: "confirmed" },
  { txHash: "0x4c8b7d...9d8e7f", event: "Vendor Payment",      shipment: "—",             block: "#18,442,878", gas: "0.0052 MATIC", time: "35 min ago", status: "pending"   },
];

// ─── Event config ─────────────────────────────────────────────────────────────
const EVENT_CFG = {
  "Shipment Created":     { color: "text-[#00ADB5]",   icon: <Package className="w-3.5 h-3.5" />      },
  "Location Updated":     { color: "text-gray-300",    icon: <MapPin className="w-3.5 h-3.5" />        },
  "Delivery Confirmed":   { color: "text-emerald-400", icon: <Truck className="w-3.5 h-3.5" />         },
  "Escrow Released":      { color: "text-yellow-400",  icon: <CreditCard className="w-3.5 h-3.5" />    },
  "IoT Alert Logged":     { color: "text-orange-400",  icon: <Zap className="w-3.5 h-3.5" />           },
  "Complaint Registered": { color: "text-red-400",     icon: <MessageSquare className="w-3.5 h-3.5" /> },
  "Vendor Payment":       { color: "text-purple-400",  icon: <CreditCard className="w-3.5 h-3.5" />    },
};

// ─── TxHash with copy ─────────────────────────────────────────────────────────
function TxHashCell({ hash }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hash).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1.5 group"
    >
      <span className="text-sm text-[#00ADB5] font-mono">{hash}</span>
      <Copy className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${copied ? "text-emerald-400" : "text-gray-600 group-hover:text-[#00ADB5]"}`} />
    </button>
  );
}

// ─── Event cell ───────────────────────────────────────────────────────────────
function EventCell({ event }) {
  const cfg = EVENT_CFG[event] ?? { color: "text-gray-300", icon: <Link2 className="w-3.5 h-3.5" /> };
  return (
    <span className={`flex items-center gap-2 text-sm font-medium ${cfg.color}`}>
      <span className="opacity-70 flex-shrink-0">{cfg.icon}</span>
      {event}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#0d3d1f] text-emerald-400 border border-emerald-400/30 whitespace-nowrap">
        <CheckCircle2 className="w-3 h-3" /> Confirmed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#3d2d00] text-yellow-400 border border-yellow-400/30 whitespace-nowrap">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────
function SummaryCards() {
  const cards = [
    { value: "18,442,901", label: "Total Transactions", mono: true  },
    { value: "1,247",      label: "Confirmed (24h)",    mono: false },
    { value: "0.0028 MATIC", label: "Avg Gas Fee",      mono: true  },
    { value: "3",          label: "Pending",             mono: false },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-[#2a3038] border border-[#2f363e] rounded-2xl px-5 py-5">
          <p className={`text-xl sm:text-2xl font-bold text-white leading-tight ${c.mono ? "font-mono" : ""}`}>{c.value}</p>
          <p className="text-xs text-gray-500 mt-1.5">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Mobile TX Card ───────────────────────────────────────────────────────────
function TxCard({ tx }) {
  return (
    <div className="bg-[#2a3038] border border-[#2f363e] rounded-2xl p-4 space-y-3 hover:border-[#00ADB5]/30 hover:bg-[#2e3640] transition-all">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <TxHashCell hash={tx.txHash} />
        <StatusBadge status={tx.status} />
      </div>
      {/* Event */}
      <EventCell event={tx.event} />
      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2 border-t border-[#2f363e] text-xs text-gray-400">
        <div>
          <span className="text-gray-600 uppercase tracking-wide text-[10px]">Shipment</span>
          <p className="font-mono text-gray-300 mt-0.5">{tx.shipment}</p>
        </div>
        <div>
          <span className="text-gray-600 uppercase tracking-wide text-[10px]">Block</span>
          <p className="font-mono text-gray-300 mt-0.5">{tx.block}</p>
        </div>
        <div>
          <span className="text-gray-600 uppercase tracking-wide text-[10px]">Gas</span>
          <p className="font-mono text-[#00ADB5] mt-0.5">{tx.gas}</p>
        </div>
        <div>
          <span className="text-gray-600 uppercase tracking-wide text-[10px]">Time</span>
          <p className="text-gray-400 mt-0.5">{tx.time}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlockchainLedgerPage() {
  const [search, setSearch] = useState("");

  const filtered = TRANSACTIONS.filter(tx => {
    const q = search.toLowerCase();
    return (
      q === "" ||
      tx.txHash.toLowerCase().includes(q) ||
      tx.event.toLowerCase().includes(q) ||
      tx.shipment.toLowerCase().includes(q) ||
      tx.block.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Blockchain Ledger</h1>
          <p className="text-gray-400 text-sm">Immutable transaction log on Polygon Network</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#2a3038] border border-[#2f363e] rounded-xl px-3 py-2 text-sm text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#00ADB5]" />
          <span>Polygon Mainnet</span>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by TX hash, shipment ID, or event..."
          className="w-full bg-[#2a3038] border border-[#2f363e] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ADB5]/50 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors"
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 -mt-2">
        Showing <span className="text-gray-300">{filtered.length}</span> of {TRANSACTIONS.length} transactions
      </p>

      {/* ── DESKTOP TABLE (md+) ──────────────────────────────────────────────── */}
      <div className="hidden md:block bg-[#2a3038] border border-[#2f363e] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="border-b border-[#2f363e]">
                {["TX Hash", "Event", "Shipment", "Block", "Gas", "Time", "Status"].map(col => (
                  <th key={col} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-5 py-4 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((tx, i) => (
                <tr key={tx.txHash}
                  className={`border-b border-[#2f363e] last:border-0 hover:bg-[#2e3640] transition-colors cursor-pointer ${i % 2 !== 0 ? "bg-[#1f252b]/20" : ""}`}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <TxHashCell hash={tx.txHash} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <EventCell event={tx.event} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-300">{tx.shipment}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-400">{tx.block}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-[#00ADB5]">{tx.gas}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">{tx.time}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-gray-500 text-sm">
                    No transactions match your search.
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
          ? filtered.map(tx => <TxCard key={tx.txHash} tx={tx} />)
          : <p className="text-center py-16 text-gray-500 text-sm">No transactions match your search.</p>
        }
      </div>

    </div>
  );
}