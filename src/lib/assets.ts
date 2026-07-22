/**
 * Prefixes a public-asset path with Vite's base URL so references work when
 * the site is served from a subfolder (e.g. GitHub Pages project sites).
 * With the default base of "/" this is a no-op.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
