import React from "react";

const BackgroundFX: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base peach <> white gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--background)) 100%)",
        }}
      />
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      {/* Animated gradient blobs */}
      <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/.35),transparent_60%)] blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/.35),transparent_60%)] blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/4 w-[44rem] h-[44rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary-light)/.35),transparent_60%)] blur-3xl animate-blob animation-delay-4000"></div>

      {/* Top halo */}
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,.15),transparent)]" />
    </div>
  );
};

export default BackgroundFX;
