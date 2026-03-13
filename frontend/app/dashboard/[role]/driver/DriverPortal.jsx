"use client";
import { useState, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NOTIFICATIONS = [
  { id: 1, type: "alert", title: "Engine Temperature Warning", body: "Engine temp reached 95°C. Monitor closely.", time: "2 min ago", read: false },
  { id: 2, type: "job", title: "New Job Request", body: "JOB-4021 from Bajaj Electronics — Nagpur → Pune", time: "18 min ago", read: false },
  { id: 3, type: "info", title: "Checkpoint Confirmed", body: "Nashik Fuel Stop logged at 12:10 PM", time: "42 min ago", read: true },
  { id: 4, type: "job", title: "Job Offer Expired", body: "JOB-3998 from Tata Motors has expired.", time: "2h ago", read: true },
  { id: 5, type: "info", title: "Fuel Stop Reminder", body: "Next recommended fuel stop: Kasara Ghat", time: "3h ago", read: true },
];

const CHECKPOINTS = [
  { name: "Nagpur Depot", time: "06:30 AM", status: "done" },
  { name: "Amravati Toll", time: "08:15 AM", status: "done" },
  { name: "Aurangabad Bypass", time: "10:40 AM", status: "done" },
  { name: "Nashik Fuel Stop", time: "12:10 PM", status: "current", note: "Currently here" },
  { name: "Kasara Ghat", time: "—", status: "pending" },
  { name: "Mumbai Warehouse", time: "—", status: "pending" },
];

const JOB_REQUESTS = [
  { id: "JOB-4021", priority: "Standard", client: "Bajaj Electronics", from: "Nagpur", to: "Pune", duration: "7h 30m", distance: "520 km", cargo: "Electronic Components", weight: "8.2 Tonnes", pickup: "Tomorrow, 05:00 AM", pay: "₹3,600" },
  { id: "JOB-4018", priority: "Urgent", client: "Cipla Ltd.", from: "Mumbai", to: "Ahmedabad", duration: "8h 00m", distance: "530 km", cargo: "Pharmaceutical Supplies", weight: "4.5 Tonnes", pickup: "Today, 02:00 PM", pay: "₹4,200" },
  { id: "JOB-4015", priority: "Standard", client: "Hindustan Unilever", from: "Nashik", to: "Kolhapur", duration: "5h 45m", distance: "380 km", cargo: "FMCG Products", weight: "12 Tonnes", pickup: "01 Mar, 06:00 AM", pay: "₹2,800" },
  { id: "JOB-4010", priority: "Urgent", client: "Mahindra & Mahindra", from: "Nagpur", to: "Delhi", duration: "16h 00m", distance: "1,060 km", cargo: "Auto Parts", weight: "15 Tonnes", pickup: "01 Mar, 04:00 AM", pay: "₹7,500" },
];

const TRIP_HISTORY = [
  { id: "TRIP-0891", date: "28 Feb 2024", from: "Nagpur", to: "Mumbai", distance: "680 km", duration: "8h 15m", fuel: "142L", earnings: "₹4,200", status: "completed" },
  { id: "TRIP-0884", date: "25 Feb 2024", from: "Mumbai", to: "Pune", distance: "150 km", duration: "3h 10m", fuel: "32L", earnings: "₹1,800", status: "completed" },
  { id: "TRIP-0872", date: "22 Feb 2024", from: "Pune", to: "Hyderabad", distance: "560 km", duration: "9h 40m", fuel: "118L", earnings: "₹3,900", status: "completed" },
  { id: "TRIP-0865", date: "19 Feb 2024", from: "Nagpur", to: "Delhi", distance: "1,060 km", duration: "16h 20m", fuel: "224L", earnings: "₹6,800", status: "completed" },
  { id: "TRIP-0851", date: "15 Feb 2024", from: "Nashik", to: "Nagpur", distance: "520 km", duration: "7h 50m", fuel: "110L", earnings: "₹3,400", status: "completed" },
  { id: "TRIP-0843", date: "12 Feb 2024", from: "Aurangabad", to: "Mumbai", distance: "340 km", duration: "5h 30m", fuel: "72L", earnings: "₹0", status: "cancelled" },
  { id: "TRIP-0836", date: "09 Feb 2024", from: "Kolhapur", to: "Pune", distance: "230 km", duration: "4h 15m", fuel: "48L", earnings: "₹2,100", status: "completed" },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 16, className = "" }) => {
  const icons = {
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    briefcase: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    navigation: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81 19.79 19.79 0 0 1 1.61 1.19 2 2 0 0 1 3.6.01h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    gauge: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>,
    droplet: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    thermometer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
    activity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    trendUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    weight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="5" r="3"/><path d="M6.5 8h11l1 11H5.5z"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  };
  return icons[name] || null;
};

