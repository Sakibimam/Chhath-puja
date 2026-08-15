"use client";

import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface CenterTitleProps {
  onOpenPlaylistModal: () => void;
}

export default function CenterTitle({ onOpenPlaylistModal }: CenterTitleProps) {
  const handleOfferArghya = () => {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.3 },
      colors: ["#ea580c", "#d97706", "#78350f", "#fef08a", "#c2410c"],
      shapes: ["circle", "square"],
      scalar: 1.2,
      ticks: 200,
    });
  };

  return (
    <div className="absolute top-[8%] sm:top-[12%] inset-x-0 z-30 px-4 flex flex-col items-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-2 sm:space-y-3 pointer-events-auto"
      >
        {/* Integrated Devanagari Title Responsive Typography */}
        <div className="relative w-full">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight select-none font-serif text-[#3a2418] drop-shadow-sm leading-none">
            छठ पूजा
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-wider text-[#5c3a28] font-serif mt-1 sm:mt-1.5">
            छठी मईया के गीत
          </h2>
        </div>

        {/* Single Transparent Arghya Button */}
        <div className="pt-1.5 sm:pt-2">
          <button
            onClick={handleOfferArghya}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/30 hover:bg-white/45 backdrop-blur-md text-[#3a2418] font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 border border-[#3a2418]/25 touch-manipulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5c3a28] shrink-0" />
            <span>पुष्पांजलि अिर्पत करें</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
