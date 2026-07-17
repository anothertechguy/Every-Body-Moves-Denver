import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Calendar, Target, HeartPulse, CheckCircle2 } from "lucide-react";
import privateImg from "@/assets/private-coaching.jpg";
import { Reveal, Parallax } from "@/components/Reveal";

export const Route = createFileRoute("/services/private-coaching")({
  head: () => ({
    meta: [
      { title: "Private & In-Home Coaching — Every Body Moves" },
      {
        name: "description",
        content:
          "One-on-one personal training and wellness coaching in your home, backyard, or building's gym anywhere across the greater Denver area.",
      },
      { property: "og:title", content: "Private & In-Home Coaching — Every Body Moves" },
      {
        property: "og:description",
        content:
          "Personalized coaching where you already are. No commute, no crowds, just results.",
      },
    ],
  }),
  component: PrivateCoaching,
});

const perks = [
  {
    icon: Home,
    title: "Your Space",
    body: "Living room, backyard, garage gym — we bring everything we need.",
  },
  {
    icon: Calendar,
    title: "Your Schedule",
    body: "Early mornings, lunch breaks, weekends — flexible around real life.",
  },
  {
    icon: Target,
    title: "Your Goals",
    body: "From returning after injury to your first 5K — a plan that fits you.",
  },
  {
    icon: HeartPulse,
    title: "Your Pace",
    body: "Sustainable, gentle progress — never a program you dread.",
  },
];

function PrivateCoaching() {
  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[420px] h-[420px] bg-rust/40 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-ink-soft/50 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                  1-on-1 Coaching
                </div>
                <h1 className="mt-4 font-display text-5xl md:text-6xl text-ink text-balance">
                  Personal training that comes to your front door.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  Skip the gym intimidation and the drive across town. Our certified coaches meet
                  you at home with the equipment, the plan, and the encouragement — so building a
                  stronger, more confident you fits into the life you already have.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Book a consultation <ArrowRight className="h-4 w-4" />
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
                  <div className="absolute -inset-6 bg-gradient-to-tr from-rust/40 to-sand/60 rounded-[3rem] blur-2xl -z-10" />
                  <img
                    src={privateImg}
                    alt="Trainer coaching a client at home with dumbbells"
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
              Wellness that fits your life — not the other way around.
            </h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="soft-card p-7 h-full transition-transform hover:-translate-y-2 duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rust to-orange flex items-center justify-center text-cream">
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
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <Reveal>
              <div className="soft-card p-10 h-full">
                <div className="font-display text-3xl text-ink">Who it's for</div>
                <div className="mt-6 space-y-3">
                  {[
                    "Adults returning to fitness after a long break",
                    "Post-rehab and post-surgical recovery",
                    "Busy professionals who can't make studio times",
                    "Older adults who want to stay strong & independent",
                    "Anyone who feels more comfortable at home than in a gym",
                  ].map((l) => (
                    <div key={l} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-rust shrink-0 mt-0.5" />
                      <div>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="soft-card p-10 h-full">
                <div className="font-display text-3xl text-ink">How it works</div>
                <ol className="mt-6 space-y-5">
                  {[
                    [
                      "01",
                      "Free consultation",
                      "A friendly call to understand your goals, space, and schedule.",
                    ],
                    [
                      "02",
                      "Custom plan",
                      "We design a program tailored to your body, your equipment, and your life.",
                    ],
                    [
                      "03",
                      "We show up",
                      "Weekly sessions at your home — everything we need comes with us.",
                    ],
                    [
                      "04",
                      "Progress that lasts",
                      "Regular check-ins and program updates as you grow stronger.",
                    ],
                  ].map(([n, t, d]) => (
                    <li key={n} className="flex gap-4">
                      <div className="font-display text-2xl text-orange shrink-0 w-10">{n}</div>
                      <div>
                        <div className="font-semibold text-ink">{t}</div>
                        <div className="text-sm text-muted-foreground mt-1">{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
