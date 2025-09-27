import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

const float = {
  initial: { y: 0, opacity: 0 },
  animate: (delay: number) => ({
    y: [0, -10, 0],
    opacity: 1,
    transition: {
      duration: 6,
      repeat: Infinity,
      delay,
    },
  }),
};

const Hero = () => {
  const bgStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(180deg, rgba(7,7,10,0.55) 0%, rgba(7,7,10,0.65) 30%, rgba(7,7,10,0.8) 100%), url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={bgStyle} />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(800px 400px at 10% 20%, rgba(255,176,103,0.35), transparent 60%), radial-gradient(800px 400px at 90% 30%, rgba(255,239,199,0.25), transparent 60%), radial-gradient(700px 350px at 50% 80%, rgba(255,140,94,0.3), transparent 60%)",
        }}
      />

      

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pt-28 pb-16 md:pt-32">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-xs font-medium tracking-wide text-white/80">
              Free • Beginner‑friendly • In‑person
            </p>
          </div>

          <h1 className="font-bold leading-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
              FROM GEORGIA,
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 bg-clip-text text-transparent drop-shadow-sm font-black tracking-tight">
              TO THE WORLD.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/85">
            Georgia's sweetest high‑school hackathon — 24 hours of building, learning,
            and friendly competition in the heart of the Peach State.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold shadow-lg hover:shadow-xl" asChild>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLql9wxVoGHg3zOdDFhA1pZpny6IGjp_230U4bbQtd0-QF-g/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                Register for Free
              </a>
            </Button>
            <Button
  size="lg"
  className="text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold shadow-lg hover:shadow-xl border-2 border-white bg-white/90 text-primary hover:bg-white transition-all duration-300"
>
  Learn More
</Button>

          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            {[{k:"Hours", v:"8"}, {k:"Students", v:"70+"}, {k:"Prizes", v:"Very Valuable"}].map((s, i) => (
              <div key={s.k} className={`flex flex-col items-center py-5 ${i!==2 ? 'border-r border-white/10' : ''}`}>
                <div className="text-3xl sm:text-4xl font-bold text-white">{s.v}</div>
                <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wide text-white/70">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 flex items-center">
          <div className="relative mx-auto grid w-full max-w-md gap-4">
            <Card className="bg-white/10 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-white/80">Hosted by</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Peach State Innovations</h3>
                <p className="mt-2 text-sm text-white/70">
                  Learn from mentors, meet new teammates, and ship something you’re proud of.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 border-white/10 backdrop-blur-xl">
                <CardContent className="p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">When</p>
                  <p className="mt-1 text-white font-medium">Oct 15, 2025</p>
                  <p className="text-white/70 text-sm">8‑hour sprint</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/10 backdrop-blur-xl">
                <CardContent className="p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">Where</p>
                  <p className="mt-1 text-white font-medium">Cumming, GA</p>
                  <p className="text-white/70 text-sm">On‑site venue</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/10 border-white/10 backdrop-blur-xl">
              <CardContent className="p-4">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/85">
                  <li>✔ Free admission</li>
                  <li>✔ Food</li>
                  <li>✔ Team matching</li>
                  <li>✔ Beginner tracks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex items-center gap-3 text-white/70 text-xs">
          <span className="hidden sm:inline">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <motion.div
              className="h-2 w-1 rounded-full bg-white/60"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
