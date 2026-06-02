"use client";

import * as React from "react";

const SENSITIVITY = 0.8;

/**
 * Full-screen background video that scrubs forward/backward with horizontal
 * mouse movement. Does not autoplay. Seeks are queued via `onSeeked` so we
 * never flood the decoder.
 */
export function BackgroundVideo({ src }: { src: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const targetTime = React.useRef(0);
  const prevX = React.useRef<number | null>(null);
  const seeking = React.useRef(false);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    function onMove(e: MouseEvent) {
      const v = ref.current;
      if (!v || !v.duration || Number.isNaN(v.duration)) return;
      if (prevX.current === null) {
        prevX.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;

      let t = targetTime.current + (delta / window.innerWidth) * SENSITIVITY * v.duration;
      t = Math.max(0, Math.min(v.duration, t));
      targetTime.current = t;

      if (!seeking.current) {
        seeking.current = true;
        v.currentTime = t;
      }
    }

    function onSeeked() {
      const v = ref.current;
      if (!v) return;
      // If the target moved while we were seeking, chase it; otherwise idle.
      if (Math.abs(v.currentTime - targetTime.current) > 0.01) {
        v.currentTime = targetTime.current;
      } else {
        seeking.current = false;
      }
    }

    window.addEventListener("mousemove", onMove);
    video.addEventListener("seeked", onSeeked);
    return () => {
      window.removeEventListener("mousemove", onMove);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: "70% center" }}
    />
  );
}
