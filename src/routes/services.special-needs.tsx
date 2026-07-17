import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Puzzle, HeartHandshake, Smile, Shield, CheckCircle2 } from "lucide-react";
import specialImg from "@/assets/special-needs.jpg";
import { Reveal, Parallax } from "@/components/Reveal";

export const Route = createFileRoute("/services/special-needs")({
  head: () => ({
    meta: [
      { title: "Adaptive Fitness for Special Needs — EBM Colorado" },
      { name: "description", content: "Sensory-friendly, adaptive fitness programs for autistic kids, ADHD, and adults of every ability across Colorado." },
      { property: "og:title", content: "Adaptive Fitness — EBM Colorado" },
      { property: "og:description", content: "Patient, playful, sensory-aware coaching that meets every ability." },
      { property: "og:image", content: "/special-needs-share.jpg" },
    ],
  }),
  component: SpecialNeeds,
});

const features = [
  { icon: Puzzle, title: "Sensory-Aware", body: "Predictable structure, calm spaces, and cues that don't overwhelm." },
  { icon: HeartHandshake, title: "Patient by Design", body: "We move at your pace. Every day looks a little different, and that's okay." },
  { icon: Smile, title: "Confidence First", body: "Small wins, celebrated loudly. Movement becomes something to be proud of." },
  { icon: Shield, title: "Safe & Certified", body: "Trained in adaptive fitness, background-checked, fully insured." },
];

function SpecialNeeds() {
  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[420px] h-[420px] bg-sky/60 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-butter/70 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">All Abilities</div>
                <h1 className="mt-4 font-display text-5xl md:text-6xl text-sage-deep text-balance">
                  Adaptive fitness that celebrates every kind of body.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  Kids and adults on the autism spectrum, with ADHD, sensory sensitivities, or
                  physical differences deserve fitness that feels like play — not pressure. Our
                  coaches specialize in meeting people exactly where they are.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">Schedule a trial session <ArrowRight className="h-4 w-4" /></Link>
                  <Link to="/services" className="btn-ghost">All services</Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Parallax speed={0.08}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-sky/40 to-sage/50 rounded-[3rem] blur-2xl -z-10" />
                  <img src={specialImg} alt="Adaptive coach with a smiling teen doing balance work"
                    width={1600} height={1104}
                    className="rounded-[2.5rem] shadow-lift w-full aspect-[4/3] object-cover" />
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-sage-deep text-balance max-w-2xl">
              A different kind of gym — because a different kind of body deserves one.
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="soft-card p-7 h-full transition-transform hover:-translate-y-2 duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky to-sage flex items-center justify-center text-sage-deep">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-xl text-sage-deep">{f.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{f.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="soft-card p-10 lg:p-14">
              <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">What sessions look like</div>
              <h2 className="mt-3 font-display text-4xl text-sage-deep text-balance max-w-2xl">
                Predictable, playful, and built around the person in front of us.
              </h2>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {[
                  "Consistent structure — same warm-up, same cool-down, every time",
                  "Visual schedules and quiet transitions between activities",
                  "One-on-one or small groups (2–4), whatever fits best",
                  "Collaboration with parents, therapists, and support teams",
                  "Movement games, obstacle courses, yoga, and gentle strength",
                  "Zero pressure to perform — full permission to explore",
                ].map((l) => (
                  <div key={l} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terracotta shrink-0 mt-0.5" />
                    <div className="text-foreground/90">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
