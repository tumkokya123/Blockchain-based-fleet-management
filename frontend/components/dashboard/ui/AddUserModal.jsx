"use client";

import { useState } from "react";
import {
  X, Shield, Navigation, Store,
  Send, UserCheck, Eye, EyeOff,
  Wallet, Mail, User, ChevronDown,
  CheckCircle2, Loader2,
} from "lucide-react";

// ─── Role config ──────────────────────────────────────────────────────────────
const ROLES = [
  { value: "admin",    label: "Admin",    icon: <Shield className="w-4 h-4" />,      color: "text-[#00ADB5]",   bg: "bg-[#0d3d3d]",  border: "border-[#00ADB5]/30"    },
  { value: "driver",   label: "Driver",   icon: <Navigation className="w-4 h-4" />,  color: "text-emerald-400", bg: "bg-[#0d3d1f]",  border: "border-emerald-400/30"  },
  { value: "vendor",   label: "Vendor",   icon: <Store className="w-4 h-4" />,       color: "text-purple-400",  bg: "bg-[#1e1535]",  border: "border-purple-400/30"   },
  { value: "sender",   label: "Sender",   icon: <Send className="w-4 h-4" />,        color: "text-yellow-400",  bg: "bg-[#3d2d00]",  border: "border-yellow-400/30"   },
  { value: "receiver", label: "Receiver", icon: <UserCheck className="w-4 h-4" />,   color: "text-sky-400",     bg: "bg-[#0d2535]",  border: "border-sky-400/30"      },
];

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full bg-[#1f252b] border border-[#2f363e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ADB5]/60 focus:ring-1 focus:ring-[#00ADB5]/20 transition-colors";

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function AddUserModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "", email: "", role: "", wallet: "", password: "", confirm: "",
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roleOpen,    setRoleOpen]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [errors,      setErrors]      = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                         e.name     = "Name is required";
    if (!form.email.trim())                         e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))     e.email    = "Invalid email address";
    if (!form.role)                                 e.role     = "Select a role";
    if (!form.password)                             e.password = "Password is required";
    else if (form.password.length < 8)              e.password = "Min 8 characters";
    if (form.password !== form.confirm)             e.confirm  = "Passwords do not match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400)); // simulate API
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { onSuccess?.({ ...form }); onClose?.(); }, 1200);
  };

  const selectedRole = ROLES.find(r => r.value === form.role);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-lg bg-[#20262d] border border-[#2f363e] rounded-2xl shadow-2xl shadow-black/50 flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2f363e] flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Add New User</h2>
            <p className="text-xs text-gray-500 mt-0.5">Provision platform access for a new member</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#2a3038] border border-[#2f363e] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00ADB5]/40 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body (scrollable) ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Name */}
          <Field label="Full Name" required>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="e.g. Rajesh Patil"
                value={form.name}
                onChange={e => set("name", e.target.value)}
                className={`${inputCls} pl-10 ${errors.name ? "border-red-500/60" : ""}`}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </Field>

          {/* Email */}
          <Field label="Email Address" required>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="email"
                placeholder="name@fleetchain.in"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                className={`${inputCls} pl-10 ${errors.email ? "border-red-500/60" : ""}`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </Field>

          {/* Role */}
          <Field label="Role" required>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleOpen(o => !o)}
                className={`w-full flex items-center justify-between gap-2 bg-[#1f252b] border rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                  errors.role
                    ? "border-red-500/60"
                    : roleOpen
                    ? "border-[#00ADB5]/60 ring-1 ring-[#00ADB5]/20"
                    : "border-[#2f363e] hover:border-[#00ADB5]/40"
                }`}
              >
                {selectedRole ? (
                  <span className={`flex items-center gap-2 font-medium ${selectedRole.color}`}>
                    {selectedRole.icon}{selectedRole.label}
                  </span>
                ) : (
                  <span className="text-gray-600">Select a role...</span>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
              </button>

              {roleOpen && (
                <div className="absolute top-full mt-1.5 left-0 right-0 bg-[#20262d] border border-[#2f363e] rounded-xl overflow-hidden z-50 shadow-2xl">
                  {ROLES.map(r => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => { set("role", r.value); setRoleOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[#2a3038] ${form.role === r.value ? "bg-[#2a3038]" : ""}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center border ${r.bg} ${r.border} ${r.color}`}>
                        {r.icon}
                      </span>
                      <div className="text-left">
                        <p className={`font-medium ${r.color}`}>{r.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {r.value === "admin"    && "Full platform access"}
                          {r.value === "driver"   && "Fleet & trip management"}
                          {r.value === "vendor"   && "Maintenance portal access"}
                          {r.value === "sender"   && "Create & track shipments"}
                          {r.value === "receiver" && "View delivery status"}
                        </p>
                      </div>
                      {form.role === r.value && <CheckCircle2 className={`w-4 h-4 ml-auto ${r.color}`} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
          </Field>

          {/* Wallet (optional) */}
          <Field label="Wallet Address" hint="Optional — assign a blockchain wallet to this user">
            <div className="relative">
              <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="0x..."
                value={form.wallet}
                onChange={e => set("wallet", e.target.value)}
                className={`${inputCls} pl-10 font-mono`}
              />
            </div>
          </Field>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#2f363e]" />
            <span className="text-xs text-gray-600 uppercase tracking-widest">Credentials</span>
            <div className="flex-1 border-t border-[#2f363e]" />
          </div>

          {/* Password */}
          <Field label="Password" required>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={e => set("password", e.target.value)}
                className={`${inputCls} pr-10 ${errors.password ? "border-red-500/60" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </Field>

          {/* Confirm Password */}
          <Field label="Confirm Password" required>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={e => set("confirm", e.target.value)}
                className={`${inputCls} pr-10 ${errors.confirm ? "border-red-500/60" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirm && <p className="text-xs text-red-400 mt-1">{errors.confirm}</p>}
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
              <><CheckCircle2 className="w-4 h-4" /> User Created</>
            ) : loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
            ) : (
              "Create User"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}