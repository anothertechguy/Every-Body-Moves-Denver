/**
 * Posts a form to the contact endpoint.
 *
 * Returns a plain result rather than throwing, so callers can show an honest
 * success or failure state. We only ever report success when the server
 * confirms the notification was actually sent — a form that says "sent" for a
 * message that never arrived is the one failure mode worth designing against.
 */
export type SubmitResult = { ok: true } | { ok: false; message: string };

const GENERIC_FAILURE =
  "We couldn't send that just now. Please email cassie@everybodymovesco.com or call (720) 463-3385 — we don't want to miss you.";

export async function submitForm(
  form: HTMLFormElement,
  kind: "contact" | "instructor",
  startedAt: number,
): Promise<SubmitResult> {
  const payload: Record<string, string | number> = {
    kind,
    elapsedMs: Date.now() - startedAt,
  };
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value === "string") payload[key] = value;
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (res.ok && data?.ok) return { ok: true };

    if (data?.error === "email_invalid") {
      return { ok: false, message: "That email address doesn't look right — could you check it?" };
    }
    if (data?.error === "name_required") {
      return { ok: false, message: "Please add your name so we know who we're replying to." };
    }
    return { ok: false, message: GENERIC_FAILURE };
  } catch {
    // Network failure, offline, blocked request — never silently swallow it.
    return { ok: false, message: GENERIC_FAILURE };
  }
}
