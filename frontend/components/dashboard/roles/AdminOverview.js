"use client";

import { useState, useEffect } from "react";
import {
  Truck, Navigation, AlertTriangle, Link2,
  Bell, X, Copy, Check, ChevronRight,
  AlertCircle, Clock, CheckCircle, Info,
} from "lucide-react";
import { useNotif } from "@/components/dashboard/NotifContext";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MAINTENANCE_ALERTS = [
  { id:1, vehicle:"MH31-AB-1234", driver:"Rajesh Patil",   msg:"Engine oil change overdue by 1,200 km",  severity:"critical" },
  { id:2, vehicle:"MH12-CD-5678", driver:"Sunil Deshmukh", msg:"Tyre pressure below threshold — rear left", severity:"warning"  },
  { id:3, vehicle:"MH14-EF-9012", driver:"Amit Kulkarni",  msg:"Scheduled service in 3 days",             severity:"ok"      },
  { id:4, vehicle:"MH31-GH-3456", driver:"Vijay Thakare",  msg:"Brake pad replacement needed",            severity:"critical" },
];

const BLOCKCHAIN_ACTIVITY = [
  { id:1, text:"Trip Started — MH31-AB-1234",       hash:"0xA3f8...9c2E", time:"2 min ago"  },
  { id:2, text:"Delivery Confirmed — Shipment #4821", hash:"0xB7e2...4dF1", time:"8 min ago"  },
  { id:3, text:"Escrow Released — ₹1,24,000",        hash:"0xC1d5...8aB3", time:"15 min ago" },
  { id:4, text:"Maintenance Logged — MH12-CD-5678",  hash:"0xD9a4...2eC7", time:"22 min ago" },
  { id:5, text:"Vendor Payment — Ravi Auto Services", hash:"0xE6b3...7fD0", time:"34 min ago" },
];

const NOTIFICATIONS = [
  { id:1, type:"alert",   title:"Critical Alert",             body:"MH31-AB-1234 engine oil overdue by 1,200 km.",   time:"2 min ago",  read:false },
  { id:2, type:"truck",   title:"Trip Started",               body:"MH31-AB-1234 dispatched from Nagpur depot.",    time:"5 min ago",  read:false },
  { id:3, type:"check",   title:"Delivery Confirmed",         body:"Shipment #4821 delivered. Escrow released.",    time:"8 min ago",  read:false },
  { id:4, type:"info",    title:"New Vendor Registration",    body:"AutoCare Services applied for fleet contract.", time:"1h ago",     read:true  },
  { id:5, type:"warning", title:"Tyre Pressure Warning",      body:"MH12-CD-5678 rear left tyre below threshold.", time:"2h ago",     read:true  },
];

// ─── MAP VEHICLES ─────────────────────────────────────────────────────────────
const MAP_VEHICLES = [
  { id:"MH31-AB-1234", x:0.38, y:0.42, status:"active",      label:"MH31-AB-1234" },
  { id:"MH12-CD-5678", x:0.55, y:0.38, status:"active",      label:"MH12-CD-5678" },
  { id:"MH04-EF-9012", x:0.30, y:0.60, status:"maintenance", label:"MH04-EF-9012" },
  { id:"MH14-GH-3456", x:0.65, y:0.56, status:"active",      label:"MH14-GH-3456" },
  { id:"MH20-MN-6789", x:0.75, y:0.48, status:"idle",        label:"MH20-MN-6789" },
];

const statusColor = {
  active:      "#00ADB5",
  idle:        "#f59e0b",
  maintenance: "#ef4444",
};

