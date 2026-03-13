"use client";
import { useState } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color }) => {
  const s = { width: size, height: size, display: "inline-block", flexShrink: 0, color };
  const icons = {
    wrench: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    briefcase: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    history: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.15"/></svg>,
    truck: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    bell: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    x: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    checkCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    trendUp: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    star: <svg style={s} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    users: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    rupee: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="18" y2="3"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="13" x2="12" y2="21"/><path d="M6 8a6 6 0 0 0 0 5h3"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    gauge: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>,
    alertTriangle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    tool: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    menu: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    invoice: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    mapPin: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    info: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return icons[name] || null;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, type: "alert", title: "New Critical Request", body: "SRV-3021 Engine Overhaul needs immediate attention.", time: "5 min ago", read: false },
  { id: 2, type: "job", title: "Job Deadline Tomorrow", body: "SRV-3015 Turbocharger Replacement due 01 Mar 2024.", time: "1h ago", read: false },
  { id: 3, type: "info", title: "Invoice Approved", body: "Invoice for SRV-2971 worth ₹52,000 has been approved.", time: "3h ago", read: true },
  { id: 4, type: "info", title: "Fleet Assignment Updated", body: "MH14-GH-3456 marked critical. Inspection required.", time: "5h ago", read: true },
];

const SERVICE_REQUESTS = [
  { id: "SRV-3021", title: "Engine Overhaul", priority: "critical", requestedBy: "Rajesh Patil (Driver)", description: "Excessive white smoke from exhaust. Oil consumption high. Engine misfiring at idle.", vehicle: "MH31-AB-1234", location: "Nagpur Depot", deadline: "01 Mar 2024", estimate: "₹45,000" },
  { id: "SRV-3018", title: "Brake Pad Replacement", priority: "high", requestedBy: "Amit Deshmukh (Driver)", description: "Squealing noise during braking. Front pads worn below minimum. Rear pads at 30%.", vehicle: "MH14-GH-3456", location: "Wardha Service Center", deadline: "02 Mar 2024", estimate: "₹12,000" },
  { id: "SRV-3014", title: "AC Compressor Repair", priority: "medium", requestedBy: "Fleet Manager", description: "AC not cooling. Compressor clutch not engaging. Possible refrigerant leak.", vehicle: "MH12-CD-5678", location: "Pune Depot", deadline: "05 Mar 2024", estimate: "₹8,500" },
  { id: "SRV-3010", title: "Tyre Replacement (Full Set)", priority: "high", requestedBy: "Fleet Manager", description: "Front tyres below 2mm tread. Rear tyres showing sidewall cracks. Full replacement needed.", vehicle: "MH04-EF-9012", location: "Mumbai Workshop", deadline: "03 Mar 2024", estimate: "₹64,000" },
];

const ACTIVE_JOBS = [
  { id: "SRV-3015", title: "Turbocharger Replacement", vehicle: "MH20-MN-6789", due: "01 Mar 2024", progress: 75, status: "In Progress", notes: "Old turbo removed. New unit installed. Calibrating boost pressure.", cost: "₹38,000" },
  { id: "SRV-3008", title: "Clutch Assembly Replacement", vehicle: "MH43-KL-2345", due: "28 Feb 2024", progress: 90, status: "In Progress", notes: "Clutch plate and pressure plate replaced. Flywheel resurfaced. Final road test pending.", cost: "₹22,000" },
  { id: "SRV-3002", title: "Full Service (60,000 km)", vehicle: "MH15-OP-1122", due: "27 Feb 2024", progress: 100, status: "Pending Approval", notes: "All filters replaced. Oil changed. Brakes inspected. Awaiting fleet manager sign-off.", cost: "₹15,500" },
];

const SERVICE_HISTORY = [
  { id: "SRV-2998", vehicle: "MH31-IJ-7890", type: "Suspension Overhaul", date: "20 Feb 2024", cost: "₹28,000", rating: 5.0, payment: "paid" },
  { id: "SRV-2985", vehicle: "MH04-EF-9012", type: "Electrical System Repair", date: "15 Feb 2024", cost: "₹9,200", rating: 4.5, payment: "paid" },
  { id: "SRV-2971", vehicle: "MH12-CD-5678", type: "Transmission Rebuild", date: "10 Feb 2024", cost: "₹52,000", rating: 5.0, payment: "paid" },
  { id: "SRV-2960", vehicle: "MH14-GH-3456", type: "Wheel Alignment + Balancing", date: "06 Feb 2024", cost: "₹3,500", rating: 4.0, payment: "paid" },
  { id: "SRV-2948", vehicle: "MH31-AB-1234", type: "Radiator Replacement", date: "01 Feb 2024", cost: "₹16,000", rating: 4.5, payment: "paid" },
  { id: "SRV-2932", vehicle: "MH20-MN-6789", type: "Injector Cleaning", date: "26 Jan 2024", cost: "₹7,800", rating: 5.0, payment: "pending" },
];

