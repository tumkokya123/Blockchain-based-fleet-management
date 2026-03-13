"use client";

import { Globe, Github, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#1c232a] border-t border-[#393E46]"
    >
      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-8 pt-24 pb-20 grid md:grid-cols-4 gap-14">

        {/* Brand Column */}
        <div className="space-y-6">
          <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
            FleetChain
          </h3>

          <p className="text-gray-400 text-[15px] leading-[1.8] max-w-sm">
            Enterprise-grade fleet management platform built on blockchain
            transparency, real-time IoT monitoring, and automated smart
            contract execution.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-6">
            Platform
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li>
              <a href="#platform" className="hover:text-[#00ADB5] transition">
                Operations
              </a>
            </li>
            <li>
              <a href="#technology" className="hover:text-[#00ADB5] transition">
                Technology Stack
              </a>
            </li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Security
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-6">
            Company
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              About
            </li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Careers
            </li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Legal & Compliance
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-6">
            Contact
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Enterprise Sales
            </li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Technical Support
            </li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">
              Partnerships
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#393E46]" />

      {/* Bottom Row */}
      <div className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[13px]">

        <p>
          © {new Date().getFullYear()} FleetChain Technologies. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-gray-400">

          <a className="hover:text-[#00ADB5] transition cursor-pointer">
            <Globe size={18} />
          </a>

          <a className="hover:text-[#00ADB5] transition cursor-pointer">
            <Github size={18} />
          </a>

          <a className="hover:text-[#00ADB5] transition cursor-pointer">
            <FileText size={18} />
          </a>

        </div>
      </div>
    </footer>
  );
}