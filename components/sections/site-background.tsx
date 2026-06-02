"use client";

import { usePathname } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";

/**
 * Single site-wide background (rendered once in the root layout). The green
 * gradient only shows on the home page; every other route gets a plain white
 * background with the same subtle dot pattern. Fixed behind all content.
 */
export function SiteBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {isHome && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f1fcf6 32%, rgba(28,191,101,0.22) 72%, rgba(28,191,101,0.42) 100%)",
          }}
        />
      )}
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
