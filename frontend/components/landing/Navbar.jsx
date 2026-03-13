"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-[80px] z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#222831]/70 border-b border-[#393E46]"
            : "bg-[#222831]/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-8 h-full flex justify-between items-center">

          {/* Logo */}
          <h1 className="text-[30px] font-semibold tracking-[-0.02em]">
            FleetChain
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10 text-[18px] font-medium text-gray-300">
            <a href="#platform" className="hover:text-[#00ADB5] transition">
              Platform
            </a>
            <a href="#technology" className="hover:text-[#00ADB5] transition">
              Technology
            </a>
            <a href="#contact" className="hover:text-[#00ADB5] transition">
              Contact
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#00ADB5] text-black text-[14px] font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition"
            >
              Login
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            >
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* THIS FIXES EVERYTHING */}
      <div className="h-[80px]" />
    </>
  );
}