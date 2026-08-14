"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface FloatingDiya {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  driftRange: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BackgroundScene() {
  const [diyas, setDiyas] = useState<FloatingDiya[]>([
    { id: 1, x: 12, y: 78, scale: 1.1, duration: 4.8, driftRange: 25, delay: 0 },
    { id: 2, x: 22, y: 84, scale: 0.85, duration: 5.5, driftRange: 18, delay: 1.2 },
    { id: 3, x: 34, y: 76, scale: 0.95, duration: 4.2, driftRange: 30, delay: 0.6 },
    { id: 4, x: 46, y: 88, scale: 1.2, duration: 3.9, driftRange: 22, delay: 1.8 },
    { id: 5, x: 58, y: 75, scale: 0.75, duration: 5.8, driftRange: 15, delay: 0.3 },
    { id: 6, x: 68, y: 82, scale: 1.05, duration: 4.4, driftRange: 28, delay: 2.1 },
    { id: 7, x: 78, y: 74, scale: 0.8, duration: 5.1, driftRange: 20, delay: 1.4 },
    { id: 8, x: 88, y: 81, scale: 1.15, duration: 4.0, driftRange: 32, delay: 0.9 },
  ]);

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 75,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  const handleWaterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const normalizedX = e.clientX / window.innerWidth;
    const normalizedY = e.clientY / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: normalizedX, y: normalizedY },
      colors: ["#f59e0b", "#fbbf24", "#ea580c", "#fef08a"],
      scalar: 0.8,
      ticks: 120,
    });

    const newDiya: FloatingDiya = {
      id: Date.now(),
      x: Math.max(4, Math.min(96, clickX)),
      y: Math.max(35, Math.min(92, clickY)),
      scale: 0.9 + Math.random() * 0.4,
      duration: 4 + Math.random() * 2,
      driftRange: 20 + Math.random() * 20,
      delay: 0,
    };

    setDiyas((prev) => [...prev.slice(-24), newDiya]);
  };

  return (
    <div
      className="absolute inset-0 w-full h-screen overflow-hidden select-none bg-slate-950 cursor-pointer pointer-events-auto z-0"
      onClick={handleWaterClick}
    >
      {/* 1. Base Flat Illustrated Background Art (Full Original Warm Gold/Cream Saturation) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: 1,
          scale: [1.02, 1.04, 1.02],
        }}
        transition={{
          opacity: { duration: 2.2 },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/flat_illustrated_chhath_ghat.jpg"
          alt="Chhath Puja Bihar River Ghat Flat Vector Illustration"
          fill
          priority
          quality={95}
          className="object-cover object-center transform filter brightness-[1.0] contrast-[1.0]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* Subtle Corner Radial Vignette */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.10)_100%)]" />

      {/* Ultra-faint Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-2 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 2. Sun Halo */}
      <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-400/20 to-yellow-200/10 blur-3xl"
        />
      </div>

      {/* 3. Soft River Mist */}
      <div className="absolute bottom-[24%] left-0 right-0 h-40 pointer-events-none z-10 opacity-35 overflow-hidden">
        <motion.div
          animate={{ x: ["-15%", "15%", "-15%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="w-[130%] h-full bg-gradient-to-r from-transparent via-amber-100/20 to-transparent blur-3xl"
        />
      </div>

      {/* 4. Floating Diyas Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {diyas.map((diya) => (
            <motion.div
              key={diya.id}
              initial={{ opacity: 0, scale: 0.2, y: 30 }}
              animate={{
                opacity: 1,
                scale: diya.scale,
                y: [0, -12, 0],
                x: [0, diya.driftRange, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: {
                  duration: diya.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: diya.delay,
                },
                x: {
                  duration: diya.duration * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: diya.delay,
                },
              }}
              style={{
                left: `${diya.x}%`,
                top: `${diya.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto"
            >
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-14 h-4 rounded-full bg-amber-500/60 blur-md group-hover:bg-amber-400/90 transition-all duration-300" />
              <div className="relative flex flex-col items-center animate-diya-bob">
                <div className="relative mb-[-3px] z-10 flex items-center justify-center">
                  <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flame shadow-[0_0_20px_#f59e0b]" />
                  <div className="absolute w-8 h-8 rounded-full bg-amber-400/40 blur-sm animate-pulse" />
                </div>
                <div className="relative w-11 h-4.5 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-b-full border-t border-amber-400/80 shadow-2xl flex items-center justify-center">
                  <div className="w-13 h-1.5 -top-1 absolute bg-amber-700/90 rounded-full border border-amber-300/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Light Motes */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.85, 0.85, 0],
              y: [-20, -140],
              x: [0, 25],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeOut",
              delay: p.delay,
            }}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="absolute rounded-full bg-gradient-to-t from-amber-300 to-yellow-100 shadow-[0_0_8px_#fde047]"
          />
        ))}
      </div>
    </div>
  );
}
