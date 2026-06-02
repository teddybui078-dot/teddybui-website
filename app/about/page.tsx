import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "About",
  description: "How Meridian Labs works — a studio, not a startup.",
};

const INTRO = [
  "I build practical AI tools for the people racing a deadline — students and founders. I care about software that quietly removes friction, and I spend my time building, shipping, and talking shop with other builders.",
  "Meridian Labs is the studio behind that work. Since 2024 it's been a place to launch many small, sharp tools and let the good ones compound — everything built to be fast, private, and genuinely useful.",
];

export default function AboutPage() {
  return (
    <PageShell title="About" maxWidthClass="max-w-[680px]">
      <div className="space-y-6">
        {INTRO.map((para, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <p className="text-lg leading-relaxed text-ink-700">{para}</p>
          </Reveal>
        ))}

        {/* macOS-window photo card */}
        <Reveal delay={0.12}>
          <figure className="mt-10 max-w-[380px] overflow-hidden rounded-2xl border border-ink-950/10 bg-ink-950 shadow-[0_30px_70px_-30px_rgba(10,13,16,0.5)]">
            <figcaption className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs font-medium text-white/70">Meridian</span>
              <div className="flex justify-end">
                <Logo className="size-4" />
              </div>
            </figcaption>
            {/* Placeholder — swap the src for a real photo of the founder */}
            <Image
              src="https://picsum.photos/seed/meridian-about/720/860"
              alt="The person behind Meridian Labs"
              width={720}
              height={860}
              priority
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </PageShell>
  );
}
