"use client";

import * as React from "react";
import {
  Telescope,
  PenLine,
  Coins,
  Library,
  Receipt,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Logo } from "@/components/layout/logo";
import { projects, type ProjectStatus } from "@/lib/data/projects";

/** Per-project orbital metadata: which icon, how "hot" the node glows, and the
 *  graph of connected projects surfaced when a node is expanded. Keyed by slug. */
const ORBIT_META: Record<
  string,
  { icon: LucideIcon; energy: number; relatedSlugs: string[] }
> = {
  lumen: { icon: Telescope, energy: 100, relatedSlugs: ["draft", "atlas"] },
  draft: { icon: PenLine, energy: 92, relatedSlugs: ["lumen"] },
  stipend: { icon: Coins, energy: 68, relatedSlugs: ["ledger", "signal"] },
  atlas: { icon: Library, energy: 60, relatedSlugs: ["lumen", "signal"] },
  ledger: { icon: Receipt, energy: 36, relatedSlugs: ["stipend", "signal"] },
  signal: { icon: LineChart, energy: 28, relatedSlugs: ["stipend", "atlas", "ledger"] },
};

const STATUS_MAP: Record<ProjectStatus, "completed" | "in-progress" | "pending"> = {
  Live: "completed",
  Beta: "in-progress",
  Building: "pending",
};

// Stable id per slug so relatedIds can be resolved from relatedSlugs.
const idForSlug = new Map(projects.map((p, i) => [p.slug, i + 1]));

const timelineData = projects.map((p, i) => {
  const meta = ORBIT_META[p.slug];
  return {
    id: i + 1,
    title: p.name,
    date: p.category,
    content: p.oneLiner,
    category: p.category,
    icon: meta.icon,
    relatedIds: meta.relatedSlugs.map((s) => idForSlug.get(s)!),
    status: STATUS_MAP[p.status],
    energy: meta.energy,
  };
});

export function Hero() {
  return (
    <RadialOrbitalTimeline
      timelineData={timelineData}
      centerLabel="Meridian Labs"
      centerContent={<Logo className="size-11 drop-shadow-[0_2px_10px_rgba(28,191,101,0.6)]" />}
    />
  );
}
