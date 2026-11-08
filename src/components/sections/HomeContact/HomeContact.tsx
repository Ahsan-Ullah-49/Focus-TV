import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { ContactForm } from "@/components/pages/Contact/ContactForm";
import {
  CONTACT_EMAIL,
  HOME_CONTACT_ID,
  MEETING_CONTACT_HREF,
} from "@/components/pages/Contact/contact.config";
import { HomeContactBackdrop } from "./HomeContactBackdrop";
import styles from "./HomeContact.module.css";

export function HomeContact() {
  return (
    <section className={styles.contact} id={HOME_CONTACT_ID} aria-labelledby="home-contact-title">
      <div className={styles.scene}>
        <HomeContactBackdrop />

        <Container className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.label}>Contact</p>
            <h2 id="home-contact-title">
              Tell us about <em>your film.</em>
            </h2>
            <p className={styles.lead}>
              Send us a short brief with the idea, scope and dates you have in mind.
            </p>
          </div>

          <div className={styles.formPanel}>
            <ContactForm variant="home" />
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
            <Link href={MEETING_CONTACT_HREF} className={styles.action} data-cursor="interactive">
              <span>
                <strong>Arrange a meeting</strong>
                <span>Share a preferred date and time</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
