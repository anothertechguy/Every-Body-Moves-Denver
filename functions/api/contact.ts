/**
 * Cloudflare Pages Function — handles both the contact form and the instructor
 * application. Runs at POST /api/contact.
 *
 * Reliability notes (this is the only path a lead can arrive through, so it is
 * deliberately defensive):
 *   - Every field is re-validated server-side; the browser is never trusted.
 *   - The notification send is retried on transient/5xx failures.
 *   - The caller only sees success if the notification actually went out, so the
 *     UI can never show "sent" for a message that vanished.
 *   - Reply-To is the person who filled in the form, so replying from the
 *     Workspace inbox goes straight back to the lead.
 *   - The auto-reply to the submitter is best-effort: if it fails the request
 *     still succeeds, because the lead has already reached Cassie.
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

type Payload = Record<string, unknown>;

const MAX_FIELD = 5000;
const RESEND_ENDPOINT = "https://api.resend.com/emails";

function str(v: unknown, max = MAX_FIELD): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function isEmail(v: string): boolean {
  // Deliberately permissive: the goal is to reject obvious junk, not to
  // adjudicate RFC 5322. A real address that looks odd should still get through.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

/** POSTs to Resend, retrying once on network errors and 5xx/429. */
async function sendEmail(
  env: Env,
  message: Record<string, unknown>,
  attempts = 3,
): Promise<{ ok: true } | { ok: false; detail: string }> {
  let lastDetail = "unknown error";
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (res.ok) return { ok: true };
      lastDetail = `${res.status} ${(await res.text()).slice(0, 300)}`;
      // 4xx (other than rate limiting) is a real problem with our request —
      // retrying an identical payload will not help.
      if (res.status < 500 && res.status !== 429) return { ok: false, detail: lastDetail };
    } catch (err) {
      lastDetail = err instanceof Error ? err.message : String(err);
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
  }
  return { ok: false, detail: lastDetail };
}

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = context;

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error("contact: missing environment configuration");
    return json({ ok: false, error: "server_not_configured" }, 500);
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Spam trap: a hidden field that is invisible to humans and skipped in the
  // tab order, so a value here means a bot. This is the only check allowed to
  // discard a submission outright, because its false-positive rate is zero.
  if (str(data.company)) return json({ ok: true, skipped: true });

  // A very fast completion *suggests* automation, but a real person using
  // autofill could conceivably trip it — so this only flags the email, never
  // drops it. Losing one genuine enquiry costs far more than forwarding spam.
  const elapsed = Number(data.elapsedMs);
  const suspiciouslyFast = Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 1200;

  const kind = str(data.kind) === "instructor" ? "instructor" : "contact";
  const name = str(data.name, 200);
  const email = str(data.email, 254);

  if (!name) return json({ ok: false, error: "name_required" }, 422);
  if (!isEmail(email)) return json({ ok: false, error: "email_invalid" }, 422);

  const fieldLabels: Record<string, string> = {
    phone: "Phone",
    interest: "Interested in",
    message: "Message",
    city: "City / area",
    classes: "Classes they'd lead",
    availability: "Availability",
    resume: "Resume / profile",
    experience: "Certifications & experience",
  };

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
  ];
  for (const [key, label] of Object.entries(fieldLabels)) {
    const value = str(data[key]);
    if (value) rows.push([label, value]);
  }

  const heading = kind === "instructor" ? "New instructor application" : "New website enquiry";
  const flag = suspiciouslyFast ? "[possible spam] " : "";
  const subject =
    kind === "instructor"
      ? `${flag}Instructor application — ${name}`
      : `${flag}Website enquiry — ${name}`;

  const textBody = [
    heading,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "— Sent from the everybodymovesco.com website",
  ].join("\n");

  const htmlBody = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#14243d;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(heading)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:6px 16px 6px 0;vertical-align:top;color:#5b6a7e;white-space:nowrap">${escapeHtml(k)}</td>
                 <td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${escapeHtml(v)}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#5b6a7e">
        Reply directly to this email to respond to ${escapeHtml(name)}.
      </p>
    </div>`;

  const sent = await sendEmail(env, {
    from: env.CONTACT_FROM,
    to: [env.CONTACT_TO],
    reply_to: email,
    subject,
    text: textBody,
    html: htmlBody,
  });

  if (!sent.ok) {
    // Logged to the Cloudflare dashboard so a failure is diagnosable rather
    // than silent. The caller gets an honest error and the fallback contact
    // details shown in the UI.
    console.error("contact: notification failed:", sent.detail);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  // Best-effort confirmation to the person who wrote in. A failure here must
  // not fail the request — the enquiry itself has already been delivered.
  const confirmationText =
    kind === "instructor"
      ? "Thanks for applying to teach with Every Body Moves! We've received your application and will be in touch soon."
      : "Thanks for reaching out to Every Body Moves! We've received your message and will get back to you within one business day.";

  const confirmation = await sendEmail(
    env,
    {
      from: env.CONTACT_FROM,
      to: [email],
      reply_to: env.CONTACT_TO,
      subject:
        kind === "instructor"
          ? "We received your application — Every Body Moves"
          : "We received your message — Every Body Moves",
      text: `Hi ${name},\n\n${confirmationText}\n\n— Every Body Moves\ncassie@everybodymovesco.com\n(720) 463-3385`,
      html: `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#14243d;line-height:1.6">
               <p>Hi ${escapeHtml(name)},</p>
               <p>${escapeHtml(confirmationText)}</p>
               <p style="margin-top:24px">— Every Body Moves<br>
                 <a href="mailto:cassie@everybodymovesco.com" style="color:#c8551a">cassie@everybodymovesco.com</a><br>
                 (720) 463-3385
               </p>
             </div>`,
    },
    1,
  );
  if (!confirmation.ok) console.warn("contact: auto-reply failed:", confirmation.detail);

  return json({ ok: true });
};
