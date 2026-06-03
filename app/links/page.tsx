import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";
import { linkGroups, type LinkItem } from "@/lib/data/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Meridian Labs, and what we've made public.",
};

export default function LinksPage() {
  return (
    <PageShell title="Links" subtitle="Find us, and everything we keep in the open." maxWidthClass="max-w-[680px]">
      <ul className="divide-y divide-ink-950/[0.06] border-t border-ink-950/[0.06]">
        {linkGroups
          .flatMap((group) => group.items)
          .map((item, i) => (
            <Reveal key={item.label} delay={0.03 * i} as="li">
              <LinkRow item={item} />
            </Reveal>
          ))}
      </ul>
    </PageShell>
  );
}

function LinkRow({ item }: { item: LinkItem }) {
  const inner = (
    <span className="text-[15px] font-medium text-ink-900 transition-colors group-hover:text-emerald-600">
      {item.label}
    </span>
  );

  const className = "group flex items-center py-4 transition-colors";

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