// ─── TELEMETRY CARD ───────────────────────────────────────────────────────────

const TelemetryCard = ({ icon, label, value, unit, highlight = false }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? (highlight ? "rgba(13,188,167,0.05)" : "#f8fafc") : "#fff",
        border: `1px solid ${hovered ? (highlight ? "rgba(13,188,167,0.4)" : "#cbd5e1") : "#e8ecef"}`,
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        flex: "1 1 200px",
        minWidth: 0,
        cursor: "default",
        transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
        boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: hovered
          ? (highlight ? "rgba(13,188,167,0.18)" : "#e8ecef")
          : (highlight ? "rgba(13,188,167,0.1)" : "#f4f6f8"),
        display: "flex", alignItems: "center", justifyContent: "center",
        color: highlight ? "#0dbca7" : "#64748b", flexShrink: 0,
        transition: "background 0.18s ease",
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", lineHeight: 1.1 }}>
          {value}<span style={{ fontSize: 13, fontWeight: 500, color: "#64748b", marginLeft: 3 }}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────

const StatCard = ({ icon, label, value, sub, subColor = "#64748b" }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#f8fffd" : "#fff",
        border: `1px solid ${hovered ? "rgba(13,188,167,0.35)" : "#e8ecef"}`,
        borderRadius: 12,
        padding: "20px 22px",
        flex: "1 1 180px",
        minWidth: 0,
        cursor: "default",
        transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
        boxShadow: hovered ? "0 4px 18px rgba(13,188,167,0.1)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#0dbca7" }}>
        <Icon name={icon} size={16} />
        <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500, letterSpacing: "0.03em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2332", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: subColor, marginTop: 4 }}>{sub}</div>
    </div>
  );
};

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────

const NotificationPanel = ({ open, onClose, notifications, onMarkAll }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeStyles = {
    alert: { bg: "#fff4f4", color: "#e53e3e", icon: "alert" },
    job: { bg: "#f0fdf4", color: "#16a34a", icon: "briefcase" },
    info: { bg: "#f0f9ff", color: "#0369a1", icon: "activity" },
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(0,0,0,0.15)",
          }}
        />
      )}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 380, maxWidth: "100vw",
        background: "#fff",
        boxShadow: "-4px 0 30px rgba(0,0,0,0.12)",
        zIndex: 999,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a2332" }}>Notifications</div>
            {unreadCount > 0 && (
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{unreadCount} unread</div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAll}
                className="fc-markall-btn"
                style={{ fontSize: 12, color: "#0dbca7", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6, transition: "background 0.15s ease, color 0.15s ease" }}
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="fc-icon-btn"
              style={{ width: 32, height: 32, borderRadius: 8, background: "#f4f6f8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", transition: "background 0.15s ease, color 0.15s ease" }}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          {notifications.map((n) => {
            const ts = typeStyles[n.type];
            return (
              <NotificationItem key={n.id} n={n} ts={ts} />
            );
          })}
        </div>
      </div>
    </>
  );
};

const NotificationItem = ({ n, ts }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 22px",
        borderLeft: n.read ? (hovered ? "3px solid #cbd5e1" : "3px solid transparent") : "3px solid #0dbca7",
        background: hovered ? (n.read ? "#f8fafc" : "#f0fefb") : (n.read ? "transparent" : "#f8fffd"),
        cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: ts.bg, color: ts.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 1,
          transition: "transform 0.15s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}>
          <Icon name={ts.icon} size={15} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 600, color: "#1a2332", marginBottom: 2 }}>{n.title}</div>
          <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{n.body}</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5 }}>{n.time}</div>
        </div>
        {!n.read && (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0dbca7", flexShrink: 0, marginTop: 6 }} />
        )}
      </div>
    </div>
  );
};

// ─── CALL DISPATCH MODAL ──────────────────────────────────────────────────────

