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
  "Hi! My name is Teddy, and welcome to Meridian Labs, a studio where I launch cool AI projects. They're small, sharp tools for students and founders that quietly take the friction out of getting things done.",
  "I like building fast, shipping often, and using AI. Everything here is made to be quick, private, and genuinely useful, and the experiments that work are the ones I keep.",
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
          <figure className="mt-10 max-w-[380px] overflow-hidden rounded-2xl border border-ink-950/10 bg-ink-950 shadow-[0_30px_70px_-30px_rgba(22,18,13,0.5)]">
            <figcaption className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs font-medium text-cream/70">Teddy</span>
              <div className="flex justify-end">
                <Logo className="h-3 w-auto text-cream" />
              </div>
            </figcaption>
            <Image
              src="/gitpfp.png"
              alt="Teddy Bui"
              width={1446}
              height={1936}
              priority
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </PageShell>
  );
}
