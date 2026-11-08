import { HOME_CONTACT_HREF } from "@/components/pages/Contact/contact.config";
import { Button } from "@/components/ui/Button/Button";
import { HeroPlayer } from "./HeroPlayer";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <HeroPlayer>
        <div className={styles.heroCopy}>
          <h1 id="hero-heading">YOUR HIGH-END FILM &amp; COMMERCIAL PRODUCTION PARTNER</h1>
          <p>Commercials, documentaries and brand films. From concept to screen.</p>
          <div className={styles.heroActions}>
            <Button href="#other-projects" variant="primary">
              View Our Work
            </Button>
            <Button href={HOME_CONTACT_HREF} variant="secondary" className={styles.projectButton}>
              Discuss Your Project
            </Button>
          </div>
        </div>
      </HeroPlayer>
    </section>
  );
}
