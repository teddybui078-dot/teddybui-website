"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * A boxed link: an icon tile, label, and description inside a card that lifts
 * and lights a mouse-tracked spotlight on hover. The cursor position is stored
 * as CSS custom props (--mx/--my) so the glow paints on the GPU.
 */
export function LinkCard({
  label,
  description,
  href,
  icon,
  external,
}: {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const content = (
    <>
      {/* mouse-tracked spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), rgba(22,18,13,0.06), transparent 60%)",
        }}
      />
      <div className="relative z-10 flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink-950/[0.08] bg-cream text-ink-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors duration-300 group-hover:text-ink-950">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink-950">
              {label}
            </h3>
            <ArrowUpRight className="size-4 shrink-0 text-ink-400 transition-all duration-300 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-950" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-500">{description}</p>
        </div>
      </div>
    </>
  );

  const className =
    "group relative block overflow-hidden rounded-2xl border border-ink-950/[0.08] bg-card p-5 shadow-[0_1px_2px_rgba(22,18,13,0.05),0_12px_30px_-20px_rgba(22,18,13,0.18)] transition-all duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(22,18,13,0.06),0_26px_52px_-22px_rgba(22,18,13,0.3)]";

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={href} onMouseMove={handleMouse} className={className}>
      {content}
    </Link>
  );
}
