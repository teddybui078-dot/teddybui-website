"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const EASE = [0.23, 1, 0.32, 1] as const;

const ROTATING = ["students", "founders", "builders", "dreamers"];

const fade = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: 0.08 * i },
  }),
};

export function Hero() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[88vh] items-center px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* tag */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-300"
        >
          <span className="size-1.5 rounded-full bg-emerald-300 ambient-pulse" aria-hidden />
          Meridian Labs — AI Studio
        </motion.div>

        {/* animated headline */}
        <h1 className="mt-7 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink-50">
          <motion.span
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="block"
          >
            We build AI tools
          </motion.span>
          <motion.span
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="block"
          >
            for{" "}
            <span className="relative inline-grid align-baseline">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ROTATING[i]}
                  initial={{ y: "0.5em", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-0.5em", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="col-start-1 row-start-1 pr-2 text-emerald-300"
                >
                  {ROTATING[i]}.
                </motion.span>
              </AnimatePresence>
              {/* reserve width for the widest word so layout doesn't jump */}
              <span className="invisible col-start-1 row-start-1 pr-2" aria-hidden>
                founders.
              </span>
            </span>
          </motion.span>
        </h1>

        {/* subline + link */}
        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-[44ch] text-lg leading-relaxed text-ink-400"
        >
          A studio shipping practical software for the people building what&apos;s next.
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-100 transition-colors hover:text-emerald-300"
          >
            View projects
            <ArrowRight
              weight="bold"
              className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
