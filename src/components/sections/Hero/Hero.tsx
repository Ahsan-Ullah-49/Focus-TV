import { HeroPlayer } from "./HeroPlayer";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <HeroPlayer>
        <div className={styles.heroCopy}>
          <h1 id="hero-heading">
            <span className={styles.headingLead}>
              Every creation <span>begins in the mind.</span>
            </span>{" "}
            <span className={styles.headingDetail}>
              Through powerful, thought-provoking documentaries, we explore the people, ideas and
              extraordinary journeys behind how imagination is manifested into reality.
            </span>
          </h1>
          <p className={styles.services}>Commercial • Documentaries • Brand Films</p>
        </div>
      </HeroPlayer>
    </section>
  );
}
