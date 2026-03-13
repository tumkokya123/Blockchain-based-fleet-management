"use client";
import { useState, useRef } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16 }) => {
  const s = { width: size, height: size, display: "inline-block", flexShrink: 0 };
  const icons = {
    package:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    user:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    mapPin:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    fileText:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    check:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    bell:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    menu:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    clock:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    eye:         <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    truck:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    chain:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    copy:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    chevronDown: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    alertCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    checkCircle: <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    info:        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return icons[name] || null;
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CITIES = ["Mumbai","Pune","Nagpur","Hyderabad","Delhi","Ahmedabad","Nashik","Aurangabad","Kolhapur","Wardha","Bengaluru","Chennai"];
const PACKAGE_TYPES = ["Parcel","Pallet","Container","Bulk Cargo","Refrigerated","Hazardous","Electronics","Documents"];
const PRIORITIES = ["Standard","Express","Urgent"];

const SHIPMENT_HISTORY = [
  { id:"SHP-4821", date:"28 Feb 2026", from:"Nagpur", to:"Mumbai",    receiver:"Meera Joshi",    weight:"45 kg", txHash:"0xA3f8...9c2E", status:"Delivered"  },
  { id:"SHP-4819", date:"27 Feb 2026", from:"Nagpur", to:"Pune",      receiver:"Rohit Sharma",   weight:"12 kg", txHash:"0xB7e2...4dF1", status:"In Transit" },
  { id:"SHP-4815", date:"25 Feb 2026", from:"Mumbai", to:"Hyderabad", receiver:"Priya Nair",     weight:"78 kg", txHash:"0xC1d5...8aB3", status:"Delivered"  },
  { id:"SHP-4810", date:"24 Feb 2026", from:"Pune",   to:"Nagpur",    receiver:"Amit Deshmukh",  weight:"30 kg", txHash:"0xD9a4...2eC7", status:"Delivered"  },
  { id:"SHP-4808", date:"23 Feb 2026", from:"Nagpur", to:"Delhi",     receiver:"Sanjay Gupta",   weight:"5 kg",  txHash:"0xE6b3...7fD0", status:"Pending"    },
];

const BLOCKCHAIN_EVENTS = [
  { icon:"package",  title:"Shipment Created",                   hash:"0xB7e2...4dF1", status:"Confirmed", time:"27 Feb 2026, 09:15", done:true  },
  { icon:"truck",    title:"Picked Up — Nagpur Warehouse",       hash:"0xF1a9...3bE2", status:"Confirmed", time:"27 Feb 2026, 10:42", done:true  },
  { icon:"truck",    title:"In Transit — MH31-AB-1234 dispatched",hash:"0xA5c8...7dF0",status:"Confirmed", time:"27 Feb 2026, 11:30", done:true  },
  { icon:"mapPin",   title:"Checkpoint — Wardha Toll Plaza",     hash:"0xC2e7...9aB1", status:"Confirmed", time:"27 Feb 2026, 14:05", done:true  },
  { icon:"clock",    title:"Estimated Delivery — Pune Hub",      hash:"—",             status:"Pending",   time:"ETA: 2 Mar 2026, 14:30", done:false },
];

const NOTIFICATIONS = [
  { id:1, type:"info",  title:"Shipment SHP-4819 In Transit", body:"Your shipment is on the way to Pune.", time:"1h ago",  read:false },
  { id:2, type:"check", title:"SHP-4821 Delivered",           body:"Meera Joshi confirmed delivery.",     time:"3h ago",  read:false },
  { id:3, type:"alert", title:"SHP-4808 Pending Pickup",      body:"Driver assignment pending for Delhi shipment.", time:"6h ago", read:true },
];

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
const Field = ({ label, required, error, children }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    <label style={{ fontSize:13, fontWeight:600, color:"#374151" }}>
      {label}{required && <span style={{ color:"#dc2626", marginLeft:2 }}>*</span>}
    </label>
    {children}
    {error && (
      <span style={{ fontSize:11, color:"#dc2626", display:"flex", alignItems:"center", gap:4 }}>
        <Icon name="alertCircle" size={11} />{error}
      </span>
    )}
  </div>
);

const inputBase = (error, extra = {}) => ({
  width:"100%", padding:"10px 14px", borderRadius:8, fontSize:13, outline:"none",
  border: `1.5px solid ${error ? "#dc2626" : "#e2e8f0"}`,
  background: error ? "#fff8f8" : "#f8fafc",
  color:"#1a2332", transition:"border-color 0.15s, box-shadow 0.15s",
  ...extra,
});

const SelectField = ({ label, required, error, value, onChange, options, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Field label={label} required={required} error={error}>
      <div style={{ position:"relative" }}>
        <select
          value={value} onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...inputBase(error),
            appearance:"none", paddingRight:36, cursor:"pointer",
            boxShadow: focused ? "0 0 0 3px rgba(13,188,167,0.15)" : "none",
            borderColor: focused ? "#0dbca7" : error ? "#dc2626" : "#e2e8f0",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#64748b" }}>
          <Icon name="chevronDown" size={14} />
        </div>
      </div>
    </Field>
  );
};

const TextField = ({ label, required, error, value, onChange, placeholder, type="text" }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Field label={label} required={required} error={error}>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={e => { setFocused(true); e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
        onBlur={e  => { setFocused(false); e.target.style.borderColor=error?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
        style={inputBase(error)}
      />
    </Field>
  );
};

const TextareaField = ({ label, required, error, value, onChange, placeholder }) => (
  <Field label={label} required={required} error={error}>
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={4}
      onFocus={e => { e.target.style.borderColor="#0dbca7"; e.target.style.boxShadow="0 0 0 3px rgba(13,188,167,0.15)"; }}
      onBlur={e  => { e.target.style.borderColor=error?"#dc2626":"#e2e8f0"; e.target.style.boxShadow="none"; }}
      style={{ ...inputBase(error), resize:"vertical", fontFamily:"inherit" }}
    />
  </Field>
);

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────
const STEPS = [
  { label:"Package Details",  icon:"package"  },
  { label:"Receiver Details", icon:"user"     },
  { label:"Route & Delivery", icon:"mapPin"   },
  { label:"Review & Submit",  icon:"fileText" },
];

const StepIndicator = ({ current }) => (
  <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap", rowGap:12 }}>
    {STEPS.map((step, i) => {
      const done    = i < current;
      const active  = i === current;
      const pending = i > current;
      return (
        <div key={i} style={{ display:"flex", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
              background: done ? "#0dbca7" : active ? "#0dbca7" : "#e2e8f0",
              color: done || active ? "#fff" : "#94a3b8",
              flexShrink:0, transition:"background 0.3s",
            }}>
              {done ? <Icon name="check" size={16} /> : <Icon name={step.icon} size={16} />}
            </div>
            <span style={{
              fontSize:13, fontWeight: active ? 700 : done ? 600 : 400,
              color: active ? "#1a2332" : done ? "#374151" : "#94a3b8",
              whiteSpace:"nowrap",
            }}>{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width:60, height:2, margin:"0 12px",
              background: done ? "#0dbca7" : "#e2e8f0",
              transition:"background 0.3s",
            }} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type = "success" }) => (
  <div style={{
    position:"fixed", bottom:28, right:28, zIndex:1000,
    background: type === "success" ? "#1a2332" : "#dc2626",
    color:"#fff", borderRadius:12, padding:"14px 18px",
    display:"flex", alignItems:"center", gap:10,
    boxShadow:"0 8px 30px rgba(0,0,0,0.18)",
    fontSize:13, fontWeight:500, maxWidth:340,
    animation:"slideUp 0.3s ease",
  }}>
    <Icon name={type === "success" ? "checkCircle" : "alertCircle"} size={18} />
    {msg}
    <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
  </div>
);

// ─── PAGE: CREATE SHIPMENT ────────────────────────────────────────────────────
const CreateShipmentPage = () => {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);

  const [pkg, setPkg] = useState({ type:"", weight:"", description:"" });
  const [pkgErrors, setPkgErrors] = useState({});

  const [receiver, setReceiver] = useState({ name:"", phone:"", email:"", address:"", city:"", pincode:"" });
  const [recErrors, setRecErrors] = useState({});

  const [route, setRoute] = useState({ pickupAddress:"", pickupCity:"", deliveryAddress:"", deliveryCity:"", priority:"" });
  const [routeErrors, setRouteErrors] = useState({});

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const validatePkg = () => {
    const e = {};
    if (!pkg.type)        e.type = "Package type is required";
    if (!pkg.weight)      e.weight = "Weight is required";
    else if (isNaN(pkg.weight) || +pkg.weight <= 0) e.weight = "Enter a valid weight";
    if (!pkg.description) e.description = "Description is required";
    setPkgErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateReceiver = () => {
    const e = {};
    if (!receiver.name)    e.name = "Receiver name is required";
    if (!receiver.phone || receiver.phone.replace(/\D/g,"").length < 10) e.phone = "Enter a valid phone number";
    if (!receiver.email || !/\S+@\S+\.\S+/.test(receiver.email)) e.email = "Enter a valid email";
    if (!receiver.address) e.address = "Address is required";
    if (!receiver.city)    e.city = "City is required";
    if (!receiver.pincode || receiver.pincode.length !== 6) e.pincode = "Pincode must be 6 digits";
    setRecErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRoute = () => {
    const e = {};
    if (!route.pickupAddress)  e.pickupAddress = "Pickup address is required";
    if (!route.pickupCity)     e.pickupCity = "Pickup city is required";
    if (!route.deliveryAddress)e.deliveryAddress = "Delivery address is required";
    if (!route.deliveryCity)   e.deliveryCity = "Delivery city is required";
    if (!route.priority)       e.priority = "Priority is required";
    setRouteErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (step === 0 && !validatePkg())      { showToast("Please fill in all required fields.", "error"); return; }
    if (step === 1 && !validateReceiver()) { showToast("Please fill in all required fields.", "error"); return; }
    if (step === 2 && !validateRoute())    { showToast("Please fill in all required fields.", "error"); return; }
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    showToast("Shipment created successfully! Blockchain TX initiated.");
    setTimeout(() => { setStep(0); setPkg({ type:"", weight:"", description:"" }); setReceiver({ name:"", phone:"", email:"", address:"", city:"", pincode:"" }); setRoute({ pickupAddress:"", pickupCity:"", deliveryAddress:"", deliveryCity:"", priority:"" }); }, 1800);
  };

  const ReviewRow = ({ label, value }) => (
    <div style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:8, padding:"10px 0", borderBottom:"1px solid #f1f5f9" }}>
      <span style={{ fontSize:12, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" }}>{label}</span>
      <span style={{ fontSize:13, color:"#1a2332", fontWeight:500 }}>{value || "—"}</span>
    </div>
  );

  return (
    <div style={{ maxWidth:860, width:"100%", margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>
      <div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Create Shipment</h1>
        <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>Fill in shipment details. All events will be logged on-chain.</p>
      </div>

      <StepIndicator current={step} />

      <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"28px 32px" }}>
        {/* STEP 0 — Package Details */}
        {step === 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2332", margin:0 }}>Package Details</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SelectField label="Package Type" required placeholder="Select type" value={pkg.type} onChange={v => setPkg(p => ({...p, type:v}))} options={PACKAGE_TYPES} error={pkgErrors.type} />
              <TextField   label="Weight (kg)"  required placeholder="e.g. 25"    value={pkg.weight} onChange={v => setPkg(p => ({...p, weight:v}))} error={pkgErrors.weight} />
            </div>
            <TextareaField label="Description" required placeholder="Brief description of contents" value={pkg.description} onChange={v => setPkg(p => ({...p, description:v}))} error={pkgErrors.description} />
          </div>
        )}

        {/* STEP 1 — Receiver Details */}
        {step === 1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2332", margin:0 }}>Receiver Details</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <TextField label="Receiver Name"  required placeholder="Full name"          value={receiver.name}  onChange={v => setReceiver(r => ({...r, name:v}))}  error={recErrors.name}  />
              <TextField label="Receiver Phone" required placeholder="+91 98XXXXXXXX"     value={receiver.phone} onChange={v => setReceiver(r => ({...r, phone:v}))} error={recErrors.phone} />
            </div>
            <TextField label="Receiver Email" required placeholder="receiver@email.com" value={receiver.email} onChange={v => setReceiver(r => ({...r, email:v}))} error={recErrors.email} />
            <TextareaField label="Receiver Address" required placeholder="Full delivery address with landmark" value={receiver.address} onChange={v => setReceiver(r => ({...r, address:v}))} error={recErrors.address} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SelectField label="Receiver City" required placeholder="Select city" value={receiver.city} onChange={v => setReceiver(r => ({...r, city:v}))} options={CITIES} error={recErrors.city} />
              <TextField   label="Pincode"       required placeholder="e.g. 440001"  value={receiver.pincode} onChange={v => setReceiver(r => ({...r, pincode:v}))} error={recErrors.pincode} />
            </div>
          </div>
        )}

        {/* STEP 2 — Route & Delivery */}
        {step === 2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2332", margin:0 }}>Route & Delivery</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <TextField   label="Pickup Address" required placeholder="Warehouse address" value={route.pickupAddress} onChange={v => setRoute(r => ({...r, pickupAddress:v}))} error={routeErrors.pickupAddress} />
              <SelectField label="Pickup City"    required placeholder="Select city"       value={route.pickupCity}    onChange={v => setRoute(r => ({...r, pickupCity:v}))}    options={CITIES} error={routeErrors.pickupCity} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <TextField   label="Delivery Address" required placeholder="Delivery location" value={route.deliveryAddress} onChange={v => setRoute(r => ({...r, deliveryAddress:v}))} error={routeErrors.deliveryAddress} />
              <SelectField label="Delivery City"    required placeholder="Select city"        value={route.deliveryCity}    onChange={v => setRoute(r => ({...r, deliveryCity:v}))}    options={CITIES} error={routeErrors.deliveryCity} />
            </div>
            <SelectField label="Priority" required placeholder="Select priority" value={route.priority} onChange={v => setRoute(r => ({...r, priority:v}))} options={PRIORITIES} error={routeErrors.priority} />
          </div>
        )}

        {/* STEP 3 — Review & Submit */}
        {step === 3 && (
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2332", margin:"0 0 16px" }}>Review & Submit</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
              <div>
                <ReviewRow label="Package Type" value={pkg.type} />
                <ReviewRow label="Weight"       value={pkg.weight ? `${pkg.weight} kg` : ""} />
                <ReviewRow label="Description"  value={pkg.description} />
                <ReviewRow label="Priority"     value={route.priority} />
              </div>
              <div>
                <ReviewRow label="Receiver"          value={receiver.name} />
                <ReviewRow label="Phone & Email"     value={`${receiver.phone} • ${receiver.email}`} />
                <ReviewRow label="Receiver Address"  value={`${receiver.address}, ${receiver.city} — ${receiver.pincode}`} />
                <ReviewRow label="Pickup"            value={`${route.pickupAddress}, ${route.pickupCity}`} />
                <ReviewRow label="Delivery"          value={`${route.deliveryAddress}, ${route.deliveryCity}`} />
              </div>
            </div>
            <div style={{ marginTop:20, padding:"14px 18px", background:"rgba(13,188,167,0.06)", borderRadius:10, border:"1px solid rgba(13,188,167,0.2)", display:"flex", alignItems:"center", gap:10 }}>
              <Icon name="chain" size={16} /><span style={{ fontSize:13, color:"#0dbca7", fontWeight:500 }}>This shipment will be registered on Polygon Blockchain with escrow payment protection.</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button
          onClick={() => step > 0 && setStep(s => s - 1)}
          style={{ padding:"10px 22px", borderRadius:8, border:"1px solid #d1d9e0", background:"#fff", fontSize:13, fontWeight:500, color: step === 0 ? "#cbd5e1" : "#374151", cursor: step === 0 ? "not-allowed" : "pointer", transition:"background 0.15s" }}
          onMouseEnter={e => { if(step>0) e.currentTarget.style.background="#f8fafc"; }}
          onMouseLeave={e => e.currentTarget.style.background="#fff"}
        >Back</button>
        {step < 3 ? (
          <button onClick={handleContinue} style={{ padding:"10px 28px", borderRadius:8, border:"none", background:"#0dbca7", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer", transition:"background 0.15s, transform 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.background="#0aa899"}
            onMouseLeave={e => e.currentTarget.style.background="#0dbca7"}
          >Continue</button>
        ) : (
          <button onClick={handleSubmit} style={{ padding:"10px 28px", borderRadius:8, border:"none", background:"#0dbca7", fontSize:13, fontWeight:700, color:"#fff", cursor:"pointer", transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background="#0aa899"}
            onMouseLeave={e => e.currentTarget.style.background="#0dbca7"}
          >Submit Shipment</button>
        )}
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
};

// ─── PAGE: SHIPMENT HISTORY ───────────────────────────────────────────────────
const ShipmentHistoryPage = () => {
  const [copiedHash, setCopiedHash] = useState(null);

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash).catch(() => {});
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  const statusStyle = {
    "Delivered":  { bg:"rgba(13,188,167,0.08)", color:"#0dbca7", border:"rgba(13,188,167,0.2)" },
    "In Transit": { bg:"rgba(59,130,246,0.08)", color:"#2563eb", border:"rgba(59,130,246,0.2)" },
    "Pending":    { bg:"#fffbeb",               color:"#d97706", border:"#fde68a"               },
    "Cancelled":  { bg:"#fff0f0",               color:"#dc2626", border:"#fecaca"               },
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Shipment History</h1>
        <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>All your past and active shipments with blockchain verification.</p>
      </div>

      <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
            <thead>
              <tr style={{ background:"#f8fafc", borderBottom:"2px solid #f1f5f9" }}>
                {["ID","DATE","ROUTE","RECEIVER","WEIGHT","TX HASH","STATUS",""].map(h => (
                  <th key={h} style={{ padding:"12px 16px", fontSize:11, fontWeight:700, color:"#94a3b8", textAlign:"left", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHIPMENT_HISTORY.map(s => {
                const ss = statusStyle[s.status] || statusStyle["Pending"];
                return (
                  <tr key={s.id}
                    style={{ borderTop:"1px solid #f1f5f9", transition:"background 0.15s", cursor:"pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background="#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background=""}
                  >
                    <td style={{ padding:"14px 16px", fontSize:13, fontWeight:700, color:"#1a2332" }}>{s.id}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"#64748b", whiteSpace:"nowrap" }}>{s.date}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"#374151", whiteSpace:"nowrap" }}>{s.from} → {s.to}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"#374151" }}>{s.receiver}</td>
                    <td style={{ padding:"14px 16px", fontSize:13, color:"#374151" }}>{s.weight}</td>
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:12, color:"#0dbca7", fontFamily:"monospace" }}>{s.txHash}</span>
                        <button onClick={() => copyHash(s.txHash)} title="Copy hash"
                          style={{ background:"none", border:"none", cursor:"pointer", color: copiedHash===s.txHash ? "#0dbca7" : "#94a3b8", padding:2, display:"flex", transition:"color 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.color="#0dbca7"}
                          onMouseLeave={e => { if(copiedHash!==s.txHash) e.currentTarget.style.color="#94a3b8"; }}
                        >
                          <Icon name={copiedHash===s.txHash ? "check" : "copy"} size={13} />
                        </button>
                      </div>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <span style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, background:ss.bg, color:ss.color, border:`1px solid ${ss.border}` }}>{s.status}</span>
                    </td>
                    <td style={{ padding:"14px 16px" }}>
                      <button style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:500, color:"#64748b", background:"none", border:"none", cursor:"pointer", padding:"4px 8px", borderRadius:6, transition:"color 0.15s, background 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.color="#0dbca7"; e.currentTarget.style.background="rgba(13,188,167,0.06)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color="#64748b"; e.currentTarget.style.background="none"; }}
                      >
                        <Icon name="eye" size={13} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: LIVE TRACKING ──────────────────────────────────────────────────────
const LiveTrackingPage = () => {
  const [truckPos, setTruckPos] = useState(0.42);

  // Animate truck
  useState(() => {
    const id = setInterval(() => setTruckPos(p => p >= 0.85 ? 0.15 : p + 0.002), 80);
    return () => clearInterval(id);
  });

  // SVG map dimensions
  const W = 790, H = 300;
  const nagpur  = { x: W * 0.18, y: H * 0.35, label:"Nagpur"  };
  const pune    = { x: W * 0.82, y: H * 0.65, label:"Pune"    };
  const truckX  = nagpur.x + (pune.x - nagpur.x) * truckPos;
  const truckY  = nagpur.y + (pune.y - nagpur.y) * truckPos;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#1a2332", margin:0 }}>Live Tracking</h1>
        <p style={{ color:"#64748b", margin:"4px 0 0", fontSize:14 }}>Real-time shipment location with blockchain event trail.</p>
      </div>

      <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
        {/* Map Panel */}
        <div style={{ flex:"1 1 520px", minWidth:0, display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, overflow:"hidden" }}>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block", background:"#f8fafc" }}>
              {/* Grid */}
              {Array.from({length:16}).map((_,i) => <line key={`v${i}`} x1={i*W/15} y1={0} x2={i*W/15} y2={H} stroke="#e2e8f0" strokeWidth={1}/>)}
              {Array.from({length:9}).map((_,i)  => <line key={`h${i}`} x1={0} y1={i*H/8} x2={W} y2={i*H/8} stroke="#e2e8f0" strokeWidth={1}/>)}

              {/* Route dashed line */}
              <line x1={nagpur.x} y1={nagpur.y} x2={pune.x} y2={pune.y} stroke="#0dbca7" strokeWidth={2} strokeDasharray="10,6" opacity={0.5}/>

              {/* Nagpur pin */}
              <circle cx={nagpur.x} cy={nagpur.y} r={8} fill="#64748b"/>
              <circle cx={nagpur.x} cy={nagpur.y} r={4} fill="#fff"/>
              <text x={nagpur.x+14} y={nagpur.y+5} fontSize={13} fontWeight="600" fill="#374151">{nagpur.label}</text>

              {/* Pune pin */}
              <circle cx={pune.x} cy={pune.y} r={10} fill="#dc2626"/>
              <circle cx={pune.x} cy={pune.y} r={4}  fill="#fff"/>
              <text x={pune.x+14} y={pune.y+5} fontSize={13} fontWeight="600" fill="#374151">{pune.label}</text>

              {/* Truck pulse */}
              <circle cx={truckX} cy={truckY} r={22} fill="rgba(13,188,167,0.15)"/>
              <circle cx={truckX} cy={truckY} r={12} fill="#0dbca7"/>
              <circle cx={truckX} cy={truckY} r={5}  fill="#fff"/>
              <text x={truckX+18} y={truckY-10} fontSize={10} fontWeight="700" fill="#0dbca7">MH31-AB-1234</text>
            </svg>
          </div>

          {/* Shipment Details */}
          <div style={{ background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"20px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#1a2332", marginBottom:16 }}>Shipment Details</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px,1fr))", gap:16 }}>
              {[
                { label:"Shipment ID", value:"SHP-4819"         },
                { label:"Vehicle",     value:"MH31-AB-1234"      },
                { label:"Driver",      value:"Rajesh Patil"      },
                { label:"Status",      value:"In Transit"        },
                { label:"Route",       value:"Nagpur → Pune"     },
                { label:"Weight",      value:"12 kg"             },
                { label:"Type",        value:"Parcel"            },
                { label:"ETA",         value:"2 Mar 2026, 14:30" },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:3 }}>{d.label}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#1a2332" }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain Timeline */}
        <div style={{ width:320, flexShrink:0, background:"#fff", border:"1px solid #e8ecef", borderRadius:14, padding:"20px 22px" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#1a2332", marginBottom:20 }}>Blockchain Verification Timeline</div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {BLOCKCHAIN_EVENTS.map((ev, i) => (
              <div key={i} style={{ display:"flex", gap:14, position:"relative" }}>
                {i < BLOCKCHAIN_EVENTS.length-1 && (
                  <div style={{ position:"absolute", left:17, top:38, width:2, height:52, background: ev.done ? "#0dbca7" : "#e2e8f0" }}/>
                )}
                <div style={{ width:36, height:36, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background: ev.done ? "rgba(13,188,167,0.1)" : "#f1f5f9", color: ev.done ? "#0dbca7" : "#94a3b8", border: ev.done ? "2px solid rgba(13,188,167,0.3)" : "2px solid #e2e8f0" }}>
                  <Icon name={ev.icon} size={15}/>
                </div>
                <div style={{ flex:1, paddingBottom:24 }}>
                  <div style={{ fontSize:13, fontWeight:600, color: ev.done ? "#1a2332" : "#94a3b8" }}>{ev.title}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                    <span style={{ fontSize:11, fontFamily:"monospace", color:"#0dbca7" }}>{ev.hash}</span>
                    {ev.hash !== "—" && (
                      <button style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", padding:0, display:"flex" }}
                        onMouseEnter={e => e.currentTarget.style.color="#0dbca7"}
                        onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                      ><Icon name="copy" size={11}/></button>
                    )}
                    <span style={{ fontSize:11, fontWeight:600, padding:"1px 7px", borderRadius:20, background: ev.done ? "rgba(13,188,167,0.1)" : "#f1f5f9", color: ev.done ? "#0dbca7" : "#94a3b8" }}>{ev.status}</span>
                  </div>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
const NotificationPanel = ({ open, onClose, notifications, onMarkAll }) => {
  const unread = notifications.filter(n => !n.read).length;
  const typeMap = {
    alert: { bg:"#fff0f0", color:"#dc2626", icon:"alertCircle" },
    check: { bg:"#f0fdf4", color:"#16a34a", icon:"checkCircle" },
    info:  { bg:"#f0f9ff", color:"#0369a1", icon:"info"        },
  };
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.15)" }}/>}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:380, maxWidth:"100vw", background:"#fff", boxShadow:"-4px 0 30px rgba(0,0,0,0.12)", zIndex:999, transform:open?"translateX(0)":"translateX(100%)", transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 22px 16px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:"#1a2332" }}>Notifications</div>
            {unread>0 && <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{unread} unread</div>}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {unread>0 && <button onClick={onMarkAll} style={{ fontSize:12, color:"#0dbca7", fontWeight:500, background:"none", border:"none", cursor:"pointer" }}>Mark all read</button>}
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:"#f4f6f8", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b" }}><Icon name="close" size={16}/></button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {notifications.map(n => {
            const t = typeMap[n.type] || typeMap.info;
            return (
              <div key={n.id} style={{ padding:"14px 22px", borderLeft:n.read?"3px solid transparent":"3px solid #0dbca7", background:n.read?"transparent":"#f8fffd" }}>
                <div style={{ display:"flex", gap:12 }}>
                  <div style={{ width:34, height:34, borderRadius:8, background:t.bg, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon name={t.icon} size={15}/></div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:n.read?500:600, color:"#1a2332", marginBottom:2 }}>{n.title}</div>
                    <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>{n.body}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>{n.time}</div>
                  </div>
                  {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#0dbca7", flexShrink:0, marginTop:4 }}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function SenderPortal({ initialPage = "create-shipment" }) {
  const [activePage, setActivePage] = useState(initialPage);
  const [notifOpen, setNotifOpen]   = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unread     = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(n => n.map(x => ({...x, read:true})));

  const navItems = [
    { id:"create-shipment",  label:"Create Shipment",  icon:"package"  },
    { id:"shipment-history", label:"Shipment History", icon:"clock"    },
    { id:"live-tracking",    label:"Live Tracking",    icon:"mapPin"   },
  ];

  const renderPage = () => {
    if (activePage === "create-shipment")  return <CreateShipmentPage />;
    if (activePage === "shipment-history") return <ShipmentHistoryPage />;
    if (activePage === "live-tracking")    return <LiveTrackingPage />;
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
          .sp-sidebar { position:fixed!important; left:0; top:0; bottom:0; z-index:50; transform:translateX(-100%); transition:transform 0.3s ease; }
          .sp-sidebar.open { transform:translateX(0)!important; }
        }
      `}</style>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position:"fixed", inset:0, zIndex:49, background:"rgba(0,0,0,0.3)" }}/>}

      {/* Sidebar */}
      <aside className={`sp-sidebar${sidebarOpen?" open":""}`} style={{ width:260, minWidth:260, background:"#fff", borderRight:"1px solid #e8ecef", display:"flex", flexDirection:"column", zIndex:50 }}>
        <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid #f1f5f9" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"#0dbca7", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontWeight:800, fontSize:13 }}>FC</span>
            </div>
            <span style={{ fontSize:17, fontWeight:800, color:"#1a2332" }}>FleetChain</span>
          </div>
        </div>
        <div style={{ padding:"14px 20px 8px" }}>
          <span style={{ fontSize:10, fontWeight:700, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase", paddingLeft:12 }}>Sender Portal</span>
        </div>
        <nav style={{ flex:1, padding:"4px 12px" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => { setActivePage(item.id); setSidebarOpen(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:9, border:"none", cursor:"pointer", background:active?"rgba(13,188,167,0.1)":"transparent", color:active?"#0dbca7":"#374151", fontSize:14, fontWeight:active?600:500, marginBottom:2, textAlign:"left", transition:"background 0.15s, color 0.15s" }}
                onMouseEnter={e => { if(!active) e.currentTarget.style.background="#f8fafc"; }}
                onMouseLeave={e => { if(!active) e.currentTarget.style.background="transparent"; }}
              >
                <Icon name={item.icon} size={16}/>{item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <header style={{ height:73, background:"#fff", borderBottom:"1px solid #e8ecef", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:"none", border:"none", cursor:"pointer", color:"#374151", padding:4, display:"flex" }}><Icon name="menu" size={20}/></button>
            <span style={{ fontSize:14, fontWeight:600, color:"#374151" }}>Anil Mehta</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ background:"rgba(13,188,167,0.1)", color:"#0dbca7", fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:20, border:"1px solid rgba(13,188,167,0.2)" }}>Sender</div>
            <button onClick={() => setNotifOpen(true)} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", color:"#374151", padding:4, display:"flex" }}>
              <Icon name="bell" size={20}/>
              {unread > 0 && <div style={{ position:"absolute", top:0, right:0, width:16, height:16, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>{unread}</div>}
            </button>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#0dbca7", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700 }}>AM</div>
          </div>
        </header>
        <main style={{ flex:1, overflow:"auto", padding:"24px 28px" }}>{renderPage()}</main>
      </div>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkAll={markAllRead}/>
    </div>
  );
}