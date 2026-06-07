"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Reveal } from "@/components/ui/scroll-reveal";
import { HubCard } from "@/components/ui/hub-card";
import { sectionCards, socialCards } from "@/lib/data/hub";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

const EASE = [0.23, 1, 0.32, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, delay: 0.1 * i },
  }),
};

const [featuredCard, ...restSections] = sectionCards;
const projectPreview = projects.slice(0, 5);

export function Hub() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32 lg:px-10 lg:pt-36">
      {/* ── Hero band ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[1.6rem] border border-ink-950/[0.08] bg-cream-deep/60 p-1.5 shadow-[0_18px_44px_-26px_rgba(22,18,13,0.45)]"
        >
          <Image
            src="/gitpfp.png"
            alt="Teddy Bui"
            width={1446}
            height={1936}
            priority
            className="size-20 rounded-[calc(1.6rem-0.375rem)] object-cover sm:size-24"
          />
        </motion.div>

        {/* semantic heading; the visual headline is the typewriter */}
        <h1 className="sr-only">Building aspiring AI projects.</h1>
        <div className="mt-8">
          <TypewriterEffect
            words={[
              { text: "Building" },
              { text: "aspiring", className: "italic font-serif tracking-tight" },
              { text: "AI" },
              { text: "projects." },
            ]}
            className="whitespace-nowrap text-[clamp(2.1rem,6vw,4.25rem)] font-semibold leading-[1.0] tracking-[-0.04em]"
            cursorClassName="bg-emerald-500 h-7 md:h-9 lg:h-11"
          />
        </div>

        <motion.p
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500"
        >
          {site.description}
        </motion.p>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 flex items-center gap-2"
        >
          {socialCards.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.title}
              className="grid size-10 place-items-center rounded-full border border-ink-950/[0.08] bg-card text-ink-600 transition-all duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:text-ink-950 hover:shadow-[0_10px_22px_-12px_rgba(22,18,13,0.45)]"
            >
              <s.icon className="size-[18px]" />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── Card grid hub ─────────────────────────────────────────── */}
      <div className="mt-12 lg:mt-14">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="h-full lg:col-span-2 lg:row-span-2">
            <HubCard card={featuredCard} className="h-full">
              <ul className="divide-y divide-ink-950/[0.07] border-y border-ink-950/[0.07]">
                {projectPreview.map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-[15px] font-medium tracking-tight text-ink-900">
                      {p.name}
                    </span>
                    <span className="shrink-0 text-xs text-ink-400">
                      {p.category}
                    </span>
                  </li>
                ))}
              </ul>
            </HubCard>
          </Reveal>
          {restSections.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * (i + 1)} className="h-full">
              <HubCard card={card} className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {socialCards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 * i} className="h-full">
              <HubCard card={card} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
