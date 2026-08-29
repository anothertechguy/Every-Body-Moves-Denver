/**
 * Inlines the compiled stylesheet into every prerendered page.
 *
 * The whole Tailwind build is ~9 KB over the wire — smaller than the extra
 * round trip the render-blocking <link> costs on mobile. Inlining it means
 * first paint needs only the HTML response. Runs before generate-sitemap so
 * the 404.html copy picks up the inlined version too.
 *
 * The client bundle re-attaches the <link> after hydration (the route config
 * still lists it); by then it loads async from immutable cache and never
 * blocks paint.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";

if (process.env.PAGES_BUILD !== "true") {
  console.log("[inline-css] not a static build — skipping");
  process.exit(0);
}

const cssFile = readdirSync(join(CLIENT_DIR, "assets")).find(
  (f) => f.startsWith("styles-") && f.endsWith(".css"),
);
if (!cssFile) {
  console.error("[inline-css] no styles-*.css found in assets — aborting build");
  process.exit(1);
}
const css = readFileSync(join(CLIENT_DIR, "assets", cssFile), "utf8");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (entry === "index.html") files.push(full);
  }
  return files;
}

// Match the stylesheet link regardless of attribute order or base path.
const linkRe = /<link[^>]*rel="stylesheet"[^>]*>|<link[^>]*href="[^"]*styles-[^"]*\.css"[^>]*>/;

let count = 0;
for (const file of walk(CLIENT_DIR)) {
  const html = readFileSync(file, "utf8");
  if (!linkRe.test(html)) {
    console.error(`[inline-css] no stylesheet link found in ${file} — aborting build`);
    process.exit(1);
  }
  writeFileSync(file, html.replace(linkRe, `<style>${css}</style>`));
  count++;
}
console.log(`[inline-css] inlined ${cssFile} (${(css.length / 1024).toFixed(1)} KB raw) into ${count} pages`);
