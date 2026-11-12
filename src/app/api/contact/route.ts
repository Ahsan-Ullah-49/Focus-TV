import { isIP } from "node:net";
import {
  CONTACT_EMAIL,
  CONTACT_FIELD_LIMITS,
  INQUIRY_TYPES,
  MEETING_REQUEST,
} from "@/components/pages/Contact/contact.config";

const MAX_REQUEST_BYTES = 16 * 1024;
const ALLOWED_INQUIRIES = new Set<string>([...INQUIRY_TYPES, MEETING_REQUEST]);
const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const SUBMISSION_KEY_PATTERN = /^\d{1,10}(?:-\d{1,10}){3}$/;
const INVALID_ENQUIRY =
  "Please check your name, email address and enquiry details, then try again.";
const UNAVAILABLE = "We couldn't send your enquiry right now. Please try again in a moment.";

const LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_CLIENT_ATTEMPTS = 5;
const MAX_INSTANCE_ATTEMPTS = 30;
const attemptsByClient = new Map<string, number>();
let windowEnd = 0;
let instanceAttempts = 0;

function errorResponse(status: number, message: string, headers?: HeadersInit) {
  return Response.json({ ok: false, message }, { status, headers });
}

function isSameOrigin(request: Request) {
  const { headers } = request;
  const origin = headers.get("origin");
  const site = headers.get("sec-fetch-site");
  if (!origin || (site && site !== "same-origin")) return false;

  // Use the public host when the Node app is reached through a reverse proxy.
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? new URL(request.url).host;
  try {
    return new URL(origin).host === host.split(",")[0].trim();
  } catch {
    return false;
  }
}

async function readEnquiry(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;

  // Bound chunked requests too, since they can omit Content-Length.
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    const data: unknown = JSON.parse(body + decoder.decode());
    return validateEnquiry(data);
  } catch {
    return null;
  }
}

function validLine(value: string | null, limit: number): value is string {
  return value !== null && value.length <= limit && !/[\r\n]/.test(value) && !value.includes("\0");
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateEnquiry(data: unknown) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  const fields = data as Record<string, unknown>;
  const line = (field: string) => {
    const value = fields[field];
    if (value === undefined) return "";
    return typeof value === "string" ? value.trim() : null;
  };

  if (line("companyWebsite") !== "") return null;
  const name = line("name");
  const email = line("email");
  const phone = line("phone");
  const inquiry = line("inquiry");
  const date = line("date");
  const time = line("time");
  const timezone = line("timezone");
  const message = fields.message;

  if (!name || !validLine(name, CONTACT_FIELD_LIMITS.name)) return null;
  if (!email || email.length > CONTACT_FIELD_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return null;
  }
  if (!inquiry || !ALLOWED_INQUIRIES.has(inquiry)) return null;
  if (!validLine(phone, CONTACT_FIELD_LIMITS.phone)) return null;
  if (!validLine(timezone, CONTACT_FIELD_LIMITS.timezone)) return null;
  if (date === null || (date && !validDate(date))) return null;
  if (time === null || (time && !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time))) return null;
  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > CONTACT_FIELD_LIMITS.message ||
    message.includes("\0")
  ) {
    return null;
  }

  return { name, email, phone, inquiry, date, time, timezone, message };
}

function retryAfter(request: Request) {
  const now = Date.now();
  if (now >= windowEnd) {
    windowEnd = now + LIMIT_WINDOW_MS;
    instanceAttempts = 0;
    attemptsByClient.clear();
  }

  const forwarded =
    (process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for") : null) ??
    request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",").at(-1)?.trim();
  const client = ip && isIP(ip) ? ip : "unknown";
  const clientAttempts = attemptsByClient.get(client) ?? 0;

  // The instance cap also bounds the map when requests arrive from many addresses.
  if (clientAttempts >= MAX_CLIENT_ATTEMPTS || instanceAttempts >= MAX_INSTANCE_ATTEMPTS) {
    return Math.ceil((windowEnd - now) / 1000);
  }

  attemptsByClient.set(client, clientAttempts + 1);
  instanceAttempts += 1;
  return 0;
}

function formatEnquiry(enquiry: NonNullable<ReturnType<typeof validateEnquiry>>) {
  const { name, email, phone, inquiry, date, time, timezone, message } = enquiry;
  const preferences = [
    ...(date ? [`Preferred date: ${date}`] : []),
    ...(time ? [`Preferred time: ${time}`] : []),
    ...(timezone ? [`Time zone: ${timezone}`] : []),
  ];

  return [
    "New enquiry from the Focus TV website",
    "",
    `Enquiry type: ${inquiry}`,
    "",
    "Contact details",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    ...(preferences.length ? ["", "Meeting preferences", ...preferences] : []),
    "",
    "Message",
    message,
  ].join("\n");
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return errorResponse(403, "Please submit this enquiry from the Focus TV website.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return errorResponse(415, INVALID_ENQUIRY);
  }
  if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) {
    return errorResponse(413, INVALID_ENQUIRY);
  }

  const key = request.headers.get("idempotency-key");
  if (!key || !SUBMISSION_KEY_PATTERN.test(key)) return errorResponse(400, INVALID_ENQUIRY);
  const enquiry = await readEnquiry(request);
  if (!enquiry) return errorResponse(400, INVALID_ENQUIRY);

  const apiKey = process.env.MAIL_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return errorResponse(503, UNAVAILABLE);

  const wait = retryAfter(request);
  if (wait) {
    return errorResponse(429, "Too many attempts. Please wait a few minutes and try again.", {
      "Retry-After": String(wait),
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `focustv-contact/${key}`,
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: enquiry.email,
        subject: `Focus TV website — ${enquiry.inquiry}`,
        text: formatEnquiry(enquiry),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("[contact] Email provider returned", response.status);
      return errorResponse(502, UNAVAILABLE);
    }
    const result: { id?: unknown } = await response.json();
    if (typeof result.id !== "string" || !result.id) {
      return errorResponse(502, UNAVAILABLE);
    }
    return Response.json({ ok: true });
  } catch {
    console.error("[contact] Email provider request failed");
    return errorResponse(502, UNAVAILABLE);
  }
}
