"use client";

import { motion } from "framer-motion";
import { Link2, Cpu, FileText, Lock } from "lucide-react";

export default function TechnologySection() {
  return (
    <section
      id="technology"
      className="max-w-[1400px] mx-auto px-8 pt-24 pb-28"
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-[12px] tracking-[0.25em] uppercase text-[#00ADB5] font-medium mb-6">
          TECHNOLOGY STACK
        </p>

        <h2 className="text-[42px] md:text-[46px] font-semibold tracking-[-0.02em] leading-[1.15] mb-6">
          Built on Proven Infrastructure
        </h2>

        <p className="text-gray-400 text-[17px] leading-[1.8]">
          Enterprise-grade technology stack combining blockchain immutability
          with IoT real-time data for complete supply chain transparency.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12">

        {[
          {
            icon: <Link2 size={22} />,
            title: "Polygon Blockchain",
            desc: "All fleet events are immutably recorded on Polygon's high-throughput, low-cost Layer 2 network for tamper-proof audit trails.",
          },
          {
            icon: <Cpu size={22} />,
            title: "IoT Monitoring",
            desc: "Real-time vehicle telemetry including GPS, engine diagnostics, fuel levels, and temperature sensors feed directly into the platform.",
          },
          {
            icon: <FileText size={22} />,
            title: "Smart Contracts",
            desc: "Automated contract execution for trip verification, delivery confirmation, and vendor payment triggers without manual intervention.",
          },
          {
            icon: <Lock size={22} />,
            title: "Escrow Automation",
            desc: "Payments are held in blockchain escrow and automatically released upon delivery confirmation, ensuring trust between all parties.",
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
            {/* LED Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[#00ADB5]/6 blur-2xl" />

            <div className="flex items-start gap-6 relative z-10">

              {/* ICON */}
              <div className="w-14 h-14 bg-[#2f363e] rounded-xl flex items-center justify-center text-[#00ADB5] flex-shrink-0">
                {item.icon}
              </div>

              {/* TEXT CONTENT */}
              <div>
                <h3 className="text-[20px] font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-[15px] leading-[1.8]">
                  {item.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}