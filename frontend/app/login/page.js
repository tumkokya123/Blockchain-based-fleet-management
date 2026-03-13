"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Backend-ready submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with real API call
      /*
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      */

      // TEMP MOCK ROLE (remove later)
      const mockRole = "admin";

      // Role-based routing
      if (mockRole === "admin") router.push("/dashboard/admin");
      if (mockRole === "vendor") router.push("/dashboard/vendor");
      if (mockRole === "driver") router.push("/dashboard/driver");
      if (mockRole === "sender") router.push("/dashboard/sender");
      if (mockRole === "receiver") router.push("/dashboard/receiver");

    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#1f262d] to-[#1b2228] flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#00ADB5] rounded-lg flex items-center justify-center font-bold text-white">
          FC
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          FleetChain
        </h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#393E46] rounded-2xl p-10 shadow-2xl relative">

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-20 bg-[#00ADB5]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">

          <h2 className="text-2xl font-semibold text-center mb-2 text-white">
            Welcome back
          </h2>

          <p className="text-gray-400 text-center mb-8 text-sm">
            Sign in to your enterprise account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 block mb-2">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full bg-[#2f363e] border border-[#444c56] rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#00ADB5] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 block mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#2f363e] border border-[#444c56] rounded-lg pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-[#00ADB5] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#00ADB5] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Sign in
            </button>

          </form>

          <p className="text-gray-500 text-xs text-center mt-8">
            Access is provisioned by your system administrator.
          </p>

        </div>
      </div>

    </div>
  );
}