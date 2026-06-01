"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Slow-drifting ambient orbs in emerald. Sits behind content with
 * pointer-events disabled. Pure CSS transforms — runs on the GPU.
 */
export function AmbientBackground({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "page";
}) {
  const isPage = variant === "page";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        isPage && "fixed",
        className,
      )}
    >
      <motion.div
        initial={{ x: "-10%", y: "-10%" }}
        animate={{ x: ["-10%", "12%", "-10%"], y: ["-8%", "6%", "-8%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-24 h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(151,221,94,0.18), rgba(151,221,94,0) 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        initial={{ x: "8%", y: "0%" }}
        animate={{ x: ["8%", "-10%", "8%"], y: ["0%", "12%", "0%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-15%] top-[8%] h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(116,199,66,0.13), rgba(116,199,66,0) 70%)",
          filter: "blur(70px)",
        }}
      />
      <motion.div
        initial={{ x: "0%", y: "0%" }}
        animate={{ x: ["0%", "8%", "-6%", "0%"], y: ["0%", "-8%", "10%", "0%"] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] bottom-[-20%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(67,138,34,0.16), rgba(67,138,34,0) 70%)",
          filter: "blur(80px)",
        }}
      />

      {isPage && (
        <motion.div
          initial={{ x: "-10%", y: "10%" }}
          animate={{ x: ["-10%", "10%", "-10%"], y: ["10%", "-12%", "10%"] }}
          transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] bottom-[-30%] h-[80vh] w-[80vh] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(151,221,94,0.08), rgba(151,221,94,0) 70%)",
            filter: "blur(90px)",
          }}
        />
      )}

      {/* Hairline drifting mesh */}
      <motion.div
        animate={{ backgroundPositionX: ["0px", "56px"], backgroundPositionY: ["0px", "56px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
