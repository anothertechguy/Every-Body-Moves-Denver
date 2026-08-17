export const SITE_URL = "https://ebmcolorado.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;

function toUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Per-page SEO head builder. Emits the title/description pair, matching
 * OpenGraph + Twitter tags, and the page's canonical URL. TanStack Start
 * dedupes meta by name/property (leaf route wins), so these cleanly override
 * the site-wide defaults set in __root.tsx. Canonical links are emitted only
 * here — never in the root — so each page has exactly one.
 *
 * `breadcrumbs` (optional, omit on the homepage) emits a BreadcrumbList so
 * search results can show the page's place in the site instead of a raw URL.
 * `jsonLd` (optional) attaches extra structured data blocks, e.g. a Service
 * schema on a program page — pass plain schema.org objects, they're
 * serialized as-is.
 */
export function seo({
  title,
  description,
  path,
  breadcrumbs,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: { name: string; path: string }[];
  jsonLd?: Record<string, unknown>[];
}) {
  const url = toUrl(path);

  const scripts: { type: string; children: string }[] = [];
  if (breadcrumbs?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: toUrl(b.path),
        })),
      }),
    });
  }
  for (const block of jsonLd ?? []) {
    scripts.push({ type: "application/ld+json", children: JSON.stringify(block) });
  }

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
    ...(scripts.length ? { scripts } : {}),
  };
}
