"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * A social link as a box with a circular brand disc inside. The disc tints to
 * the platform's brand colour on hover, while a mouse-tracked spotlight (stored
 * as --mx/--my custom props) lights the card and it lifts.
 */
export function SocialCard({
  platform,
  handle,
  href,
  brand,
  icon,
}: {
  platform: string;
  handle: string;
  href: string;
  brand: string;
  icon: React.ReactNode;
}) {
  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      style={{ "--brand": brand } as React.CSSProperties}
      className="group relative block overflow-hidden rounded-2xl border border-ink-950/[0.08] bg-card p-5 shadow-[0_1px_2px_rgba(22,18,13,0.05),0_12px_30px_-20px_rgba(22,18,13,0.18)] transition-all duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(22,18,13,0.06),0_26px_52px_-22px_rgba(22,18,13,0.3)]"
    >
      {/* mouse-tracked spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), rgba(22,18,13,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* circular brand disc */}
        <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-ink-950/[0.1] bg-cream [color:var(--brand)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[4px] rounded-full border border-[color:var(--brand)]/15 transition-colors duration-300 group-hover:border-[color:var(--brand)]/30"
          />
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-ink-950">
            {platform}
          </h3>
          <p className="truncate text-sm text-ink-500">{handle}</p>
        </div>

        <ArrowUpRight className="size-4 shrink-0 text-ink-400 transition-all duration-300 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-950" />
      </div>
    </a>
  );
}
