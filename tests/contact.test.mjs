import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const compile = (file) =>
  ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;

const configCode = compile("../src/components/pages/Contact/contact.config.ts");
const routeCode = compile("../src/app/api/contact/route.ts");

function loadRoute({
  env = {},
  send = async () => {
    throw new Error("Unexpected email request");
  },
} = {}) {
  const config = { exports: {} };
  new Function("module", "exports", configCode)(config, config.exports);
  const route = { exports: {} };
  const requireRoute = (name) =>
    name === "@/components/pages/Contact/contact.config" ? config.exports : require(name);
  const processStub = {
    env: { MAIL_API_KEY: "test-key", CONTACT_FROM_EMAIL: "Focus TV <sender@example.com>", ...env },
  };
  new Function("module", "exports", "require", "process", "fetch", "console", routeCode)(
    route,
    route.exports,
    requireRoute,
    processStub,
    send,
    { error: () => {} }
  );
  return route.exports.POST;
}

const validEnquiry = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "",
  inquiry: "General enquiry",
  message: "Hello Focus TV",
  companyWebsite: "",
};

function request({ body = validEnquiry, headers = {} } = {}) {
  return new Request("https://focustv.tv/api/contact", {
    method: "POST",
    headers: {
      origin: "https://focustv.tv",
      "content-type": "application/json",
      "idempotency-key": "1-2-3-4",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("valid enquiries are sent to the configured recipient with reply-to and an idempotency key", async () => {
  let delivery;
  const post = loadRoute({
    send: async (url, options) => {
      delivery = { url, options, payload: JSON.parse(options.body) };
      return Response.json({ id: "mock-delivery-id" });
    },
  });
  const response = await post(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(delivery.url, "https://api.resend.com/emails");
  assert.deepEqual(delivery.payload.to, ["hammad@focustv.tv"]);
  assert.equal(delivery.payload.reply_to, validEnquiry.email);
  assert.match(delivery.payload.text, /Hello Focus TV/);
  assert.equal(delivery.options.headers["Idempotency-Key"], "focustv-contact/1-2-3-4");
});

test("meeting preferences are included when supplied", async () => {
  let payload;
  const post = loadRoute({
    send: async (_url, options) => {
      payload = JSON.parse(options.body);
      return Response.json({ id: "mock-delivery-id" });
    },
  });
  const response = await post(
    request({
      body: {
        ...validEnquiry,
        inquiry: "Meeting request",
        date: "2026-12-10",
        time: "14:30",
        timezone: "Perth",
      },
    })
  );
  assert.equal(response.status, 200);
  assert.match(payload.text, /Preferred date: 2026-12-10/);
  assert.match(payload.text, /Preferred time: 14:30/);
  assert.match(payload.text, /Time zone: Perth/);
});

test("invalid requests are rejected before an email is sent", async (t) => {
  const cases = [
    ["cross-origin", { headers: { origin: "https://other.example" } }, 403],
    ["cross-site fetch", { headers: { "sec-fetch-site": "cross-site" } }, 403],
    ["wrong content type", { headers: { "content-type": "text/plain" } }, 415],
    ["missing idempotency key", { headers: { "idempotency-key": "" } }, 400],
    ["malformed JSON", { body: "{" }, 400],
    ["empty name", { body: { ...validEnquiry, name: "  " } }, 400],
    ["invalid email", { body: { ...validEnquiry, email: "bad-email" } }, 400],
    ["header injection", { body: { ...validEnquiry, name: "A\nB" } }, 400],
    ["unknown enquiry", { body: { ...validEnquiry, inquiry: "Unknown" } }, 400],
    ["invalid date", { body: { ...validEnquiry, date: "2026-02-30" } }, 400],
    ["invalid time", { body: { ...validEnquiry, time: "25:00" } }, 400],
    ["honeypot", { body: { ...validEnquiry, companyWebsite: "spam" } }, 400],
    ["oversized message", { body: { ...validEnquiry, message: "a".repeat(1801) } }, 400],
    ["oversized content length", { headers: { "content-length": "16385" } }, 413],
    ["oversized streamed body", { body: "a".repeat(16385) }, 400],
  ];
  for (const [name, options, status] of cases) {
    await t.test(name, async () => {
      const post = loadRoute();
      assert.equal((await post(request(options))).status, status);
    });
  }
});

test("missing sender configuration returns an unavailable response", async () => {
  const post = loadRoute({ env: { MAIL_API_KEY: "" } });
  assert.equal((await post(request())).status, 503);
});

test("provider errors and malformed success responses are reported as failures", async (t) => {
  const cases = [
    ["provider rejects the request", async () => new Response("error", { status: 500 })],
    ["provider returns no id", async () => Response.json({})],
    [
      "provider request throws",
      async () => {
        throw new Error("network error");
      },
    ],
  ];
  for (const [name, send] of cases) {
    await t.test(name, async () => {
      const post = loadRoute({ send });
      assert.equal((await post(request())).status, 502);
    });
  }
});

test("rate limiting returns Retry-After after five attempts from one client", async () => {
  const post = loadRoute({ send: async () => Response.json({ id: "mock-delivery-id" }) });
  const options = { headers: { "x-forwarded-for": "192.0.2.1" } };
  for (let attempt = 0; attempt < 5; attempt++) {
    assert.equal((await post(request(options))).status, 200);
  }
  const response = await post(request(options));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("retry-after")) > 0);
});

test("the instance limit applies across different clients", async () => {
  const post = loadRoute({ send: async () => Response.json({ id: "mock-delivery-id" }) });
  for (let client = 1; client <= 30; client++) {
    const options = { headers: { "x-forwarded-for": `192.0.2.${client}` } };
    assert.equal((await post(request(options))).status, 200);
  }
  const response = await post(request({ headers: { "x-forwarded-for": "192.0.2.31" } }));
  assert.equal(response.status, 429);
});
