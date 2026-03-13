"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 md:gap-20 items-center">

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#00ADB5]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[320px] md:w-[400px] h-[250px] sm:h-[320px] md:h-[400px] bg-[#00ADB5]/5 blur-[120px] rounded-full" />
      </div>

      {/* LEFT */}
      <div className="space-y-6 sm:space-y-8">

        <span className="text-xs tracking-[0.2em] text-[#00ADB5] uppercase font-medium">
          Blockchain-Verified Logistics
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[38px] sm:text-[52px] md:text-[64px] font-semibold leading-[1.1] tracking-[-0.02em]"
        >
          World-Class Fleet
          <br />
          <span className="text-[#00ADB5] font-semibold">
            Operations.
          </span>
        </motion.h1>

        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-gray-300 leading-relaxed max-w-xl">
          Enterprise-grade fleet management powered by Polygon Blockchain and
          IoT sensors. Complete transparency from dispatch to delivery,
          with immutable proof at every checkpoint.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 pt-2 sm:pt-4">
          <button className="bg-[#00ADB5] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition shadow-lg shadow-[#00ADB5]/30 w-full sm:w-auto">
            Access Platform →
          </button>

          <button className="border border-[#393E46] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:border-[#00ADB5] transition w-full sm:w-auto">
            Explore Features
          </button>
        </div>

      </div>

      {/* RIGHT */}
      <div className="relative mt-10 sm:mt-14 md:mt-0">

        {/* LED Glow Behind Dashboard */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[110%] h-[110%] bg-[#00ADB5]/20 blur-[120px] rounded-full opacity-60" />
        </div>

        {/* Dashboard Card */}
        <div className="relative bg-[#1f262d] rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_0_40px_rgba(0,173,181,0.15)]">
          <img
            src="./landing-page/hero-dashboard.png"
            alt="Fleet Dashboard"
            className="rounded-xl w-full"
          />
        </div>

        {/* Floating Efficiency Card */}
        <div className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-10 bg-[#222831] border border-[#393E46] px-5 sm:px-8 py-4 sm:py-6 rounded-xl shadow-xl backdrop-blur-md">
          <p className="text-xs sm:text-sm text-gray-400">Live Efficiency</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#00ADB5] mt-1">94.7%</p>
          <p className="text-xs sm:text-sm text-gray-500">Fleet utilization rate</p>
        </div>

      </div>

    </section>
  );
}