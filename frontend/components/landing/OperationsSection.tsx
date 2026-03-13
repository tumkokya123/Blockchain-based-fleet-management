"use client";

import { motion } from "framer-motion";
import { Shield, Wrench, Truck } from "lucide-react";

export default function OperationsSection() {
  return (
    <section
      id="platform"
      className="max-w-[1280px] mx-auto px-8 py-32 scroll-mt-32"
    >
      {/* Header Section */}
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <div>
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#00ADB5] font-medium mb-6">
            OPERATIONS PLATFORM
          </p>

          <h2 className="text-[44px] font-semibold tracking-[-0.02em] leading-[1.2]">
            Internal Fleet Command
          </h2>
        </div>

        {/* Right */}
        <p className="text-gray-400 text-[17px] leading-[1.7] max-w-lg">
          A unified dark-themed operations hub for admins, vendors, and drivers.
          Every action is blockchain-logged, every vehicle IoT-monitored.
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#393E46] my-16" />

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-12">

        {[
          {
            icon: <Shield size={22} />,
            title: "Admin Console",
            desc: "Complete fleet oversight with real-time KPIs, blockchain ledger access, user provisioning, and maintenance scheduling across the entire operation.",
            cta: "Full Operational Control →",
          },
          {
            icon: <Wrench size={22} />,
            title: "Vendor Portal",
            desc: "Manage repair requests, track active jobs, view payment history with blockchain-verified invoices, and coordinate with fleet managers seamlessly.",
            cta: "Streamlined Vendor Ops →",
          },
          {
            icon: <Truck size={22} />,
            title: "Driver Interface",
            desc: "Mobile-first trip management with real-time IoT vehicle data, start/end trip controls, and automatic blockchain-logged route verification.",
            cta: "On-Road Efficiency →",
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative bg-[#393E46] rounded-2xl p-10 group transition-all duration-300 hover:-translate-y-2"
          >
            {/* Subtle LED Glow on Hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[#00ADB5]/5 blur-2xl" />

            {/* Icon */}
            <div className="w-14 h-14 bg-[#2f363e] rounded-xl flex items-center justify-center text-[#00ADB5] mb-8 relative z-10">
              {card.icon}
            </div>

            <h3 className="text-[22px] font-semibold mb-4 relative z-10">
              {card.title}
            </h3>

            <p className="text-gray-400 text-[15px] leading-[1.8] mb-8 relative z-10">
              {card.desc}
            </p>

            <span className="text-[#00ADB5] text-[14px] font-medium tracking-wide relative z-10">
              {card.cta}
            </span>
          </motion.div>
        ))}

      </div>
    </section>
  );
}