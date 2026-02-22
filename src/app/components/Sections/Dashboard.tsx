"use client";

import { motion } from "framer-motion";
import {
  Home,
  Database,
  Cpu,
  BarChart2,
  User,
  ChevronDown,
  Activity,
  Layers,
} from "lucide-react";

// --- কাস্টম চার্ট কম্পোনেন্ট (SVG + Framer Motion) ---
const CustomChart = () => {
  // চার্টের ডেটা পয়েন্ট (SVG Path তৈরি করার জন্য)
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

  // লাইন পাথ তৈরি করা
  const pathData = `M ${points.map((p) => p.join(",")).join(" L ")}`;
  // এরিয়া ফিল পাথ (নিচে নামিয়ে বন্ধ করা)
  const areaData = `${pathData} L 450,100 L 0,100 Z`;

  return (
    <div className="relative w-full h-48 mt-4">
      <svg
        className="w-full h-full"
        viewBox="0 0 450 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* লাইনের জন্য গ্রেডিয়েন্ট */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8a4fff" />
          </linearGradient>
          {/* নিচের এরিয়ার জন্য গ্রেডিয়েন্ট (ফেড আউট) */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* এরিয়া ফিল (Area Fill) */}
        <motion.path
          d={areaData}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* মেইন লাইন (Stroke) */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* গ্লোয়িং ডট (Glowing Dots) */}
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
            transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
          >
            {/* এক্সট্রা গ্লো এফেক্ট */}
            <animate
              attributeName="r"
              values="3;5;3"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </svg>

      {/* চার্টের নিচের মাসগুলো */}
      <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-2 font-mono">
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

// --- ছোট ম্যাট্রিক্স কার্ড ---
const MetricCard = ({ title, value, sub, icon, color }: any) => (
  <div className="flex-1 bg-[#0f172a]/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group">
    <div
      className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity ${color}`}
    >
      {icon}
    </div>
    <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
      {title}
    </h4>
    <div className="mt-2">
      <span className="text-2xl font-bold text-white block">{value}</span>
      {sub && (
        <span className="text-[10px] text-green-400 font-mono">{sub}</span>
      )}
    </div>
  </div>
);

export default function DashboardPreview() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 bg-[#050A14] overflow-hidden flex flex-col items-center">
      {/* টাইটেল */}
      <div className="text-center mb-16 relative z-10">
        <h2
          className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Dashboard Preview
        </h2>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto">
          Monitor your AI infrastructure in real-time with our advanced
          visualization engine.
        </p>
      </div>

      {/* ড্যাশবোর্ড কন্টেইনার (Tilt Effect সহ) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] bg-[#0b1221] rounded-3xl border border-white/10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] overflow-hidden flex"
      >
        {/* টপ বর্ডার গ্লো */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        {/* ১. সাইডবার (Left) */}
        <div className="w-20 md:w-64 border-r border-white/5 flex flex-col p-6 bg-[#0a1020]">
          {/* লোগো */}
          <div className="flex items-center gap-2 mb-10 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              X
            </div>
            <span className="hidden md:block">XAI</span>
          </div>

          {/* মেনু আইটেম */}
          <div className="flex flex-col gap-2">
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
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  item.active
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="hidden md:block text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* ইউজার প্রোফাইল (Bottom) */}
          <div className="mt-auto flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
              U
            </div>
            <div className="hidden md:block overflow-hidden">
              <p className="text-xs text-white truncate">User Profile</p>
              <p className="text-[10px] text-gray-500 truncate">Pro Plan</p>
            </div>
          </div>
        </div>

        {/* ২. মেইন কন্টেন্ট (Right) */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden relative">
          {/* ব্যাকগ্রাউন্ড গ্রিড */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

          {/* হেডার */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-white">Dashboard</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#0f172a] text-xs text-gray-300">
              <span>Last 30 Days</span>
              <ChevronDown size={12} />
            </div>
          </div>

          {/* টপ কার্ডস (Metrics) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Data Processed"
              value="1.2 PB"
              icon={<Database />}
              color="text-blue-500"
              sub="+12.5% vs last month"
            />
            <MetricCard
              title="Prediction Accuracy"
              value="98.5%"
              icon={<Activity />}
              color="text-purple-500"
              sub="Top 1% industry standard"
            />
            <MetricCard
              title="Active Models"
              value="15"
              icon={<Layers />}
              color="text-emerald-500"
              sub="All systems operational"
            />
          </div>

          {/* মেইন চার্ট সেকশন */}
          <div className="flex-1 bg-[#0f172a]/40 border border-white/5 rounded-2xl p-6 relative backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">
                  Monthly Insight Generation
                </h4>
                <p className="text-gray-500 text-xs mt-1">
                  Real-time model inference stats
                </p>
              </div>
              {/* লেজেন্ড */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_blue]"></span>{" "}
                  Current
                </div>
              </div>
            </div>

            {/* কাস্টম চার্ট */}
            <CustomChart />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
