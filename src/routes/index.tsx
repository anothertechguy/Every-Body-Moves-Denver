import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Users, Home as HomeIcon, Sparkles, CheckCircle2, Quote } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import communityImg from "@/assets/community.jpg";
import nursingImg from "@/assets/nursing-homes.jpg";
import specialImg from "@/assets/special-needs.jpg";
import privateImg from "@/assets/private-coaching.jpg";
import { Reveal, Parallax } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EBM Colorado — Joyful Movement for Every Body" },
      {
        name: "description",
        content:
          "EBM Colorado brings chair yoga, seated Zumba, and adaptive fitness to nursing homes, special-needs communities, and private homes across Colorado.",
      },
      { property: "og:title", content: "EBM Colorado — Joyful Movement for Every Body" },
      {
        property: "og:description",
        content: "Warm, professional wellness programs that meet every community where they are.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    to: "/services/nursing-homes",
    title: "Nursing Homes",
    body: "Weekly chair yoga, seated Zumba, and mobility programs that keep residents smiling, stretching, and connected.",
    img: nursingImg,
    icon: Heart,
    tint: "from-coral/70 to-butter/70",
  },
  {
    to: "/services/special-needs",
    title: "Special Needs",
    body: "Adaptive fitness for autistic kids, ADHD, and every ability — patient coaches, sensory-friendly sessions.",
    img: specialImg,
    icon: Users,
    tint: "from-sage/70 to-sky/70",
  },
  {
    to: "/services/private-coaching",
    title: "Private & In-Home",
    body: "One-on-one coaching in your living room, backyard, or building's gym — meeting you exactly where you are.",
    img: privateImg,
    icon: HomeIcon,
    tint: "from-terracotta/70 to-coral/60",
  },
] as const;

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[520px] h-[520px] bg-coral/50 -left-32 top-10 float-slower" />
        <div className="blob w-[420px] h-[420px] bg-sage/60 right-0 top-40 float-slow" />
        <div className="blob w-[300px] h-[300px] bg-butter/70 left-1/2 bottom-0 float-slow" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/70 text-sm text-sage-deep shadow-soft">
                  <Sparkles className="h-4 w-4 text-terracotta" />
                  Active lifestyle services · Colorado
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl text-sage-deep leading-[1.03] text-balance">
                  Movement that meets{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 italic">every body</span>
                    <span className="absolute inset-x-0 bottom-2 h-3 bg-coral/50 -z-0 rounded-full" />
                  </span>{" "}
                  where they are.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  From chair yoga in nursing homes to adaptive fitness for kids of every ability,
                  EBM Colorado brings gentle, joyful, expertly-guided activity to the communities
                  that need it most.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/services" className="btn-primary">
                    Explore our programs <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="btn-ghost">Book a visit</Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                  <div><span className="font-display text-2xl text-sage-deep">200+</span><div>residents moving weekly</div></div>
                  <div className="h-8 w-px bg-border" />
                  <div><span className="font-display text-2xl text-sage-deep">15</span><div>partner communities</div></div>
                  <div className="h-8 w-px bg-border" />
                  <div><span className="font-display text-2xl text-sage-deep">All</span><div>ages & abilities</div></div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 relative">
              <Parallax speed={0.08}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-coral/40 to-sage/40 rounded-[3rem] blur-2xl -z-10" />
                  <img
                    src={heroImg}
                    alt="Fitness instructor leading seniors in chair yoga"
                    width={1600}
                    height={1104}
                    className="w-full rounded-[2.5rem] shadow-lift object-cover aspect-[4/3]"
                  />
                  <div className="absolute -bottom-6 -left-6 soft-card px-5 py-4 max-w-[220px] hidden md:block animate-fade-up">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coral to-terracotta flex items-center justify-center text-cream">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">This week</div>
                        <div className="font-display text-lg text-sage-deep leading-none">42 smiles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <Parallax speed={0.05}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-sage/40 to-butter/60 rounded-[2.5rem] blur-xl -z-10" />
                  <img
                    src={communityImg}
                    alt="Two seniors holding hands during a movement class"
                    width={1408}
                    height={1008}
                    loading="lazy"
                    className="rounded-[2rem] shadow-soft object-cover aspect-[4/5] w-full"
                  />
                </div>
              </Parallax>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">About EBM</div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-sage-deep text-balance">
                  We believe every body deserves the joy of moving.
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  EBM Colorado was built on a simple idea: movement is medicine, and it should feel
                  like a gift — not a chore. We partner with nursing homes, families, and care teams
                  across the Front Range to design fitness experiences that are warm, safe, and
                  genuinely fun.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our certified instructors show up with patience, playlists, and plans built around
                  the person in front of them — not the other way around. Whether it's Zumba scarves
                  in a common room or a first push-up in a living room, we're here for the little
                  wins that add up to a bigger life.
                </p>

                <div className="mt-8 grid sm:grid-cols-3 gap-5">
                  {[
                    { k: "Warm", v: "Community-first, human-first" },
                    { k: "Adaptive", v: "Every ability, every age" },
                    { k: "Consistent", v: "Reliable weekly programming" },
                  ].map((c, i) => (
                    <Reveal key={c.k} delay={100 + i * 90}>
                      <div className="soft-card p-5">
                        <div className="font-display text-2xl text-terracotta">{c.k}</div>
                        <div className="text-sm text-muted-foreground mt-1">{c.v}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-butter/30 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">What we do</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-sage-deep text-balance">
                Three programs. One warm, professional approach.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Pick the community you serve — we'll bring the movement, the music, and the smiles.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <Reveal key={s.to} delay={i * 120}>
                <Link
                  to={s.to}
                  className="group block soft-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      width={1600}
                      height={1200}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.tint} opacity-0 group-hover:opacity-40 transition-opacity`} />
                    <div className="absolute top-4 left-4 h-11 w-11 rounded-2xl bg-cream/95 backdrop-blur flex items-center justify-center text-sage-deep shadow-soft">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl text-sage-deep">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground">{s.body}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-terracotta font-semibold">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">How we help</div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-sage-deep text-balance">
                  A partner in wellness — not just another vendor.
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  We work hand-in-hand with activity directors, families, and caregivers to build
                  programming that actually gets people out of their seats — sometimes literally,
                  sometimes joyfully in them.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Fully insured, background-checked, certified instructors",
                    "Custom weekly schedules tailored to your community",
                    "Sensory-friendly and mobility-adapted programming",
                    "Music, props, and energy included — always",
                    "Progress reports and family-friendly updates",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-terracotta shrink-0 mt-0.5" />
                      <div className="text-foreground/90">{line}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link to="/contact" className="btn-primary">
                    Start a conversation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { n: "01", t: "Say hello", d: "We visit, listen, and learn your community." },
                  { n: "02", t: "Design", d: "We draft a program tuned to abilities & goals." },
                  { n: "03", t: "Show up", d: "Consistent weekly sessions, full of energy." },
                  { n: "04", t: "Grow", d: "We adjust as your community moves and thrives." },
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 90}>
                    <div className="soft-card p-6 h-full">
                      <div className="font-display text-4xl text-coral">{step.n}</div>
                      <div className="mt-3 font-display text-xl text-sage-deep">{step.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{step.d}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-deep to-sage" />
          <div className="blob w-[500px] h-[500px] bg-coral/40 -left-20 top-10 float-slow" />
          <div className="blob w-[400px] h-[400px] bg-butter/50 right-0 bottom-0 float-slower" />
        </div>

        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center text-cream">
          <Reveal>
            <Quote className="h-12 w-12 mx-auto text-coral" />
            <p className="mt-6 font-display text-3xl md:text-4xl leading-snug text-balance">
              "Our residents genuinely look forward to Tuesdays now. EBM didn't just add a class —
              they added something to look forward to."
            </p>
            <div className="mt-6 text-cream/80">
              Karen M. · Activity Director, Front Range Senior Living
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 bg-gradient-to-br from-coral to-terracotta text-cream shadow-lift">
              <div className="blob w-[300px] h-[300px] bg-butter/60 -right-10 -top-10 float-slow" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <h2 className="font-display text-4xl md:text-5xl text-balance">
                    Ready to bring joyful movement to your community?
                  </h2>
                  <p className="mt-4 text-cream/90 text-lg max-w-xl">
                    Whether you run a senior community, care for a loved one, or want in-home
                    coaching — we'd love to hear from you.
                  </p>
                </div>
                <div>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-cream text-terracotta font-semibold px-7 py-4 rounded-full hover:-translate-y-1 transition-transform shadow-lift">
                    Get in touch <ArrowRight className="h-4 w-4" />
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
