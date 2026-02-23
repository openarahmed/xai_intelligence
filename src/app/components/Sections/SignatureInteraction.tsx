"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Icosahedron, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MousePointer2 } from "lucide-react";

// --- Interactive 3D Object ---
function InteractiveShape() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      <Icosahedron args={[2, 2]}>
        <meshStandardMaterial
          color="#4f85ff"
          emissive="#8a4fff"
          emissiveIntensity={2}
          wireframe={true}
          roughness={0.1}
          metalness={0.8}
        />
      </Icosahedron>

      <Icosahedron args={[1.5, 0]}>
        <meshBasicMaterial color="#4f85ff" transparent opacity={0.1} />
      </Icosahedron>

      <Icosahedron args={[2.2, 1]}>
        <meshStandardMaterial
          color="#8a4fff"
          emissive="#4f85ff"
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.1}
        />
      </Icosahedron>
    </group>
  );
}

// --- Main Component ---
export default function SignatureInteraction() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left + 20);
      mouseY.set(e.clientY - rect.top + 20);
    }
  };

  return (
    // CRITICAL FIX 1: Reduced fixed padding (py-32 -> py-12 lg:py-16 2xl:py-24)
    // and added min-h-[90dvh] to perfectly frame it like a final slide
    <section className="relative w-full min-h-[90dvh] py-12 lg:py-16 2xl:py-24 px-4 sm:px-6 md:px-12 bg-transparent overflow-hidden flex flex-col items-center justify-center z-10">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        // CRITICAL FIX 2: Viewport-relative height (h-[45vh]) with a strict max-height for normal desktops (max-h-[400px]),
        // unlocking to max-h-[600px] only on ultra-wide 2xl/3xl screens.
        className="w-full max-w-4xl h-[45vh] min-h-[300px] max-h-[400px] 2xl:max-h-[600px] relative cursor-grab active:cursor-grabbing rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#4f85ff" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={2}
            color="#8a4fff"
          />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <InteractiveShape />
          </Float>

          <EffectComposer>
            <Bloom
              intensity={2.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.6}
            autoRotate={false}
          />
        </Canvas>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex absolute top-0 left-0 pointer-events-none z-20 items-center gap-2 px-4 py-2 bg-[#0a1020]/80 backdrop-blur-md border border-white/10 rounded-full text-sm text-white shadow-[0_0_20px_rgba(79,133,255,0.3)]"
              style={{
                x: springX,
                y: springY,
                willChange: "transform",
              }}
            >
              <MousePointer2
                size={16}
                className="text-blue-400 animate-pulse"
              />
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                Click & Drag to Interact
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text Content & Final CTA */}
      {/* CRITICAL FIX 3: Reduced top margin (mt-12 -> mt-8) to keep it tightly grouped with the canvas on short screens */}
      <div className="text-center mt-8 md:mt-10 2xl:mt-12 max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Experience Intelligence.
        </h2>
        <p
          className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6 md:mb-8 px-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Interact with our core AI model. Its structure adapts to your
          perspective, revealing new connections with every movement.
        </p>

        <button className="px-8 py-4 bg-blue-600 text-white font-bold text-sm tracking-wider border-2 border-blue-400 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.7)]">
          DEPLOY YOUR INSTANCE
        </button>
      </div>
    </section>
  );
}
