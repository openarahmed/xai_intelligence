"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { X, Menu } from "lucide-react";

const navLinks = [
  { name: "FEATURES", href: "#features" },
  { name: "SOLUTIONS", href: "#solutions" },
  { name: "PRICING", href: "#pricing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${
        isScrolled
          ? "border-b border-white/10 bg-[#050A14]/85 backdrop-blur-xl shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
              <X size={20} strokeWidth={3} />
            </div>
            <span className="text-lg font-bold tracking-wider text-white">
              XAI{" "}
              <span className="font-light text-slate-300">INTELLIGENCE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-widest text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons (Sign In & Sign Up) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Secondary Action: Sign In */}
            <Link
              href="/signin"
              className="text-xs font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
            >
              SIGN IN
            </Link>

            {/* Primary Action: Sign Up */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-blue-500/40 bg-[#0a1020]/60 px-6 py-2.5 text-xs font-bold tracking-wider text-blue-400 transition-all hover:bg-blue-900/30 hover:border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            >
              SIGN UP
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-0 left-0 w-full bg-[#050A14]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold tracking-widest text-slate-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Buttons Stack */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex w-full max-w-[240px] flex-col gap-4"
              >
                <button className="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold tracking-wider text-white transition-colors hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  SIGN UP
                </button>
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center rounded-full border border-slate-700 px-6 py-4 text-sm font-bold tracking-wider text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  SIGN IN
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
