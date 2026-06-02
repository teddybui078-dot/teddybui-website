"use client";

import { usePathname } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";

/**
 * Background for the inner (light) pages: a plain white page with a subtle dot
 * pattern. The immersive home provides its own video background, so this
 * renders nothing there.
 */
export function SiteBackground() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <BGPattern
        variant="dots"
        mask="fade-center"
        size={22}
        fill="rgba(10,13,16,0.13)"
        className="z-0"
      />
    </div>
  );
}
