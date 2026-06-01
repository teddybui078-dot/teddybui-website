import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "About",
  description: "How Meridian Labs works — a studio, not a startup.",
};

const NARRATIVE = [
  "Meridian Labs is a studio, not a startup. We launch many small things and let the good ones compound, rather than betting the company on a single roadmap.",
  "We build for two kinds of people: students racing a deadline and founders racing a runway. Different pressure, same need — software that removes friction at exactly the moment it would have cost you.",
  "Everything we ship runs as close to the user as possible. The draft you write never touches a server; the research you do stays yours. That constraint is what makes the products good.",
];

const VALUES = [
  ["Narrow on purpose", "One job, done well, with the work shown."],
  ["On-device by default", "Latency is a feature; privacy is a promise."],
  ["Design for 2am", "Built for the all-nighter, not the demo."],
  ["Ship, then sharpen", "Six sharp tools beat one bloated platform."],
];

export default function AboutPage() {
  return (
    <PageShell title="About" subtitle="A studio for the people who build.">
      <div className="max-w-[60ch] space-y-6">
        {NARRATIVE.map((para, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <p className="text-lg leading-relaxed text-ink-200">{para}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 max-w-[60ch] border-t border-white/[0.08] pt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
          What we believe
        </h2>
        <dl className="mt-6 space-y-5">
          {VALUES.map(([title, body], i) => (
            <Reveal key={title} delay={0.04 * i}>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="flex items-center gap-2 text-[15px] font-medium text-ink-50 sm:w-52 sm:shrink-0">
                  <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden />
                  {title}
                </dt>
                <dd className="text-[15px] text-ink-400">{body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </PageShell>
  );
}
