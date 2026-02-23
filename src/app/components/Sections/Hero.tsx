"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
      );

      tl.fromTo(
        ".cta-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.5",
      );

      const primaryButtons =
        gsap.utils.toArray<HTMLButtonElement>(".cta-primary");

      const eventListeners = primaryButtons.map((button) => {
        const hoverTween = gsap.to(button, {
          boxShadow:
            "0 0 40px 10px rgba(37, 99, 235, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.2)",
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power2.out",
        });

        const handleMouseEnter = () => hoverTween.play();
        const handleMouseLeave = () => hoverTween.reverse();

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);

        return { button, handleMouseEnter, handleMouseLeave };
      });

      return () => {
        eventListeners.forEach(
          ({ button, handleMouseEnter, handleMouseLeave }) => {
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseLeave);
          },
        );
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[650px] w-full flex flex-col items-center justify-center z-10 overflow-hidden bg-transparent px-4 sm:px-6"
    >
      {/* Main text area */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none mt-10 md:mt-0">
        <div className="hero-text inline-flex items-center justify-center px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
          <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
            Next Gen Analytics
          </span>
        </div>

        <h1 className="hero-text text-4xl sm:text-5xl lg:text-[52px] 2xl:text-[68px] font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-lg">
          Transform Raw Data into
          <br className="hidden sm:block" />
          {/* UPDATED: Richer, more consistent blue gradient */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 ml-2 sm:ml-0">
            Intelligence
          </span>
        </h1>

        <p className="hero-text mt-3 md:mt-5 text-slate-300 text-base sm:text-lg md:text-[20px] max-w-[630px] mx-auto leading-relaxed">
          Unlock the true potential of your metrics with our AI-driven insights
          engine.
        </p>
      </div>

      {/* Particle Image */}
      <div className="w-full max-w-4xl h-[25vh] min-h-[180px] max-h-[260px] 2xl:max-h-[400px] relative z-0 my-4 md:my-6 2xl:my-10">
        <Image
          src="/particle.png"
          alt="Raw Data to Intelligence"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      {/* CTA Buttons - UPDATED: Fixed width mapping for symmetry */}
      <div className="relative z-10 w-full max-w-md sm:max-w-none flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-2">
        <button className="cta-btn cta-primary w-full sm:w-[220px] py-4 bg-blue-600 text-white font-bold text-sm tracking-wider border-2 border-blue-400 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer transition-colors duration-300 hover:bg-blue-500 flex items-center justify-center">
          GET STARTED
        </button>
        <button className="cta-btn w-full sm:w-[220px] py-4 bg-transparent text-slate-200 font-bold text-sm tracking-wider border-2 border-slate-700 rounded-full cursor-pointer transition-all duration-300 hover:border-blue-400 hover:text-white hover:bg-slate-800/50 flex items-center justify-center">
          SEE MORE MODELS
        </button>
      </div>
    </section>
  );
}
