import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Answer AI — Coming Soon",
  description: "The Answer AI. Coming soon from FocusTV.",
  alternates: { canonical: "/the-answer-ai" },
};

export default function TheAnswerAIPage() {
  return (
    <article className={styles.page}>
      <header className={styles.heading}>
        <p className={styles.label} data-reveal="fade-down">
          From FocusTV
        </p>
        <h1 data-reveal="zoom-in">
          The Answer <span>AI</span>
        </h1>
      </header>
      <div className={styles.composition}>
        <div className={styles.letterform} aria-hidden="true" data-reveal="zoom-out">
          <span>A</span>
          <span>I</span>
        </div>
        <section
          className={styles.announcement}
          aria-labelledby="coming-soon"
          data-reveal-group="fade-up"
        >
          <span className={styles.marker} aria-hidden="true">
            ↗
          </span>
          <h2 id="coming-soon">
            More to be
            <br />
            <em>revealed.</em>
          </h2>
          <p className={styles.status}>Coming soon</p>
          <p className={styles.description}>
            Details will be announced here.
            <br />
            Until then, discover The Answer.
          </p>
          <Link href="/#the-story" className={styles.link}>
            Explore The Answer story <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
      <div className={styles.bottomLine} data-reveal="fade-up">
        <span>The Answer AI</span>
        <Link href="/contact">
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
