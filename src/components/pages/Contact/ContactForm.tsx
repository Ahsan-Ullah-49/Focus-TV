"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { CONTACT_EMAIL, HOME_CONTACT_ID } from "./contact.config";
import styles from "./Contact.module.css";

const INQUIRY_TYPES = [
  "General enquiry",
  "Partnership & sponsorship",
  "Production enquiry",
  "Guest enquiry",
] as const;

const MEETING_REQUEST = "Meeting request";
type ContactFormVariant = "page" | "home";

export function ContactForm({ variant = "page" }: { variant?: ContactFormVariant }) {
  return variant === "home" ? (
    <EnquiryForm initialInquiry={INQUIRY_TYPES[0]} variant="home" />
  ) : (
    <MeetingAwareForm />
  );
}

function MeetingAwareForm() {
  const searchParams = useSearchParams();
  const initialInquiry =
    searchParams.get("enquiry") === "meeting" ? MEETING_REQUEST : INQUIRY_TYPES[0];

  return <EnquiryForm key={initialInquiry} initialInquiry={initialInquiry} variant="page" />;
}

function EnquiryForm({
  initialInquiry,
  variant,
}: {
  initialInquiry: string;
  variant: ContactFormVariant;
}) {
  const [inquiry, setInquiry] = useState(initialInquiry);
  const [draftLink, setDraftLink] = useState<string | null>(null);
  const onHome = variant === "home";
  const meeting = !onHome && inquiry === MEETING_REQUEST;
  const prefix = onHome ? "home-contact" : "contact";
  const headingId = onHome ? "home-enquiry-heading" : "enquiry-heading";
  const deliveryId = `${prefix}-delivery`;

  useEffect(() => {
    if (!onHome) return;

    const hash = `#${HOME_CONTACT_ID}`;
    const section = document.getElementById(HOME_CONTACT_ID);
    let pending: AbortController | undefined;

    const alignContact = () => {
      pending?.abort();
      if (!section || window.location.hash !== hash) return;

      const intent = new AbortController();
      pending = intent;
      const cancel = () => intent.abort();
      const options = { once: true, passive: true, signal: intent.signal };
      window.addEventListener("pointerdown", cancel, options);
      window.addEventListener("wheel", cancel, options);
      window.addEventListener("keydown", cancel, options);

      // A direct hash can scroll before the fonts and galleries above the form settle.
      void document.fonts.ready.then(() => {
        if (intent.signal.aborted) return;
        requestAnimationFrame(() => {
          if (!intent.signal.aborted && window.location.hash === hash) {
            section.scrollIntoView({ block: "start", behavior: "instant" });
          }
          cancel();
        });
      });
    };

    alignContact();
    window.addEventListener("hashchange", alignContact);
    return () => {
      pending?.abort();
      window.removeEventListener("hashchange", alignContact);
    };
  }, [onHome]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ["name", "message"]) {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.setCustomValidity(input.value.trim() ? "" : "Please complete this field.");
      }
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const name = field("name");
    const phone = field("phone");
    const message = String(data.get("message") ?? "");
    const contactDetails = [
      `Name: ${name}`,
      `Email: ${field("email")}`,
      ...(phone ? [`Phone: ${phone}`] : []),
    ];
    const preferences = [
      ["Preferred date", field("date")],
      ["Preferred time", field("time")],
      ["Time zone", field("timezone")],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    const subject = meeting ? `Focus TV meeting request — ${name}` : `FocusTV — ${inquiry}`;
    const lines = meeting
      ? [
          "Hello Focus TV team,",
          "",
          "I'd like to arrange a meeting.",
          "",
          "Contact details",
          ...contactDetails,
          ...(preferences.length ? ["", "Meeting preferences", ...preferences] : []),
          "",
          "Message",
          message,
          "",
          "Kind regards,",
          name,
        ]
      : [...contactDetails, `Enquiry: ${inquiry}`, "", message.trim()];

    // Mailto bodies use CRLF, including line breaks already typed into the message.
    const body = lines.join("\n").replace(/\r\n?|\n/g, "\r\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraftLink(href);
    window.location.assign(href);
  }

  return (
    <form
      className={onHome ? `${styles.form} ${styles.homeForm}` : styles.form}
      onSubmit={handleSubmit}
      onChange={() => setDraftLink(null)}
      aria-labelledby={headingId}
      aria-describedby={deliveryId}
    >
      <div className={styles.formHeading}>
        {!onHome && <span className={styles.index}>01 /</span>}
        <h2 id={headingId}>{onHome ? "Send an enquiry" : "Tell us what you have in mind."}</h2>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-name`}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-name`}
            name="name"
            autoComplete="name"
            placeholder="Full name"
            required
            maxLength={100}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-email`}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-phone`}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={`${prefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Include country code"
            maxLength={40}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-inquiry`}>I&apos;d like to talk about</label>
          <select
            id={`${prefix}-inquiry`}
            name="inquiry"
            value={inquiry}
            onChange={(event) => setInquiry(event.target.value)}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
            {!onHome && <option>{MEETING_REQUEST}</option>}
          </select>
        </div>
      </div>

      {meeting && (
        <fieldset className={styles.meeting}>
          <legend>
            A time that suits you <span className={styles.optional}>(optional)</span>
          </legend>
          <p>Share a preference. We&apos;ll confirm availability by email.</p>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="contact-date">Preferred date</label>
              <input id="contact-date" name="date" type="date" />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-time">Preferred time</label>
              <input id="contact-time" name="time" type="time" />
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="contact-timezone">Your time zone</label>
              <input
                id="contact-timezone"
                name="timezone"
                placeholder="e.g. Perth, Australia (AWST)"
                maxLength={80}
              />
            </div>
          </div>
        </fieldset>
      )}

      <div className={`${styles.field} ${styles.message}`}>
        <label htmlFor={`${prefix}-message`}>
          Your message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={5}
          placeholder="A little about your idea, project or question…"
          required
          maxLength={1800}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          data-lenis-prevent
        />
      </div>

      <div className={styles.formActions}>
        <p id={deliveryId}>
          {meeting
            ? "Review and send your prefilled meeting request from your email app."
            : "This opens a draft in your email app. Review your message and send it from there."}
        </p>
        <Button type="submit" variant="primary" className={styles.submit}>
          {meeting ? "Open meeting email draft" : "Open email draft"}{" "}
          <span aria-hidden="true">↗</span>
        </Button>
      </div>
      <p className={styles.requiredNote}>Fields marked * are required.</p>

      {draftLink && (
        <div className={styles.draftNotice} role="status">
          <p>Your draft is ready to review and send in your email app.</p>
          <p>
            If your email app didn&apos;t open, <a href={draftLink}>open the draft again</a> or
            email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      )}
    </form>
  );
}
