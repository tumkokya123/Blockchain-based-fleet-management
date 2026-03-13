"use client";
import { useState, useEffect, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color }) => {
  const s = { width: size, height: size, display: "inline-block", flexShrink: 0, color };
  const icons = {
    search:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    checkCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    alertCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    bell:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    menu:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    package:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    truck:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    mapPin:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    copy:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    chain:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    send:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    info:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    clock:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    chevronDown: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    check:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    user:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    weight:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8h11l1 11H5.5z"/></svg>,
  };
  return icons[name] || null;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const BLOCKCHAIN_EVENTS = [
  { icon:"package", title:"Shipment Created",                      hash:"0xB7e2...4dF1", status:"Confirmed", time:"27 Feb 2026, 09:15", done:true  },
  { icon:"truck",   title:"Picked Up — Nagpur Warehouse",          hash:"0xF1a9...3bE2", status:"Confirmed", time:"27 Feb 2026, 10:42", done:true  },
  { icon:"truck",   title:"In Transit — MH31-AB-1234",             hash:"0xA5c8...7dF0", status:"Confirmed", time:"27 Feb 2026, 11:30", done:true  },
  { icon:"mapPin",  title:"Checkpoint — Wardha Toll",              hash:"0xC2e7...9aB1", status:"Confirmed", time:"27 Feb 2026, 14:05", done:true  },
  { icon:"truck",   title:"Out for Delivery",                      hash:"0xD8f3...2cA4", status:"Confirmed", time:"2 Mar 2026, 13:10",  done:true  },
  { icon:"checkCircle", title:"Awaiting Delivery Confirmation",    hash:"—",             status:"Pending",   time:"Pending",            done:false },
];

const INCOMING_DELIVERIES = [
  { id:"SHP-4819", from:"Nagpur", driver:"Rajesh Patil", vehicle:"MH31-AB-1234", eta:"Today, 14:30", confirmed:false },
  { id:"SHP-4823", from:"Mumbai", driver:"Sunil Deshmukh", vehicle:"MH12-CD-5678", eta:"Today, 16:00", confirmed:false },
];

const COMPLAINT_CATEGORIES = [
  "Damaged Goods","Late Delivery","Wrong Item Received","Missing Items",
  "Tampered Packaging","Driver Misconduct","GPS Mismatch","Payment Issue","Other",
];

const NOTIFICATIONS = [
  { id:1, type:"truck",   title:"SHP-4819 Out for Delivery", body:"Rajesh Patil is 12 km away. ETA: 14:30.", time:"30 min ago", read:false },
  { id:2, type:"package", title:"New Shipment Incoming",     body:"SHP-4823 dispatched from Mumbai.",          time:"2h ago",    read:false },
  { id:3, type:"check",   title:"SHP-4810 Delivered",        body:"Delivery confirmed successfully.",          time:"1 day ago", read:true  },
];

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type = "success", onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:1100,
      background: type === "success" ? "#1a2332" : "#dc2626",
      color:"#fff", borderRadius:12, padding:"14px 20px",
      display:"flex", alignItems:"center", gap:10,
      boxShadow:"0 8px 32px rgba(0,0,0,0.2)",
      fontSize:13, fontWeight:500, maxWidth:360,
      animation:"slideUp 0.3s ease",
    }}>
      <Icon name={type === "success" ? "checkCircle" : "alertCircle"} size={18} />
      {msg}
      <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
};

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
const NotificationPanel = ({ open, onClose, notifications, onMarkAll }) => {
  const unread = notifications.filter(n => !n.read).length;
  const typeMap = {
    truck:   { bg:"rgba(13,188,167,0.1)", color:"#0dbca7" },
    package: { bg:"#f0f9ff",             color:"#0369a1" },
    check:   { bg:"#f0fdf4",             color:"#16a34a" },
    alert:   { bg:"#fff0f0",             color:"#dc2626" },
  };
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.15)" }}/>}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, width:380, maxWidth:"100vw",
        background:"#fff", boxShadow:"-4px 0 32px rgba(0,0,0,0.12)", zIndex:999,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", flexDirection:"column",
      }}>
        <div style={{ padding:"22px 22px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:"#1a2332" }}>Notifications</div>
            {unread > 0 && <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{unread} unread</div>}
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {unread > 0 && (
              <button onClick={onMarkAll} style={{ fontSize:12, color:"#0dbca7", fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:"#f4f6f8", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b" }}>
              <Icon name="close" size={16}/>
            </button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {notifications.map(n => {
            const t = typeMap[n.type] || typeMap.package;
            return (
              <div key={n.id} style={{ padding:"14px 22px", borderLeft: n.read ? "3px solid transparent" : "3px solid #0dbca7", background: n.read ? "transparent" : "#f8fffd", transition:"background 0.15s" }}>
                <div style={{ display:"flex", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:t.bg, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon name={n.type === "check" ? "checkCircle" : n.type} size={16}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight: n.read ? 500 : 700, color:"#1a2332", marginBottom:2 }}>{n.title}</div>
                    <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{n.body}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>{n.time}</div>
                  </div>
                  {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#0dbca7", flexShrink:0, marginTop:5 }}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ─── PAGE: TRACK SHIPMENT ─────────────────────────────────────────────────────
const TrackShipmentPage = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleTrack = () => {
    if (query.trim().length >= 3) setSearched(true);
  };

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash).catch(()=>{});
    setCopied(hash);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:860, width:"100%", margin:"0 auto" }}>
      {!searched && (
        <div>
          <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Track Shipment</h1>
          <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>Enter your shipment ID to view real-time status and blockchain trail.</p>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
        <div style={{ flex:1, position:"relative" }}>
          <div style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"#94a3b8" }}>
            <Icon name="search" size={16}/>
          </div>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); if (!e.target.value) setSearched(false); }}
            onKeyDown={e => e.key === "Enter" && handleTrack()}
            placeholder="Enter Shipment ID (e.g. SHP-4819)"
            style={{
              width:"100%", padding:"12px 16px 12px 44px",
              borderRadius:10, border:"1.5px solid #e2e8f0",
              background:"#fff", fontSize:14, color:"#1a2332",
              outline:"none", transition:"border-color 0.15s, box-shadow 0.15s",
            }}
            onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
            onBlur={e  => { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
          />
        </div>
        <button
          onClick={handleTrack}
          style={{ padding:"12px 28px", borderRadius:10, border:"none", background:"#0dbca7", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", transition:"background 0.15s, transform 0.1s" }}
          onMouseEnter={e => e.currentTarget.style.background="#0aa899"}
          onMouseLeave={e => e.currentTarget.style.background="#0dbca7"}
          onMouseDown={e => e.currentTarget.style.transform="scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform="scale(1)"}
        >Track</button>
      </div>

      {/* Results */}
      {searched && (
        <>
          {/* Shipment summary card */}
          <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"20px 24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"rgba(13,188,167,0.1)", display:"flex", alignItems:"center", justifyContent:"center", color:"#0dbca7", flexShrink:0 }}>
                <Icon name="package" size={20}/>
              </div>
              <div>
                <div style={{ fontSize:16, fontWeight:800, color:"#1a2332" }}>{query.toUpperCase()}</div>
                <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>Nagpur → Pune • <span style={{ color:"#0dbca7", fontWeight:600 }}>Out for Delivery</span></div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(130px,1fr))", gap:16, paddingTop:16, borderTop:"1px solid #f1f5f9" }}>
              {[
                { label:"Vehicle",  value:"MH31-AB-1234", icon:"truck"   },
                { label:"Driver",   value:"Rajesh Patil", icon:"user"    },
                { label:"Weight",   value:"12 kg",        icon:"weight"  },
                { label:"ETA",      value:"Today, 14:30", icon:"clock"   },
              ].map(d => (
                <div key={d.label} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ color:"#0dbca7", marginTop:2 }}><Icon name={d.icon} size={14}/></div>
                  <div>
                    <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" }}>{d.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1a2332", marginTop:2 }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain timeline */}
          <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"22px 24px" }}>
            <div style={{ fontSize:15, fontWeight:700, color:"#1a2332", marginBottom:22 }}>Blockchain Verification Timeline</div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {BLOCKCHAIN_EVENTS.map((ev, i) => (
                <div key={i} style={{ display:"flex", gap:16, position:"relative" }}>
                  {i < BLOCKCHAIN_EVENTS.length - 1 && (
                    <div style={{ position:"absolute", left:18, top:40, width:2, height:56, background: ev.done ? "#0dbca7" : "#e2e8f0" }}/>
                  )}
                  {/* Icon bubble */}
                  <div style={{
                    width:38, height:38, borderRadius:"50%", flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: ev.done ? "rgba(13,188,167,0.1)" : "#f1f5f9",
                    color: ev.done ? "#0dbca7" : "#94a3b8",
                    border: `2px solid ${ev.done ? "rgba(13,188,167,0.3)" : "#e2e8f0"}`,
                  }}>
                    <Icon name={ev.icon} size={15}/>
                  </div>
                  <div style={{ flex:1, paddingBottom:28 }}>
                    <div style={{ fontSize:14, fontWeight:600, color: ev.done ? "#1a2332" : "#94a3b8" }}>{ev.title}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4, flexWrap:"wrap" }}>
                      <span style={{ fontSize:12, fontFamily:"monospace", color:"#0dbca7" }}>{ev.hash}</span>
                      {ev.hash !== "—" && (
                        <button
                          onClick={() => copyHash(ev.hash)}
                          style={{ background:"none", border:"none", cursor:"pointer", color: copied===ev.hash ? "#0dbca7" : "#94a3b8", padding:0, display:"flex", transition:"color 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.color="#0dbca7"}
                          onMouseLeave={e => { if(copied!==ev.hash) e.currentTarget.style.color="#94a3b8"; }}
                        ><Icon name={copied===ev.hash ? "check" : "copy"} size={12}/></button>
                      )}
                      <span style={{
                        fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:20,
                        background: ev.done ? "rgba(13,188,167,0.1)" : "#f1f5f9",
                        color: ev.done ? "#0dbca7" : "#94a3b8",
                      }}>{ev.status}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#94a3b8", marginTop:3 }}>{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── PAGE: CONFIRM DELIVERY ───────────────────────────────────────────────────
const ConfirmDeliveryPage = () => {
  const [deliveries, setDeliveries] = useState(INCOMING_DELIVERIES.map(d => ({ ...d, otp:"", otpError:"" })));
  const [toast, setToast] = useState(null);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
  };

  const handleOtpChange = (id, val) => {
    if (/^\d{0,6}$/.test(val)) {
      setDeliveries(ds => ds.map(d => d.id === id ? { ...d, otp:val, otpError:"" } : d));
    }
  };

  const handleConfirm = (id) => {
    const d = deliveries.find(x => x.id === id);
    if (!d.otp || d.otp.length !== 6) {
      setDeliveries(ds => ds.map(x => x.id === id ? { ...x, otpError:"Please enter a valid 6-digit OTP" } : x));
      return;
    }
    setDeliveries(ds => ds.map(x => x.id === id ? { ...x, confirmed:true, otpError:"" } : x));
    showToast(`Delivery ${id} confirmed! Blockchain TX initiated & escrow released.`);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:860, width:"100%", margin:"0 auto" }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)}/>}

      <div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Confirm Delivery</h1>
        <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>Verify received shipments to trigger blockchain confirmation and escrow release.</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {deliveries.map(d => (
          <div key={d.id} style={{
            background:"#fff",
            border: d.confirmed ? "1.5px solid rgba(13,188,167,0.4)" : "1px solid #e8ecef",
            borderRadius:14, padding:"22px 24px",
            transition:"border-color 0.3s, background 0.3s",
            background: d.confirmed ? "rgba(13,188,167,0.02)" : "#fff",
          }}>
            {/* Card header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom: d.confirmed ? 16 : 20, flexWrap:"wrap", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{
                  width:42, height:42, borderRadius:12, flexShrink:0,
                  background: d.confirmed ? "rgba(13,188,167,0.1)" : "rgba(13,188,167,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#0dbca7",
                }}>
                  <Icon name={d.confirmed ? "checkCircle" : "package"} size={20}/>
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#1a2332" }}>{d.id}</div>
                  <div style={{ fontSize:13, color:"#64748b", marginTop:3 }}>
                    From {d.from} • {d.driver} • {d.vehicle}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Icon name="clock" size={13} color="#94a3b8"/>
                <span style={{ fontSize:13, color:"#64748b", fontWeight:500 }}>ETA: {d.eta}</span>
              </div>
            </div>

            {/* Confirmed state */}
            {d.confirmed ? (
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:"rgba(13,188,167,0.08)", borderRadius:10, border:"1px solid rgba(13,188,167,0.2)" }}>
                <Icon name="checkCircle" size={16} color="#0dbca7"/>
                <span style={{ fontSize:13, color:"#0dbca7", fontWeight:600 }}>Delivery confirmed. Blockchain TX submitted & escrow funds released.</span>
              </div>
            ) : (
              /* OTP Input row */
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Delivery OTP</label>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start", flexWrap:"wrap" }}>
                  <div style={{ flex:1, minWidth:200 }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={d.otp}
                      onChange={e => handleOtpChange(d.id, e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      style={{
                        width:"100%", padding:"11px 16px",
                        borderRadius:9, fontSize:15, fontWeight:600,
                        letterSpacing:"0.2em", textAlign:"center",
                        border: `1.5px solid ${d.otpError ? "#dc2626" : "#e2e8f0"}`,
                        background: d.otpError ? "#fff8f8" : "#f8fafc",
                        outline:"none", color:"#1a2332",
                        transition:"border-color 0.15s, box-shadow 0.15s",
                      }}
                      onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
                      onBlur={e  => { e.target.style.borderColor=d.otpError?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
                    />
                    {d.otpError && (
                      <div style={{ fontSize:11, color:"#dc2626", marginTop:4, display:"flex", alignItems:"center", gap:4 }}>
                        <Icon name="alertCircle" size={11}/>{d.otpError}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleConfirm(d.id)}
                    style={{
                      padding:"11px 24px", borderRadius:9, border:"none",
                      background:"#0dbca7", color:"#fff", fontSize:13, fontWeight:700,
                      cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
                      transition:"background 0.15s, transform 0.1s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background="#0aa899"}
                    onMouseLeave={e => e.currentTarget.style.background="#0dbca7"}
                    onMouseDown={e => e.currentTarget.style.transform="scale(0.98)"}
                    onMouseUp={e => e.currentTarget.style.transform="scale(1)"}
                  >Confirm Receipt</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PAGE: RAISE COMPLAINT ────────────────────────────────────────────────────
const RaiseComplaintPage = () => {
  const [form, setForm]     = useState({ shipmentId:"", category:"", description:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [toast, setToast]   = useState(null);
  const ticketCounter = useRef(1);

  const validate = () => {
    const e = {};
    if (!form.shipmentId.trim()) e.shipmentId = "Shipment ID is required";
    if (!form.category)          e.category   = "Please select a category";
    if (!form.description.trim() || form.description.trim().length < 10) e.description = "Please describe the issue (min 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const ticket = `CMP-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,"0")}${String(new Date().getDate()).padStart(2,"0")}-00${ticketCounter.current++}`;
    setSubmitted({ ticket, shipmentId: form.shipmentId });
    setToast("Complaint submitted. A support ticket has been created with blockchain reference.");
  };

  const handleAnother = () => {
    setForm({ shipmentId:"", category:"", description:"" });
    setErrors({});
    setSubmitted(null);
  };

  const Field = ({ label, error, children }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize:11, color:"#dc2626", display:"flex", alignItems:"center", gap:4 }}><Icon name="alertCircle" size={11}/>{error}</span>}
    </div>
  );

  const inputStyle = (err) => ({
    width:"100%", padding:"11px 14px", borderRadius:9, fontSize:13,
    border:`1.5px solid ${err ? "#dc2626" : "#e2e8f0"}`,
    background: err ? "#fff8f8" : "#f8fafc",
    color:"#1a2332", outline:"none",
    transition:"border-color 0.15s, box-shadow 0.15s",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:760, width:"100%", margin:"0 auto" }}>
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}

      <div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Raise Complaint</h1>
        <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>Report issues with your shipment. All complaints are linked to the blockchain audit trail.</p>
      </div>

      <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"28px 30px" }}>
        {!submitted ? (
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {/* Shipment ID */}
            <Field label="Shipment ID" error={errors.shipmentId}>
              <input
                value={form.shipmentId}
                onChange={e => setForm(f => ({ ...f, shipmentId:e.target.value }))}
                placeholder="e.g. SHP-4819"
                style={inputStyle(errors.shipmentId)}
                onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
                onBlur={e  => { e.target.style.borderColor=errors.shipmentId?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
              />
            </Field>

            {/* Category */}
            <Field label="Category" error={errors.category}>
              <div style={{ position:"relative" }}>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category:e.target.value }))}
                  style={{ ...inputStyle(errors.category), appearance:"none", paddingRight:36, cursor:"pointer" }}
                  onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
                  onBlur={e  => { e.target.style.borderColor=errors.category?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
                >
                  <option value="">Select category</option>
                  {COMPLAINT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#64748b" }}>
                  <Icon name="chevronDown" size={14}/>
                </div>
              </div>
            </Field>

            {/* Description */}
            <Field label="Description" error={errors.description}>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description:e.target.value }))}
                placeholder="Describe the issue in detail..."
                rows={5}
                style={{ ...inputStyle(errors.description), resize:"vertical", fontFamily:"inherit", lineHeight:1.6 }}
                onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
                onBlur={e  => { e.target.style.borderColor=errors.description?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
              />
            </Field>

            {/* Blockchain note */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:"rgba(13,188,167,0.06)", borderRadius:10, border:"1px solid rgba(13,188,167,0.15)" }}>
              <Icon name="chain" size={15} color="#0dbca7"/>
              <span style={{ fontSize:12, color:"#0dbca7", fontWeight:500 }}>This complaint will be permanently linked to the blockchain audit trail for full transparency.</span>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              style={{
                width:"100%", padding:"14px", borderRadius:10, border:"none",
                background:"#0dbca7", color:"#fff", fontSize:14, fontWeight:700,
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                transition:"background 0.15s, transform 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="#0aa899"}
              onMouseLeave={e => e.currentTarget.style.background="#0dbca7"}
              onMouseDown={e => e.currentTarget.style.transform="scale(0.99)"}
              onMouseUp={e => e.currentTarget.style.transform="scale(1)"}
            >
              <Icon name="send" size={15}/> Submit Complaint
            </button>
          </div>
        ) : (
          /* Success State */
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(13,188,167,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", color:"#0dbca7" }}>
              <Icon name="alertCircle" size={28}/>
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:"#1a2332", marginBottom:12 }}>Complaint Registered</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:6 }}>
              Ticket ID: <code style={{ background:"#f1f5f9", padding:"2px 8px", borderRadius:5, fontSize:13, color:"#1a2332", fontWeight:600 }}>{submitted.ticket}</code>
            </div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>
              Shipment: <code style={{ background:"#f1f5f9", padding:"2px 8px", borderRadius:5, fontSize:13, color:"#1a2332" }}>{submitted.shipmentId}</code>
            </div>
            <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7, maxWidth:440, margin:"0 auto 24px" }}>
              Our support team will review this within 24 hours. The complaint is linked to the blockchain audit trail for full transparency.
            </p>
            <button
              onClick={handleAnother}
              style={{ padding:"11px 28px", borderRadius:9, border:"1.5px solid #d1d9e0", background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer", transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background="#fff"}
            >Submit Another</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ReceiverPortal({ initialPage = "track" }) {
  const [activePage, setActivePage]       = useState(initialPage);
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  const unread      = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read:true })));

  const navItems = [
    { id:"track",           label:"Track Shipment",   icon:"search"      },
    { id:"confirm-delivery",label:"Confirm Delivery", icon:"checkCircle" },
    { id:"complaints",      label:"Raise Complaint",  icon:"alertCircle" },
  ];

  const renderPage = () => {
    if (activePage === "track")            return <TrackShipmentPage/>;
    if (activePage === "confirm-delivery") return <ConfirmDeliveryPage/>;
    if (activePage === "complaints")       return <RaiseComplaintPage/>;
  };

  return (
    <div style={{ display:"flex", height:"100vh", background:"#f4f6f8", fontFamily:"'DM Sans','Segoe UI',sans-serif", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }
        @media(max-width:768px){
          .rp-sidebar { position:fixed!important; left:0; top:0; bottom:0; z-index:50; transform:translateX(-100%); transition:transform 0.3s ease; }
          .rp-sidebar.open { transform:translateX(0)!important; }
        }
      `}</style>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position:"fixed", inset:0, zIndex:49, background:"rgba(0,0,0,0.3)" }}/>}

      {/* ── SIDEBAR ── */}
      <aside className={`rp-sidebar${sidebarOpen ? " open" : ""}`} style={{
        width:260, minWidth:260, background:"#fff",
        borderRight:"1px solid #e8ecef",
        display:"flex", flexDirection:"column", zIndex:50,
      }}>
        {/* Logo — same height as topbar (64px) */}
        <div style={{ height:64, display:"flex", alignItems:"center", padding:"0 20px", borderBottom:"1px solid #f1f5f9", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"#0dbca7", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontWeight:800, fontSize:13 }}>FC</span>
            </div>
            <span style={{ fontSize:17, fontWeight:800, color:"#1a2332", letterSpacing:"-0.3px" }}>FleetChain</span>
          </div>
        </div>

        {/* Portal label */}
        <div style={{ padding:"16px 20px 8px" }}>
          <span style={{ fontSize:10, fontWeight:700, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase", paddingLeft:12 }}>Receiver Portal</span>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"4px 12px" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id}
                onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10,
                  padding:"10px 12px", borderRadius:9, border:"none", cursor:"pointer",
                  background: active ? "rgba(13,188,167,0.1)" : "transparent",
                  color: active ? "#0dbca7" : "#374151",
                  fontSize:14, fontWeight: active ? 600 : 500,
                  marginBottom:2, textAlign:"left",
                  transition:"background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background="#f8fafc"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background="transparent"; }}
              >
                <Icon name={item.icon} size={16}/>{item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

        {/* Topbar — 64px to match sidebar logo height */}
        <header style={{
          height:64, background:"#fff",
          borderBottom:"1px solid #e8ecef",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 24px", flexShrink:0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", padding:6, display:"flex", borderRadius:8, transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#f4f6f8"}
              onMouseLeave={e => e.currentTarget.style.background="none"}
            ><Icon name="menu" size={20}/></button>
            <span style={{ fontSize:14, fontWeight:600, color:"#374151" }}>Rohit Sharma</span>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* Role badge */}
            <div style={{ background:"rgba(13,188,167,0.1)", color:"#0dbca7", fontSize:12, fontWeight:600, padding:"5px 14px", borderRadius:20, border:"1px solid rgba(13,188,167,0.2)" }}>
              Receiver
            </div>

            {/* Bell */}
            <button
              onClick={() => setNotifOpen(true)}
              style={{ position:"relative", background:"none", border:"none", cursor:"pointer", color:"#374151", padding:6, display:"flex", borderRadius:8, transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#f4f6f8"}
              onMouseLeave={e => e.currentTarget.style.background="none"}
            >
              <Icon name="bell" size={20}/>
              {unread > 0 && (
                <div style={{ position:"absolute", top:2, right:2, width:16, height:16, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>
                  {unread}
                </div>
              )}
            </button>

            {/* Avatar */}
            <div style={{ width:34, height:34, borderRadius:"50%", background:"#0dbca7", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", transition:"opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >RS</div>
          </div>
        </header>

        {/* Page */}
        <main style={{ flex:1, overflow:"auto", padding:"28px 32px" }}>
          {renderPage()}
        </main>
      </div>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAll={markAllRead}/>
    </div>
  );
}