import * as React from "react";
import Link from "next/link";

/**
 * A circular social link: an icon disc that lifts and reveals its brand colour
 * on hover, with a label beneath. Pure-CSS hover, so it stays a server
 * component. `brand` is exposed as a `--brand` custom property the icon tints to.
 */
export function SocialBadge({
  label,
  href,
  icon,
  brand,
  external,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  brand?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="relative grid size-[68px] place-items-center rounded-full border border-ink-950/[0.1] bg-card text-ink-700 shadow-[0_1px_2px_rgba(22,18,13,0.05),0_12px_28px_-16px_rgba(22,18,13,0.28)] transition-all duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-1 group-hover:[color:var(--brand)] group-hover:shadow-[0_2px_4px_rgba(22,18,13,0.06),0_24px_46px_-18px_rgba(22,18,13,0.4)]">
        {/* concentric ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[5px] rounded-full border border-ink-950/[0.05] transition-colors duration-500 group-hover:border-[color:var(--brand)]/20"
        />
        {icon}
      </span>
      <span className="text-xs font-medium text-ink-500 transition-colors duration-300 group-hover:text-ink-950">
        {label}
      </span>
    </>
  );

  const className =
    "group flex w-20 flex-col items-center gap-3 text-center";
  const style = { "--brand": brand ?? "#16120d" } as React.CSSProperties;

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={className} style={style}>
      {content}
    </Link>
  );
}
