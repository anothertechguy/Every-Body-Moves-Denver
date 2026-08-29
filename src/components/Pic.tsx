/**
 * Responsive photo backed by the pre-generated variants in /public/images
 * (see scripts/optimize-images.mjs). Serves AVIF at the right width for the
 * viewport with a compressed JPEG fallback — the difference between shipping
 * ~15 KB and ~180 KB on mobile.
 */
import { asset } from "@/lib/assets";

const VARIANT_WIDTHS = [480, 800, 1200, 1600];

// Widest generated variant per photo (sources narrower than 1600 skip that size).
const MAX_WIDTH: Record<string, number> = {
  "hero-home": 1600,
  community: 1200,
  "nursing-homes": 1600,
  "private-coaching": 1600,
  "special-needs": 1600,
  cassie: 1600,
};

export type PicName = keyof typeof MAX_WIDTH;

function avifSrcSetFor(name: PicName) {
  return VARIANT_WIDTHS.filter((w) => w <= (MAX_WIDTH[name] ?? 1600))
    .map((w) => `${asset(`images/${name}-${w}.avif`)} ${w}w`)
    .join(", ");
}

/**
 * Head <link rel="preload"> descriptor for a priority Pic, so the LCP image
 * starts downloading while the HTML is still streaming instead of after the
 * parser reaches the <img>. Pair with <Pic priority> for the same name.
 */
export function picPreload(name: PicName, sizes = "(min-width: 1024px) 50vw, 100vw") {
  return {
    rel: "preload",
    as: "image",
    type: "image/avif",
    imageSrcSet: avifSrcSetFor(name),
    imageSizes: sizes,
    fetchPriority: "high",
  } as const;
}

export function Pic({
  name,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  width,
  height,
  priority = false,
}: {
  name: PicName;
  alt: string;
  className?: string;
  sizes?: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  const avifSrcSet = avifSrcSetFor(name);

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={asset(`images/${name}.jpg`)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
        className={className}
      />
    </picture>
  );
}
