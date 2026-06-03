import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
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
import { Logo } from "@/components/layout/logo";
import { linkGroups, type LinkItem } from "@/lib/data/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Meridian Labs, and what we've made public.",
};

// A little logo in front of each link, keyed by label. Brand marks keep their
// brand colour; generic links use neutral line icons that tint on hover.
const ICONS: Record<string, ReactNode> = {
  "All projects": <LayoutGrid className="size-[18px]" />,
  "About Meridian": <Logo className="size-[18px]" />,
  Changelog: <ScrollText className="size-[18px]" />,
  "X / Twitter": <FaXTwitter className="size-[18px]" style={{ color: "#000000" }} />,
  GitHub: <FaGithub className="size-[18px]" style={{ color: "#181717" }} />,
  LinkedIn: <FaLinkedin className="size-[18px]" style={{ color: "#0A66C2" }} />,
  YouTube: <FaYoutube className="size-[18px]" style={{ color: "#FF0000" }} />,
  "Brand kit": <Palette className="size-[18px]" />,
  Press: <Newspaper className="size-[18px]" />,
  Careers: <Briefcase className="size-[18px]" />,
  Contact: <Mail className="size-[18px]" />,
};

export default function LinksPage() {
  return (
    <PageShell
      title="Links"
      subtitle="Find us, and everything we keep in the open."
      maxWidthClass="max-w-[680px]"
    >
      <ul className="divide-y divide-ink-950/[0.06] border-t border-ink-950/[0.06]">
        {linkGroups
          .flatMap((group) => group.items)
          .map((item, i) => (
            <Reveal key={item.label} delay={0.03 * i} as="li">
              <LinkRow item={item} icon={ICONS[item.label]} />
            </Reveal>
          ))}
      </ul>
    </PageShell>
  );
}

function LinkRow({ item, icon }: { item: LinkItem; icon?: ReactNode }) {
  const inner = (
    <>
      <span className="flex w-5 shrink-0 items-center justify-center text-ink-400 transition-colors group-hover:text-emerald-600">
        {icon}
      </span>
      <span className="text-[15px] font-medium text-ink-900 transition-colors group-hover:text-emerald-600">
        {item.label}
      </span>
    </>
  );

  const className = "group flex items-center gap-3 py-4 transition-colors";

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}
