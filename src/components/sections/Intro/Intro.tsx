import Image from "next/image";
import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

export function Intro() {
  return (
    <section className={styles.story} id="the-story" aria-labelledby="story-heading">
      <Container className={styles.spread}>
        <div className={styles.copy} data-reveal-group="fade-up" data-reveal-stagger="0.07">
          <p className={styles.eyebrow}>Our Story</p>
          <h2 className={styles.heading} id="story-heading">
            It starts with <em>a conversation.</em>
          </h2>
          <p className={styles.lead}>
            Focus TV produces documentaries and video projects, from interviews with car designers
            and game creators to a film about policing in Perth.
          </p>
          <p className={styles.description}>
            In our series <cite>The Answer</cite>, host Hammad Chaudhry sits down with people who
            helped shape their fields. We ask them how they got started, what went into their work
            and what they learned along the way.
          </p>
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