const FLEET_ASSIGNMENTS = [
  { reg: "MH31-AB-1234", model: "Tata Prima 4928.S", lastService: "15 Feb 2024", nextService: "15 Apr 2024", kmSince: "12,400 km", status: "good", notes: "Regular maintenance contract. Turbo replaced recently." },
  { reg: "MH12-CD-5678", model: "Ashok Leyland 4220", lastService: "10 Feb 2024", nextService: "10 Mar 2024", kmSince: "18,200 km", status: "attention", notes: "Transmission rebuilt. Monitor for gear slippage." },
  { reg: "MH04-EF-9012", model: "BharatBenz 3523R", lastService: "01 Feb 2024", nextService: "01 Apr 2024", kmSince: "8,900 km", status: "good", notes: "All systems nominal. Next service is routine 30k interval." },
  { reg: "MH14-GH-3456", model: "Eicher Pro 6049", lastService: "06 Feb 2024", nextService: "06 Mar 2024", kmSince: "22,100 km", status: "critical", notes: "Brake pads overdue. Suspension showing wear. Prioritize inspection." },
  { reg: "MH20-MN-6789", model: "Tata Signa 4825.TK", lastService: "26 Jan 2024", nextService: "26 Mar 2024", kmSince: "15,600 km", status: "good", notes: "Injectors cleaned. Fuel efficiency improved post-service." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const priorityConfig = {
  critical: { bg: "#fff0f0", color: "#dc2626", border: "#fecaca" },
  high: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  medium: { bg: "#fefce8", color: "#ca8a04", border: "#fde68a" },
  low: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

const statusConfig = {
  good: { bg: "rgba(13,188,167,0.08)", color: "#0dbca7", border: "rgba(13,188,167,0.2)" },
  attention: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  critical: { bg: "#fff0f0", color: "#dc2626", border: "#fecaca", icon: "alertTriangle" },
  "In Progress": { bg: "rgba(13,188,167,0.08)", color: "#0dbca7", border: "rgba(13,188,167,0.2)" },
  "Pending Approval": { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  paid: { bg: "rgba(13,188,167,0.08)", color: "#0dbca7", border: "rgba(13,188,167,0.2)" },
  pending: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
};

const Badge = ({ label, type }) => {
  const c = statusConfig[type] || priorityConfig[type] || { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
};

const StatCard = ({ icon, label, value, sub, subColor = "#64748b" }) => (
  <div style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 12, padding: "20px 22px", flex: "1 1 180px", minWidth: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#0dbca7" }}>
      <Icon name={icon} size={15} />
      <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, color: subColor, marginTop: 4 }}>{sub}</div>
  </div>
);

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
const NotificationPanel = ({ open, onClose, notifications, onMarkAll }) => {
  const unread = notifications.filter(n => !n.read).length;
  const typeMap = {
    alert: { bg: "#fff0f0", color: "#dc2626", icon: "alertTriangle" },
    job: { bg: "#f0fdf4", color: "#16a34a", icon: "briefcase" },
    info: { bg: "#f0f9ff", color: "#0369a1", icon: "info" },
  };
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 998, background: "rgba(0,0,0,0.15)" }} />}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 380, maxWidth: "100vw",
        background: "#fff", boxShadow: "-4px 0 30px rgba(0,0,0,0.12)", zIndex: 999,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a2332" }}>Notifications</div>
            {unread > 0 && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{unread} unread</div>}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {unread > 0 && <button onClick={onMarkAll} style={{ fontSize: 12, color: "#0dbca7", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>}
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "#f4f6f8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {notifications.map(n => {
            const t = typeMap[n.type];
            return (
              <div key={n.id} style={{ padding: "14px 22px", borderLeft: n.read ? "3px solid transparent" : "3px solid #0dbca7", background: n.read ? "transparent" : "#f8fffd" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: t.bg, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={t.icon} size={15} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 600, color: "#1a2332", marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{n.body}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{n.time}</div>
                  </div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0dbca7", flexShrink: 0, marginTop: 4 }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ─── PAGE: SERVICE REQUESTS ───────────────────────────────────────────────────
const ServiceRequestsPage = () => {
  const [requests, setRequests] = useState(SERVICE_REQUESTS);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? requests : requests.filter(r => r.priority === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Service Requests</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Incoming maintenance requests from FleetChain</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", "critical", "high", "medium"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
              border: filter === f ? "none" : "1px solid #d1d9e0",
              background: filter === f ? "#0dbca7" : "#fff",
              color: filter === f ? "#fff" : "#374151",
              textTransform: "capitalize",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>No requests</div>
        : filtered.map(req => {
          const pc = priorityConfig[req.priority];
          return (
            <div key={req.id} style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(13,188,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0dbca7", flexShrink: 0 }}>
                      <Icon name="wrench" size={16} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>{req.id} — {req.title}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>{req.priority}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Requested by {req.requestedBy}</div>
                    </div>
                  </div>
                  {/* Description */}
                  <p style={{ fontSize: 13, color: "#4b5563", margin: "10px 0", lineHeight: 1.6 }}>{req.description}</p>
                  {/* Meta */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
                    <span style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 5 }}><Icon name="truck" size={12} />{req.vehicle}</span>
                    <span style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 5 }}><Icon name="mapPin" size={12} />{req.location}</span>
                    <span style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 5 }}><Icon name="clock" size={12} />Deadline: {req.deadline}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1a2332" }}>Est: {req.estimate}</span>
                  </div>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: 10, flexShrink: 0, alignItems: "center" }}>
                  <button onClick={() => setRequests(r => r.filter(x => x.id !== req.id))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, border: "1px solid #d1d9e0", background: "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                    <Icon name="x" size={13} /> Decline
                  </button>
                  <button onClick={() => setRequests(r => r.filter(x => x.id !== req.id))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, border: "none", background: "#0dbca7", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                    <Icon name="check" size={13} /> Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// ─── PAGE: ACTIVE JOBS ────────────────────────────────────────────────────────
const ActiveJobsPage = () => {
  const [jobs, setJobs] = useState(ACTIVE_JOBS);
  const [updating, setUpdating] = useState(null);

  const handleProgress = (id) => {
    setUpdating(id);
    setTimeout(() => {
      setJobs(j => j.map(x => x.id === id ? { ...x, progress: Math.min(100, x.progress + 5) } : x));
      setUpdating(null);
    }, 600);
  };

  const handleInvoice = (id) => setJobs(j => j.filter(x => x.id !== id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Active Jobs</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Ongoing maintenance work and progress tracking</p>
      </div>

      {jobs.map(job => {
        const sc = statusConfig[job.status];
        const isComplete = job.progress === 100;
        return (
          <div key={job.id} style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 14, padding: "22px 24px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(13,188,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0dbca7", flexShrink: 0 }}>
                  <Icon name="wrench" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>{job.id} — {job.title}</div>
                  <div style={{ display: "flex", gap: 14, marginTop: 3, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><Icon name="truck" size={11} />{job.vehicle}</span>
                    <span style={{ fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={11} />Due: {job.due}</span>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{job.status}</span>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1a2332" }}>{job.progress}%</span>
              </div>
              <div style={{ height: 8, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${job.progress}%`, borderRadius: 999,
                  background: isComplete ? "linear-gradient(90deg,#0dbca7,#06b6d4)" : "linear-gradient(90deg,#0dbca7,#0aa899)",
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>

            {/* Notes & Cost */}
            <p style={{ fontSize: 13, color: "#4b5563", margin: "0 0 12px", lineHeight: 1.6 }}>{job.notes}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>Cost: {job.cost}</span>
              {isComplete ? (
                <button onClick={() => handleInvoice(job.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, border: "none", background: "#0dbca7", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                  <Icon name="checkCircle" size={14} /> Submit Invoice
                </button>
              ) : (
                <button onClick={() => handleProgress(job.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, border: "1px solid #d1d9e0", background: updating === job.id ? "#f8fafc" : "#fff", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                  {updating === job.id ? "Updating…" : "Update Progress"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── PAGE: SERVICE HISTORY ────────────────────────────────────────────────────
const ServiceHistoryPage = () => {
  const Stars = ({ rating }) => (
    <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#f59e0b" }}>
      <Icon name="star" size={13} />
      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{rating}</span>
    </span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Service History</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Completed jobs, revenue, and performance</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <StatCard icon="checkCircle" label="Jobs Completed" value="89" sub="12 this month" subColor="#0dbca7" />
        <StatCard icon="rupee" label="Revenue (YTD)" value="₹14.2L" sub="+18% vs last year" subColor="#0dbca7" />
        <StatCard icon="star" label="Avg Rating" value="4.7/5" sub="Based on 89 reviews" subColor="#64748b" />
        <StatCard icon="users" label="Repeat Clients" value="94%" sub="FleetChain top vendor" subColor="#0dbca7" />
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>Completed Services</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Service ID", "Vehicle", "Type", "Date", "Cost", "Rating", "Payment"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textAlign: "left", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICE_HISTORY.map(s => (
                <tr key={s.id}
                  style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <td style={{ padding: "14px 16px" }}><span style={{ color: "#0dbca7", fontWeight: 600, fontSize: 13 }}>{s.id}</span></td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", fontFamily: "monospace" }}>{s.vehicle}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{s.type}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{s.date}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: "#1a2332" }}>{s.cost}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#f59e0b" }}>
                      <Icon name="star" size={13} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{s.rating}</span>
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}><Badge label={s.payment} type={s.payment} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: FLEET ASSIGNMENTS ──────────────────────────────────────────────────
const FleetAssignmentsPage = () => {
  const statusIcon = { good: "checkCircle", attention: "alertTriangle", critical: "alertTriangle" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Fleet Assignments</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Vehicles assigned to your maintenance contract</p>
      </div>

      {FLEET_ASSIGNMENTS.map(vehicle => {
        const sc = statusConfig[vehicle.status];
        return (
          <div key={vehicle.reg} style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(13,188,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0dbca7", flexShrink: 0 }}>
                  <Icon name="truck" size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2332" }}>{vehicle.reg}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{vehicle.model}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                {vehicle.status === "critical" && <Icon name="alertTriangle" size={11} />}
                {vehicle.status}
              </span>
            </div>

            {/* Service dates grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="wrench" size={11} /> Last Service
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>{vehicle.lastService}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="calendar" size={11} /> Next Service
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>{vehicle.nextService}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon name="gauge" size={11} /> Km Since Service
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>{vehicle.kmSince}</div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "#4b5563", margin: 0, lineHeight: 1.6, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>{vehicle.notes}</p>
          </div>
        );
      })}
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function VendorPortal({ initialPage = "service-requests" }) {
  const [activePage, setActivePage] = useState(initialPage);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unread = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const navItems = [
    { id: "service-requests", label: "Service Requests", icon: "wrench" },
    { id: "active-jobs", label: "Active Jobs", icon: "briefcase" },
    { id: "service-history", label: "Service History", icon: "history" },
    { id: "fleet-assignments", label: "Fleet Assignments", icon: "truck" },
  ];

  const renderPage = () => {
    if (activePage === "service-requests") return <ServiceRequestsPage />;
    if (activePage === "active-jobs") return <ActiveJobsPage />;
    if (activePage === "service-history") return <ServiceHistoryPage />;
    if (activePage === "fleet-assignments") return <FleetAssignmentsPage />;
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f4f6f8", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        @media (max-width: 768px) {
          .vp-sidebar { position: fixed !important; left: 0; top: 0; bottom: 0; z-index: 50; transform: translateX(-100%); transition: transform 0.3s ease; }
          .vp-sidebar.open { transform: translateX(0) !important; }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 49, background: "rgba(0,0,0,0.3)" }} />}

      {/* Sidebar */}
      <aside className={`vp-sidebar${sidebarOpen ? " open" : ""}`} style={{ width: 260, minWidth: 260, background: "#fff", borderRight: "1px solid #e8ecef", display: "flex", flexDirection: "column", zIndex: 50 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0dbca7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>FC</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#1a2332" }}>FleetChain</span>
          </div>
        </div>
        <div style={{ padding: "14px 20px 8px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", paddingLeft: 12 }}>Vendor Portal</span>
        </div>
        <nav style={{ flex: 1, padding: "4px 12px" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => { setActivePage(item.id); setSidebarOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                background: active ? "rgba(13,188,167,0.1)" : "transparent",
                color: active ? "#0dbca7" : "#374151",
                fontSize: 14, fontWeight: active ? 600 : 500, marginBottom: 2, textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={item.icon} size={16} />{item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 73, background: "#fff", borderBottom: "1px solid #e8ecef", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 4, display: "flex" }}>
              <Icon name="menu" size={20} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>AutoCare Services</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "rgba(13,188,167,0.1)", color: "#0dbca7", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(13,188,167,0.2)" }}>Vendor</div>
            <button onClick={() => setNotifOpen(true)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 4, display: "flex" }}>
              <Icon name="bell" size={20} />
              {unread > 0 && (
                <div style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>{unread}</div>
              )}
            </button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0dbca7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>AC</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          {renderPage()}
        </main>
      </div>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAll={markAllRead} />
    </div>
  );
}