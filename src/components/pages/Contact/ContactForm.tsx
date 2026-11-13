"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  CONTACT_EMAIL,
  CONTACT_FIELD_LIMITS,
  CONTACT_FORM_ENDPOINT,
  INQUIRY_TYPES,
  MEETING_REQUEST,
} from "./contact.config";
import styles from "./Contact.module.css";

const SEND_ERROR = "We couldn't send your enquiry right now. Please try again in a moment.";
type ContactFormVariant = "page" | "compact";
type Submission = { status: "idle" | "sending" | "sent" } | { status: "error"; message: string };

export function ContactForm({
  variant = "page",
  meetingRequested = false,
  onMeetingChange,
}: {
  variant?: ContactFormVariant;
  meetingRequested?: boolean;
  onMeetingChange?: (requested: boolean) => void;
}) {
  const isCompact = variant === "compact";
  const [inquiry, setInquiry] = useState<string>(INQUIRY_TYPES[0]);
  const [submission, setSubmission] = useState<Submission>({ status: "idle" });
  const submitting = useRef(false);
  const lastAttempt = useRef<{ body: string; key: string } | null>(null);
  const prefix = isCompact ? "compact-contact" : "contact";
  const headingId = isCompact ? "compact-enquiry-heading" : "enquiry-heading";
  const deliveryId = `${prefix}-delivery`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    for (const name of ["name", "message"]) {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.setCustomValidity(input.value.trim() ? "" : "Please complete this field.");
      }
    }
    if (!form.reportValidity()) return;

    submitting.current = true;
    setSubmission({ status: "sending" });
    try {
      const body = JSON.stringify(Object.fromEntries(new FormData(form)));
      // Reuse the key when retrying the same enquiry after an uncertain response.
      const key =
        lastAttempt.current?.body === body
          ? lastAttempt.current.key
          : crypto.getRandomValues(new Uint32Array(4)).join("-");
      lastAttempt.current = { body, key };

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body,
        signal: AbortSignal.timeout(15000),
      });
      const result: { ok?: boolean; message?: string } | null = await response
        .json()
        .catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setSubmission({
          status: "error",
          message: typeof result?.message === "string" ? result.message : SEND_ERROR,
        });
        return;
      }

      // Preserve any new edits the visitor made while the previous message was sending.
      if (JSON.stringify(Object.fromEntries(new FormData(form))) === body) form.reset();
      lastAttempt.current = null;
      setSubmission({ status: "sent" });
    } catch {
      setSubmission({ status: "error", message: SEND_ERROR });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      id="contact-form"
      className={isCompact ? `${styles.form} ${styles.homeForm}` : styles.form}
      method="post"
      onSubmit={handleSubmit}
      onChange={() =>
        setSubmission((current) =>
          current.status === "sent" || current.status === "error" ? { status: "idle" } : current
        )
      }
      aria-busy={submission.status === "sending"}
      aria-labelledby={headingId}
      aria-describedby={deliveryId}
    >
      <div className={styles.formHeading}>
        {!isCompact && <span className={styles.index}>01 /</span>}
        <h2 id={headingId}>
          {meetingRequested
            ? "Arrange a meeting"
            : isCompact
              ? "Send an enquiry"
              : "Tell us what you have in mind."}
        </h2>
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
            maxLength={CONTACT_FIELD_LIMITS.name}
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
            maxLength={CONTACT_FIELD_LIMITS.email}
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
            maxLength={CONTACT_FIELD_LIMITS.phone}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-inquiry`}>I&apos;d like to talk about</label>
          <select
            id={`${prefix}-inquiry`}
            name="inquiry"
            value={meetingRequested ? MEETING_REQUEST : inquiry}
            onChange={(event) => {
              const value = event.target.value;
              setInquiry(value);
              onMeetingChange?.(value === MEETING_REQUEST);
            }}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
            <option>{MEETING_REQUEST}</option>
          </select>
        </div>
      </div>

      {meetingRequested && (
        <fieldset className={styles.meeting} id={`${prefix}-meeting-details`}>
          <legend>
            A time that suits you <span className={styles.optional}>(optional)</span>
          </legend>
          <p>Share a preference. We&apos;ll confirm availability by email.</p>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor={`${prefix}-date`}>Preferred date</label>
              <input id={`${prefix}-date`} name="date" type="date" />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${prefix}-time`}>Preferred time</label>
              <input id={`${prefix}-time`} name="time" type="time" />
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor={`${prefix}-timezone`}>Your time zone</label>
              <input
                id={`${prefix}-timezone`}
                name="timezone"
                placeholder="e.g. Perth, Australia (AWST)"
                maxLength={CONTACT_FIELD_LIMITS.timezone}
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
          maxLength={CONTACT_FIELD_LIMITS.message}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          data-lenis-prevent
        />
      </div>

      <div hidden>
        <label htmlFor={`${prefix}-company-website`}>Company website</label>
        <input
          id={`${prefix}-company-website`}
          name="companyWebsite"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className={styles.formActions}>
        <p id={deliveryId}>
          Your enquiry goes directly to <strong>{CONTACT_EMAIL}</strong>.
        </p>
        <Button
          type="submit"
          variant="primary"
          className={styles.submit}
          disabled={submission.status === "sending"}
        >
          {submission.status === "sending" ? "Sending…" : "Send enquiry"}{" "}
          <span aria-hidden="true">↗</span>
        </Button>
      </div>
      <p className={styles.requiredNote}>Fields marked * are required.</p>

      {submission.status === "sent" && (
        <p className={styles.formNotice} role="status">
          Thanks for getting in touch. Your enquiry has been submitted.
        </p>
      )}
      {submission.status === "error" && (
        <p className={styles.formNotice} role="alert">
          {submission.message} Your details are still in the form.
        </p>
      )}
    </form>
  );
}
