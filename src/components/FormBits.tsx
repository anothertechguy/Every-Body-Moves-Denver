import { AlertCircle } from "lucide-react";

/**
 * Bot trap. Hidden from sight and from assistive tech, and skipped in the tab
 * order — a real visitor can never fill it in, so any submission that carries a
 * value here is discarded server-side.
 */
export function HoneyPot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company-website">Company (leave blank)</label>
      <input id="company-website" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/**
 * Shown when a submission genuinely failed, with the direct contact details as
 * a fallback so an enquiry is never lost just because the form had a bad moment.
 */
export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-foreground"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
      <span>{message}</span>
    </div>
  );
}
