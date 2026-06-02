import * as React from "react";
import { Reveal } from "@/components/ui/scroll-reveal";

/**
 * Minimal header for inner pages: a bold title and a small muted subtitle.
 * Body content is passed as children.
 */
export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 pb-28 pt-32 md:pt-40">
      <header>
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.05}>
            <p className="mt-2 text-sm text-ink-500 md:text-[15px]">{subtitle}</p>
          </Reveal>
        )}
      </header>
      <div className="mt-12 md:mt-16">{children}</div>
    </div>
  );
}
