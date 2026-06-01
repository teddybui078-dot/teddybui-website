import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";
import { sortedPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI tools, from the Meridian Labs studio.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <PageShell title="Blog" subtitle="Notes from the workshop floor.">
      <div className="border-t border-white/[0.08]">
        {sortedPosts.map((post, i) => (
          <Reveal key={post.slug} delay={0.04 * i}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-3 border-b border-white/[0.08] py-8 transition-colors hover:bg-white/[0.015] md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8 md:px-4"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                  {post.category}
                </span>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink-50 transition-colors group-hover:text-emerald-100 md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-400">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
                <span className="font-mono text-[11px] text-ink-500">{post.readingTime}</span>
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-300 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:bg-emerald-300/10 group-hover:text-emerald-200">
                  <ArrowUpRight
                    weight="bold"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
