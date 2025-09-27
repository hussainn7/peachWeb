import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Lightbulb, Code, Trophy } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import Tilt from "@/components/Tilt";

const steps = [
  { step: 1, title: "Register", description: "Sign up individually or with your team. Registration is completely free and open to all Georgia high school students.", icon: Users },
  { step: 2, title: "Get Updates", description: "Join our Discord and follow us on social media for important updates, workshop announcements, and community discussions.", icon: Mail },
  { step: 3, title: "Learn & Ideate", description: "Attend our pre-hackathon workshops, brainstorm ideas, and start planning your project with your team.", icon: Lightbulb },
  { step: 4, title: "Build Your Project", description: "Code for 24 hours straight! Build websites, mobile apps, games, or any creative digital solution you can imagine.", icon: Code },
  { step: 5, title: "Present & Win", description: "Present your project to judges, compete for prizes, and celebrate your achievements with the community.", icon: Trophy },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 text-white overflow-hidden">
      {/* bridge from previous section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-[linear-gradient(to_bottom,rgba(8,8,12,1),rgba(8,8,12,0))]"
      />

      {/* dark base with animated peach aura */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,12,16,0.96) 0%, rgba(12,12,16,0.94) 40%, rgba(12,12,16,0.90) 100%), radial-gradient(900px 420px at 15% 20%, rgba(255,176,103,0.12), transparent 60%), radial-gradient(780px 360px at 85% 30%, rgba(255,239,199,0.10), transparent 60%)",
        }}
      />

      {/* conic ring aura behind title */}
      <div
        aria-hidden
        className="
          absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full
          opacity-35 blur-3xl
          bg-[conic-gradient(from_0deg,rgba(255,176,103,.18),transparent_30%,transparent_70%,rgba(255,239,199,.18))]
          animate-[spin_16s_linear_infinite]
          motion-reduce:animate-none
        "
      />

      {/* drifting sparkles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(2px_2px_at_20%_30%,rgba(255,255,255,.16),transparent),radial-gradient(2px_2px_at_70%_60%,rgba(255,255,255,.10),transparent)] animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
      />

      <div className="container relative z-10 mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              How It{" "}
              <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              From registration to celebration, here’s your journey at PeachState Hacks.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-7xl mx-auto">
          {/* Equal-height tiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 items-stretch auto-rows-fr">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <ScrollAnimation key={step.step} delay={index * 100}>
                  <Tilt className="relative block h-full" glare>
                    <Card
                      className="
                        group relative h-full overflow-hidden
                        bg-white/8 border border-white/12 backdrop-blur-xl
                        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(0,0,0,0.32)]
                        focus-within:ring-2 focus-within:ring-[rgba(255,159,122,0.55)]
                      "
                    >
                      {/* glow ring */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-px rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 [mask:linear-gradient(white,transparent)]"
                        style={{
                          background:
                            "conic-gradient(from 180deg at 50% 50%, rgba(255,176,103,0.25), transparent 30%, transparent 70%, rgba(255,239,199,0.22))",
                        }}
                      />

                      {/* hover shine sweep */}
                      <div
                        aria-hidden
                        className="
                          pointer-events-none absolute -inset-1 opacity-0
                          group-hover:opacity-100 transition-opacity duration-300
                          [mask-image:linear-gradient(120deg,transparent,black_30%,black_70%,transparent)]
                          animate-[shine_2.2s_ease-in-out_infinite]
                          motion-reduce:animate-none
                        "
                        style={{
                          background:
                            "linear-gradient(120deg, transparent, rgba(255,176,103,.28), rgba(255,239,199,.18), transparent)",
                        }}
                      />

                      <CardContent className="relative z-10 flex h-full flex-col items-center p-7 text-center">
                        {/* Step badge (glassy + pulse) */}
                        <div
                          className="
                            mb-4 mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full
                            bg-white/14 ring-1 ring-white/25 backdrop-blur-md text-white font-bold
                            shadow-[0_6px_18px_rgba(0,0,0,0.28)]
                            animate-[badgePulse_3.2s_ease-in-out_infinite]
                            motion-reduce:animate-none
                          "
                          aria-hidden
                        >
                          {step.step}
                        </div>

                        {/* Icon with subtle float */}
                        <div className="mb-5">
                          <div
                            className="
                              flex h-20 w-20 items-center justify-center rounded-2xl
                              bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/15
                              transition-transform duration-500
                              group-hover:translate-y-[-4px]
                              motion-reduce:transition-none
                            "
                          >
                            <IconComponent className="h-10 w-10 text-white/90" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                          {step.title}
                        </h3>
                        <p className="text-white/85 leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Tilt>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>

        <ScrollAnimation delay={600}>
          <div className="text-center mt-14 md:mt-16">
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Ready to start your hackathon journey?
            </p>
            <Button className="h-12 md:h-14 px-8 md:px-10 font-semibold shadow-lg hover:shadow-xl relative overflow-hidden group" asChild>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLql9wxVoGHg3zOdDFhA1pZpny6IGjp_230U4bbQtd0-QF-g/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Register Today</span>
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] group-hover:translate-x-[120%] transition-transform duration-700"
                />
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default HowItWorks;
