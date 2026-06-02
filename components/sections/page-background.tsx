import { BGPattern } from "@/components/ui/bg-pattern";

/**
 * Fixed full-page background for inner pages. Takes a CSS `background` value so
 * each route can vary the direction/shape of the green wash, over a shared
 * subtle dot pattern (cohesive with the home page).
 */
export function PageBackground({ gradient }: { gradient: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0" style={{ background: gradient }} />
      <BGPattern
        variant="dots"
        mask="fade-center"
        size={22}
        fill="rgba(10,13,16,0.13)"
        className="z-0"
      />
    </div>
  );
}
