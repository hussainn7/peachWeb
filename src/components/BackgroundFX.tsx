import React, { useEffect, useRef } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type PeachSpec = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  opacity: number;
  blurPx: number;
  rotateDeg: number;
  speed: number;
  spin: number;
};

const PEACHES: PeachSpec[] = [
  { id: "p1", leftPct: 6, topPct: 14, size: 46, opacity: 0.24, blurPx: 0.2, rotateDeg: -12, speed: 0.55, spin: 1.15 },
  { id: "p2", leftPct: 12, topPct: 62, size: 30, opacity: 0.22, blurPx: 0.6, rotateDeg: 8, speed: 0.75, spin: 1.7 },
  { id: "p3", leftPct: 18, topPct: 32, size: 22, opacity: 0.18, blurPx: 1.2, rotateDeg: 18, speed: 0.95, spin: 2.35 },
  { id: "p4", leftPct: 24, topPct: 78, size: 44, opacity: 0.16, blurPx: 1.6, rotateDeg: -6, speed: 0.65, spin: 1.35 },
  { id: "p5", leftPct: 30, topPct: 18, size: 26, opacity: 0.2, blurPx: 0.8, rotateDeg: 14, speed: 0.9, spin: 2.05 },
  { id: "p6", leftPct: 36, topPct: 46, size: 54, opacity: 0.14, blurPx: 2.2, rotateDeg: -10, speed: 0.5, spin: 0.9 },
  { id: "p7", leftPct: 42, topPct: 70, size: 28, opacity: 0.2, blurPx: 0.9, rotateDeg: 6, speed: 0.85, spin: 1.55 },
  { id: "p8", leftPct: 48, topPct: 24, size: 36, opacity: 0.18, blurPx: 1.1, rotateDeg: -16, speed: 0.7, spin: 1.25 },
  { id: "p9", leftPct: 54, topPct: 56, size: 24, opacity: 0.16, blurPx: 1.4, rotateDeg: 10, speed: 1.0, spin: 2.6 },
  { id: "p10", leftPct: 60, topPct: 82, size: 32, opacity: 0.15, blurPx: 2.0, rotateDeg: -4, speed: 0.8, spin: 1.85 },
  { id: "p11", leftPct: 66, topPct: 40, size: 58, opacity: 0.12, blurPx: 2.6, rotateDeg: 12, speed: 0.45, spin: 0.7 },
  { id: "p12", leftPct: 72, topPct: 16, size: 28, opacity: 0.18, blurPx: 1.0, rotateDeg: -8, speed: 0.9, spin: 1.65 },
  { id: "p13", leftPct: 78, topPct: 66, size: 38, opacity: 0.14, blurPx: 2.3, rotateDeg: 20, speed: 0.6, spin: 1.1 },
  { id: "p14", leftPct: 84, topPct: 30, size: 22, opacity: 0.16, blurPx: 1.5, rotateDeg: -18, speed: 1.05, spin: 2.9 },
  { id: "p15", leftPct: 90, topPct: 74, size: 46, opacity: 0.12, blurPx: 2.8, rotateDeg: 4, speed: 0.55, spin: 0.95 },
  { id: "p16", leftPct: 94, topPct: 44, size: 30, opacity: 0.16, blurPx: 1.7, rotateDeg: -2, speed: 0.8, spin: 1.45 },
];

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

function PeachGlyph({ className }: { className?: string }) {
  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div
        className="absolute inset-0 rounded-[46%] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,0.25)]"
        style={{
          background:
            "radial-gradient(70% 70% at 35% 30%, rgba(255,255,255,0.55), transparent 55%), linear-gradient(135deg, rgba(253,186,116,0.95), rgba(251,146,60,0.85) 45%, rgba(244,63,94,0.55))",
        }}
      />
      <div
        className="absolute left-1/2 -top-[14%] h-[36%] w-[36%] -translate-x-1/2 rounded-[70%]"
        style={{
          transform: "translateX(-50%) rotate(-22deg)",
          background: "linear-gradient(135deg, rgba(110,231,183,0.9), rgba(16,185,129,0.75))",
          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
        }}
      />
      <div
        className="absolute left-1/2 top-[18%] h-[68%] w-px -translate-x-1/2 opacity-60"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.04))",
        }}
      />
    </div>
  );
}

