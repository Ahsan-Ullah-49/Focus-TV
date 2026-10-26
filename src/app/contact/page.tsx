import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/pages/Contact/ContactForm";
import { CONTACT_EMAIL, CONTACT_SOCIALS } from "@/components/pages/Contact/contact.config";
import styles from "@/components/pages/Contact/Contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with FocusTV about productions, partnerships, guest enquiries or a meeting.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div className={styles.eyebrow} data-reveal="fade-down">
          <span>Get in touch</span>
          <span>FocusTV</span>
        </div>
        <h1 className={styles.title} data-reveal-group="fade-up">
          <span>Great stories begin</span>
          <em>with a conversation.</em>
        </h1>
      </header>
      <div className={styles.rule} data-reveal="fade-right" aria-hidden="true" />
      <div className={styles.layout}>
        <aside className={styles.details} aria-label="Connect with FocusTV" data-reveal="fade-left">
          <p className={styles.lead}>
            For partnerships, productions and the people with a story to tell.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={styles.directLink}
            data-cursor="interactive"
          >
            Email the team <span aria-hidden="true">↗</span>
          </a>
          <div className={styles.socials}>
            <h2>Follow the conversation</h2>
            <ul>
              {CONTACT_SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} on Instagram (opens in a new tab)`}
                  >
                    {social.handle} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className={styles.formPanel} data-reveal="fade-right">
          <Suspense
            fallback={
              <p className={styles.formPlaceholder} role="status">
                Preparing the enquiry form…
              </p>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
