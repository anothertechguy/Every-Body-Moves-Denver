// Exercise the Pages Function handler directly with a stubbed Resend endpoint.
const mod = await import("../api/contact.ts");
const handler = mod.onRequestPost;
const env = {
  RESEND_API_KEY: "test",
  CONTACT_TO: "cassie@everybodymovesco.com",
  CONTACT_FROM: "Every Body Moves <noreply@send.everybodymovesco.com>",
};

let sends = [];
let mode = "ok";
globalThis.fetch = async (url, init) => {
  sends.push(JSON.parse(init.body));
  if (mode === "fail500") return new Response("upstream boom", { status: 500 });
  if (mode === "fail400") return new Response('{"message":"bad from"}', { status: 400 });
  return new Response('{"id":"x"}', { status: 200 });
};
const post = (body) =>
  handler({
    request: new Request("https://x/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
    env,
  });
const good = {
  kind: "contact",
  name: "Jane Tester",
  email: "jane@example.com",
  phone: "7205551234",
  interest: "Senior community programming",
  message: "Hi <b>there</b> & hello",
  elapsedMs: 9000,
};

let pass = 0,
  fail = 0;
const check = (label, cond, extra = "") => {
  if (cond) {
    pass++;
    console.log("  ✓", label);
  } else {
    fail++;
    console.log("  ✗", label, extra);
  }
};

console.log("1. Happy path");
sends = [];
let r = await post(good);
let j = await r.json();
check("returns 200 + ok", r.status === 200 && j.ok === true, JSON.stringify(j));
check("sent 2 emails (notify + auto-reply)", sends.length === 2, `got ${sends.length}`);
check("notification goes to Cassie", sends[0].to[0] === "cassie@everybodymovesco.com");
check("reply_to is the lead", sends[0].reply_to === "jane@example.com");
check("subject has name", sends[0].subject.includes("Jane Tester"));
check("includes message field", sends[0].text.includes("Hi <b>there</b> & hello"));
check("HTML is escaped", sends[0].html.includes("&lt;b&gt;") && sends[0].html.includes("&amp;"));
check("auto-reply goes to lead", sends[1].to[0] === "jane@example.com");

console.log("2. Validation");
r = await post({ ...good, name: "" });
check("empty name -> 422", r.status === 422);
r = await post({ ...good, email: "nope" });
check("bad email -> 422", r.status === 422);
r = await post({ ...good, email: "a@b.co" });
check("short valid email ok", (await r).status === 200);

console.log("3. Spam traps");
sends = [];
r = await post({ ...good, company: "spam co" });
j = await r.json();
check("honeypot -> silently accepted, no email", j.ok === true && sends.length === 0);
sends = [];
r = await post({ ...good, elapsedMs: 200 });
j = await r.json();
check(
  "too-fast -> STILL DELIVERED (never drop a real lead)",
  j.ok === true && sends.length === 2,
  "sent " + sends.length,
);
check(
  "too-fast -> flagged in subject",
  sends[0] && sends[0].subject.startsWith("[possible spam]"),
  sends[0] && sends[0].subject,
);
sends = [];
await post({ ...good, elapsedMs: 9000 });
check("normal speed -> not flagged", sends[0] && !sends[0].subject.includes("possible spam"));

console.log("4. Failure handling");
mode = "fail500";
sends = [];
r = await post(good);
j = await r.json();
check("upstream 5xx -> 502 + ok:false", r.status === 502 && j.ok === false, JSON.stringify(j));
check("retried 3x on 5xx", sends.length === 3, `got ${sends.length}`);
mode = "fail400";
sends = [];
r = await post(good);
check("upstream 4xx -> no pointless retry", sends.length === 1, `got ${sends.length}`);
mode = "ok";

console.log("5. Misconfiguration");
r = await handler({ request: new Request("https://x", { method: "POST", body: "{}" }), env: {} });
check("missing env -> 500, never a false success", r.status === 500);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
