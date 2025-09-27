import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users, Ticket, BadgeCheck, ArrowRight } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import Tilt from "@/components/Tilt";

const About = () => {
  return (
    <section
      id="about"
      className="
        relative overflow-hidden py-24
        text-white
      "
    >
      {/* Smooth bridge from dark hero to section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-10
                   bg-[linear-gradient(to_bottom,rgba(8,8,12,1),rgba(8,8,12,0))]"
      />

      {/* Subtle peachy ambience on a dark base (readable) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,12,16,0.96) 0%, rgba(12,12,16,0.94) 40%, rgba(12,12,16,0.90) 100%), radial-gradient(900px 420px at 10% 20%, rgba(255,176,103,0.14), transparent 60%), radial-gradient(780px 360px at 90% 30%, rgba(255,239,199,0.10), transparent 60%), radial-gradient(820px 320px at 50% 90%, rgba(255,140,94,0.12), transparent 60%)",
        }}
      />

      {/* tone down spotlight blur/opacity so text stays crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 blur-2xl opacity-30"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                PeachState Hacks
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              The sweetest coding experience in Georgia — designed by students, for students.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: Why */}
          <ScrollAnimation delay={150}>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
                Why PeachState Hacks?
              </h3>

              <div className="relative pl-4">
                <div className="absolute left-0 top-1 bottom-1 w-px bg-white/15" />

                <ul className="space-y-7">
                  <li className="relative">
                    <div className="absolute -left-[9px] top-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                    <div className="flex gap-4">
                      <div className="mt-1.5 shrink-0">
                        <BadgeCheck className="h-5 w-5 text-white/85" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-semibold text-white">Learn & Build</h4>
                        <p className="mt-1 text-white/85 leading-relaxed">
                          Work with cutting-edge tools and ship real solutions — from AI assistants to full-stack web apps.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["AI", "Web", "Mobile", "Hardware"].map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="bg-white/10 text-white border-white/10 backdrop-blur"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="relative">
                    <div className="absolute -left-[9px] top-1.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_4px_rgba(252,211,77,0.25)]" />
                    <div className="flex gap-4">
                      <div className="mt-1.5 shrink-0">
                        <Users className="h-5 w-5 text-white/85" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-semibold text-white">Network & Connect</h4>
                        <p className="mt-1 text-white/85 leading-relaxed">
                          Team up with peers, learn from mentors, and meet partners from Georgia’s growing tech scene.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="relative">
                    <div className="absolute -left-[9px] top-1.5 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_0_4px_rgba(251,146,60,0.25)]" />
                    <div className="flex gap-4">
                      <div className="mt-1.5 shrink-0">
                        <Ticket className="h-5 w-5 text-white/85" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-semibold text-white">Win & Achieve</h4>
                        <p className="mt-1 text-white/85 leading-relaxed">
                          Compete for cash prizes, gear, internships, and ongoing mentorship.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* <div className="mt-8">
                <Button className="group h-12 px-6 text-base font-semibold shadow-lg hover:shadow-xl">
                  See Tracks & Workshops
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div> */}
            </div>
          </ScrollAnimation>

          {/* Right: Event details */}
          <ScrollAnimation delay={250}>
            <div className="relative">
              <Tilt glare className="relative mb-4 w-full">
                <Card className="border-white/12 bg-white/8 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6 sm:p-7">
                      <h4 className="text-xl font-semibold mb-4 text-white">Event Details</h4>

                      <div className="grid grid-cols-1 gap-3">
                        <DetailRow icon={CalendarDays} label="Date" value="Oct 15, 2025" />
                        <DetailRow icon={Clock} label="Duration" value="8 Hours" />
                        <DetailRow icon={MapPin} label="Location" value="Cumming, GA" />
                        <DetailRow icon={Ticket} label="Entry Cost" value={<span className="font-bold text-primary">FREE</span>} />
                        <DetailRow icon={Users} label="Team Size" value="1–4 students" />
                        <DetailRow icon={BadgeCheck} label="Eligibility" value="High-school students" />
                      </div>

                      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-sm text-white/85">🍽️ Meals & snacks  • 🏆 Prizes included</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </div>
          </ScrollAnimation>
        </div>

        {/* Leadership Section */}
        <ScrollAnimation delay={400}>
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-white text-center">
              Our Leadership Team
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Tilt glare className="block">
                <Card className="bg-white/8 border border-white/12 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      HS
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Hussain Syed</h4>
                    <p className="text-white/70">Founder & President</p>
                  </CardContent>
                </Card>
              </Tilt>

              <Tilt glare className="block">
                <Card className="bg-white/8 border border-white/12 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      AN
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Anubhav N</h4>
                    <p className="text-white/70">Vice President</p>
                  </CardContent>
                </Card>
              </Tilt>

              <Tilt glare className="block">
                <Card className="bg-white/8 border border-white/12 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      AR
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Aasrith R</h4>
                    <p className="text-white/70">Technical Lead</p>
                  </CardContent>
                </Card>
              </Tilt>
            </div>
          </div>
        </ScrollAnimation>

        {/* Info band */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Beginner-friendly", v: "No experience required" },
            { k: "Hardware-ready", v: "Microcontrollers available" },
            { k: "Inclusive", v: "Everyone welcome" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl border border-white/12 bg-white/8 p-4 text-center backdrop-blur-xl"
            >
              <p className="text-sm text-white/80">{item.k}</p>
              <p className="text-white font-semibold">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-white/85" />
        <span className="text-white/85 text-sm">{label}</span>
      </div>
      <div className="text-white font-medium text-sm">{value}</div>
    </div>
  );
}

export default About;
