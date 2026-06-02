import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/scroll-reveal";
import { posts, getPost } from "@/lib/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-[720px] px-6 pb-24 pt-36 md:pt-44">
      <Reveal>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400 transition-colors hover:text-ink-900"
        >
          <ArrowLeft
            weight="bold"
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          All notes
        </Link>
      </Reveal>

      <header className="mt-8 border-b border-ink-950/[0.08] pb-10">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
            <span className="text-emerald-600">{post.category}</span>
            <span className="text-ink-300">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-ink-300">·</span>
            <span>{post.readingTime}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink-950">
            {post.title}
          </h1>
        </Reveal>
      </header>

      <div className="mt-10 space-y-6">
        {post.body.map((para, i) => (
          <Reveal key={i} delay={0.03 * i}>
            <p className="text-[17px] leading-[1.75] text-ink-700">{para}</p>
          </Reveal>
        ))}
      </div>

      <footer className="mt-16 border-t border-ink-950/[0.08] pt-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-ink-950"
        >
          <ArrowLeft
            weight="bold"
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to all notes
        </Link>
      </footer>
    </article>
  );
}
