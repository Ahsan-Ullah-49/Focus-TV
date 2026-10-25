"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./status.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally if required
    console.error(error);
  }, [error]);

  return (
    <section className={styles.page}>
      <p className={styles.label}>A brief interruption</p>
      <h1 className={styles.title}>Let’s try that again.</h1>
      <p className={styles.copy}>
        This page couldn’t load. Please try again or head back to the homepage.
      </p>
      <div className={styles.actions}>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="text">
          Back to home ↗
        </Button>
      </div>
    </section>
  );
}