const severityConfig = {
  critical: { color:"#ef4444", bg:"rgba(239,68,68,0.12)",   icon: AlertCircle,    label:"Critical" },
  warning:  { color:"#f59e0b", bg:"rgba(245,158,11,0.12)",  icon: Clock,          label:"Warning"  },
  ok:       { color:"#00ADB5", bg:"rgba(0,173,181,0.12)",   icon: CheckCircle,    label:"OK"       },
};

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
function NotificationPanel({ open, onClose, notifications, onMarkAll }) {
  const unread = notifications.filter(n => !n.read).length;

  const typeMap = {
    alert:   { bg:"rgba(239,68,68,0.15)",    color:"#ef4444", Icon: AlertCircle  },
    truck:   { bg:"rgba(0,173,181,0.15)",    color:"#00ADB5", Icon: Truck        },
    check:   { bg:"rgba(16,185,129,0.15)",   color:"#10b981", Icon: CheckCircle  },
    info:    { bg:"rgba(99,102,241,0.15)",   color:"#818cf8", Icon: Info         },
    warning: { bg:"rgba(245,158,11,0.15)",   color:"#f59e0b", Icon: AlertTriangle },
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.4)" }}
        />
      )}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, width:400, maxWidth:"100vw",
        background:"#1e2630", borderLeft:"1px solid rgba(255,255,255,0.08)",
        boxShadow:"-8px 0 40px rgba(0,0,0,0.4)", zIndex:999,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", flexDirection:"column",
      }}>
        {/* Header */}
        <div style={{ padding:"22px 22px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>Notifications</div>
            {unread > 0 && <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{unread} unread</div>}
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {unread > 0 && (
              <button onClick={onMarkAll} style={{ fontSize:12, color:"#00ADB5", fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.06)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94a3b8" }}>
              <X size={16}/>
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto" }}>
          {notifications.map(n => {
            const t = typeMap[n.type] || typeMap.info;
            return (
              <div key={n.id} style={{
                padding:"14px 22px",
                borderLeft: n.read ? "3px solid transparent" : "3px solid #00ADB5",
                background: n.read ? "transparent" : "rgba(0,173,181,0.04)",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
              }}>
                <div style={{ display:"flex", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:t.bg, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <t.Icon size={16}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight: n.read ? 500 : 700, color:"#f1f5f9", marginBottom:2 }}>{n.title}</div>
                    <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.6 }}>{n.body}</div>
                    <div style={{ fontSize:11, color:"#64748b", marginTop:4 }}>{n.time}</div>
                  </div>
                  {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#00ADB5", flexShrink:0, marginTop:5 }}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon: IconComp, title, value, sub, subColor = "#00ADB5" }) {
  return (
    <div className="bg-[#2a3038] rounded-2xl p-6 flex flex-col gap-3 hover:bg-[#2f3740] transition-colors duration-200 cursor-default">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-[#1f252b] rounded-xl flex items-center justify-center text-[#00ADB5]">
          <IconComp size={20}/>
        </div>
        {sub && <span style={{ fontSize:12, fontWeight:600, color:subColor }}>{sub}</span>}
      </div>
      <div>
        <div className="text-4xl font-bold text-white tracking-tight">{value}</div>
        <div className="text-gray-400 text-sm mt-1">{title}</div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminOverview() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [copiedHash, setCopiedHash]       = useState(null);
  const notifCtx  = useNotif();
  const notifOpen = notifCtx?.open ?? false;
  const setNotifOpen = (v) => notifCtx?.setOpen(v);
  const [truckPos, setTruckPos]           = useState(0);

  const unread = notifications.filter(n => !n.read).length;

  // Animate a truck on the map
  useEffect(() => {
    const id = setInterval(() => setTruckPos(p => (p + 0.003) % 1), 60);
    return () => clearInterval(id);
  }, []);

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read:true })));

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash).catch(()=>{});
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  // Moving truck path: Nagpur → Mumbai
  const W = 760, H = 340;
  const nagpur = { x: W*0.12, y: H*0.28 };
  const mumbai = { x: W*0.88, y: H*0.72 };
  const tx = nagpur.x + (mumbai.x - nagpur.x) * truckPos;
  const ty = nagpur.y + (mumbai.y - nagpur.y) * truckPos;

  return (
    <>
      <div className="space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Operations Overview</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time fleet intelligence and blockchain activity</p>
          </div>
          {/* Bell button — inside content so it's always visible */}
          <button
            onClick={() => setNotifOpen(true)}
            style={{ position:"relative", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", color:"#94a3b8", cursor:"pointer", flexShrink:0, transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
          >
            <Bell size={18}/>
            {unread > 0 && (
              <div style={{ position:"absolute", top:6, right:6, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:"2px solid #1b2228" }}/>
            )}
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard icon={Truck}         title="Total Vehicles" value="342"   sub="+12 this month"   subColor="#00ADB5" />
          <StatCard icon={Navigation}    title="Active Trips"   value="87"    sub="24 completing today" subColor="#94a3b8" />
          <StatCard icon={AlertTriangle} title="Open Alerts"    value="14"    sub="+3 since yesterday" subColor="#ef4444" />
          <StatCard icon={Link2}         title="TX Count (24h)" value="1,247" sub="+18% vs avg"        subColor="#00ADB5" />
        </div>

        {/* ── MAP + ALERTS ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Live Fleet Map */}
          <div className="xl:col-span-2 bg-[#2a3038] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-base">Live Fleet Map</h2>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><span style={{ width:8, height:8, borderRadius:"50%", background:"#00ADB5", display:"inline-block" }}/> Active</span>
                <span className="flex items-center gap-1.5"><span style={{ width:8, height:8, borderRadius:"50%", background:"#f59e0b", display:"inline-block" }}/> Idle</span>
                <span className="flex items-center gap-1.5"><span style={{ width:8, height:8, borderRadius:"50%", background:"#ef4444", display:"inline-block" }}/> Maintenance</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background:"#1a2028" }}>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
                {/* Grid */}
                {Array.from({length:20}).map((_,i) => <line key={`v${i}`} x1={i*W/19} y1={0} x2={i*W/19} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>)}
                {Array.from({length:12}).map((_,i) => <line key={`h${i}`} x1={0} y1={i*H/11} x2={W} y2={i*H/11} stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>)}

                {/* City labels */}
                <text x={nagpur.x} y={nagpur.y - 14} fontSize={11} fill="#64748b" textAnchor="middle">Nagpur</text>
                <text x={mumbai.x} y={mumbai.y + 20} fontSize={11} fill="#64748b" textAnchor="middle">Mumbai</text>
                <text x={W*0.3}  y={H*0.82} fontSize={11} fill="#64748b" textAnchor="middle">Pune</text>

                {/* Dashed route */}
                <line x1={nagpur.x} y1={nagpur.y} x2={mumbai.x} y2={mumbai.y} stroke="#00ADB5" strokeWidth={1.5} strokeDasharray="8,5" opacity={0.35}/>

                {/* Static vehicles */}
                {MAP_VEHICLES.map(v => (
                  <g key={v.id}>
                    <circle cx={v.x*W} cy={v.y*H} r={14} fill={`${statusColor[v.status]}18`}/>
                    <circle cx={v.x*W} cy={v.y*H} r={7}  fill={statusColor[v.status]}/>
                    <circle cx={v.x*W} cy={v.y*H} r={3}  fill="#1a2028"/>
                  </g>
                ))}

                {/* Animated truck */}
                <circle cx={tx} cy={ty} r={18} fill="rgba(0,173,181,0.15)"/>
                <circle cx={tx} cy={ty} r={9}  fill="#00ADB5"/>
                <circle cx={tx} cy={ty} r={3.5} fill="#fff"/>
                <text x={tx+14} y={ty-12} fontSize={9} fill="#00ADB5" fontWeight="700">MH31-AB-1234</text>
              </svg>
            </div>
          </div>

          {/* Maintenance Alerts */}
          <div className="bg-[#2a3038] rounded-2xl p-5">
            <h2 className="font-bold text-white text-base mb-5">Maintenance Alerts</h2>
            <div className="flex flex-col gap-4">
              {MAINTENANCE_ALERTS.map(alert => {
                const cfg = severityConfig[alert.severity];
                return (
                  <div key={alert.id}
                    style={{ display:"flex", gap:12, padding:"10px 12px", borderRadius:10, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)", cursor:"default", transition:"background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                  >
                    <div style={{ width:32, height:32, borderRadius:8, background:cfg.bg, color:cfg.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <cfg.icon size={15}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#e2e8f0", display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"monospace", color:"#00ADB5" }}>{alert.vehicle}</span>
                        <span style={{ color:"#64748b", fontWeight:400 }}>•</span>
                        <span style={{ color:"#94a3b8", fontWeight:500 }}>{alert.driver}</span>
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", marginTop:3, lineHeight:1.4 }}>{alert.msg}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── BLOCKCHAIN ACTIVITY ── */}
        <div className="bg-[#2a3038] rounded-2xl p-5">
          <h2 className="font-bold text-white text-base mb-5">Recent Blockchain Activity</h2>
          <div className="flex flex-col divide-y divide-white/5">
            {BLOCKCHAIN_ACTIVITY.map(a => (
              <div key={a.id}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", gap:16 }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}
              >
                <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#00ADB5", flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:13, color:"#e2e8f0", fontWeight:500 }}>{a.text}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                      <span style={{ fontSize:11, fontFamily:"monospace", color:"#00ADB5" }}>{a.hash}</span>
                      <button
                        onClick={() => copyHash(a.hash)}
                        style={{ background:"none", border:"none", cursor:"pointer", color: copiedHash===a.hash ? "#00ADB5" : "#64748b", padding:0, display:"flex", transition:"color 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.color="#00ADB5"}
                        onMouseLeave={e => { if(copiedHash!==a.hash) e.currentTarget.style.color="#64748b"; }}
                      >
                        {copiedHash === a.hash ? <Check size={12}/> : <Copy size={12}/>}
                      </button>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize:12, color:"#64748b", whiteSpace:"nowrap", flexShrink:0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── NOTIFICATION PANEL ── */}
      <NotificationPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkAll={markAllRead}
      />
    </>
  );
}