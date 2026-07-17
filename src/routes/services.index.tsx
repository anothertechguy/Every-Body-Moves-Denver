import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Users, Home as HomeIcon } from "lucide-react";
import nursingImg from "@/assets/nursing-homes.jpg";
import specialImg from "@/assets/special-needs.jpg";
import privateImg from "@/assets/private-coaching.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — EBM Colorado" },
      { name: "description", content: "Chair yoga & Zumba for nursing homes, adaptive fitness for special needs, and private in-home coaching." },
      { property: "og:title", content: "Services — EBM Colorado" },
      { property: "og:description", content: "Programs tailored to nursing homes, special-needs communities, and private coaching clients." },
    ],
  }),
  component: ServicesIndex,
});

const cards = [
  { to: "/services/nursing-homes", title: "Nursing Homes", icon: Heart,
    img: nursingImg, tag: "Senior Communities",
    body: "Chair yoga, seated Zumba, gentle strength, and mobility work — designed to keep residents moving, laughing, and connecting week after week." },
  { to: "/services/special-needs", title: "Special Needs", icon: Users,
    img: specialImg, tag: "All Abilities",
    body: "Sensory-aware, patient, playful fitness for autistic kids, ADHD, and adults of every ability. We build confidence one small win at a time." },
  { to: "/services/private-coaching", title: "Private & In-Home", icon: HomeIcon,
    img: privateImg, tag: "1-on-1",
    body: "Personal coaching where you live — living rooms, backyards, condo gyms. Meeting you exactly where you are, on your schedule." },
];

function ServicesIndex() {
  return (
    <div>
      <section className="relative overflow-hidden hero-surface pb-8">
        <div className="blob w-[420px] h-[420px] bg-coral/40 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-sage/60 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-20 pb-16 text-center relative">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">Our Services</div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-sage-deep text-balance">
              Programs built around the people we serve.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Three focused programs, one shared belief: movement should feel welcoming, safe, and
              genuinely joyful for every body that shows up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-16">
          {cards.map((c, i) => (
            <Reveal key={c.to} delay={i * 80}>
              <Link
                to={c.to}
                className={`group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center soft-card overflow-hidden p-6 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-coral/30 to-sage/30 rounded-[2rem] blur-xl -z-10" />
                  <img
                    src={c.img}
                    alt={c.title}
                    width={1600}
                    height={1200}
                    loading="lazy"
                    className="rounded-[1.5rem] aspect-[5/4] object-cover w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter/70 text-sage-deep text-xs uppercase tracking-wider font-semibold">
                    <c.icon className="h-4 w-4 text-terracotta" /> {c.tag}
                  </div>
                  <h2 className="mt-4 font-display text-4xl md:text-5xl text-sage-deep">{c.title}</h2>
                  <p className="mt-5 text-lg text-muted-foreground">{c.body}</p>
                  <div className="mt-7 inline-flex items-center gap-2 text-terracotta font-semibold">
                    Explore {c.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
