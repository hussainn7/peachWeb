import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

const timelineItems = [
  {
    time: "9:30 – 10:00 AM",
    title: "Check-In & Arrival",
    description: "Teams arrive, check in, set up.",
  },
  {
    time: "10:00 – 10:20 AM",
    title: "Opening Ceremony",
    description: "Welcome, rules, judging criteria, schedule overview.",
  },
  {
    time: "10:20 AM",
    title: "Hacking Begins 🚀",
    description: null,
  },
  {
    time: "11:00 – 11:30 AM",
    title: "Technical Workshop",
    description: "Focused, hands-on session to unblock teams early.",
  },
  {
    time: "12:30 – 1:00 PM",
    title: "Lunch 🍽️",
    description: null,
  },
  {
    time: "2:00 – 2:30 PM",
    title: "Workshop / Talk",
    description: "Higher-level workshop (ideas, UX, pitching, or problem-solving).",
  },
  {
    time: "3:30 PM",
    title: "Hacking Ends / Code Freeze ⛔",
    description: "All submissions due.",
  },
  {
    time: "3:30 – 5:15 PM",
    title: "Judging & Demos",
    description: "Teams present to judges.",
  },
  {
    time: "5:15 – 6:00 PM",
    title: "Awards & Closing Ceremony 🏆",
    description: "Winners announced, closing remarks.",
  },
] as const;

const Timeline = () => {
  return (
    <div className="min-h-screen text-white">
      <Header />

      <main className="pt-24">
        <section className="relative py-20">
          <div className="container relative z-10 mx-auto max-w-5xl px-6">
            <ScrollAnimation>
              <div className="text-center mb-14">
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  PeachState Hacks{" "}
                  <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                    Timeline
                  </span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">🕒 Final Event Timeline</p>
              </div>
            </ScrollAnimation>

            <div className="relative pl-5 sm:pl-6">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/15" aria-hidden />

              <div className="space-y-5">
                {timelineItems.map((item, index) => (
                  <ScrollAnimation key={`${item.time}-${item.title}`} delay={120 + index * 70}>
                    <div className="relative">
                      <div className="absolute left-[6px] top-6 h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_0_4px_rgba(251,146,60,0.22)]" />

                      <Card className="border-white/12 bg-white/8 backdrop-blur-xl shadow-2xl">
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-white">{item.title}</h2>
                            <p className="text-sm sm:text-base text-white/80 font-medium">{item.time}</p>
                          </div>
                          {item.description ? (
                            <p className="mt-2 text-white/85 leading-relaxed">{item.description}</p>
                          ) : null}
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;

