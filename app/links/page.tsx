import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  FaGithub,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa6";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/scroll-reveal";
import { SocialCard } from "@/components/ui/social-card";
import { socials } from "@/lib/data/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Where to find Teddy Bui around the internet.",
};

// Icons render with currentColor so the card controls the tint.
const ICONS: Record<string, ReactNode> = {
  "X / Twitter": <FaXTwitter className="size-[20px]" />,
  GitHub: <FaGithub className="size-[20px]" />,
  Instagram: <FaInstagram className="size-[20px]" />,
  YouTube: <FaYoutube className="size-[20px]" />,
  TikTok: <FaTiktok className="size-[20px]" />,
  LinkedIn: <FaLinkedin className="size-[20px]" />,
  Discord: <FaDiscord className="size-[20px]" />,
};

export default function LinksPage() {
  return (
    <PageShell
      title="Links"
      subtitle="Find me around the internet."
      maxWidthClass="max-w-[720px]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {socials.map((s, i) => (
          <Reveal key={s.platform} delay={0.05 * i}>
            <SocialCard
              platform={s.platform}
              handle={s.handle}
              href={s.href}
              brand={s.brand}
              icon={ICONS[s.platform]}
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
