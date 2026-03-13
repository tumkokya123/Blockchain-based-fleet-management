"use client";

import { motion } from "framer-motion";
import { Shield, Wrench, Truck, Package, MapPin } from "lucide-react";

export default function OperationsSection() {
  return (
    <section
      id="platform"
      className="max-w-[1300px] mx-auto px-8 pt-24 pb-28"
    >
      {/* ============================= */}
      {/*  BLOCK 1 — INTERNAL PLATFORM */}
      {/* ============================= */}

      <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
        {/* LEFT */}
        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-[#00ADB5] font-medium mb-6">
            OPERATIONS PLATFORM
          </p>

          <h2 className="text-[42px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.15]">
            Internal Fleet Command
          </h2>
        </div>

        {/* RIGHT */}
        <p className="text-gray-400 text-[17px] leading-[1.8] max-w-lg">
          A unified dark-themed operations hub for admins, vendors, and drivers.
          Every action is blockchain-logged, and every vehicle is IoT-monitored
          in real-time.
        </p>
      </div>

      <div className="h-[1px] bg-[#393E46] mb-16" />

      {/* CARDS — ADMIN / VENDOR / DRIVER */}
      <div className="grid md:grid-cols-3 gap-10 mb-28">
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
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="relative bg-[#393E46] rounded-2xl p-10 group transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[#00ADB5]/6 blur-2xl" />

            <div className="w-14 h-14 bg-[#2f363e] rounded-xl flex items-center justify-center text-[#00ADB5] mb-8 relative z-10">
              {item.icon}
            </div>

            <h3 className="text-[20px] font-semibold mb-4 relative z-10">
              {item.title}
            </h3>

            <p className="text-gray-400 text-[15px] leading-[1.8] mb-8 relative z-10">
              {item.desc}
            </p>

            <span className="text-[#00ADB5] text-[14px] font-medium relative z-10">
              {item.cta}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ================================= */}
      {/*  BLOCK 2 — CUSTOMER TRANSPARENCY */}
      {/* ================================= */}

      <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
        {/* LEFT */}
        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-[#00ADB5] font-medium mb-6">
            CUSTOMER PORTAL
          </p>

          <h2 className="text-[42px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.15]">
            Client Transparency Layer
          </h2>
        </div>

        {/* RIGHT */}
        <p className="text-gray-400 text-[17px] leading-[1.8] max-w-lg">
          A clean, dedicated portal for senders and receivers with real-time
          shipment tracking and blockchain verification of every checkpoint.
        </p>
      </div>

      <div className="h-[1px] bg-[#393E46] mb-16" />

      {/* CARDS — SENDER / RECEIVER */}
      <div className="grid md:grid-cols-2 gap-10">
        {[
          {
            icon: <Package size={22} />,
            title: "Sender Dashboard",
            desc: "Create shipments with a guided wizard, track live progress on an interactive map, and verify every checkpoint on the blockchain ledger.",
            cta: "Ship With Confidence →",
          },
          {
            icon: <MapPin size={22} />,
            title: "Receiver Portal",
            desc: "Track incoming deliveries in real-time, confirm receipt with blockchain verification, and raise issues with full audit trail support.",
            cta: "Complete Transparency →",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="relative bg-[#393E46] rounded-2xl p-10 group transition-all duration-300 hover:-translate-y-2"
          >

            
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[#00ADB5]/6 blur-2xl" />
                
            <div className="w-14 h-14 bg-[#2f363e] rounded-xl flex items-center justify-center text-[#00ADB5] mb-8 relative z-10">
              {item.icon}
            </div>

            <h3 className="text-[20px] font-semibold mb-4 relative z-10">
              {item.title}
            </h3>

            <p className="text-gray-400 text-[15px] leading-[1.8] mb-8 relative z-10">
              {item.desc}
            </p>

            <span className="text-[#00ADB5] text-[14px] font-medium relative z-10">
              {item.cta}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}