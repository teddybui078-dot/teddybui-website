import { BackgroundVideo } from "@/components/home/background-video";
import { HeroNav } from "@/components/home/hero-nav";
import { HeroContent } from "@/components/home/hero-content";

// Placeholder clip — swap for a Meridian Labs video when ready.
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

export default function HomePage() {
  return (
    <>
      <BackgroundVideo src={VIDEO_SRC} />
      <HeroNav />
      <HeroContent />
    </>
  );
}