const CallDispatchModal = ({ open, onClose }) => {
  if (!open) return null;

  const contacts = [
    { name: "Dispatch Control", number: "+91 9876543210" },
    { name: "Route Manager", number: "+91 9823456789" },
    { name: "Emergency Support", number: "+91 1800123456" }
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", borderRadius: 14, width: 420, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>Call Dispatch</h3>
          <button
            onClick={onClose}
            className="fc-icon-btn"
            style={{ border: "none", background: "none", cursor: "pointer", padding: 4, borderRadius: 6, color: "#64748b", transition: "background 0.15s ease, color 0.15s ease" }}
          >
            <Icon name="close" />
          </button>
        </div>

        {contacts.map(c => (
          <ContactRow key={c.name} c={c} />
        ))}
      </div>
    </div>
  );
};

const ContactRow = ({ c }) => {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "rgba(13,188,167,0.35)" : "#e2e8f0"}`,
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: hovered ? "#f8fffd" : "#fff",
        transition: "border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
        boxShadow: hovered ? "0 2px 10px rgba(13,188,167,0.08)" : "none",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{c.name}</div>
        <div style={{ fontSize: 12, color: "#64748b" }}>{c.number}</div>
      </div>
      <button
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={() => window.open(`tel:${c.number}`)}
        style={{
          background: btnHovered ? "#0aa899" : "#0dbca7",
          color: "#fff",
          border: "none",
          padding: "6px 14px",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 500,
          transition: "background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
          transform: btnHovered ? "scale(1.04)" : "scale(1)",
          boxShadow: btnHovered ? "0 4px 12px rgba(13,188,167,0.35)" : "none",
        }}
      >
        Call
      </button>
    </div>
  );
};

// ─── REPORT ISSUE MODAL ───────────────────────────────────────────────────────

const ReportIssueModal = ({ open, onClose }) => {
  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);

  if (!open) return null;

  const submitIssue = () => {
    alert("Issue reported to dispatch");
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", borderRadius: 14, width: 450, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>Report Issue</h3>
          <button
            onClick={onClose}
            className="fc-icon-btn"
            style={{ border: "none", background: "none", cursor: "pointer", padding: 4, borderRadius: 6, color: "#64748b", transition: "background 0.15s ease, color 0.15s ease" }}
          >
            <Icon name="close" />
          </button>
        </div>

        <select
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="fc-select"
          style={{
            width: "100%", padding: 10, borderRadius: 8,
            border: "1px solid #e2e8f0", marginBottom: 12,
            outline: "none", cursor: "pointer",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          <option value="">Select Issue</option>
          <option>Vehicle Breakdown</option>
          <option>Accident</option>
          <option>Tyre Puncture</option>
          <option>Fuel Issue</option>
          <option>Medical Emergency</option>
        </select>

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          placeholder="Describe the issue"
          className="fc-textarea"
          style={{
            width: "100%", padding: 10, borderRadius: 8,
            border: "1px solid #e2e8f0", marginBottom: 16,
            resize: "vertical", outline: "none",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
        />

        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={submitIssue}
          style={{
            width: "100%",
            background: btnHovered ? "#dc2626" : "#ef4444",
            color: "#fff",
            border: "none",
            padding: 12,
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
            boxShadow: btnHovered ? "0 4px 16px rgba(239,68,68,0.4)" : "none",
            transform: btnHovered ? "translateY(-1px)" : "translateY(0)",
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

// ─── ACTIVE TRIP PAGE ─────────────────────────────────────────────────────────

const ActiveTripPage = () => {
  const progress = 61;
  const [callOpen, setCallOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [callBtnHovered, setCallBtnHovered] = useState(false);
  const [issueBtnHovered, setIssueBtnHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Active Trip</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Real-time trip progress & vehicle telemetry</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onMouseEnter={() => setCallBtnHovered(true)}
            onMouseLeave={() => setCallBtnHovered(false)}
            onClick={() => setCallOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 8,
              border: `1px solid ${callBtnHovered ? "#adb8c4" : "#d1d9e0"}`,
              background: callBtnHovered ? "#f4f6f8" : "#fff",
              fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer",
              transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              boxShadow: callBtnHovered ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              transform: callBtnHovered ? "translateY(-1px)" : "translateY(0)",
            }}
          >
            <Icon name="phone" size={14} /> Call Dispatch
          </button>

          <button
            onMouseEnter={() => setIssueBtnHovered(true)}
            onMouseLeave={() => setIssueBtnHovered(false)}
            onClick={() => setIssueOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 8,
              border: "none",
              background: issueBtnHovered ? "#dc2626" : "#ef4444",
              fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
              transition: "background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              boxShadow: issueBtnHovered ? "0 4px 14px rgba(239,68,68,0.45)" : "none",
              transform: issueBtnHovered ? "translateY(-1px)" : "translateY(0)",
            }}
          >
            <Icon name="alert" size={14} /> Report Issue
          </button>
        </div>
      </div>

      {/* Trip Card */}
      <TripCard progress={progress} />

      {/* Vehicle Telemetry */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a2332", marginBottom: 14 }}>Vehicle Telemetry</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <TelemetryCard icon="gauge" label="Speed" value="72" unit="km/h" highlight />
          <TelemetryCard icon="droplet" label="Fuel Level" value="68" unit="%" highlight />
          <TelemetryCard icon="thermometer" label="Engine Temp" value="92" unit="°C" highlight />
          <TelemetryCard icon="activity" label="Tire Pressure" value="34" unit="PSI" highlight />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
          <TelemetryCard icon="truck" label="Odometer" value="1,24,892" unit="km" />
          <TelemetryCard icon="thermometer" label="Coolant Temp" value="88" unit="°C" />
          <TelemetryCard icon="activity" label="Battery" value="13.2" unit="V" />
          <TelemetryCard icon="gauge" label="Oil Pressure" value="42" unit="PSI" />
        </div>
      </div>

      {/* Route Checkpoints */}
      <CheckpointsCard />

      <CallDispatchModal open={callOpen} onClose={() => setCallOpen(false)} />
      <ReportIssueModal open={issueOpen} onClose={() => setIssueOpen(false)} />
    </div>
  );
};

const TripCard = ({ progress }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#c8d5e0" : "#e8ecef"}`,
        borderRadius: 14,
        padding: "22px 24px",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: hovered ? "rgba(13,188,167,0.15)" : "rgba(13,188,167,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#0dbca7",
            transition: "background 0.18s ease",
          }}>
            <Icon name="truck" size={20} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2332" }}>TRIP-2024-0891</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>MH31-AB-1234 • Cold-Rolled Steel Coils — 18 Tonnes</div>
          </div>
        </div>
        <div style={{ background: "rgba(13,188,167,0.1)", color: "#0dbca7", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(13,188,167,0.2)" }}>
          In Transit
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: "#1a2332", fontSize: 14 }}>Nagpur</span>
          <span style={{ fontWeight: 700, color: "#1a2332", fontSize: 14 }}>Mumbai</span>
        </div>
        <div style={{ height: 10, background: "#e8ecef", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0dbca7, #0aa899)", borderRadius: 999, transition: "width 1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Started: 06:30 AM</span>
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>412 / 680 km ({progress}%)</span>
          <span style={{ fontSize: 12, color: "#64748b" }}>ETA: 02:45 PM</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0dbca7", marginTop: 12 }}>
        <Icon name="navigation" size={14} />
        <span style={{ fontSize: 13, fontWeight: 500 }}>Current: Near Nashik, Maharashtra</span>
      </div>
    </div>
  );
};

const CheckpointsCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#c8d5e0" : "#e8ecef"}`,
        borderRadius: 14,
        padding: "22px 24px",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a2332", marginBottom: 18 }}>Route Checkpoints</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {CHECKPOINTS.map((cp, i) => (
          <CheckpointRow key={i} cp={cp} i={i} total={CHECKPOINTS.length} />
        ))}
      </div>
    </div>
  );
};

const CheckpointRow = ({ cp, i, total }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        position: "relative",
        background: hovered && cp.status !== "pending" ? "rgba(13,188,167,0.04)" : "transparent",
        borderRadius: 8,
        padding: "2px 4px",
        marginLeft: -4,
        transition: "background 0.15s ease",
        cursor: "default",
      }}
    >
      {i < total - 1 && (
        <div style={{
          position: "absolute", left: 11, top: 22, width: 2, height: 44,
          background: cp.status === "pending" ? "#e2e8f0" : "#0dbca7",
        }} />
      )}
      <div style={{
        width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 3,
        background: cp.status === "pending" ? "#cbd5e1" : "#0dbca7",
        border: cp.status === "current" ? "3px solid rgba(13,188,167,0.3)" : "none",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transform: hovered && cp.status !== "pending" ? "scale(1.2)" : "scale(1)",
        boxShadow: hovered && cp.status !== "pending" ? "0 0 0 4px rgba(13,188,167,0.15)" : "none",
      }} />
      <div style={{ flex: 1, paddingBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{
              fontSize: 14, fontWeight: 600,
              color: cp.status === "pending" ? "#94a3b8" : (hovered ? "#0dbca7" : "#1a2332"),
              transition: "color 0.15s ease",
            }}>{cp.name}</span>
            {cp.note && <div style={{ fontSize: 12, color: "#0dbca7", fontWeight: 500, marginTop: 2 }}>{cp.note}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>{cp.time}</span>
            {cp.status === "done" && <Icon name="check" size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── JOB REQUESTS PAGE ────────────────────────────────────────────────────────

const JobRequestsPage = () => {
  const [jobs, setJobs] = useState(JOB_REQUESTS);
  const [filter, setFilter] = useState("All");

  const handleAccept = (id) => setJobs(j => j.filter(x => x.id !== id));
  const handleDecline = (id) => setJobs(j => j.filter(x => x.id !== id));

  const filtered = filter === "All" ? jobs : jobs.filter(j => j.priority === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Job Requests</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Available trips assigned to you — accept or decline</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Urgent", "Standard"].map(f => (
            <FilterButton key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 15 }}>No job requests</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(job => (
            <JobCard key={job.id} job={job} onAccept={handleAccept} onDecline={handleDecline} />
          ))}
        </div>
      )}
    </div>
  );
};

