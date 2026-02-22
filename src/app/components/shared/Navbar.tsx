"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { name: "FEATURES", href: "#features" },
  { name: "SOLUTIONS", href: "#solutions" },
  { name: "PRICING", href: "#pricing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // স্ক্রল ইভেন্ট লিসেনার
  useEffect(() => {
    const handleScroll = () => {
      // 50px স্ক্রল করলেই স্টেট চেঞ্জ হবে
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // isScrolled এর উপর ভিত্তি করে ডাইনামিক ক্লাস অ্যাড করা হয়েছে
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "border-b border-white/10 bg-[#050A14]/80 backdrop-blur-md py-0"
          : "border-b border-transparent bg-transparent py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-transform duration-300 group-hover:scale-110">
              <X size={20} strokeWidth={3} />
            </div>
            <span className="text-lg font-bold tracking-wider text-white">
              XAI <span className="font-light text-gray-400">INTELLIGENCE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium tracking-widest text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-blue-500/30 bg-[#0a1020]/50 px-6 py-2 text-xs font-bold tracking-wider text-blue-400 transition-all hover:bg-blue-900/20 hover:border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              SIGN IN
            </motion.button>
          </div>

          {/* Mobile Menu Icon (Placeholder for responsiveness) */}
          <div className="md:hidden">{/* Mobile menu icon can go here */}</div>
        </div>
      </div>
    </motion.nav>
  );
}
