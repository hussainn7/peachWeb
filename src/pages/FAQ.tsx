import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "Who can participate?",
    answer:
      "PeachState Hacks is open to all high school students. Whether you're a freshman or a senior, if you're interested in technology and building things, you're welcome here.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all! Many participants are beginners. We'll have workshops and mentors to help you learn. You can also contribute through design, project management, or coming up with great ideas.",
  },
  {
    question: "How much does it cost?",
    answer:
      "PeachState Hacks is completely free to attend. We provide meals, snacks, and all the resources you need.",
  },
  {
    question: "Do I need a team?",
    answer:
      "You can register solo or with a team of up to 3 people. If you don't have a team, we'll help you find one at the event.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and any hardware you want to use. We'll provide everything else — food, drinks, WiFi, and workspace.",
  },
] as const;

const FAQ = () => {
  return (
    <div className="min-h-screen text-white">
      <Header />

      <main className="pt-24">
        <section className="relative py-20">
          <div className="container relative z-10 mx-auto max-w-5xl px-6">
            <ScrollAnimation>
              <div className="text-center mb-14">
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Frequently Asked{" "}
                  <span className="bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                    Questions
                  </span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">Everything you need to know for event day.</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={140}>
              <Card className="border-white/12 bg-white/8 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-2 sm:p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item, index) => (
                      <AccordionItem
                        key={item.question}
                        value={`item-${index + 1}`}
                        className="border-white/12 last:border-b-0"
                      >
                        <AccordionTrigger className="px-4 sm:px-5 py-5 text-left text-white hover:no-underline">
                          <span className="text-base sm:text-lg font-semibold">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 sm:px-5 pb-5">
                          <p className="text-white/85 leading-relaxed text-base">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
