import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ArrowRight, Music, Sparkles, Heart, CheckCircle2, Users2 } from "lucide-react";
import { Reveal, Parallax } from "@/components/Reveal";
import { Pic } from "@/components/Pic";

export const Route = createFileRoute("/services/nursing-homes")({
  head: () =>
    seo({
      title: "Nursing Home Fitness Programs — Every Body Moves",
      description:
        "Weekly chair yoga, seated Zumba, gentle strength, and mobility programs designed for senior communities across the greater Denver area.",
      path: "/services/nursing-homes",
    }),
  component: NursingHomes,
});

const programs = [
  {
    icon: Heart,
    title: "Chair Yoga",
    body: "Gentle stretches and mindful breathing — all seated, all inclusive.",
  },
  {
    icon: Music,
    title: "Seated Zumba",
    body: "Big smiles, colorful scarves, and playlists that get everyone tapping.",
  },
  {
    icon: Sparkles,
    title: "Mobility & Balance",
    body: "Simple daily movements to keep joints happy and falls at bay.",
  },
  {
    icon: Users2,
    title: "Group Games",
    body: "Toss, catch, and laugh — social movement that builds friendships.",
  },
];

function NursingHomes() {
  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[520px] h-[520px] bg-orange/50 -left-32 top-20 float-slower" />
        <div className="blob w-[400px] h-[400px] bg-ink-soft/60 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 lg:pt-24 lg:pb-28 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                  Senior Communities
                </div>
                <h1 className="mt-4 font-display text-5xl md:text-6xl text-ink text-balance">
                  A little movement. A lot of joy.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  Every Body Moves partners with nursing homes and senior living communities across
                  the greater Denver area to deliver weekly fitness programming that residents
                  genuinely look forward to. Warm music, patient instructors, and movement that
                  meets every ability.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Book a demo class <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/services" className="btn-ghost">
                    All services
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Parallax speed={0.08}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-orange/40 to-ink-soft/40 rounded-[3rem] blur-2xl -z-10" />
                  <Pic
                    name="nursing-homes"
                    alt="Seniors doing seated Zumba with colorful scarves"
                    width={1600}
                    height={1104}
                    className="rounded-[2.5rem] shadow-lift w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-ink text-balance max-w-2xl">
              Programs designed for how your residents actually move.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Every session is seated-friendly, mobility-adapted, and modifiable on the fly. No one
              gets left out. No one gets pushed too hard.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="soft-card p-7 h-full transition-transform hover:-translate-y-2 duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange to-rust flex items-center justify-center text-cream">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-xl text-ink">{p.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{p.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Parallax speed={0.05}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-ink-soft/40 to-sand/60 rounded-[2.5rem] blur-xl -z-10" />
                <Pic
                  name="community"
                  alt="Two seniors holding hands in a movement class"
                  width={1408}
                  height={1008}
                  className="rounded-[2rem] shadow-soft w-full aspect-[4/5] object-cover"
                />
              </div>
            </Parallax>
            <Reveal>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                  Why Communities Choose EBM
                </div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink text-balance">
                  We take the "just another activity" out of the calendar.
                </h2>
                <div className="mt-8 space-y-4">
                  {[
                    "Certified, background-checked instructors — always the same friendly faces",
                    "Fully insured with liability coverage tailored to senior care settings",
                    "Weekly schedules that fit around meals, therapy, and rest",
                    "Adaptable to memory care, assisted living, and independent living",
                    "Simple monthly reports for your activity director & families",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-rust shrink-0 mt-0.5" />
                      <div>{line}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link to="/contact" className="btn-accent">
                    Get pricing & availability <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