const BackgroundFX: React.FC = () => {
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const peachElsRef = useRef<HTMLElement[] | null>(null);
  const measureRef = useRef<{ heroTop: number; whyEnd: number; measuredAt: number }>({
    heroTop: 0,
    whyEnd: 0,
    measuredAt: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastProgress = -1;
    let activeUntil = 0;
    let lastFrameTime = 0;
    let lastScrollY = window.scrollY;
    let smoothedVelocityPxPerSec = 0;
    let lastDir = 1;

    const measureAnchors = () => {
      const heroEl = document.getElementById("hero");
      const whyEndEl = document.getElementById("why-end") ?? document.getElementById("about");

      const heroTop = heroEl ? heroEl.getBoundingClientRect().top + window.scrollY : 0;
      const whyEnd = whyEndEl ? whyEndEl.getBoundingClientRect().bottom + window.scrollY : 0;

      measureRef.current = { heroTop, whyEnd, measuredAt: performance.now() };
    };

    const update = (frameTime: number) => {
      const now = frameTime || performance.now();
      rafId = 0;

      const dtMs = Math.max(1, lastFrameTime ? now - lastFrameTime : 16);
      const dtSec = dtMs / 1000;
      lastFrameTime = now;

      if (!measureRef.current.measuredAt || now - measureRef.current.measuredAt > 750) {
        measureAnchors();
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = clamp01(window.scrollY / maxScroll);

      const el = gradientRef.current;
      if (el && Math.abs(progress - lastProgress) >= 0.002) {
        lastProgress = progress;
        el.style.background = buildBackground(progress);
      }

      const peachEls = peachElsRef.current;
      if (!peachEls?.length) return;

      const scrollY = window.scrollY;
      const velocityPxPerSec = ((scrollY - lastScrollY) / dtMs) * 1000;
      lastScrollY = scrollY;
      if (Math.abs(velocityPxPerSec) > 1) lastDir = Math.sign(velocityPxPerSec);

      smoothedVelocityPxPerSec = lerp(smoothedVelocityPxPerSec, velocityPxPerSec, 0.25);
      smoothedVelocityPxPerSec = lerp(smoothedVelocityPxPerSec, 0, 0.08);

      const velocityUnit = Math.min(1, Math.abs(smoothedVelocityPxPerSec) / 1800);
      const spinBaseDegPerSec = Math.pow(velocityUnit, 1.65) * 2160;

      const { heroTop, whyEnd } = measureRef.current;
      const end = whyEnd > heroTop ? whyEnd : heroTop + maxScroll * 0.45;
      const range = Math.max(1, end - heroTop);
      const d = window.scrollY - heroTop;

      let t = 0;
      if (d <= 0) t = 0;
      else if (d < range) t = d / range;
      else if (d < 2 * range) t = (2 * range - d) / range;
      else t = 0;

      const maxShift = Math.min(420, window.innerHeight * 0.75);
      const shift = t * maxShift;

      for (const peachEl of peachEls) {
        const speed = Number(peachEl.dataset.speed ?? "1");
        const baseRotateDeg = Number(peachEl.dataset.rotate ?? "0");
        const spin = Number(peachEl.dataset.spin ?? "1");
        const currentAngle = Number(peachEl.dataset.angle ?? "0");
        const nextAngle = currentAngle + spinBaseDegPerSec * spin * dtSec * (lastDir || 1);
        peachEl.dataset.angle = String(nextAngle);
        peachEl.style.transform = `translate3d(0, ${shift * speed}px, 0) rotate(${baseRotateDeg + nextAngle}deg)`;
      }

      if (now < activeUntil || spinBaseDegPerSec > 4) schedule();
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const activate = () => {
      activeUntil = performance.now() + 600;
      schedule();
    };

    peachElsRef.current = Array.from(document.querySelectorAll<HTMLElement>("[data-peach-fx='true']"));
    for (const peachEl of peachElsRef.current) peachEl.dataset.angle = "0";
    measureAnchors();

    activate();
    const onResize = () => {
      measureAnchors();
      activate();
    };

    window.addEventListener("scroll", activate, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", activate);
      window.removeEventListener("resize", onResize);
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
      <div className="absolute inset-0">
        {PEACHES.map((peach) => (
          <div
            key={peach.id}
            data-peach-fx="true"
            data-speed={peach.speed}
            data-rotate={peach.rotateDeg}
            data-spin={peach.spin}
            className="absolute will-change-transform"
            style={{
              left: `${peach.leftPct}%`,
              top: `${peach.topPct}%`,
              width: peach.size,
              height: peach.size,
              opacity: peach.opacity,
              filter: `blur(${peach.blurPx}px)`,
              transform: `rotate(${peach.rotateDeg}deg)`,
            }}
          >
            <PeachGlyph className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
    </div>
  );
};

export default BackgroundFX;
