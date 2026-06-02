"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/data/site";
import { Logo } from "./logo";

export function Footer() {
  const pathname = usePathname();
  // The immersive home is a self-contained full screen — no footer.
  if (pathname === "/") return null;

  return (
    <footer className="relative z-10 mt-24 border-t border-ink-950/[0.07]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="size-5" />
          <span className="text-sm font-medium tracking-tight text-ink-800">
            {site.name}
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {site.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-500 transition-colors hover:text-ink-950"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-6 pb-10">
        <p className="text-[12px] text-ink-400">
          © {site.founded} {site.name}. Building cool stuff for builders.
        </p>
      </div>
    </footer>
  );
}
