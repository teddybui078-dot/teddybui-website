"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HubCard as HubCardData } from "@/lib/data/hub";

/**
 * A single hub tile. Double-bezel machined shell, hover-lift, and a
 * mouse-tracked radial spotlight stored as CSS custom props (--mx/--my) so the
 * gradient layer paints on the GPU without re-rendering React.
 */
export function HubCard({
  card,
  className,
  children,
}: {
  card: HubCardData;
  className?: string;
  /** Optional content slot rendered between the copy and the CTA — used to
   *  fill a tall featured card (e.g. a project preview list). */
  children?: React.ReactNode;
}) {
  const { title, description, href, cta, icon: Icon, external, featured, brand } = card;

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group block h-full"
    >
      <div
        onMouseMove={handleMouse}
        className={cn(
          "relative h-full rounded-[1.75rem] border border-ink-950/[0.08] bg-cream-deep/60 p-1.5",
          "shadow-[0_18px_40px_-26px_rgba(22,18,13,0.4)] transition-all duration-500 ease-[var(--ease-out-quint)]",
          "group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-28px_rgba(22,18,13,0.5)]",
          className,
        )}
      >
        {/* spotlight layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx) var(--my), rgba(22,18,13,0.07), transparent 60%)",
          }}
        />

        <div
          className={cn(
            "relative flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] border border-ink-950/[0.06] bg-card",
            featured ? "gap-5 p-7 sm:p-9" : "gap-4 p-6",
            featured && !children && "justify-center",
          )}
        >
          {/* icon tile */}
          <span
            className={cn(
              "grid place-items-center rounded-2xl border border-ink-950/[0.08] bg-cream",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
              featured ? "size-14" : "size-11",
            )}
          >
            <Icon
              className={cn(featured ? "size-7" : "size-[22px]")}
              style={brand ? { color: brand } : undefined}
              {...(!brand ? { strokeWidth: 1.6 } : {})}
            />
          </span>

          <div className={cn("flex flex-col", !featured && !children && "flex-1")}>
            <h3
              className={cn(
                "font-semibold tracking-[-0.02em] text-ink-950",
                featured ? "text-2xl sm:text-3xl" : "text-lg",
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-2 text-ink-500",
                featured ? "max-w-md text-[15px] leading-relaxed" : "text-sm leading-relaxed",
              )}
            >
              {description}
            </p>
          </div>

          {children && <div className="flex-1">{children}</div>}

          {/* CTA */}
          {featured ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink-950 py-2 pl-4 pr-2 text-[13px] font-semibold text-cream transition-colors duration-300 ease-[var(--ease-out-quint)] group-hover:bg-ink-800">
              {cta}
              <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5">
                <ArrowRight className="size-3" />
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors group-hover:text-ink-950">
              {cta}
              <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