const FilterButton = ({ label, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        padding: "7px 16px", borderRadius: 8,
        border: active ? "none" : `1px solid ${hovered ? "#adb8c4" : "#d1d9e0"}`,
        background: active ? (hovered ? "#0aa899" : "#0dbca7") : (hovered ? "#f4f6f8" : "#fff"),
        color: active ? "#fff" : (hovered ? "#1a2332" : "#374151"),
        fontSize: 13, fontWeight: 500, cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
        boxShadow: active && hovered ? "0 3px 10px rgba(13,188,167,0.35)" : "none",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {label}
    </button>
  );
};

const JobCard = ({ job, onAccept, onDecline }) => {
  const [hovered, setHovered] = useState(false);
  const [acceptHovered, setAcceptHovered] = useState(false);
  const [declineHovered, setDeclineHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fafcff" : "#fff",
        border: `1px solid ${hovered ? "#b8c9d9" : "#e8ecef"}`,
        borderRadius: 14,
        padding: "20px 22px",
        transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.09)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>{job.id}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
              background: job.priority === "Urgent" ? "#fff0f0" : "rgba(13,188,167,0.1)",
              color: job.priority === "Urgent" ? "#e53e3e" : "#0dbca7",
              border: job.priority === "Urgent" ? "1px solid #fecaca" : "1px solid rgba(13,188,167,0.2)",
            }}>{job.priority}</span>
            <span style={{ fontSize: 13, color: "#64748b" }}>from {job.client}</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginBottom: 10 }}>
            {[
              { icon: "mapPin", text: `${job.from} → ${job.to}` },
              { icon: "clock", text: `${job.duration} • ${job.distance}` },
              { icon: "package", text: job.cargo },
              { icon: "weight", text: job.weight },
            ].map(({ icon, text }) => (
              <div key={icon} style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13 }}>
                <Icon name={icon} size={13} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 13, color: "#374151" }}>
              Pickup: <strong>{job.pickup}</strong>
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>₹ {job.pay.replace("₹", "")}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <button
            onMouseEnter={() => setDeclineHovered(true)}
            onMouseLeave={() => setDeclineHovered(false)}
            onClick={() => onDecline(job.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 18px", borderRadius: 8,
              border: `1px solid ${declineHovered ? "#adb8c4" : "#d1d9e0"}`,
              background: declineHovered ? "#f4f6f8" : "#fff",
              fontSize: 13, fontWeight: 500,
              color: declineHovered ? "#e53e3e" : "#374151",
              cursor: "pointer",
              transition: "border-color 0.15s ease, background 0.15s ease, color 0.15s ease, transform 0.15s ease",
              transform: declineHovered ? "translateY(-1px)" : "translateY(0)",
            }}
          >
            <Icon name="x" size={13} /> Decline
          </button>
          <button
            onMouseEnter={() => setAcceptHovered(true)}
            onMouseLeave={() => setAcceptHovered(false)}
            onClick={() => onAccept(job.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 18px", borderRadius: 8,
              border: "none",
              background: acceptHovered ? "#0aa899" : "#0dbca7",
              fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
              transition: "background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              boxShadow: acceptHovered ? "0 4px 14px rgba(13,188,167,0.45)" : "none",
              transform: acceptHovered ? "translateY(-1px)" : "translateY(0)",
            }}
          >
            <Icon name="check" size={13} /> Accept
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── TRIP HISTORY PAGE ────────────────────────────────────────────────────────

