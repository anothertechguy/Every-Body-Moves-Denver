import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-butter/30 to-butter/50" />
      <div className="blob w-[380px] h-[380px] bg-coral/40 -left-24 top-10 float-slower" />
      <div className="blob w-[320px] h-[320px] bg-sage/50 right-0 bottom-0 float-slow" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-deep to-sage text-cream">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="font-display text-xl text-sage-deep">EBM Colorado</div>
            </div>
            <p className="mt-4 max-w-md text-muted-foreground">
              Bringing gentle, joyful movement to nursing homes, families, and every ability across Colorado.
              Better days start with a little motion.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-sage-deep transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-coral hover:to-terracotta hover:text-cream hover:border-transparent hover:shadow-lift"
                >
                  <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-sage-deep uppercase tracking-wider mb-4">Explore</div>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/" className="hover:text-terracotta transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-terracotta transition-colors">Services</Link></li>
              <li><Link to="/services/nursing-homes" className="hover:text-terracotta transition-colors">Nursing Homes</Link></li>
              <li><Link to="/services/special-needs" className="hover:text-terracotta transition-colors">Special Needs</Link></li>
              <li><Link to="/services/private-coaching" className="hover:text-terracotta transition-colors">Private Coaching</Link></li>
              <li><Link to="/about" className="hover:text-terracotta transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-terracotta transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-sage-deep uppercase tracking-wider mb-4">Get in touch</div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-1 text-terracotta" /><span>hello@ebmcolorado.com</span></li>
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-1 text-terracotta" /><span>(720) 555-0132</span></li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 text-terracotta" /><span>Serving the Front Range, Colorado</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} EBM Colorado. Made with warmth.</div>
          <div>Movement · Community · Wellbeing</div>
        </div>
      </div>
    </footer>
  );
}
