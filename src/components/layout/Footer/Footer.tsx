import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import logo from "@/Assets/Logos/logo.png";
import { FooterInvitation } from "./FooterInvitation";
import styles from "./Footer.module.css";

const explore = [
  { href: "/", label: "Home" },
  { href: "/cast", label: "Our cast" },
  { href: "/crew", label: "Our team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/the-answer-ai", label: "The Answer AI" },
];

const socialLinks = [
  // Client-approved footer channels; keep Instagram first.
  {
    href: "https://www.instagram.com/the.answer_unlocked/",
    label: "Instagram",
    platform: "instagram",
    external: true,
  },
  {
    href: "mailto:hammad@focustv.tv",
    label: "Email FocusTV",
    platform: "email",
    external: false,
  },
] as const;

type SocialPlatform = (typeof socialLinks)[number]["platform"];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.7" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="2.75"
        y="4.75"
        width="18.5"
        height="14.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 6.5 8 6.25 8-6.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <PageMotion>
        <Container>
          <FooterInvitation />
        </Container>
        <Container>
          <div className={styles.columns} data-reveal-group="fade-up" data-reveal-stagger="0.07">
            <div className={styles.brand}>
              <Link href="/" aria-label="FocusTV home" className={styles.brandLink}>
                <Image
                  src={logo}
                  alt="FocusTV"
                  className={styles.logo}
                  sizes="(max-width: 760px) 340px, 366px"
                />
              </Link>
              <p>
                Real people. Remarkable stories.
                <br />A different perspective.
              </p>
              <span className={styles.brandNote}>Turning thoughts into reality.</span>
              <nav className={styles.socials} aria-label="Instagram and email links">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    data-cursor="interactive"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </nav>
            </div>
            <nav className={styles.navigation} aria-label="Footer navigation">
              <h3>Explore</h3>
              <ul>
                {explore.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <section className={styles.connect} aria-labelledby="footer-contact-heading">
              <h3 id="footer-contact-heading">Get in touch</h3>
              <div className={styles.contactActions}>
                <Link
                  href="/contact"
                  className={`${styles.contactAction} ${styles.contactPrimary}`}
                >
                  <span>Start a conversation</span>
                  <span className={styles.actionArrow}>
                    <Arrow />
                  </span>
                </Link>
                <Link
                  href="/contact?enquiry=meeting"
                  className={`${styles.contactAction} ${styles.contactSecondary}`}
                >
                  <span>Arrange a meeting</span>
                  <span className={styles.actionArrow}>
                    <Arrow />
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </Container>
        <div className={styles.wordmark} aria-hidden="true" data-reveal="zoom-in">
          FOCUS<span>TV</span>
        </div>
        <Container>
          <div className={styles.bottom}>
            <p>© {new Date().getFullYear()} FocusTV. All rights reserved.</p>
          </div>
        </Container>
      </PageMotion>
    </footer>
  );
}
