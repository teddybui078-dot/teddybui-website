import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Meridian mark — an angular "M" of twin peaks with a rising circuit-step leg. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/meridianlabs-logo.png"
      alt="Meridian Labs"
      width={88}
      height={88}
      priority
      className={cn("size-[22px] object-contain", className)}
    />
  );
}
