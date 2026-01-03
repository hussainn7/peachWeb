import { Card, CardContent } from "@/components/ui/card";
import ScrollAnimation from "@/components/ScrollAnimation";
import Tilt from "@/components/Tilt";
import { ShieldCheck, Cpu, Sparkles } from "lucide-react";

const policies = [
  {
    title: "Software-first projects",
    description: "Build web, mobile, or other software — no hardware builds or microcontrollers for this event.",
    icon: Cpu,
  },
  {
    title: "AI as a helper",
    description: "Use AI to debug, review code, brainstorm, or speed up tasks, but not to generate full apps or complete codebases.",
    icon: Sparkles,
  },
  {
    title: "Fair play",
    description: "Bring your own work, cite what you reuse, and keep your submissions honest and transparent.",
    icon: ShieldCheck,
  },
];

const Policies = () => {
  return (
    <section id="policies" className="relative py-24 text-white">

      <div className="container relative z-10 mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-14 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Event{" "}
              <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                Policies
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              What to expect on-site — and how we keep PeachState Hacks focused on software and fair play.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <ScrollAnimation key={policy.title} delay={idx * 120}>
                <Tilt glare className="block h-full">
                  <Card className="relative h-full overflow-hidden bg-white/8 border border-white/12 backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)]">
                    <CardContent className="relative z-10 flex h-full flex-col p-7">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{policy.title}</h3>
                      <p className="text-sm text-white/85 leading-relaxed flex-1">{policy.description}</p>
                    </CardContent>
                  </Card>
                </Tilt>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Policies;
