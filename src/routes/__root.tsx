import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { asset } from "../lib/assets";
import { SITE_URL } from "../lib/seo";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Every Body Moves",
  description:
    "Adaptive movement, yoga, and fitness classes for nursing homes, special-needs communities, and private clients across the greater Denver area.",
  url: SITE_URL,
  email: "EBMcolorado@gmail.com",
  telephone: "+1-801-554-5563",
  areaServed: {
    "@type": "City",
    name: "Denver",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "CO",
    addressCountry: "US",
  },
  knowsAbout: [
    "Adaptive Yoga",
    "Chair Yoga",
    "Adaptive Dance",
    "Senior Fitness",
    "Inclusive Fitness",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Let's get you back to something familiar.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#152238" },
      { title: "Every Body Moves — Adaptive Movement Classes in the Greater Denver Area" },
      {
        name: "description",
        content:
          "Every Body Moves brings adaptive yoga, chair fitness, and joyful movement classes to nursing homes, special-needs communities, and private homes across the greater Denver area.",
      },
      { name: "author", content: "Every Body Moves" },
      { property: "og:site_name", content: "Every Body Moves" },
      { property: "og:title", content: "Every Body Moves — Adaptive Movement for Every Body" },
      {
        property: "og:description",
        content:
          "Adaptive yoga, chair fitness, and dance that bring energy and connection to every community in the greater Denver area.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Every Body Moves — Adaptive Movement for Every Body" },
      {
        name: "twitter:description",
        content: "Joyful, accessible movement classes for every body in the greater Denver area.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [
      {
        rel: "preload",
        href: asset("fonts/manrope-var.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: asset("fonts/plus-jakarta-sans-var.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: asset("favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: asset("favicon.ico"), sizes: "32x32" },
      { rel: "apple-touch-icon", href: asset("apple-touch-icon.png") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
