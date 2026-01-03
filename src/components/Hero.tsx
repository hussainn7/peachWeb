import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newsletterStatus === "submitting") return;

    setNewsletterStatus("submitting");
    setNewsletterError(null);

    try {
      const formData = new FormData();
      formData.append("email", newsletterEmail);

      const response = await fetch("https://formspree.io/f/mzdzgjap", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
        return;
      }

      setNewsletterStatus("error");
      setNewsletterError("Something went wrong. Try again.");
    } catch {
      setNewsletterStatus("error");
      setNewsletterError("Network error.");
    }
  }

  return (
    <section id="hero" className="relative min-h-[92vh] w-full flex items-center justify-center">
      <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        {/* Headline */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-bold leading-tight text-5xl sm:text-6xl md:text-7xl xl:text-8xl"
        >
          <span className="bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
            FROM GEORGIA,
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 bg-clip-text text-transparent drop-shadow-sm font-black tracking-tight">
            TO THE WORLD.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-6 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-white/85"
        >
          Georgia’s sweetest high-school hackathon — a full day of building,
          learning, and friendly competition.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            asChild
            className="
              relative overflow-hidden
              px-8 py-6 text-lg font-semibold
              shadow-lg transition-all duration-300 ease-out
              hover:shadow-2xl hover:-translate-y-0.5
              before:absolute before:inset-0
              before:bg-gradient-to-r before:from-white/0 before:via-white/25 before:to-white/0
              before:translate-x-[-100%]
              hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            "
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdLql9wxVoGHg3zOdDFhA1pZpny6IGjp_230U4bbQtd0-QF-g/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Free
            </a>
          </Button>

          <Dialog
            open={newsletterOpen}
            onOpenChange={(o) => {
              setNewsletterOpen(o);
              if (o) {
                setNewsletterStatus("idle");
                setNewsletterError(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="
                  relative overflow-hidden
                  px-8 py-6 text-lg font-semibold
                  shadow-lg transition-all duration-300
                  hover:shadow-2xl hover:-translate-y-0.5
                "
              >
                Newsletter
              </Button>
            </DialogTrigger>

            <DialogContent className="border border-white/15 bg-slate-950/90 text-white backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Newsletter</DialogTitle>
                <DialogDescription className="text-white/70">
                  Event updates, workshops, and announcements.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleNewsletterSubmit} className="grid gap-3">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/50"
                />

                {newsletterStatus === "error" && (
                  <p className="text-sm text-red-200">{newsletterError}</p>
                )}
                {newsletterStatus === "success" && (
                  <p className="text-sm text-emerald-200">
                    You’re subscribed.
                  </p>
                )}

                <DialogFooter>
                  <Button type="submit" disabled={newsletterStatus === "submitting"}>
                    {newsletterStatus === "submitting" ? "Submitting..." : "Subscribe"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
