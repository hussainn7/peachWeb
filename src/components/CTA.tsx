import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Gift, Zap } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import Tilt from "@/components/Tilt";

const CTA = () => {
  return (
    <section className="relative py-24 text-white">

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-6xl text-center">
          <ScrollAnimation>
            <h2 className="relative z-10 mb-6 text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Ready to Build Something
              <br />
              <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={150}>
            <p className="mx-auto mb-14 max-w-4xl text-lg md:text-2xl text-white/90 leading-relaxed">
              Join hundreds of Georgia’s brightest high-school students for 8 hours of
              coding, creativity, and competition. Your next great idea starts here.
            </p>
          </ScrollAnimation>

          {/* Benefits Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Free to Join",
                description: "No registration fees — just bring your laptop and enthusiasm!",
                shineFrom: "rgba(255,176,103,.25)",
                shineTo: "rgba(255, 255, 255, 0.18)",
              },
              {
                icon: Gift,
                title: "Amazing Prizes",
                description: "Valuable prizes including cash, tech gear, and exclusive opportunities.",
                shineFrom: "rgba(255,210,150,.25)",
                shineTo: "rgba(255,176,103,.20)",
              },
              {
                icon: Zap,
                title: "Learn & Grow",
                description: "Workshops, mentorship, and hands-on experience with the latest tech.",
                shineFrom: "rgba(255,239,199,.22)",
                shineTo: "rgba(255,176,103,.18)",
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollAnimation key={b.title} delay={250 + i * 120}>
                  <Tilt glare className="block h-full">
                    <Card
                      className="
                        group relative h-full overflow-hidden
                        bg-white/8 border border-white/12 backdrop-blur-xl
                        shadow-[0_10px_28px_rgba(0,0,0,0.25)]
                        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)]
                      "
                    >
                      {/* moving diagonal shine */}
                      <div
                        aria-hidden
                        className="
                          pointer-events-none absolute -inset-1 opacity-0
                          group-hover:opacity-100 transition-opacity duration-300
                          [mask-image:linear-gradient(120deg,transparent,black_30%,black_70%,transparent)]
                          animate-[shine_2.2s_ease-in-out_infinite]
                        "
                        style={{
                          background: `linear-gradient(120deg, transparent, ${b.shineFrom}, ${b.shineTo}, transparent)`,
                        }}
                      />
                      <CardContent className="relative z-10 flex h-full flex-col items-center p-8 text-center">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-white/15 bg-white/10">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-xl font-semibold text-white">{b.title}</h3>
                        <p className="flex-1 text-sm text-white leading-relaxed">{b.description}</p>
                      </CardContent>
                    </Card>
                  </Tilt>
                </ScrollAnimation>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <ScrollAnimation delay={600}>
            <div className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              {/* Primary with slide shine */}
              <Button
                size="lg"
                className="
                  relative h-12 md:h-14 px-10 md:px-12 font-semibold
                  shadow-lg hover:shadow-xl overflow-hidden group
                "
                asChild
              >
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLql9wxVoGHg3zOdDFhA1pZpny6IGjp_230U4bbQtd0-QF-g/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center">
                    Register Now — It’s Free!
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span
                    aria-hidden
                    className="
                      absolute inset-0 translate-x-[-120%]
                      bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)]
                      group-hover:translate-x-[120%] transition-transform duration-700
                    "
                  />
                </a>
              </Button>

              
            </div>
          </ScrollAnimation>

          {/* Urgency box with gentle pulse underline */}
          <ScrollAnimation delay={750}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/12 bg-white/8 p-7 text-center backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)] relative">
              <p className="mb-1 text-lg font-semibold text-white">
                Limited Spots Available!
              </p>
              <p className="text-white/85">
                Only 70 spots available. Register early to secure your place at Georgia’s sweetest hackathon.
              </p>
              {/* pulse bar */}
              <div className="pointer-events-none absolute left-1/2 top-full mt-3 h-[3px] w-32 -translate-x-1/2 rounded-full bg-[rgba(255,176,103,.6)] animate-[pulse_2.4s_ease-in-out_infinite]" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default CTA;
