import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SiteBackground } from "@/components/sections/site-background";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="relative min-h-full bg-white text-ink-950 selection:bg-emerald-400 selection:text-white">
        <Nav />
        <main className="relative z-10">
          <SiteBackground />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
