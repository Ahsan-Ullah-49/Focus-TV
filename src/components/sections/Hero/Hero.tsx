"use client";

import { HeroPlayer } from "./HeroPlayer";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="The Answer — cinematic film">
      <HeroPlayer />
    </section>
  );
}
