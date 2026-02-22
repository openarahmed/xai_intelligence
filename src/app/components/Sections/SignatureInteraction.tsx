"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Icosahedron, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// --- ইন্টারেক্টিভ 3D অবজেক্ট ---
function InteractiveShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // অটোমেটিক স্লো রোটেশন
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group>
      {/* মেইন ওয়্যারফ্রেমে অবজেক্ট */}
      <Icosahedron ref={meshRef} args={[2, 2]}>
        <meshStandardMaterial
          color="#4f85ff"
          emissive="#8a4fff"
          emissiveIntensity={2}
          wireframe={true}
          roughness={0.1}
          metalness={0.8}
        />
      </Icosahedron>

      {/* ভেতরের একটি সলিড গ্লোয়িং কোর */}
      <Icosahedron args={[1.5, 0]}>
        <meshBasicMaterial color="#4f85ff" transparent opacity={0.1} />
      </Icosahedron>

      {/* বাইরের একটি হালকা গ্লোয়িং শেল */}
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

// --- মূল কম্পোনেন্ট ---
export default function SignatureInteraction() {
  const [isHovered, setIsHovered] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);

  // মাউস মুভমেন্ট ট্র্যাক করা (কার্সার হিন্টের জন্য)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hintRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(hintRef.current, {
        x: x + 20,
        y: y + 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    // এখানে bg-[#050A14] এর পরিবর্তে bg-transparent ব্যবহার করা হয়েছে
    <section className="relative w-full py-32 px-6 md:px-12 bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* 3D ক্যানভাস কন্টেইনার */}
      <div
        className="w-full max-w-4xl h-[500px] md:h-[600px] relative cursor-grab active:cursor-grabbing"
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

          {/* গ্লো ইফেক্ট */}
          <EffectComposer>
            <Bloom
              intensity={2.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>

          {/* ইউজার ইন্টারঅ্যাকশন */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate={false}
          />
        </Canvas>

        {/* "Move to Interact" কার্সার হিন্ট */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              ref={hintRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 pointer-events-none z-20 flex items-center gap-2 px-4 py-2 bg-[#0a1020]/80 backdrop-blur-md border border-white/10 rounded-full text-sm text-white shadow-[0_0_20px_rgba(79,133,255,0.3)]"
              style={{ willChange: "transform" }}
            >
              <MousePointer2
                size={16}
                className="text-blue-400 animate-pulse"
              />
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                Move to Interact
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* টেক্সট কন্টেন্ট */}
      <div className="text-center mt-12 max-w-2xl mx-auto relative z-10">
        <h2
          className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Experience Intelligence in Motion.
        </h2>
        <p
          className="text-gray-400 text-lg leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Interact with our core AI model. Its structure adapts to your
          perspective, revealing new connections with every movement.
        </p>
      </div>
    </section>
  );
}
