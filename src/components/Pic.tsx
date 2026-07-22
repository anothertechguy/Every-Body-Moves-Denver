/**
 * Responsive photo backed by the pre-generated variants in /public/images
 * (see scripts/optimize-images.mjs). Serves AVIF at the right width for the
 * viewport with a compressed JPEG fallback — the difference between shipping
 * ~15 KB and ~180 KB on mobile.
 */
const VARIANT_WIDTHS = [480, 800, 1200, 1600];

// Widest generated variant per photo (sources narrower than 1600 skip that size).
const MAX_WIDTH: Record<string, number> = {
  "hero-home": 1600,
  community: 1200,
  "nursing-homes": 1600,
  "private-coaching": 1600,
  "special-needs": 1600,
};

export type PicName = keyof typeof MAX_WIDTH;

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
  const avifSrcSet = VARIANT_WIDTHS.filter((w) => w <= (MAX_WIDTH[name] ?? 1600))
    .map((w) => `/images/${name}-${w}.avif ${w}w`)
    .join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={`/images/${name}.jpg`}
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
