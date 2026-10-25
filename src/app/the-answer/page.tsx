import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { FilmPlayer } from "@/components/pages/Media/FilmPlayer";
import { heroConfig } from "@/components/sections/Hero/hero.config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Answer",
  description:
    "A six-part documentary series with Hammad Chaudhry, exploring the people, ideas and decisions that turn thoughts into reality.",
  alternates: { canonical: "/the-answer" },
};

export default function TheAnswerPage() {
  return (
    <article className={styles.page}>
      <header className={styles.intro} data-reveal="stagger">
        <div className={styles.topLine} data-reveal-child>
          <span>A FocusTV documentary series</span>
          <span>Ideas. People. Possibility.</span>
        </div>
        <h1 className={styles.title} data-reveal-child>
          The Answer
          <span>
            to <em>creation.</em>
          </span>
        </h1>
        <div className={styles.introBottom} data-reveal-child>
          <p>
            What does it take to turn a thought
            <br className={styles.desktopBreak} /> into something that changes the world?
          </p>
          <a className={styles.watchLink} href="#watch-film">
            Discover the series <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>
      <section
        id="watch-film"
        className={styles.film}
        aria-label="Watch The Answer film preview"
        data-reveal="mask"
      >
        <FilmPlayer
          priority
          film={{
            id: "the-answer",
            title: "The Birth of the Automobile",
            kind: "film",
            src: heroConfig.posterSrc,
            alt: "A covered automobile with illuminated headlights, from The Answer",
            vimeoId: heroConfig.videoId,
            vimeoHash: heroConfig.hash,
          }}
        />
      </section>
      <section className={styles.synopsis} aria-labelledby="synopsis-heading">
        <div className={styles.sideNote} data-reveal="rise">
          <span>01 / The series</span>
          <p>
            Six parts.
            <br />A world of perspectives.
          </p>
        </div>
        <div className={styles.synopsisBody} data-reveal="rise">
          <h2 id="synopsis-heading">
            Behind every creation,
            <br />
            there is a <em>human story.</em>
          </h2>
          <p>
            The Answer follows host Hammad Chaudhry around the world, in conversation with
            innovators, entrepreneurs, philanthropists, technology visionaries and gaming legends.
          </p>
          <p>
            Through their journeys, the series explores the ideas and decisions behind
            world-defining companies, inventions and movements — and how imagination becomes
            reality.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Format</dt>
              <dd>Six-part docuseries</dd>
            </div>
            <div>
              <dt>Hosted by</dt>
              <dd>Hammad Chaudhry</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className={styles.perspectives} aria-labelledby="perspectives-heading">
        <figure className={styles.storyImage} data-reveal="mask">
          <Image
            src="/media/hero/focustv-Intro-poster.webp"
            alt="A designer developing an automobile sketch"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
          />
          <figcaption>From the first idea to what comes next.</figcaption>
        </figure>
        <div className={styles.perspectiveCopy} data-reveal="stagger">
          <h2 id="perspectives-heading" data-reveal-child>
            Turning thoughts
            <br />
            into <em>reality.</em>
          </h2>
          <p data-reveal-child>
            The series brings together people from different worlds, connected by the instinct to
            create. Their stories offer a closer look at the thinking behind what they do.
          </p>
          <div className={styles.chapter} data-reveal-child>
            <span>01</span>
            <div>
              <h3>Design & innovation</h3>
              <p>The minds behind the shapes, technologies and experiences that surround us.</p>
            </div>
          </div>
          <div className={styles.chapter} data-reveal-child>
            <span>02</span>
            <div>
              <h3>Gaming & imagination</h3>
              <p>Creators who bring new worlds to life and change the way we play.</p>
            </div>
          </div>
          <div className={styles.chapter} data-reveal-child>
            <span>03</span>
            <div>
              <h3>Enterprise & impact</h3>
              <p>Personal journeys in business, creativity and philanthropy.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.people} aria-labelledby="people-heading">
        <div className={styles.peopleHeading} data-reveal="rise">
          <h2 id="people-heading">
            The people.
            <br />
            <em>The possibilities.</em>
          </h2>
          <div>
            <p>
              Meet the voices in front of the camera and the team bringing their stories to the
              screen.
            </p>
            <Button href="/cast" variant="text">
              Explore the cast <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
        <div className={styles.portraits} data-reveal="stagger">
          <figure data-reveal-child>
            <Image
              src="/media/Stills/optimized/1.webp"
              width={800}
              height={1000}
              sizes="(max-width: 600px) 50vw, 30vw"
              alt="Steve Wozniak in conversation for The Answer"
            />
            <figcaption>
              Steve Wozniak<span>Co-Founder, Apple</span>
            </figcaption>
          </figure>
          <figure data-reveal-child>
            <Image
              src="/media/Stills/optimized/3.webp"
              width={800}
              height={1000}
              sizes="(max-width: 600px) 50vw, 30vw"
              alt="Franz von Holzhausen in conversation for The Answer"
            />
            <figcaption>
              Franz von Holzhausen<span>Chief Designer, Tesla</span>
            </figcaption>
          </figure>
          <figure data-reveal-child>
            <Image
              src="/media/Stills/optimized/9.webp"
              width={800}
              height={1000}
              sizes="(max-width: 600px) 100vw, 30vw"
              alt="Nolan Bushnell in conversation for The Answer"
            />
            <figcaption>
              Nolan Bushnell<span>Founder, Atari</span>
            </figcaption>
          </figure>
        </div>
        <Link className={styles.crewLink} href="/crew">
          Behind the camera{" "}
          <span>
            Meet our crew <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </section>
    </article>
  );
}
