import Image from "next/image";
import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

export function Intro() {
  return (
    <section className={styles.story} id="the-story" aria-labelledby="story-heading">
      <Container className={styles.spread}>
        <header
          className={styles.titleBlock}
          data-reveal-group="fade-up"
          data-reveal-stagger="0.07"
        >
          <div className={styles.identity}>
            <p className={styles.brand}>FOCUS TV</p>
            <p className={styles.descriptor}>Film Production &amp; Entertainment Company</p>
          </div>
          <h2 className={styles.heading} id="story-heading">
            <span>We Create Stories That Explore</span>{" "}
            <span>
              the Extraordinary <em>Power of Being Human.</em>
            </span>
          </h2>
        </header>

        <div className={styles.copy} data-reveal-group="fade-up" data-reveal-stagger="0.07">
          <div className={styles.body}>
            <p>
              Focus TV is an Australian film production and entertainment company specialising in
              original documentaries, documentary series, cinematic storytelling and commercial film
              production.
            </p>
            <p>
              We produce thought-provoking films exploring human potential, creativity, innovation
              and the extraordinary people and ideas shaping our world.
            </p>
          </div>
          <div>
            <Button href="#other-projects" variant="text" className={styles.workLink}>
              See our projects <span aria-hidden="true">↓</span>
            </Button>
          </div>
        </div>

        <figure className={styles.sequence} data-reveal="soft">
          <div className={styles.mainFrame}>
            <Image
              src="/media/story/main%20image.webp"
              alt="Cameras and lights set up to film an interview"
              fill
              sizes="(max-width: 820px) 90vw, (max-width: 1440px) 50vw, 720px"
              className={styles.mainStill}
            />
          </div>
          <div className={styles.cutaway} aria-hidden="true">
            <Image
              src="/media/Stills/optimized/8.webp"
              alt=""
              fill
              sizes="(max-width: 820px) 38vw, 22vw"
            />
          </div>
        </figure>
      </Container>
    </section>
  );
}
