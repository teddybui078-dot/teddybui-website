"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data/site";
import { Logo } from "./logo";

export function Nav() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <nav
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-ink-950/[0.07]",
          "bg-white/70 px-2.5 py-2 backdrop-blur-xl",
          "shadow-[0_12px_36px_-12px_rgba(10,13,16,0.18),0_0_26px_-8px_rgba(28,191,101,0.16),inset_0_1px_0_rgba(255,255,255,0.75)]",
        )}
      >
        <Link
          href="/"
          aria-label={site.name}
          className="flex size-8 items-center justify-center"
        >
          <Logo />
        </Link>

        <span className="mx-1 h-5 w-px bg-ink-950/10" aria-hidden />

        <div className="flex items-center gap-0.5">
          {site.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                isActive(l.href) ? "text-ink-950" : "text-ink-600 hover:text-ink-950",
              )}
            >
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-ink-950/[0.06] ring-1 ring-inset ring-ink-950/[0.07]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
