"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Visual 1: Connecting Raw Data ---
const ConnectingVisual = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
    transition={{ duration: 0.6, ease: "circOut" }}
    className="relative w-full h-full flex items-center justify-center bg-[#050a14] rounded-3xl lg:rounded-3xl rounded-b-none border border-white/5 overflow-hidden shadow-xl lg:shadow-2xl"
  >
    <div className="absolute inset-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 80 }).map((_, i) => {
          const cx = Math.random() * 400;
          const cy = Math.random() * 300;
          const r = Math.random() * 2 + 0.5;
          const opacity =
            Math.random() * 0.5 +
            (cx > 150 && cx < 250 && cy > 100 && cy < 200 ? 0.4 : 0.1);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i % 3 === 0 ? "#8a4fff" : "#4f85ff"}
              opacity={opacity}
              animate={{
                cx: [cx, cx + (Math.random() - 0.5) * 20],
                cy: [cy, cy + (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
    <div className="absolute px-5 py-2 bg-[#0a1020]/80 backdrop-blur-md border border-blue-500/20 rounded-full text-[10px] tracking-[0.2em] text-blue-300 font-medium shadow-[0_0_20px_rgba(59,130,246,0.2)]">
      CONNECTING DATA...
    </div>
  </motion.div>
);

// --- Visual 2: Analyzing Patterns ---
const AnalyzingVisual = () => {
  const nodes = [
    [200, 100],
    [150, 180],
    [250, 180],
    [100, 250],
    [300, 250],
    [200, 220],
    [180, 140],
    [220, 140],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="relative w-full h-full flex items-center justify-center bg-[#050a14] rounded-3xl lg:rounded-3xl rounded-b-none border border-white/5 overflow-hidden shadow-xl lg:shadow-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M200 100 L150 180 L100 250 M200 100 L250 180 L300 250 M150 180 L250 180 M150 180 L200 220 L250 180 M180 140 L220 140"
            stroke="url(#grad1)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <path
            d="M100 250 L200 220 L300 250"
            stroke="url(#grad2)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f85ff" />
              <stop offset="100%" stopColor="#8a4fff" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8a4fff" />
              <stop offset="100%" stopColor="#4f85ff" />
            </linearGradient>
          </defs>
          {nodes.map((pos, i) => (
            <motion.circle
              key={`n-${i}`}
              cx={pos[0]}
              cy={pos[1]}
              r="6"
              fill={i % 2 === 0 ? "#4f85ff" : "#8a4fff"}
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>
      <div className="absolute px-5 py-2 bg-[#0a1020]/90 backdrop-blur-md border border-purple-500/30 rounded-full text-[10px] tracking-[0.2em] text-purple-300 font-medium shadow-[0_0_25px_rgba(138,79,255,0.4)] z-10">
        ANALYZING PATTERNS...
      </div>
    </motion.div>
  );
};

// --- Visual 3: Generating Insight ---
const GeneratingVisual = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
    transition={{ duration: 0.6, ease: "circOut" }}
    className="relative w-full h-full flex items-center justify-center bg-[#050a14] rounded-3xl lg:rounded-3xl rounded-b-none border border-white/5 overflow-hidden shadow-xl lg:shadow-2xl"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill="url(#gradCenter)"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle
          cx="200"
          cy="150"
          r="80"
          stroke="url(#gradCenter)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <circle
          cx="200"
          cy="150"
          r="120"
          stroke="url(#gradCenter)"
          strokeWidth="0.2"
          opacity="0.1"
        />
        <defs>
          <radialGradient id="gradCenter" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#4f85ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8a4fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#0a1020]/90 backdrop-blur-md border border-white/30 rounded-full text-[10px] tracking-[0.2em] text-white font-medium shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10">
      INSIGHT GENERATED
    </div>
  </motion.div>
);

const steps = [
  {
    id: 1,
    title: "1. Connect Raw Data",
    description:
      "Seamlessly integrate data from scattered sources into a unified pipeline.",
    visual: <ConnectingVisual />,
  },
  {
    id: 2,
    title: "2. Analyze & Discover Patterns",
    description: "Uncover hidden relationships with advanced AI algorithms.",
    visual: <AnalyzingVisual />,
  },
  {
    id: 3,
    title: "3. Generate Actionable Insight",
    description: "Transform complex patterns into clear, strategic decisions.",
    visual: <GeneratingVisual />,
  },
];

export default function InsightFlow() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#050a14] z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Interactive Insight Flow
          </h2>
        </div>

        {/* ------------------------------------------------ */}
        {/* MOBILE & TABLET LAYOUT: 3 Stacked Cards (< 1024px) */}
        {/* ------------------------------------------------ */}
        <div className="flex flex-col gap-10 lg:hidden">
          {steps.map((step) => (
            <div
              key={`mobile-${step.id}`}
              className="flex flex-col rounded-3xl bg-[#0b1224] border border-white/10 shadow-lg overflow-hidden"
            >
              {/* Visual Container for Card */}
              <div className="w-full h-[280px] sm:h-[350px] relative">
                {step.visual}
              </div>

              {/* Text Container for Card */}
              <div className="p-6 sm:p-8 bg-[#0a1020]/80 border-t border-white/5 relative z-10">
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm sm:text-base text-slate-300 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------ */}
        {/* DESKTOP LAYOUT: Interactive Split Screen (≥ 1024px) */}
        {/* ------------------------------------------------ */}
        <div className="hidden lg:flex gap-24 items-start">
          {/* Left Column (Text Steps) */}
          <div className="w-5/12 flex flex-col gap-4 relative pl-12">
            <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-white/[0.05] rounded-full z-0"></div>
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <div
                  key={`desktop-${step.id}`}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-300 ease-out z-10 ${
                    isActive
                      ? "bg-[#0b1224] border border-blue-900/30 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
                      : "bg-transparent border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -left-12 top-0 bottom-0 w-[3px] bg-[#4f85ff] rounded-full z-20"
                      style={{
                        boxShadow:
                          "0 0 20px 2px rgba(79, 133, 255, 0.6), 0 0 10px 1px rgba(79, 133, 255, 0.4) inset",
                      }}
                    />
                  )}
                  <h3
                    className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500"}`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed transition-colors duration-300 ${isActive ? "text-slate-300" : "text-slate-600"}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column (Visuals) */}
          <div className="w-7/12 h-[550px] sticky top-32 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="absolute inset-0 h-full w-full"
              >
                {steps.find((s) => s.id === activeStep)?.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
