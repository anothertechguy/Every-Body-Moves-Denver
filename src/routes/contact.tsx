import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HoneyPot, FormError } from "@/components/FormBits";
import { submitForm } from "@/lib/submit-form";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — Every Body Moves",
      description:
        "Get in touch with Every Body Moves about programming for your community, family, or private coaching across the greater Denver and Utah Valley areas.",
      path: "/contact",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ],
    }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Used to spot bot submissions completed impossibly fast.
  const [startedAt] = useState(() => Date.now());

  return (
    <div>
      <section className="relative overflow-hidden hero-surface">
        <div className="blob w-[420px] h-[420px] bg-orange/40 -left-24 top-10 float-slower" />
        <div className="blob w-[380px] h-[380px] bg-ink-soft/60 right-0 bottom-0 float-slow" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-20 pb-14 text-center relative">
          <Reveal>
            <div className="text-sm uppercase tracking-[0.22em] text-rust font-semibold">
              Get in touch
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-ink text-balance">
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
              {
                icon: Mail,
                label: "Email",
                // <wbr> lets the address break cleanly after the @ on narrow
                // screens instead of forcing the card wider than the viewport
                value: (
                  <>
                    cassie@<wbr />
                    everybodymovesco.com
                  </>
                ),
                href: "mailto:cassie@everybodymovesco.com",
              },
              { icon: Phone, label: "Phone", value: "(720) 463-3385", href: "tel:+17204633385" },
              {
                icon: MapPin,
                label: "Serving",
                value: "The greater Denver & Utah Valley areas",
                href: undefined,
              },
            ].map((c) => {
              const inner = (
                <div className="soft-card p-6 flex items-start gap-4 h-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange to-marigold text-white flex items-center justify-center shrink-0 shadow-soft">
                    <c.icon className="h-5 w-5" />
                  </div>
                  {/* min-w-0 lets the flex item shrink below the email's
                      intrinsic width so break-words can actually wrap it */}
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    {/* overflow-wrap:anywhere shrinks the min-content width so
                        the card can never outgrow a narrow viewport */}
                    <div className="font-display text-lg text-ink [overflow-wrap:anywhere]">
                      {c.value}
                    </div>
                  </div>
                </div>
              );
              return (
                <Reveal key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}

            <Reveal>
              <div className="soft-card p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Response time
                </div>
                <div className="font-display text-lg text-ink mt-1">Within one business day</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Every message goes to a real person on our team.
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="soft-card p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Find us on social
                </div>
                <ul className="mt-3 space-y-2.5">
                  <li>
                    <a
                      href="https://www.instagram.com/everybodymovesco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-ink hover:text-rust transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-marigold text-white shadow-soft shrink-0">
                        <InstagramIcon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-semibold">Instagram</span>
                        <span className="block text-sm text-muted-foreground">
                          @EveryBodyMovesCO
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/people/Every-Body-Moves/61593435957941/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-ink hover:text-rust transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-marigold text-white shadow-soft shrink-0">
                        <FacebookIcon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-semibold">Facebook</span>
                        <span className="block text-sm text-muted-foreground">
                          Every Body Moves
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/everybodymovesco/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-ink hover:text-rust transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-marigold text-white shadow-soft shrink-0">
                        <LinkedinIcon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-semibold">LinkedIn</span>
                        <span className="block text-sm text-muted-foreground">
                          Every Body Moves
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <form
                className="soft-card p-8 lg:p-10 space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (sending) return;
                  const form = e.currentTarget;
                  setError(null);
                  setSending(true);
                  const result = await submitForm(form, "contact", startedAt);
                  setSending(false);
                  if (result.ok) setSent(true);
                  else setError(result.message);
                }}
              >
                <HoneyPot />
                {sent ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-ink to-ink-soft text-cream flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-ink">Message sent</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thanks — we'll be in touch shortly.
                    </p>
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
                        <label htmlFor="contact-interest" className="text-sm font-medium text-ink">
                          I'm interested in
                        </label>
                        <select
                          id="contact-interest"
                          name="interest"
                          className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Choose one…
                          </option>
                          <option>Senior community programming</option>
                          <option>Special needs coaching</option>
                          <option>Private / in-home coaching</option>
                          <option>Something else</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                        Tell us a little more
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors resize-none"
                        placeholder="Where are you located? What kind of programming are you thinking about?"
                      />
                    </div>
                    {error && <FormError message={error} />}
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full justify-center disabled:opacity-70"
                    >
                      {sending ? "Sending…" : "Send message"}
                      <Send className="h-4 w-4" />
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

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
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
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "on"}
        className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
