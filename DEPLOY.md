# Launch runbook — everybodymovesco.com

Everything here is a one-time setup. Steps marked **[Sean]** need an account or
dashboard action; the rest is already in the codebase.

---

## 1. Resend — the email sender **[Sean]**

The contact and instructor forms POST to a Cloudflare Function, which sends the
email through Resend.

**Why a subdomain matters:** Cassie's email is Google Workspace. We send from
`send.everybodymovesco.com`, which gets its _own_ SPF/DKIM records. Her Workspace
MX records and root SPF are never touched, so **her existing email cannot break**.

1. Create an account at <https://resend.com> (free tier: 3,000 emails/month —
   far more than this site will use).
2. **Domains → Add Domain** → enter `send.everybodymovesco.com`.
3. Resend shows a few DNS records. Add them in Cloudflare DNS.
   - Set each one to **DNS only** (grey cloud), _not_ proxied.
   - These are all on the `send.` subdomain — do not touch the root `MX`,
     root `TXT`/SPF, or anything else Google Workspace uses.
4. Wait for Resend to show **Verified** (usually minutes).
5. **API Keys → Create** with _Sending access_ only. Copy it — shown once.

---

## 2. Cloudflare Pages **[Sean]**

**Create the project**

- Workers & Pages → Create → Pages → connect the GitHub repo.

**Build settings**

| Setting                | Value                                         |
| ---------------------- | --------------------------------------------- |
| Build command          | `PAGES_BUILD=true npm run build`              |
| Build output directory | `dist/client`                                 |
| Node version           | `22` (env var `NODE_VERSION` = `22`; react-start requires >=22.12) |

`PAGES_BUILD=true` produces the fully prerendered static site. The
`functions/` folder is picked up automatically for `/api/contact`.

**Environment variables** (Settings → Environment variables). Add to
**both** Production and Preview:

| Name             | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY` | the key from step 1.5                                  |
| `CONTACT_TO`     | `cassie@everybodymovesco.com`                          |
| `CONTACT_FROM`   | `Every Body Moves <noreply@send.everybodymovesco.com>` |

`CONTACT_FROM` must be on the domain verified in Resend, or sending fails.
Mark `RESEND_API_KEY` as **encrypted**.

---

## 3. Domain **[Sean]**

1. Pages → Custom domains → add `everybodymovesco.com` **and**
   `www.everybodymovesco.com`.
2. Redirect www → apex so there is one canonical host (all canonical tags point
   at the apex). Rules → Redirect Rules:
   - If hostname equals `www.everybodymovesco.com`
   - Then 301 to `https://everybodymovesco.com/${http.request.uri.path}`
3. Confirm HTTPS is active and "Always Use HTTPS" is on.

---

## 4. Post-launch checks

Run through these on the live domain:

- [ ] All 9 pages load over `https://everybodymovesco.com`
- [ ] `www.` redirects to the apex
- [ ] **Send a real test through the contact form** — confirm it lands in
      Cassie's inbox, and that hitting Reply addresses the submitter
- [ ] Confirm the auto-reply arrives at the address used
- [ ] **Send one to a Gmail address and check it is not in spam**
- [ ] Submit the instructor form too (different subject line)
- [ ] `https://everybodymovesco.com/sitemap.xml` loads and lists 9 URLs
- [ ] `https://everybodymovesco.com/robots.txt` loads

## 5. SEO activation **[Sean]**

- [ ] Google Search Console → add `everybodymovesco.com` → verify (easiest via a
      Cloudflare DNS TXT record) → submit `/sitemap.xml`
- [ ] Bing Webmaster Tools (optional; can import from Search Console)
- [ ] **Google Business Profile** — for a local service business this drives more
      enquiries than anything on the site. Use the exact same name, phone and
      service areas as the website so they corroborate each other: - Every Body Moves · (720) 463-3385 · cassie@everybodymovesco.com - Service areas: greater Denver, CO and Utah Valley, UT - Service-area business (no storefront address shown)

---

## Troubleshooting the forms

The site never claims a message was sent unless the email actually went out. If
someone reports a failure:

1. Cloudflare → Pages project → **Functions → Real-time logs**, submit the form
   again and watch. `contact: notification failed:` includes the reason from
   Resend.
2. Resend → **Emails** shows every send, with delivery/bounce status.

Common causes:

| Symptom in logs               | Cause                                                              |
| ----------------------------- | ------------------------------------------------------------------ |
| `server_not_configured`       | An env var is missing — check all three, on the right environment  |
| `403` / `domain not verified` | Resend DNS not verified, or `CONTACT_FROM` uses a different domain |
| `422` from Resend             | `CONTACT_FROM` isn't a valid `Name <address>`                      |

After changing environment variables, **redeploy** — Functions read them at
deploy time.

## Local checks

```bash
npm run test:contact   # 19 assertions against the form handler
npm run build          # SSR build
PAGES_BUILD=true npm run build   # static build + sitemap, what Cloudflare runs
```
