import React from "react";
import styles from "./Hero.module.css";
import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { HeroMotion } from "./HeroMotion";

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <HeroMotion>
        {/* Cinematic Media Background */}
        <div className={styles.mediaContainer}>
          <div className={styles.mediaPlaceholder}>FocusTV Cinematic Media Pending</div>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className={styles.overlay} />

        {/* Hero Content */}
        <Container size="lg" className={styles.contentInner}>
          <div className={styles.label}>FOCUSTV / CREATIVE STUDIO</div>

          <h1 className={styles.headline}>
            <span className={styles.lineMask}>
              <span className={styles.headlineLine}>Stories worth</span>
            </span>
            <br />
            <span className={styles.lineMask}>
              <span className={styles.headlineLine}>bringing into focus.</span>
            </span>
          </h1>

          <p className={styles.supportCopy}>
            A creative studio bringing remarkable people, ideas and stories to the screen.
          </p>

          <div className={styles.actions}>
            <Button href="/the-answer" variant="primary">
              Discover FocusTV
            </Button>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLabel}>Explore</span>
          <div className={styles.scrollLine} />
        </div>
      </HeroMotion>
    </section>
  );
}
