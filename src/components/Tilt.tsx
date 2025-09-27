import React, { useRef } from "react";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number; // degrees
  scale?: number;
  glare?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const Tilt: React.FC<TiltProps> = ({
  maxTilt = 10,
  scale = 1.02,
  glare = false,
  className = "",
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    const tiltX = (py - 0.5) * -2 * maxTilt; // invert so up moves back
    const tiltY = (px - 0.5) * 2 * maxTilt;

    el.style.transform = `perspective(900px) rotateX(${clamp(tiltX, -maxTilt, maxTilt)}deg) rotateY(${clamp(tiltY, -maxTilt, maxTilt)}deg) scale(${scale})`;
    if (glare) {
      const glareEl = el.querySelector<HTMLElement>("[data-tilt-glare]");
      if (glareEl) {
        const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2));
        const deg = (angle * 180) / Math.PI + 180;
        glareEl.style.background = `linear-gradient(${deg}deg, rgba(255,255,255,0.35), rgba(255,255,255,0))`;
        glareEl.style.opacity = "0.25";
      }
    }
  };

  const handleLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glare) {
      const glareEl = el.querySelector<HTMLElement>("[data-tilt-glare]");
      if (glareEl) glareEl.style.opacity = "0";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-&lsqb;cubic-bezier(.2,.8,.2,1)&rsqb; will-change-transform ${className}`}
      {...rest}
    >
      {glare && (
        <div
          data-tilt-glare
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      )}
      {children}
    </div>
  );
};

export default Tilt;
