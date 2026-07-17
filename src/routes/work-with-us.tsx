import { createFileRoute, Link } from "@tanstack/react-router";
import communityImg from "@/assets/community.jpg";
import {
  ArrowRight,
  Gift,
  HandHeart,
  Store,
  Megaphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Reveal, Parallax } from "@/components/Reveal";

export const Route = createFileRoute("/work-with-us")({
  head: () => ({
    meta: [
      { title: "Work With Us — Every Body Moves" },
      {
        name: "description",
        content:
          "Local businesses and community partners help make Every Body Moves classes special — from treats and refreshments to sponsorships across the greater Denver area.",
      },
      { property: "og:title", content: "Work With Us — Every Body Moves" },
      {
        property: "og:description",
        content:
          "Partner with Every Body Moves to bring a little extra joy to movement classes across the greater Denver area.",
      },
    ],
  }),
  component: WorkWithUs,
});

const ways = [
  {
    icon: Gift,
    title: "Bring the treats",
    body: "Local bakeries and cafés love sending something sweet to our classes and celebrations. A small treat turns an ordinary Tuesday into an event residents talk about all week.",
  },
  {
    icon: Store,
    title: "Sponsor a class",
    body: "Cover a session for a community that couldn't otherwise fit it in — your business gets a warm local shout-out, and more people get to move.",
  },
  {
    icon: HandHeart,
    title: "Donate supplies",
    body: "Scarves, light hand weights, yoga props, water bottles, music — the little things that make classes brighter are always welcome.",
  },
  {
    icon: Megaphone,
    title: "Spread the word",
    body: "Know an activity director, a care team, or a family who'd love this? An introduction is one of the most generous things you can offer.",
  },
];

const gallery = [
  {
    src: "/partners/cookies.jpg",
    alt: "Custom Every Body Moves logo sugar cookies from a local bakery partner",
    caption: "Custom logo cookies",
  },
  {
    src: "/partners/macarons.jpg",
    alt: "Every Body Moves branded macarons in blue, orange, and yellow",
    caption: "Branded macarons",
  },
  {
    src: "/partners/cupcakes.jpg",
    alt: "Every Body Moves cupcakes topped with the logo in buttercream",
    caption: "Celebration cupcakes",
  },
];

function WorkWithUs() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[460px] h-[460px] bg-orange/40 -left-28 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-marigold/50 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 lg:pt-24 lg:pb-28 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/70 text-sm text-ink shadow-soft">
                  <Sparkles className="h-4 w-4 text-orange" />
                  Community partners welcome
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-5xl md:text-6xl text-ink text-balance">
                  Good movement is better with{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">good neighbors</span>
                    <span className="absolute inset-x-0 bottom-1.5 h-3 bg-orange/40 -z-0 rounded-full" />
                  </span>
                  .
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  Some of the best moments in our classes come from the local businesses who show up
                  for them. Whether you run a bakery, a café, or a shop down the street, there's a
                  simple, feel-good way to be part of what we do.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-accent">
                    Become a partner <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/about" className="btn-ghost">
                    Learn about us
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Parallax speed={0.07}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-orange/40 to-marigold/50 rounded-[3rem] blur-2xl -z-10" />
                  <img
                    src={communityImg}
                    alt="Neighbors and residents sharing a joyful moment together"
                    width={1408}
                    height={1056}
                    fetchPriority="high"
                    className="rounded-[2.5rem] shadow-lift w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO PARTNER */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                Ways to get involved
              </div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink text-balance">
                Four easy ways to make someone's day.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                No commitment too small. Every gesture — a box of something sweet, a donated set of
                scarves, a warm introduction — adds up to a brighter class.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="soft-card p-8 h-full transition-transform duration-500 hover:-translate-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange to-marigold flex items-center justify-center text-white shadow-soft">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-2xl text-ink">{w.title}</div>
                  <p className="mt-3 text-muted-foreground">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
              Partner spotlights
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink text-balance max-w-2xl">
              A little something extra goes a long way.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Our friends at local bakeries have surprised classes with custom treats — right down
              to the logo. It's the kind of gesture residents remember long after the last bite.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 100}>
                <figure className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-orange/25 to-marigold/30 rounded-[2.25rem] blur-xl -z-10" />
                  <img
                    src={g.src}
                    alt={g.alt}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="rounded-[1.75rem] shadow-lift w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <figcaption className="mt-4 text-center font-display text-lg text-ink">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 bg-gradient-to-br from-ink to-ink-soft text-cream shadow-lift">
              <div className="blob w-[320px] h-[320px] bg-orange/40 -right-10 -top-10 float-slow" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <h2 className="font-display text-4xl md:text-5xl text-cream text-balance">
                    Want to bring a little joy to a local class?
                  </h2>
                  <p className="mt-4 text-cream/80 text-lg max-w-xl">
                    Tell us about your business and how you'd like to help. We'll find the perfect
                    way to team up.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {["Bakeries & cafés", "Local shops", "Community groups"].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-cream/90">
                        <CheckCircle2 className="h-5 w-5 text-marigold" /> {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-cream text-ink font-semibold px-7 py-4 rounded-full hover:-translate-y-1 transition-transform shadow-lift"
                  >
                    Reach out <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
