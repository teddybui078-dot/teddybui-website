import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaYoutube, FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import {
  LayoutGrid,
  ScrollText,
  Palette,
  Newspaper,
  Briefcase,
  Mail,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";
import { SocialBadge } from "@/components/ui/social-badge";
import { LinkCard } from "@/components/ui/link-card";
import { linkGroups } from "@/lib/data/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Meridian Labs, and what we've made public.",
};

// Icons render with currentColor so each surface controls its own tint.
const ICONS: Record<string, ReactNode> = {
  "All projects": <LayoutGrid className="size-[18px]" />,
  Changelog: <ScrollText className="size-[18px]" />,
  "X / Twitter": <FaXTwitter className="size-[22px]" />,
  GitHub: <FaGithub className="size-[22px]" />,
  LinkedIn: <FaLinkedin className="size-[22px]" />,
  YouTube: <FaYoutube className="size-[22px]" />,
  "Brand kit": <Palette className="size-[18px]" />,
  Press: <Newspaper className="size-[18px]" />,
  Careers: <Briefcase className="size-[18px]" />,
  Contact: <Mail className="size-[18px]" />,
};

// Brand colours the social discs tint to on hover.
const BRAND: Record<string, string> = {
  "X / Twitter": "#000000",
  GitHub: "#181717",
  LinkedIn: "#0A66C2",
  YouTube: "#FF0000",
};

const groupBy = (title: string) =>
  linkGroups.find((g) => g.title === title);

const social = groupBy("Social");
const boxGroups = linkGroups.filter((g) => g.title !== "Social");

function SectionHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-950">
        {title}
      </h2>
      <span className="h-px flex-1 bg-ink-950/[0.08]" />
      <span className="text-xs text-ink-400">{hint}</span>
    </div>
  );
}

export default function LinksPage() {
  return (
    <PageShell
      title="Links"
      subtitle="Find us, and everything we keep in the open."
      maxWidthClass="max-w-[860px]"
    >
      {/* Social — circular discs */}
      {social && (
        <section>
          <SectionHeading title={social.title} hint={social.hint} />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-7 rounded-3xl border border-ink-950/[0.07] bg-card/50 px-6 py-9 sm:justify-start sm:gap-x-9">
            {social.items.map((item, i) => (
              <Reveal key={item.label} delay={0.04 * i}>
                <SocialBadge
                  label={item.label}
                  href={item.href}
                  icon={ICONS[item.label]}
                  brand={BRAND[item.label]}
                  external={item.external}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Studio + Resources — boxed cards */}
      {boxGroups.map((group) => (
        <section key={group.title} className="mt-14">
          <SectionHeading title={group.title} hint={group.hint} />
          <div className="grid gap-4 sm:grid-cols-2">
            {group.items.map((item, i) => (
              <Reveal key={item.label} delay={0.04 * i}>
                <LinkCard
                  label={item.label}
                  description={item.description}
                  href={item.href}
                  icon={ICONS[item.label]}
                  external={item.external}
                />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
