"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TopBar() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).toLowerCase()
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute top-0 inset-x-0 z-40 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:p-6 flex items-center justify-between pointer-events-none text-xs sm:text-sm font-medium"
    >
      {/* Top-Left: Minimal Live Clock */}
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-[#3a2418]/15 backdrop-blur-md text-[#3a2418] font-mono text-xs shadow-sm font-bold">
        <span>{timeStr || "4:50 pm"}</span>
      </div>
    </motion.header>
  );
}
