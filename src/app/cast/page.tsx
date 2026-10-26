import type { Metadata } from "next";
import Link from "next/link";
import { CastDirectory } from "@/components/pages/CastDirectory/CastDirectory";
import styles from "@/components/pages/CastDirectory/CastDirectory.module.css";

export const metadata: Metadata = {
  title: "The Cast",
  description:
    "Meet the innovators, designers, founders and creative minds featured in The Answer, a FocusTV documentary series.",
  alternates: { canonical: "/cast" },
};

export default function CastPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker} data-reveal="fade-down">
          The Answer — The people
        </p>
        <div className={styles.headingRow}>
          <h1 data-reveal="zoom-in">
            Extraordinary minds.
            <br />
            <em>Human stories.</em>
          </h1>
          <p className={styles.introCopy} data-reveal="fade-up">
            The people who turned an idea into something the world had never seen. Discover the
            voices behind The Answer.
          </p>
        </div>
      </header>
      <CastDirectory />
      <section
        className={styles.nextChapter}
        data-reveal="fade-up"
        aria-labelledby="crew-link-heading"
      >
        <p>Behind every conversation, a creative team.</p>
        <Link href="/crew" id="crew-link-heading">
          Meet the filmmakers <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
