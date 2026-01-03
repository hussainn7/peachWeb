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
        relative py-24
        text-white
      "
    >
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
                          {["AI", "Web", "Mobile", "Design"].map((t) => (
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

              <div id="why-end" aria-hidden className="h-0 w-0" />

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
                        <DetailRow icon={CalendarDays} label="Date" value="Jan 10, 2026" />
                        <DetailRow icon={Clock} label="Duration" value="9:30 AM – 6:00 PM" />
                        <DetailRow icon={MapPin} label="Location" value="Forsyth Central High School, Cumming, GA" />
                        <DetailRow icon={Ticket} label="Entry Cost" value={<span className="font-bold text-primary">FREE</span>} />
                        <DetailRow icon={Users} label="Team Size" value="1-3 students" />
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
