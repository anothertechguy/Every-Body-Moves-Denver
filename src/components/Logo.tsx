import { Link } from "@tanstack/react-router";

type Tone = "light" | "dark";

/**
 * The Every Body Moves figure mark — a seated figure resting in an open bowl,
 * rebuilt as vector geometry so it stays razor-sharp at any size and adds zero
 * network weight.
 */
export function BrandMark({
  className = "h-10 w-10",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  // On dark surfaces the bowl + lower body invert so the mark keeps its contrast.
  const bowl = tone === "dark" ? "var(--cream)" : "var(--ink)";
  const bodyLower = tone === "dark" ? "var(--ink)" : "#ffffff";

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Every Body Moves"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* open bowl / base */}
      <path d="M2 60 A58 58 0 0 0 118 60 Z" fill={bowl} />
      {/* seated body — lower half reads against the bowl */}
      <circle cx="60" cy="58" r="27" fill={bodyLower} />
      {/* seated body — upper half */}
      <path d="M33 58 A27 27 0 0 1 87 58 Z" fill="var(--orange)" />
      {/* head */}
      <circle cx="60" cy="18" r="14" fill="var(--marigold)" />
    </svg>
  );
}

/**
 * Full horizontal lockup: figure mark + stacked wordmark. Used in the header.
 */
export function Logo({ className = "", tone = "light" }: { className?: string; tone?: Tone }) {
  const ink = tone === "dark" ? "text-cream" : "text-ink";
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Every Body Moves — home"
    >
      <BrandMark
        tone={tone}
        className="h-11 w-11 shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-6"
      />
      <span className={`font-display font-extrabold leading-[0.92] tracking-tight ${ink}`}>
        <span className="block text-[0.98rem] uppercase">Every Body</span>
        <span className="block text-[0.98rem] uppercase">
          Moves
          <span className="text-orange">.</span>
        </span>
      </span>
    </Link>
  );
}
