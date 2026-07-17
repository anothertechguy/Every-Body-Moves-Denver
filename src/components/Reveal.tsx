import type { CSSProperties, ReactNode } from "react";

/**
 * Progressive-enhancement reveal. Content is rendered fully visible on the
 * server and stays visible with zero JavaScript — the entrance is driven
 * purely by native CSS scroll-driven animations (see `.reveal` in styles.css),
 * which run off the main thread and no-op gracefully where unsupported. This
 * keeps first paint instant and the largest contentful paint un-gated.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Lightweight depth wrapper. Real parallax previously ran a perpetual
 * requestAnimationFrame loop; that cost has been removed in favour of static
 * layout (the visual depth comes from layered shadows and gradients instead),
 * keeping scrolling smooth and battery-friendly.
 */
export function Parallax({
  children,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
