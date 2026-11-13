"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container/Container";
import { ContactForm } from "@/components/pages/Contact/ContactForm";
import { CONTACT_EMAIL } from "@/components/pages/Contact/contact.config";
import { HomeContactBackdrop } from "./HomeContactBackdrop";
import styles from "./HomeContact.module.css";

export function HomeContact({ initialMeeting = false }: { initialMeeting?: boolean }) {
  const [meeting, setMeeting] = useState(initialMeeting);
  const [previousInitial, setPreviousInitial] = useState(initialMeeting);
  // A footer meeting link can change the query without unmounting this page.
  // Keep the visitor's entered form details while updating that requested mode.
  if (previousInitial !== initialMeeting) {
    setPreviousInitial(initialMeeting);
    setMeeting(initialMeeting);
  }
  const toggleMeeting = () => {
    setMeeting(!meeting);
    if (!meeting)
      requestAnimationFrame(() => {
        const fieldset = document.getElementById("compact-contact-meeting-details");
        fieldset?.scrollIntoView({
          block: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
        document.getElementById("compact-contact-date")?.focus({ preventScroll: true });
      });
  };

  return (
    <article className={styles.contact} aria-labelledby="contact-title">
      <Container className={styles.pageIntro}>
        <h1 id="contact-title">
          Contact <em>us.</em>
        </h1>
        <p>Send us a short brief with the idea, scope and dates you have in mind.</p>
      </Container>
      <section className={styles.scene} aria-labelledby="contact-scene-title">
        <HomeContactBackdrop />
        <Container className={styles.content}>
          <div className={styles.copy}>
            <h2 id="contact-scene-title">
              Tell us about <em>your film.</em>
            </h2>
          </div>
          <div className={styles.formPanel}>
            <ContactForm
              variant="compact"
              meetingRequested={meeting}
              onMeetingChange={setMeeting}
            />
          </div>
          <div className={styles.actions}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.action} data-cursor="interactive">
              <span>
                <strong>Email the team</strong>
                <span>For a quick question or a brief</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
            <button
              type="button"
              className={styles.action}
              onClick={toggleMeeting}
              aria-expanded={meeting}
              aria-controls="compact-contact-meeting-details"
              data-cursor="interactive"
            >
              <span>
                <strong>Arrange a meeting</strong>
                <span>Share a preferred date and time</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                {meeting ? "−" : "↗"}
              </span>
            </button>
          </div>
        </Container>
      </section>
    </article>
  );
}
