"use client";

import { useState } from "react";
import {
  X, MapPin, Phone, Mail, Wrench,
  Star, Eye, EyeOff, CheckCircle2,
  Loader2, ChevronDown, Building2,
} from "lucide-react";

// ─── Specialty options ────────────────────────────────────────────────────────
const SPECIALTIES = [
  "General Service",
  "Brake & Clutch",
  "Tyre & Alignment",
  "Transmission",
  "AC & Electrical",
  "Battery & Electrical",
  "Engine Repair",
  "Body & Paint",
  "Suspension & Steering",
  "Other",
];

const CITIES = [
  "Mumbai, MH", "Pune, MH", "Nagpur, MH", "Nashik, MH",
  "Aurangabad, MH", "Kolhapur, MH", "Solapur, MH", "Amravati, MH",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inputCls = "w-full bg-[#1f252b] border border-[#2f363e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ADB5]/60 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors";

function Field({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

function SelectDropdown({ value, options, placeholder, onChange, error }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-2 bg-[#1f252b] border rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
          error ? "border-red-500/60" : open ? "border-[#00ADB5]/60 ring-1 ring-[#00ADB5]/20" : "border-[#2f363e] hover:border-[#00ADB5]/40"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-600"}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-[#20262d] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl max-h-48 overflow-y-auto">
          {options.map(opt => (
            <button key={opt} type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt ? "text-[#00ADB5] bg-[#00ADB5]/10" : "text-gray-300 hover:bg-[#2a3038] hover:text-white"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Star Rating Picker ───────────────────────────────────────────────────────
function RatingPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              n <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-600"
            }`}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-bold text-yellow-400">{value}.0</span>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function AddVendorModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "", city: "", specialty: "", phone: "", email: "",
    rating: 0, contactPerson: "", notes: "",
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                           e.name      = "Vendor name is required";
    if (!form.city)                                  e.city      = "Select a city";
    if (!form.specialty)                             e.specialty = "Select a specialty";
    if (!form.phone.trim())                          e.phone     = "Phone number is required";
    else if (!/^\+?[\d\s\-]{8,}$/.test(form.phone)) e.phone     = "Invalid phone number";
    if (!form.email.trim())                          e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))       e.email     = "Invalid email address";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onSuccess?.({ ...form });
      onClose?.();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div className="relative w-full max-w-lg bg-[#20262d] border border-[#2f363e] rounded-2xl shadow-2xl shadow-black/50 flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2f363e] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1f252b] border border-[#2f363e] flex items-center justify-center text-[#00ADB5]">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add New Vendor</h2>
              <p className="text-xs text-gray-500 mt-0.5">Register a new service partner</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#2a3038] border border-[#2f363e] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00ADB5]/40 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Vendor Name */}
          <Field label="Vendor Name" required>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="e.g. AutoCare Nagpur"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                className={`${inputCls} pl-10 ${errors.name ? "border-red-500/60" : ""}`}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </Field>

          {/* City + Specialty — 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="City" required>
              <SelectDropdown
                value={form.city}
                options={CITIES}
                placeholder="Select city..."
                onChange={v => set("city", v)}
                error={errors.city}
              />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
            </Field>
            <Field label="Specialty" required>
              <SelectDropdown
                value={form.specialty}
                options={SPECIALTIES}
                placeholder="Select specialty..."
                onChange={v => set("specialty", v)}
                error={errors.specialty}
              />
              {errors.specialty && <p className="text-xs text-red-400 mt-1">{errors.specialty}</p>}
            </Field>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#2f363e]" />
            <span className="text-xs text-gray-600 uppercase tracking-widest">Contact</span>
            <div className="flex-1 border-t border-[#2f363e]" />
          </div>

          {/* Contact Person */}
          <Field label="Contact Person" hint="Primary point of contact at this vendor">
            <input
              type="text"
              placeholder="e.g. Ramesh Patil"
              value={form.contactPerson}
              onChange={e => set("contactPerson", e.target.value)}
              className={inputCls}
            />
          </Field>

          {/* Phone + Email — 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" required>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="tel"
                  placeholder="+91 98234 56789"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  className={`${inputCls} pl-10 ${errors.phone ? "border-red-500/60" : ""}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </Field>
            <Field label="Email" required>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="email"
                  placeholder="ops@vendor.in"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  className={`${inputCls} pl-10 ${errors.email ? "border-red-500/60" : ""}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </Field>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#2f363e]" />
            <span className="text-xs text-gray-600 uppercase tracking-widest">Rating & Notes</span>
            <div className="flex-1 border-t border-[#2f363e]" />
          </div>

          {/* Initial Rating */}
          <Field label="Initial Rating" hint="Set an initial rating for this vendor (optional)">
            <div className="bg-[#1f252b] border border-[#2f363e] rounded-xl px-4 py-3">
              <RatingPicker value={form.rating} onChange={v => set("rating", v)} />
            </div>
          </Field>

          {/* Notes */}
          <Field label="Notes" hint="Internal notes about this vendor (optional)">
            <textarea
              rows={3}
              placeholder="Any additional details, specializations, or remarks..."
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </Field>

        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-[#2f363e] flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#2a3038] border border-[#2f363e] text-sm text-gray-300 hover:bg-[#2e3640] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || success}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              success
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-default"
                : "bg-[#00ADB5] hover:bg-[#009aa1] text-white shadow-lg shadow-[#00ADB5]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            }`}
          >
            {success ? (
              <><CheckCircle2 className="w-4 h-4" /> Vendor Added</>
            ) : loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Adding...</>
            ) : (
              "Add Vendor"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}