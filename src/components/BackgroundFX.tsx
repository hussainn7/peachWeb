import React, { useEffect, useRef } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))];
}

function rgb(value: [number, number, number]) {
  return `rgb(${value[0]} ${value[1]} ${value[2]})`;
}

function buildBackground(progress: number) {
  const t = clamp01(progress);

  const top = lerpRgb([8, 8, 12], [5, 7, 16], t);
  const mid = lerpRgb([12, 12, 16], [10, 12, 18], t);
  const bottom = lerpRgb([22, 12, 10], [28, 12, 10], t);

  const angle = lerp(180, 210, t);
  const peachAlpha = lerp(0.10, 0.18, t);
  const peachY = lerp(18, 65, t);

  return (
    `radial-gradient(900px circle at 18% ${peachY}%, rgba(255,159,122,${peachAlpha}), transparent 60%), ` +
    `linear-gradient(${angle}deg, ${rgb(top)} 0%, ${rgb(mid)} 55%, ${rgb(bottom)} 100%)`
  );
}

const BackgroundFX: React.FC = () => {
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastProgress = -1;

    const update = () => {
      rafId = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = clamp01(window.scrollY / maxScroll);
      if (Math.abs(progress - lastProgress) < 0.002) return;
      lastProgress = progress;

      const el = gradientRef.current;
      if (!el) return;
      el.style.background = buildBackground(progress);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={gradientRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,12,1) 0%, rgba(12,12,16,1) 55%, rgba(22,12,10,1) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
    </div>
  );
};

export default BackgroundFX;
