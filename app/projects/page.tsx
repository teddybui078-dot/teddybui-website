import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { PageBackground } from "@/components/sections/page-background";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI tools we're building at Meridian Labs.",
};

// Green pooled at the top, spreading wide, fading down to white.
const PROJECTS_BG = [
  "radial-gradient(125% 62% at 50% -14%, rgba(28,191,101,0.46), transparent 60%)",
  "linear-gradient(180deg, rgba(28,191,101,0.16) 0%, rgba(28,191,101,0.04) 26%, #ffffff 56%, #ffffff 100%)",
].join(", ");

export default function ProjectsPage() {
  return (
    <>
      <PageBackground gradient={PROJECTS_BG} />
      <PageShell title="Projects" subtitle="Cool stuff we're building.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={0.04 * i} />
        ))}
      </div>

      <p className="mt-20 text-center text-sm text-ink-400">More projects coming…</p>
      </PageShell>
    </>
  );
}
