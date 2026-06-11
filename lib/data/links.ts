export type Social = {
  platform: string;
  handle: string;
  href: string;
  /** Brand colour the icon disc tints to on hover. */
  brand: string;
};

/** The Links page is a social directory — where to find me. Swap handles/hrefs
 *  for the real accounts; kept in sync with the home page's social set. */
export const socials: Social[] = [
  {
    platform: "X / Twitter",
    handle: "@teddybui",
    href: "https://x.com",
    brand: "#000000",
  },
  {
    platform: "GitHub",
    handle: "teddybui078-dot",
    href: "https://github.com/teddybui078-dot",
    brand: "#181717",
  },
  {
    platform: "Instagram",
    handle: "@teddybui",
    href: "https://instagram.com",
    brand: "#E4405F",
  },
];
