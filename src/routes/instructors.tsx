import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  HeartHandshake,
  GraduationCap,
  Users,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { Reveal, Parallax } from "@/components/Reveal";
import { Pic } from "@/components/Pic";

export const Route = createFileRoute("/instructors")({
  head: () =>
    seo({
      title: "Teach With Us — Every Body Moves",
      description:
        "Become an Every Body Moves instructor. Lead adaptive yoga, chair fitness, and dance classes for nursing homes and communities across the greater Denver area — flexible hours, meaningful work.",
      path: "/instructors",
    }),
  component: Instructors,
});

const perks = [
  {
    icon: CalendarClock,
    title: "Flexible scheduling",
    body: "Build a week that works for your life. Pick up classes near you, morning or afternoon — we handle the booking and logistics.",
  },
  {
    icon: HeartHandshake,
    title: "Work that matters",
    body: "You'll leave every class knowing you made someone's day brighter. This is the good kind of tired.",
  },
  {
    icon: GraduationCap,
    title: "Paid training & support",
    body: "New to adaptive or senior fitness? We'll get you confident with hands-on training, resources, and a mentor in your corner.",
  },
  {
    icon: Users,
    title: "A team that has your back",
    body: "You're never on an island. Lean on a warm community of instructors who swap playlists, ideas, and encouragement.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    body: "Take on more classes, new communities, or help shape programming as we grow across the greater Denver area.",
  },
  {
    icon: MapPin,
    title: "Classes close to home",
    body: "We match you with partner communities near you, so you spend less time driving and more time doing what you love.",
  },
];

const lookingFor = [
  "A warm, patient presence — you meet people exactly where they are",
  "Experience teaching fitness, yoga, dance, or movement (adaptive or senior a big plus)",
  "Current certification in your specialty and CPR (or willingness to get certified)",
  "Reliability and heart — communities count on you showing up with energy",
  "Comfortable adapting on the fly for wheelchairs, chairs, and every ability",
  "A clean background check (we'll help you through it)",
];

function Instructors() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[480px] h-[480px] bg-orange/45 -left-28 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-sky/50 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 lg:pt-24 lg:pb-28 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/70 text-sm text-ink shadow-soft">
                  <Sparkles className="h-4 w-4 text-orange" />
                  We're hiring instructors · Greater Denver
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-5xl md:text-6xl text-ink text-balance">
                  Teach movement that{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">changes days</span>
                    <span className="absolute inset-x-0 bottom-1.5 h-3 bg-orange/40 -z-0 rounded-full" />
                  </span>
                  .
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  If you love helping people feel capable and confident in their bodies, we'd love
                  to meet you. Lead adaptive yoga, chair fitness, and dance classes for communities
                  that truly light up when you walk in.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#apply" className="btn-accent">
                    Apply now <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to="/about" className="btn-ghost">
                    Learn about us
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Parallax speed={0.07}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-orange/40 to-sky/50 rounded-[3rem] blur-2xl -z-10" />
                  <Pic
                    name="special-needs"
                    alt="An Every Body Moves instructor encouraging a participant"
                    width={1600}
                    height={1104}
                    priority
                    className="rounded-[2.5rem] shadow-lift w-full aspect-[4/3] object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                Why teach with us
              </div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink text-balance">
                A role that gives back as much as you put in.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                We take care of the scheduling, the logistics, and the paperwork — so you can focus
                on the part you love: showing up and leading a great class.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="soft-card p-8 h-full transition-transform duration-500 hover:-translate-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange to-marigold flex items-center justify-center text-white shadow-soft">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-2xl text-ink">{p.title}</div>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE'RE LOOKING FOR */}
      <section className="pb-8 lg:pb-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="soft-card p-10 lg:p-14">
              <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                Who we're looking for
              </div>
              <h2 className="mt-3 font-display text-4xl text-ink text-balance max-w-2xl">
                Certifications matter. Heart matters more.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
                You don't need decades of experience — you need the right spirit and a willingness
                to learn. If most of these sound like you, we should talk.
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {lookingFor.map((l) => (
                  <div key={l} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange shrink-0 mt-0.5" />
                    <div className="text-foreground/90">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-16 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
                Apply
              </div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink text-balance">
                Let's find your first class.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Tell us a little about you and how you like to move. If it feels like a fit, we'll
                reach out to set up a friendly chat and a demo class.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "No cover letter required",
                  "We reply to every applicant",
                  "Paid, hands-on onboarding",
                ].map((l) => (
                  <div key={l} className="flex items-center gap-3 text-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-orange" /> {l}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <form
                className="soft-card p-8 lg:p-10 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                {sent ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-orange to-marigold text-white flex items-center justify-center shadow-soft">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-ink">Application received</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thanks for wanting to move with us — we'll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full name" name="name" required />
                      <Field label="Email" name="email" type="email" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Phone" name="phone" type="tel" />
                      <Field label="City / area you're based" name="city" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="apply-classes" className="text-sm font-medium text-ink">
                          Classes you'd love to lead
                        </label>
                        <select
                          id="apply-classes"
                          name="classes"
                          className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Choose one…
                          </option>
                          <option>Adaptive / chair yoga</option>
                          <option>Seated Zumba & dance</option>
                          <option>Special-needs fitness</option>
                          <option>Private / in-home coaching</option>
                          <option>Open to anything</option>
                        </select>
                      </div>
                      <Field
                        label="General availability"
                        name="availability"
                        placeholder="e.g. weekday mornings"
                      />
                    </div>
                    <Field
                      label="Link to resume, LinkedIn, or profile"
                      name="resume"
                      type="url"
                      placeholder="https://"
                    />
                    <div>
                      <label htmlFor="apply-experience" className="text-sm font-medium text-ink">
                        Certifications & experience
                      </label>
                      <textarea
                        id="apply-experience"
                        name="experience"
                        rows={4}
                        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors resize-none"
                        placeholder="Tell us about your certifications (yoga, group fitness, CPR…) and any experience with seniors or adaptive fitness."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Submit application <Send className="h-4 w-4" />
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      By applying you agree to be contacted about opportunities at Every Body Moves.
                    </p>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `apply-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-rust"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "on"}
        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
