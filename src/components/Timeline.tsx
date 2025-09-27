import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, MapPin, Award } from "lucide-react";
import Tilt from "@/components/Tilt";

const timelineEvents = [
  {
    time: "Friday, March 15",
    events: [
      { time: "9:00 AM", title: "Check-in & Registration", description: "Meet other participants" },
      { time: "9:30 AM", title: "Opening Ceremony", description: "Kickoff presentation and rules overview" },
      { time: "9:45 AM", title: "Team Formation", description: "Find teammates and finalize your squad" },
      { time: "10:00 AM", title: "Hacking Begins!", description: "Start building your amazing project" },
      { time: "12:00 PM", title: "Lunch Break", description: "Fuel up for the coding marathon" },
      { time: "4:00 PM", title: "Hacking Ends", description: "Submit your project" },
      { time: "4:15 PM", title: "Judging & Demos", description: "Present your project to the judges" },
      { time: "4:30 PM", title: "Awards Ceremony", description: "Celebrate winners and achievements" },
      { time: "5:00 PM", title: "Closing & Networking", description: "Final networking and goodbye" },
    ],
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="relative py-24 text-white overflow-hidden">
      {/* smooth bridge from previous section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-10
                   bg-[linear-gradient(to_bottom,rgba(8,8,12,1),rgba(8,8,12,0))]"
      />
      {/* dark base + soft peach ambience */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,12,16,0.96) 0%, rgba(12,12,16,0.94) 40%, rgba(12,12,16,0.90) 100%), radial-gradient(900px 420px at 12% 18%, rgba(255,176,103,0.12), transparent 60%), radial-gradient(780px 360px at 88% 32%, rgba(255,239,199,0.10), transparent 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Clock className="h-6 w-6 text-white/90" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Event <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">Timeline</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            24 hours of non-stop coding, learning, and fun activities.
          </p>
        </div>

        {/* timeline */}
        <div className="mx-auto max-w-6xl space-y-16">
          {timelineEvents.map((day, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
              {/* day label (sticky on desktop) */}
              <div className="lg:sticky lg:top-24 self-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-5 py-2.5 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                  <div className="h-2 w-2 rounded-full bg-[rgba(255,159,122,0.9)]" />
                  <span className="font-semibold text-white">{day.time}</span>
                </div>
              </div>

              {/* events rail */}
              <div className="relative">
                {/* vertical rail */}
                <div className="pointer-events-none absolute left-5 top-0 bottom-0 w-px bg-white/12" />

                <div className="space-y-6">
                  {day.events.map((event, idx) => (
                    <div key={idx} className="relative pl-12">
                      {/* node dot */}
                      <div className="absolute left-[18px] top-6 h-3 w-3 rounded-full bg-white/80 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />

                      <Tilt glare className="block">
                        <Card className="bg-white/8 border border-white/12 backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)] transition-all">
                          <CardContent className="p-5 md:p-6">
                            <div className="mb-2 inline-flex items-center rounded-full bg-white/12 ring-1 ring-white/15 px-3 py-1">
                              <span className="text-xs font-semibold tracking-wide text-white/95">{event.time}</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white">{event.title}</h3>
                            <p className="mt-1 text-sm text-white/85">{event.description}</p>
                          </CardContent>
                        </Card>
                      </Tilt>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* key facts */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center bg-white/8 border border-white/12 backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="font-semibold text-lg mb-1 text-white">October 15, 2025</h3>
              <p className="text-white">8 hours of hackathon fun</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/8 border border-white/12 backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
            <CardContent className="p-6">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="font-semibold text-lg mb-1 text-white">Forsyth Central High School</h3>
              <p className="text-white">Cumming, Georgia</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/8 border border-white/12 backdrop-blur-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
            <CardContent className="p-6">
              <Award className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="font-semibold text-lg mb-1 text-white">Valuable Prizes</h3>
              <p className="text-white">Cash + tech gear + more</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