const TripHistoryPage = () => {
  const [timeFilter, setTimeFilter] = useState("All Time");

  const statusStyle = {
    completed: { bg: "rgba(13,188,167,0.1)", color: "#0dbca7", border: "1px solid rgba(13,188,167,0.2)" },
    cancelled: { bg: "#fff0f0", color: "#e53e3e", border: "1px solid #fecaca" },
    pending: { bg: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a2332", margin: 0 }}>Trip History</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>Past trips and performance metrics</p>
        </div>
        <div style={{ position: "relative" }}>
          <select
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
            className="fc-select"
            style={{
              appearance: "none", padding: "9px 36px 9px 14px",
              borderRadius: 8, border: "1px solid #d1d9e0", background: "#fff",
              fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer",
              outline: "none",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {["All Time", "This Month", "Last Month", "Last 3 Months"].map(o => <option key={o}>{o}</option>)}
          </select>
          <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#64748b" }}>
            <Icon name="chevronDown" size={14} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <StatCard icon="truck" label="Total Trips" value="147" sub="+12 this month" subColor="#0dbca7" />
        <StatCard icon="clock" label="Avg Trip Time" value="7.2h" sub="-0.4h vs last month" subColor="#64748b" />
        <StatCard icon="droplet" label="Fuel Efficiency" value="4.8 km/L" sub="+0.2 improvement" subColor="#0dbca7" />
        <StatCard icon="trendUp" label="On-Time Rate" value="94%" sub="Above target" subColor="#0dbca7" />
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8ecef", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332" }}>Recent Trips</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Trip ID", "Date", "Route", "Distance", "Duration", "Fuel Used", "Earnings", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textAlign: "left", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRIP_HISTORY.map((t) => {
                const ss = statusStyle[t.status];
                return (
                  <TripHistoryRow key={t.id} t={t} ss={ss} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TripHistoryRow = ({ t, ss }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid #f1f5f9",
        background: hovered ? "#f0fefb" : "transparent",
        transition: "background 0.15s ease",
        cursor: "default",
      }}
    >
      <td style={{ padding: "14px 16px" }}>
        <span style={{
          color: hovered ? "#0aa899" : "#0dbca7",
          fontWeight: 600, fontSize: 13,
          transition: "color 0.15s ease",
        }}>{t.id}</span>
      </td>
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{t.date}</td>
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{t.from} → {t.to}</td>
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{t.distance}</td>
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{t.duration}</td>
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#374151" }}>{t.fuel}</td>
      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#1a2332" }}>{t.earnings}</td>
      <td style={{ padding: "14px 16px" }}>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
          background: ss.bg, color: ss.color, border: ss.border,
          transition: "transform 0.15s ease",
          display: "inline-block",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}>{t.status}</span>
      </td>
    </tr>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function DriverPortal({ initialPage = "active-trip" }) {
  const [activePage, setActivePage] = useState(initialPage);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bellHovered, setBellHovered] = useState(false);
  const [hamburgerHovered, setHamburgerHovered] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const navItems = [
    { id: "active-trip", label: "Active Trip", icon: "navigation" },
    { id: "job-requests", label: "Job Requests", icon: "briefcase" },
    { id: "trip-history", label: "Trip History", icon: "clock" },
  ];

  const renderPage = () => {
    if (activePage === "active-trip") return <ActiveTripPage />;
    if (activePage === "job-requests") return <JobRequestsPage />;
    if (activePage === "trip-history") return <TripHistoryPage />;
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f4f6f8", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* Mark all read button */
        .fc-markall-btn:hover {
          background: rgba(13,188,167,0.1) !important;
          color: #0aa899 !important;
        }

        /* Generic icon button (close buttons) */
        .fc-icon-btn:hover {
          background: #e8ecef !important;
          color: #1a2332 !important;
        }

        /* Select focus/hover */
        .fc-select:hover {
          border-color: #94a3b8 !important;
          box-shadow: 0 0 0 3px rgba(13,188,167,0.08) !important;
        }
        .fc-select:focus {
          border-color: #0dbca7 !important;
          box-shadow: 0 0 0 3px rgba(13,188,167,0.15) !important;
        }

        /* Textarea focus/hover */
        .fc-textarea:hover {
          border-color: #94a3b8 !important;
        }
        .fc-textarea:focus {
          border-color: #0dbca7 !important;
          box-shadow: 0 0 0 3px rgba(13,188,167,0.15) !important;
        }

        @media (max-width: 768px) {
          .fc-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
          .fc-sidebar.open { transform: translateX(0) !important; }
          .fc-main { margin-left: 0 !important; }
        }
      `}</style>

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 49, background: "rgba(0,0,0,0.3)",
        }} />
      )}

      {/* Sidebar */}
      <aside className={`fc-sidebar${sidebarOpen ? " open" : ""}`} style={{
        width: 260, minWidth: 260, background: "#fff",
        borderRight: "1px solid #e8ecef",
        display: "flex", flexDirection: "column",
        zIndex: 50, position: "relative",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0dbca7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "-0.5px" }}>FC</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#1a2332", letterSpacing: "-0.3px" }}>FleetChain</span>
          </div>
        </div>

        <div style={{ padding: "14px 20px 8px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", paddingLeft: 12 }}>Driver Portal</span>
        </div>

        <nav style={{ flex: 1, padding: "4px 12px" }}>
          {navItems.map(item => (
            <NavItem
              key={item.id}
              item={item}
              active={activePage === item.id}
              onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
            />
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="fc-main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{
          height: 73, background: "#fff", borderBottom: "1px solid #e8ecef",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onMouseEnter={() => setHamburgerHovered(true)}
              onMouseLeave={() => setHamburgerHovered(false)}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: hamburgerHovered ? "#f4f6f8" : "none",
                border: "none", cursor: "pointer",
                color: hamburgerHovered ? "#1a2332" : "#374151",
                padding: 6, borderRadius: 8, display: "flex",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <Icon name="menu" size={20} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Rajesh Patil</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "rgba(13,188,167,0.1)", color: "#0dbca7", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(13,188,167,0.2)" }}>
              Driver
            </div>
            {/* Notification Bell */}
            <button
              onMouseEnter={() => setBellHovered(true)}
              onMouseLeave={() => setBellHovered(false)}
              onClick={() => setNotifOpen(true)}
              style={{
                position: "relative",
                background: bellHovered ? "#f4f6f8" : "none",
                border: "none", cursor: "pointer",
                color: bellHovered ? "#1a2332" : "#374151",
                padding: 6, borderRadius: 8,
                display: "flex", alignItems: "center",
                transition: "background 0.15s ease, color 0.15s ease, transform 0.15s ease",
                transform: bellHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Icon name="bell" size={20} />
              {unreadCount > 0 && (
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#ef4444", color: "#fff",
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #fff",
                }}>
                  {unreadCount}
                </div>
              )}
            </button>
            {/* Avatar */}
            <div
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: avatarHovered ? "#0aa899" : "#0dbca7",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 13, fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
                transform: avatarHovered ? "scale(1.08)" : "scale(1)",
                boxShadow: avatarHovered ? "0 2px 10px rgba(13,188,167,0.45)" : "none",
              }}
            >
              RP
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          {renderPage()}
        </main>
      </div>

      <NotificationPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkAll={markAllRead}
      />
    </div>
  );
}

// ─── NAV ITEM ─────────────────────────────────────────────────────────────────

const NavItem = ({ item, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: 9,
        border: "none", cursor: "pointer",
        background: active
          ? "rgba(13,188,167,0.1)"
          : (hovered ? "#f0fefb" : "transparent"),
        color: active ? "#0dbca7" : (hovered ? "#0dbca7" : "#374151"),
        fontSize: 14, fontWeight: active ? 600 : 500,
        marginBottom: 2, textAlign: "left",
        transition: "background 0.15s ease, color 0.15s ease, transform 0.12s ease",
        transform: hovered && !active ? "translateX(3px)" : "translateX(0)",
        boxShadow: active && hovered ? "inset 0 0 0 1px rgba(13,188,167,0.25)" : "none",
      }}
    >
      <Icon name={item.icon} size={16} />
      {item.label}
    </button>
  );
};