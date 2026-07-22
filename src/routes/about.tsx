import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";
import { Reveal, Parallax } from "@/components/Reveal";
import { Pic } from "@/components/Pic";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About — Every Body Moves",
      description:
        "Every Body Moves brings gentle, joyful, adaptive fitness to Denver-area nursing homes, families, and communities of every ability.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[420px] h-[420px] bg-orange/40 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-ink-soft/60 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-20 pb-16 relative text-center">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
              Our Story
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-ink text-balance">
              We're here because everyone deserves to move.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every Body Moves grew out of a simple observation: the communities that benefit most
              from movement often have the fewest options for it. So we built the programming
              ourselves — warm, adaptable, and full of heart.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Parallax speed={0.05}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange/40 to-ink-soft/40 rounded-[2.5rem] blur-xl -z-10" />
              <Pic
                name="hero-home"
                alt="Instructor guiding seniors in chair yoga"
                width={1600}
                height={1104}
                className="rounded-[2rem] shadow-soft aspect-[4/3] object-cover w-full"
              />
            </div>
          </Parallax>
          <Reveal>
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-ink text-balance">
                Colorado-grown. Community-first.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                We're a small team of certified fitness professionals across the greater Denver area
                with backgrounds in senior fitness, adaptive coaching, yoga, and dance. What ties us
                together is a stubborn belief: fitness should belong to everyone.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                We started in a handful of nursing homes and grew — one activity director, one
                family, one client at a time — because word travels when something actually works.
                Today we serve communities across the greater Denver metro, and we're still growing
                carefully, one relationship at a time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-ink text-balance max-w-2xl">
              What we stand for
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Warmth over ego",
                body: "No hardcore. No shame. Just people helping people feel better in their bodies.",
              },
              {
                icon: Users,
                title: "Everyone included",
                body: "Every ability, every age, every background — the class adapts to you, not the other way around.",
              },
              {
                icon: Sparkles,
                title: "Small wins matter",
                body: "The first push from a chair. The first Zumba shimmy. We celebrate all of it.",
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="soft-card p-8 h-full">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange to-rust flex items-center justify-center text-cream">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-2xl text-ink">{v.title}</div>
                  <div className="mt-3 text-muted-foreground">{v.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-ink text-balance">
                Who we help
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Nursing homes, assisted living communities, memory care units, families raising kids
                with special needs, adults who want to work out at home, and anyone in between. If
                you or the people you love could use a little more movement, we're your team.
              </p>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary">
                  Let's talk <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
          <Parallax speed={0.05}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-ink-soft/40 to-sand/60 rounded-[2.5rem] blur-xl -z-10" />
              <Pic
                name="community"
                alt="Two seniors holding hands in a movement class"
                width={1408}
                height={1008}
                className="rounded-[2rem] shadow-soft aspect-[4/5] object-cover w-full"
              />
            </div>
          </Parallax>
        </div>
      </section>
    </div>
  );
}
