"use client";

import { motion } from "framer-motion";
import {
  Home,
  Database,
  Cpu,
  BarChart2,
  ChevronDown,
  Activity,
  Layers,
} from "lucide-react";
import React from "react";

// --- Custom Chart Component (SVG + Framer Motion) ---
const CustomChart = () => {
  const points = [
    [0, 80],
    [50, 60],
    [100, 65],
    [150, 40],
    [200, 45],
    [250, 20],
    [300, 40],
    [350, 20],
    [400, 45],
    [450, 10],
  ];

  const pathData = `M ${points.map((p) => p.join(",")).join(" L ")}`;
  const areaData = `${pathData} L 450,100 L 0,100 Z`;

  return (
    // Added overflow-hidden to prevent the chart from breaking out of its container on resize
    <div className="relative w-full h-32 sm:h-40 md:h-48 mt-6 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 450 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8a4fff" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={areaData}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }} // Ensures it only animates once when scrolling down
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="3"
            fill="white"
            stroke="#8a4fff"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
          >
            <animate
              attributeName="r"
              values="3;5;3"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </svg>

      {/* Chart X-Axis Labels */}
      {/* Hidden on very small screens to prevent overlap */}
      <div className="hidden sm:flex justify-between text-[10px] text-slate-500 mt-3 px-1 font-mono">
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
};

// --- Metric Card Component (Strictly Typed) ---
interface MetricCardProps {
  title: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  sub,
  icon,
  color,
}) => (
  <div className="flex-1 bg-[#0f172a]/80 border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group hover:bg-[#0f172a] transition-colors">
    <div
      className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity ${color}`}
    >
      {icon}
    </div>
    <h4 className="text-slate-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider relative z-10">
      {title}
    </h4>
    <div className="mt-2 sm:mt-3 relative z-10">
      <span className="text-xl sm:text-2xl font-bold text-white block">
        {value}
      </span>
      {sub && (
        <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
          {sub}
        </span>
      )}
    </div>
  </div>
);

export default function DashboardPreview() {
  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 md:px-12 bg-[#050A14] overflow-hidden flex flex-col items-center z-20">
      {/* Background ambient glow behind the dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Title Area */}
      <div className="text-center mb-12 md:mb-16 relative z-10">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Dashboard Preview
        </h2>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm sm:text-base px-4">
          Monitor your AI infrastructure in real-time with our advanced
          visualization engine.
        </p>
      </div>

      {/* Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // Changed to flex-col on mobile, flex-row on desktop
        // Removed strict aspect ratio constraints in favor of content-driven height
        className="relative w-full max-w-6xl min-h-[600px] bg-[#0b1221] rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col md:flex-row z-10"
      >
        {/* Top Border Glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 z-20"></div>

        {/* 1. Sidebar (Top on mobile, Left on desktop) */}
        <div className="w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col p-4 sm:p-6 bg-[#0a1020] justify-between md:justify-start items-center md:items-stretch z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 md:mb-10 text-white font-bold text-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              X
            </div>
            <span className="hidden lg:block tracking-widest text-sm">
              XAI <span className="font-light text-slate-400">INTEL</span>
            </span>
          </div>

          {/* Menu Items (Hidden on mobile to save space, shown on md+) */}
          <div className="hidden md:flex flex-col gap-2">
            {[
              { icon: <Home size={20} />, label: "Overview", active: true },
              {
                icon: <Database size={20} />,
                label: "Data Sources",
                active: false,
              },
              { icon: <Cpu size={20} />, label: "Models", active: false },
              {
                icon: <BarChart2 size={20} />,
                label: "Analytics",
                active: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-center lg:justify-start items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  item.active
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                {item.icon}
                <span className="hidden lg:block text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* User Profile (Right side on mobile, Bottom on desktop) */}
          <div className="md:mt-auto flex justify-center lg:justify-start items-center gap-3 p-2 lg:p-3 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border border-white/10">
              U
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-xs text-white truncate font-medium">
                System Admin
              </p>
              <p className="text-[10px] text-emerald-400 truncate mt-0.5">
                ● Online
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main Content Area (Right side) */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 flex flex-col gap-6 lg:gap-8 overflow-hidden relative bg-[#050A14]/50">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Analytics Overview
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                System performance matrix
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-[#0f172a]/80 text-xs font-medium text-slate-300 cursor-pointer hover:bg-[#0f172a] transition-colors shadow-sm">
              <span>Last 30 Days</span>
              <ChevronDown size={14} className="text-blue-400" />
            </div>
          </div>

          {/* Top Cards (Metrics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <MetricCard
              title="Total Data Processed"
              value="1.2 PB"
              icon={<Database size={24} />}
              color="text-blue-500"
              sub="+12.5% vs last month"
            />
            <MetricCard
              title="Prediction Accuracy"
              value="98.5%"
              icon={<Activity size={24} />}
              color="text-purple-500"
              sub="Top 1% industry standard"
            />
            <MetricCard
              title="Active Models"
              value="15"
              icon={<Layers size={24} />}
              color="text-emerald-500"
              sub="All systems operational"
            />
          </div>

          {/* Main Chart Section */}
          <div className="flex-1 bg-[#0f172a]/40 border border-white/5 rounded-2xl p-5 sm:p-8 relative backdrop-blur-md flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Monthly Inference Volume
                </h4>
                <p className="text-slate-500 text-xs mt-1">
                  Requests processed per second (RPS)
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  Live Data
                </div>
              </div>
            </div>

            <CustomChart />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
