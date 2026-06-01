import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI tools we're building at Meridian Labs.",
};

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" subtitle="Cool stuff we're building.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={0.04 * i} />
        ))}
      </div>

      <p className="mt-20 text-center text-sm text-ink-600">More projects coming…</p>
    </PageShell>
  );
}
