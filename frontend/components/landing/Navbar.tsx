"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-[#222831]/70 border-b border-[#393E46]"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-[1280px] mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-[20px] font-semibold tracking-[-0.02em]">
          FleetChain
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 text-[14px] font-medium text-gray-300">
          <a
            href="#platform"
            className="hover:text-[#00ADB5] transition"
          >
            Platform
          </a>

          <a
            href="#technology"
            className="hover:text-[#00ADB5] transition"
          >
            Technology
          </a>

          <a
            href="#contact"
            className="hover:text-[#00ADB5] transition"
          >
            Contact
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={() => router.push("/login")}
          className="bg-[#00ADB5] text-black text-[14px] font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

      </div>
    </nav>
  );
}