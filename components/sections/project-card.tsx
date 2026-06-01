import * as React from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col"
      >
        {/* glowing preview */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/60">
          <div className="flex items-center gap-1.5 px-4 pt-4">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </div>

          <div className="relative grid h-44 place-items-center">
            {/* warm-green glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 120%, rgba(151,221,94,0.40), rgba(151,221,94,0) 60%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 120%, rgba(151,221,94,0.30), rgba(151,221,94,0) 55%)",
              }}
            />
            <span className="relative grid size-14 place-items-center rounded-2xl border border-white/10 bg-ink-950/70 text-2xl font-semibold tracking-tight text-emerald-200 shadow-[0_8px_30px_-10px_rgba(151,221,94,0.5)]">
              {project.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* name + one-liner */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink-50">
              {project.name}
            </h3>
            <ArrowUpRight
              weight="bold"
              className={cn(
                "size-3.5 text-ink-400 transition-all duration-300 ease-[var(--ease-out-quint)]",
                "opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-emerald-300",
              )}
            />
          </div>
          <p className="mt-1 text-sm text-ink-400">{project.oneLiner}</p>
        </div>
      </a>
    </Reveal>
  );
}
