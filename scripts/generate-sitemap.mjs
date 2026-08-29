/**
 * Writes dist/client/sitemap.xml after a static build.
 *
 * The URL list is derived by walking the prerendered HTML rather than kept in a
 * hand-maintained array, so adding or renaming a page updates the sitemap
 * automatically and the two can never drift apart.
 *
 * Run automatically via the `postbuild` npm script.
 */
import { readdirSync, statSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const CLIENT_DIR = "dist/client";
const SITE_URL = "https://everybodymovesco.com";

// Only the static build (PAGES_BUILD=true, what Cloudflare runs) prerenders
// pages to crawl. A plain SSR build serves the sitemap dynamically and has
// nothing to walk, so this is a no-op there rather than a build failure.
const isStaticBuild = process.env.PAGES_BUILD === "true";

if (!isStaticBuild) {
  console.log("[sitemap] not a static build (PAGES_BUILD unset) — skipping");
  process.exit(0);
}

if (!existsSync(CLIENT_DIR)) {
  console.error(`[sitemap] static build but ${CLIENT_DIR} is missing`);
  process.exit(1);
}

/** Every prerendered index.html becomes one route. */
function findRoutes(dir, routes = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findRoutes(full, routes);
    } else if (entry === "index.html") {
      const rel = relative(CLIENT_DIR, full).split(sep).slice(0, -1).join("/");
      routes.push(rel ? `/${rel}` : "/");
    }
  }
  return routes;
}

// Homepage first, then alphabetical — shallower pages naturally sort earlier.
const routes = findRoutes(CLIENT_DIR).sort((a, b) =>
  a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b),
);

if (routes.length === 0) {
  console.error("[sitemap] found no prerendered pages — refusing to write an empty sitemap");
  process.exit(1);
}

// Priority reflects how central a page is to the business, not a ranking lever.
function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route === "/services") return "0.9";
  if (route.startsWith("/services/")) return "0.8";
  return "0.7";
}

const lastmod = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) =>
    [
      "  <url>",
      `    <loc>${SITE_URL}${route === "/" ? "/" : `${route}/`}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>`,
      `    <priority>${priorityFor(route)}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(CLIENT_DIR, "sitemap.xml"), xml);
console.log(`[sitemap] wrote ${routes.length} URLs to ${CLIENT_DIR}/sitemap.xml`);

// Static hosts serve /404.html for unknown URLs. The app shell hydrates and the
// router renders the branded not-found page — without this, visitors to a bad
// link would get the host's default error screen.
copyFileSync(join(CLIENT_DIR, "index.html"), join(CLIENT_DIR, "404.html"));
console.log("[sitemap] wrote 404.html fallback");
