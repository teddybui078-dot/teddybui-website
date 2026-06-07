import {
  LayoutGrid,
  UserCircle,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { FaXTwitter, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

/**
 * The personal-hub card grid on the home page — modelled on liamottley.com's
 * "portfolio of things" layout, but pointing only at real surfaces.
 *
 * `section` cards link inward to pages; `social` cards link out. Featured cards
 * span wide on desktop.
 */
export type HubCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon | IconType;
  external?: boolean;
  featured?: boolean;
  /** Brand colour for social marks; section icons stay in-palette. */
  brand?: string;
};

/** Inward links — the actual pages of the site. */
export const sectionCards: HubCard[] = [
  {
    title: "Projects",
    description:
      "The small, sharp AI tools I'm building for students and founders.",
    href: "/projects",
    cta: "View projects",
    icon: LayoutGrid,
    featured: true,
  },
  {
    title: "About",
    description: "Who I am, how I work, and what I'm trying to build.",
    href: "/about",
    cta: "Read more",
    icon: UserCircle,
  },
  {
    title: "Writing",
    description: "Build logs, notes, and what I'm learning in public.",
    href: "/blog",
    cta: "Read the blog",
    icon: PenLine,
  },
];

/** Outward links — find me elsewhere. Swap the hrefs for real handles. */
export const socialCards: HubCard[] = [
  {
    title: "X / Twitter",
    description: "Day-to-day building.",
    href: "https://x.com",
    cta: "Follow",
    icon: FaXTwitter,
    external: true,
    brand: "#000000",
  },
  {
    title: "GitHub",
    description: "Open-source pieces.",
    href: "https://github.com",
    cta: "View code",
    icon: FaGithub,
    external: true,
    brand: "#181717",
  },
  {
    title: "Instagram",
    description: "Behind the scenes.",
    href: "https://instagram.com",
    cta: "Follow",
    icon: FaInstagram,
    external: true,
    brand: "#E4405F",
  },
  {
    title: "YouTube",
    description: "Build logs & demos.",
    href: "https://youtube.com",
    cta: "Subscribe",
    icon: FaYoutube,
    external: true,
    brand: "#FF0000",
  },
];
