"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { CONTACT_EMAIL } from "./contact.config";
import styles from "./Contact.module.css";

const INQUIRY_TYPES = [
  "General enquiry",
  "Partnership & sponsorship",
  "Production enquiry",
  "Guest enquiry",
  "Meeting request",
] as const;

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialInquiry =
    searchParams.get("enquiry") === "meeting" ? "Meeting request" : INQUIRY_TYPES[0];

  return <EnquiryForm key={initialInquiry} initialInquiry={initialInquiry} />;
}

function EnquiryForm({ initialInquiry }: { initialInquiry: string }) {
  const [inquiry, setInquiry] = useState(initialInquiry);
  const [draftLink, setDraftLink] = useState<string | null>(null);

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
    const lines = [
      `Name: ${field("name")}`,
      `Email: ${field("email")}`,
      ...(field("phone") ? [`Phone: ${field("phone")}`] : []),
      `Enquiry: ${inquiry}`,
      ...(inquiry === "Meeting request"
        ? [
            ...(field("date") ? [`Preferred date: ${field("date")}`] : []),
            ...(field("time") ? [`Preferred time: ${field("time")}`] : []),
            ...(field("timezone") ? [`Time zone: ${field("timezone")}`] : []),
          ]
        : []),
      "",
      field("message"),
    ];
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`FocusTV — ${inquiry}`)}&body=${encodeURIComponent(lines.join("\n"))}`;

    setDraftLink(href);
    // The visitor reviews and sends in their email app; this does not report a server submission.
    window.location.href = href;
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={() => setDraftLink(null)}
      aria-labelledby="enquiry-heading"
      aria-describedby="contact-delivery"
    >
      <div className={styles.formHeading}>
        <span className={styles.index}>01 /</span>
        <h2 id="enquiry-heading">Tell us what you have in mind.</h2>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="contact-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            required
            maxLength={100}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-phone">
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Include country code"
            maxLength={40}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-inquiry">I&apos;d like to talk about</label>
          <select
            id="contact-inquiry"
            name="inquiry"
            value={inquiry}
            onChange={(event) => setInquiry(event.target.value)}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {inquiry === "Meeting request" && (
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
        <label htmlFor="contact-message">
          Your message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
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
        <p id="contact-delivery">
          This opens a draft in your email app. Review your message and send it from there.
        </p>
        <Button type="submit" variant="primary" className={styles.submit}>
          Open email draft <span aria-hidden="true">↗</span>
        </Button>
      </div>
      <p className={styles.requiredNote}>Fields marked * are required.</p>

      {draftLink && (
        <div className={styles.draftNotice} role="status">
          <p>Your draft is ready. Your message has not been sent by this website.</p>
          <p>
            If your email app didn&apos;t open, <a href={draftLink}>open the draft again</a> or
            email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      )}
    </form>
  );
}
