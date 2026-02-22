"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  // grabbing refs for our elements so gsap knows what to animate
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // setting up a timeline so things load smoothly one by one
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // animate the texts dropping in with a stagger effect
      tl.fromTo(
        ".hero-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
      );

      // pop the image in right after the text starts appearing

      // slide the button up at the very end
      tl.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.6",
      );

      // make the particle image float up and down infinitely to look alive

      // hover effect for the CTA button - tweaked the glow a bit
      const button = buttonRef.current;
      if (!button) return;

      const hoverTween = gsap.to(button, {
        boxShadow:
          "0 0 40px 10px rgba(37, 99, 235, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.2)",
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      });

      // handling mouse events manually because hover states in css sometimes conflict with gsap
      button.addEventListener("mouseenter", () => hoverTween.play());
      button.addEventListener("mouseleave", () => hoverTween.reverse());

      // cleanup function so we don't cause memory leaks
      return () => {
        button.removeEventListener("mouseenter", () => hoverTween.play());
        button.removeEventListener("mouseleave", () => hoverTween.reverse());
      };
    },
    { scope: containerRef },
  );

  return (
    // kept bg-transparent and z-10 so the global box pattern shows through properly!
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 overflow-hidden bg-transparent pt-20 pb-10 px-6"
    >
      {/* Main text area */}
      <div className="relative z-10 text-center pointer-events-none mt-5">
        {/* simple pill tag to make it look a bit more modern */}
        <div className="hero-text inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
          <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
            Next Gen Analytics
          </span>
        </div>

        <h1 className="hero-text text-4xl md:text-5xl lg:text-5xl xl:text-[60px] font-bold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-lg mt-3 3xl:mt-0">
          Transform Raw Data into
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
            Intelligence
          </span>
        </h1>

        <p className="hero-text mt-4 text-slate-300 text-lg md:text-[20px] max-w-[630PX] mx-auto leading-relaxed">
          Unlock the true potential of your metrics with our AI-driven insights
          engine.
        </p>
      </div>

      {/* Particle Image wrapper - kept the original heights you set */}
      <div className="w-full max-w-4xl h-[250px] md:h-[320px] xl:h-[200px] relative z-0 my-8 xl:my-10">
        <Image
          src="/particle.png"
          alt="Raw Data to Intelligence"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* CTA Button - kept your original styling but made sure it scales nicely with the GSAP hover */}
      <div className="relative z-10 grid grid-cols-2 gap-2">
        <button
          ref={buttonRef}
          className="px-10 py-4 bg-blue-600 text-white font-bold text-sm tracking-wider border-2 border-blue-400 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer transition-colors duration-300 hover:bg-blue-500"
        >
          GET STARTED
        </button>
        <button
          ref={buttonRef}
          className="px-10 py-4  text-white font-bold text-sm tracking-wider border-2 border-blue-400 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer transition-colors duration-300 hover:bg-blue-500"
        >
          SEE MORE MODELS
        </button>
      </div>
    </section>
  );
}
