import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EBM Colorado" },
      { name: "description", content: "Get in touch with EBM Colorado about programming for your community, family, or private coaching along the Front Range." },
      { property: "og:title", content: "Contact EBM Colorado" },
      { property: "og:description", content: "Let's talk about bringing joyful movement to your community." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[420px] h-[420px] bg-coral/40 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-sage/60 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-20 pb-14 text-center relative">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.22em] text-terracotta font-semibold">Get in touch</div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-sage-deep text-balance">
              Let's bring more movement to your world.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you run a senior community, care for a loved one, or want personal coaching at
              home — tell us a little about you. We'll follow up within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@ebmcolorado.com" },
              { icon: Phone, label: "Phone", value: "(720) 555-0132" },
              { icon: MapPin, label: "Serving", value: "The Front Range · Denver, Boulder, Colorado Springs" },
            ].map((c) => (
              <Reveal key={c.label}>
                <div className="soft-card p-6 flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-coral to-terracotta text-cream flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="font-display text-lg text-sage-deep">{c.value}</div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="soft-card p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Response time</div>
                <div className="font-display text-lg text-sage-deep mt-1">Within one business day</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Every message goes to a real person on our team.
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <form
                className="soft-card p-8 lg:p-10 space-y-5"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                {sent ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-sage-deep to-sage text-cream flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-sage-deep">Message sent</h3>
                    <p className="mt-2 text-muted-foreground">Thanks — we'll be in touch shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Your name" name="name" required />
                      <Field label="Email" name="email" type="email" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Phone" name="phone" type="tel" />
                      <div>
                        <label className="text-sm font-medium text-sage-deep">I'm interested in</label>
                        <select
                          className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-sage-deep transition-colors"
                          defaultValue=""
                        >
                          <option value="" disabled>Choose one…</option>
                          <option>Nursing home programming</option>
                          <option>Special needs coaching</option>
                          <option>Private / in-home coaching</option>
                          <option>Something else</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-sage-deep">Tell us a little more</label>
                      <textarea
                        rows={5}
                        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-sage-deep transition-colors resize-none"
                        placeholder="Where are you located? What kind of programming are you thinking about?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Send message <Send className="h-4 w-4" />
                    </button>
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

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-sage-deep">{label}{required && <span className="text-terracotta"> *</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-sage-deep transition-colors"
      />
    </div>
  );
}
