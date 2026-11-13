"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEARTBEAT_MS = 20_000;

function getTabId(): string {
  const fallback = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  try {
    const existing = sessionStorage.getItem("presence-id");
    if (existing) return existing;
    const id = typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : fallback();
    sessionStorage.setItem("presence-id", id);
    return id;
  } catch {
    return fallback();
  }
}

export default function LiveListeners() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const id = getTabId();
    let timer: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    const beat = async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          cache: "no-store",
        });
        const data = (await res.json()) as { count: number | null };
        if (!cancelled) setCount(typeof data.count === "number" ? data.count : null);
      } catch {
        // Keep showing the last known number on a transient failure.
      }
    };

    const leave = () => {
      const payload = new Blob([JSON.stringify({ id, leave: true })], { type: "application/json" });
      navigator.sendBeacon?.("/api/presence", payload);
    };

    const start = () => {
      if (timer) return;
      beat();
      timer = setInterval(beat, HEARTBEAT_MS);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    // Only count people who actually have the tab open.
    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else {
        stop();
        leave();
      }
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", leave);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", leave);
    };
  }, []);

  return (
    <AnimatePresence>
      {count !== null && count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-[#3a2418]/15 backdrop-blur-md text-[#3a2418] text-xs shadow-sm font-bold"
          aria-live="polite"
          title="People on this page right now"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          <span className="font-mono tabular-nums">{count.toLocaleString("en-US")}</span>
          <span>listening now</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
