import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { BrandMark } from "./Logo";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ebmcolorado" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/ebmcolorado" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream">
      <div className="blob w-[420px] h-[420px] bg-orange/30 -left-24 -top-10 float-slower" />
      <div className="blob w-[360px] h-[360px] bg-sky/20 right-0 bottom-0 float-slow" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <BrandMark tone="dark" className="h-11 w-11" />
              <div className="font-display text-xl font-extrabold leading-none">
                Every Body Moves
              </div>
            </div>
            <p className="mt-5 max-w-md text-cream/70">
              Adaptive yoga, dance, and gentle movement that help every person feel capable and
              confident — brought to nursing homes, families, and communities across the greater
              Denver area.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/90 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-orange hover:to-marigold hover:text-white hover:border-transparent"
                >
                  <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-cream/90">
              Explore
            </div>
            <ul className="space-y-3 text-cream/70">
              <li>
                <Link to="/" className="hover:text-marigold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services/nursing-homes"
                  className="hover:text-marigold transition-colors"
                >
                  Nursing Homes
                </Link>
              </li>
              <li>
                <Link
                  to="/services/special-needs"
                  className="hover:text-marigold transition-colors"
                >
                  Special Needs
                </Link>
              </li>
              <li>
                <Link
                  to="/services/private-coaching"
                  className="hover:text-marigold transition-colors"
                >
                  Private Coaching
                </Link>
              </li>
              <li>
                <Link to="/work-with-us" className="hover:text-marigold transition-colors">
                  Work With Us
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="hover:text-marigold transition-colors">
                  Instructors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-marigold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-marigold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-cream/90">
              Get in touch
            </div>
            <ul className="space-y-3 text-cream/70">
              <li>
                <a
                  href="mailto:EBMcolorado@gmail.com"
                  className="flex items-start gap-2 hover:text-marigold transition-colors"
                >
                  <Mail className="h-4 w-4 mt-1 text-orange shrink-0" />
                  <span>EBMcolorado@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+18015545563"
                  className="flex items-start gap-2 hover:text-marigold transition-colors"
                >
                  <Phone className="h-4 w-4 mt-1 text-orange shrink-0" />
                  <span>(801) 554-5563</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-orange shrink-0" />
                <span>Serving the greater Denver area</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-cream/60">
          <div>© {new Date().getFullYear()} Every Body Moves. All rights reserved.</div>
          <div>Adaptive Movement · Community · Confidence</div>
        </div>
      </div>
    </footer>
  );
}
