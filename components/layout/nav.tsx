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
          "flex items-center gap-1.5 rounded-full border border-white/10",
          "bg-ink-950 px-2.5 py-2",
          "shadow-[0_16px_44px_-14px_rgba(10,13,16,0.55),0_0_28px_-6px_rgba(28,191,101,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]",
        )}
      >
        <Link
          href="/"
          aria-label={site.name}
          className="flex size-8 items-center justify-center"
        >
          <Logo />
        </Link>

        <span className="mx-1 h-5 w-px bg-white/15" aria-hidden />

        <div className="flex items-center gap-0.5">
          {site.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-[13px] text-white transition-colors",
              )}
            >
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-inset ring-white/[0.12]"
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
