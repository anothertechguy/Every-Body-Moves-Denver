export const SITE_URL = "https://ebmcolorado.com";

/**
 * Per-page SEO head builder. Emits the title/description pair, matching
 * OpenGraph + Twitter tags, and the page's canonical URL. TanStack Start
 * dedupes meta by name/property (leaf route wins), so these cleanly override
 * the site-wide defaults set in __root.tsx. Canonical links are emitted only
 * here — never in the root — so each page has exactly one.
 */
export function seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
