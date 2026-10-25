import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container/Container";
import { PageMotion } from "@/components/motion/PageMotion";
import logo from "@/Assets/Logos/logo.png";
import whiteLogo from "@/Assets/Logos/White-logo.png";
import styles from "./Footer.module.css";

const explore = [
  { href: "/", label: "Home" },
  { href: "/the-answer", label: "The Answer" },
  { href: "/cast", label: "The cast" },
  { href: "/crew", label: "Our team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/the-answer-ai", label: "The Answer AI" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <PageMotion transition={false}>
        <Container>
          <div className={styles.invitation} data-reveal="stagger">
            <h2 data-reveal-child>
              Every story starts
              <br />
              with <em>a conversation.</em>
            </h2>
            <Link
              href="/contact"
              className={styles.contactLink}
              data-cursor="interactive"
              data-reveal-child
            >
              <span>Let’s talk</span>
              <span className={styles.contactArrow}>
                <Arrow diagonal />
              </span>
            </Link>
          </div>
          <div className={styles.columns} data-reveal="stagger">
            <div className={styles.brand} data-reveal-child>
              <Link href="/" aria-label="FocusTV home" className={styles.brandLink}>
                <Image
                  src={logo}
                  alt="FocusTV"
                  className={`${styles.logo} ${styles.lightLogo}`}
                  sizes="180px"
                />
                <Image
                  src={whiteLogo}
                  alt=""
                  className={`${styles.logo} ${styles.darkLogo}`}
                  sizes="180px"
                />
              </Link>
              <p>
                Real people. Remarkable stories.
                <br />A different perspective.
              </p>
              <span className={styles.brandNote}>Turning thoughts into reality.</span>
            </div>
            <nav className={styles.navigation} aria-label="Footer navigation" data-reveal-child>
              <h3>Explore</h3>
              <ul>
                {explore.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.connect} data-reveal-child>
              <h3>Get in touch</h3>
              <Link href="/contact" className={styles.textLink}>
                Start a conversation <Arrow diagonal />
              </Link>
              <Link href="/contact?enquiry=meeting" className={styles.textLink}>
                Arrange a meeting <Arrow diagonal />
              </Link>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/the.answer_unlocked/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Answer <span>Instagram ↗</span>
                </a>
                <a
                  href="https://www.instagram.com/focutivity/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Focutivity <span>Instagram ↗</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.wordmark} aria-hidden="true" data-reveal="mask">
            FOCUS<span>TV</span>
          </div>
          <div className={styles.bottom}>
            <p>© {new Date().getFullYear()} FocusTV. All rights reserved.</p>
            <a href="#top" className={styles.backToTop}>
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </Container>
      </PageMotion>
    </footer>
  );
}
