import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const serviceLinks = [
  { to: "/services/nursing-homes", label: "Nursing Homes", desc: "Chair yoga, Zumba & mobility" },
  { to: "/services/special-needs", label: "Special Needs", desc: "Adaptive fitness for all abilities" },
  { to: "/services/private-coaching", label: "Private & In-Home", desc: "One-on-one coaching, your space" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const inServices = pathname.startsWith("/services");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-cream/80 border-b border-border/60 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-deep to-sage text-cream shadow-[0_10px_25px_-8px_rgba(60,90,70,0.5)] transition-transform duration-500 group-hover:rotate-[-6deg]">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl text-sage-deep tracking-tight">EBM Colorado</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Active Lifestyle Services</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="nav-link flex items-center gap-1"
                data-status={inServices ? "active" : undefined}
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 animate-slide-down">
                  <div className="soft-card w-[340px] p-3">
                    <Link
                      to="/services"
                      className="block rounded-2xl px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <div className="text-sm font-semibold text-sage-deep">All Services</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Overview of what we offer</div>
                    </Link>
                    <div className="h-px bg-border my-1" />
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="block rounded-2xl px-4 py-3 hover:bg-muted transition-colors group"
                      >
                        <div className="text-sm font-semibold text-sage-deep group-hover:text-terracotta transition-colors">
                          {s.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact" className="btn-accent text-sm">Get in touch</Link>
          </div>

          <button
            className="lg:hidden p-2 text-sage-deep"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 animate-slide-down">
            <div className="soft-card p-5 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-xl hover:bg-muted font-medium text-sage-deep">Home</Link>
              <div className="px-3 pt-3 pb-1 text-xs uppercase tracking-wider text-muted-foreground">Services</div>
              <Link to="/services" className="block px-3 py-2 rounded-xl hover:bg-muted text-sage-deep">All Services</Link>
              {serviceLinks.map((s) => (
                <Link key={s.to} to={s.to} className="block px-3 py-2 rounded-xl hover:bg-muted text-sage-deep">
                  {s.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link to="/about" className="block px-3 py-2 rounded-xl hover:bg-muted font-medium text-sage-deep">About</Link>
              <Link to="/contact" className="block px-3 py-2 rounded-xl hover:bg-muted font-medium text-sage-deep">Contact</Link>
              <Link to="/contact" className="btn-accent w-full justify-center mt-3">Get in touch</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
