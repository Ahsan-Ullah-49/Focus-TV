import type { Metadata } from "next";
import Image from "next/image";
import { AboutTimeline } from "@/components/pages/About/AboutTimeline";
import { EditorialMotion } from "@/components/motion/EditorialMotion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Focus TV",
  description: "Every Great Creation Begins With a Vision.",
  alternates: { canonical: "/about" },
};

// Client-supplied chapters. Existing photographs illustrate the work and people;
// no available studio or interview photograph is presented as the Amazon location.
const chapters = [
  {
    id: "the-vision",
    label: "CHAPTER 01 — THE VISION",
    title: "It All Began in the Amazon.",
    paragraphs: [
      "Deep in the Amazon rainforest, founder Hammad Chaudhry experienced a life-changing vision: to create films that awaken human potential and reveal the extraordinary power we possess to turn imagination into reality.",
    ],
    images: [{ src: "/media/about/ch1.webp", alt: "Mountain landscape with a waterfall" }],
  },
  {
    id: "humble-beginnings",
    label: "CHAPTER 02 — HUMBLE BEGINNINGS",
    title: "From a Backyard Studio to the World.",
    paragraphs: [
      "Starting in a small studio behind his home, Hammad Chaudhry began bringing his vision to life. With a camera, an idea and relentless determination, he set out to create meaningful films, laying the foundations for what would become Focus TV Studios.",
    ],
    images: [{ src: "/media/about/ch2.webp", alt: "Hammad Chaudhry" }],
  },
  {
    id: "going-global",
    label: "CHAPTER 03 — GOING GLOBAL",
    title: "Behind the Minds That Shaped Our World.",
    paragraphs: [
      "Hammad Chaudhry took his filmmaking journey global, gaining access to some of the world's most influential founders, innovators and industry pioneers.",
      "From Apple co-founder Steve Wozniak and Atari founder Nolan Bushnell to Patrick Bet-David, Tom Bilyeu, Rizwan Sajan and leading minds behind Tesla, Bugatti, Rimac, NetEase Games and Bandai Namco.",
      "APPLE · TESLA · BUGATTI · RIMAC · ATARI · NETEASE GAMES · BANDAI NAMCO · HASBRO INTERACTIVE · DANUBE GROUP",
    ],
    images: [
      {
        src: "/media/Stills/the-answer/01-steve-wozniak.webp",
        alt: "Steve Wozniak in a Focus TV interview",
      },
      {
        src: "/media/Stills/gaming-legends/01-nolan-bushnell.webp",
        alt: "Nolan Bushnell in a Focus TV interview",
      },
      {
        src: "/media/Stills/the-answer/04-rizwan-sajan.webp",
        alt: "Rizwan Sajan in a Focus TV interview",
      },
    ],
  },
  {
    id: "our-own-ip",
    label: "CHAPTER 04 — BUILDING OUR OWN IP",
    title: "From Telling Stories to Creating Original Entertainment.",
    paragraphs: [
      "Under Hammad Chaudhry's vision, Focus TV expanded into developing and producing its own original documentary intellectual property, exploring human potential, innovation and the extraordinary minds shaping our world.",
      "THE ANSWER · AUTOMOTIVE LEGENDS · GAMING LEGENDS · WA POLICE: TECH RELOADED",
      "Alongside its original productions, Focus TV Studios creates cinematic brand films, corporate documentaries, founder stories and ESG and community impact films, helping businesses and global brands communicate their achievements through powerful storytelling.",
    ],
    images: [
      { src: "/media/hero/focustv-Intro-poster.webp", alt: "Automotive Legends artwork" },
      { src: "/media/projects/gaming-legends.webp", alt: "Gaming Legends artwork" },
      { src: "/media/projects/wa-police.webp", alt: "WA Police: Tech Reloaded film still" },
    ],
  },
  {
    id: "the-future",
    label: "CHAPTER 05 — THE FUTURE",
    title: "Building a Global Entertainment Company.",
    paragraphs: [
      "Hammad Chaudhry's vision for Focus TV extends far beyond individual productions: to build a globally recognised entertainment company creating original films, documentaries and stories that challenge perspectives, unlock human potential and inspire generations.",
    ],
    images: [
      {
        src: "/media/editorial/global-skyline.webp",
        alt: "Dubai skyline at sunset, from the Focus TV Danube documentary",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <EditorialMotion>
      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 data-editorial-reveal="heading">
              About <em>Focus TV</em>
            </h1>
            <div className={styles.introduction} data-editorial-reveal="right">
              <p className={styles.vision}>Every Great Creation Begins With a Vision.</p>
              <p>
                Founded producer Hammad Chaudhry, Focus TV is an Australian film production and
                entertainment company dedicated to creating thought-provoking films that explore
                human potential, imagination and our extraordinary ability to shape reality.
              </p>
            </div>
          </div>
          <div className={styles.heroScene} data-editorial-hero>
            <div className={styles.heroImage} data-editorial-window>
              <div className={styles.heroPhoto} data-editorial-photo>
                <Image
                  src="/media/editorial/about-hero.webp"
                  alt="Hammad Chaudhry greeting Dr. Nakamatsu during filming in Japan"
                  fill
                  quality={90}
                  sizes="(max-width: 1552px) 92vw, 1440px"
                  preload
                />
              </div>
            </div>
          </div>
        </header>
        <AboutTimeline className={styles.timeline}>
          {chapters.map((chapter, index) => (
            <section
              className={styles.chapter}
              data-journey-chapter
              key={chapter.id}
              id={chapter.id}
              aria-labelledby={`${chapter.id}-heading`}
            >
              <span className={styles.node} data-journey-node aria-hidden="true" />
              <div
                className={styles.chapterImages}
                data-image-count={chapter.images.length}
                data-chapter={chapter.id}
                data-editorial-reveal={index % 2 === 0 ? "left" : "right"}
              >
                {chapter.images.map((photo) => (
                  <div className={styles.imageFrame} key={photo.src}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      quality={chapter.id === "the-future" ? 100 : 90}
                      sizes={
                        chapter.images.length > 1
                          ? "(max-width: 760px) 45vw, 24vw"
                          : "(max-width: 760px) 90vw, 46vw"
                      }
                    />
                  </div>
                ))}
              </div>
              <div
                className={styles.chapterCopy}
                data-editorial-reveal={index % 2 === 0 ? "right" : "left"}
              >
                <p className={styles.chapterLabel}>{chapter.label}</p>
                <h2 id={`${chapter.id}-heading`}>{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    className={
                      (index === 2 && paragraphIndex === 2) || (index === 3 && paragraphIndex === 1)
                        ? styles.titles
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </AboutTimeline>
      </article>
    </EditorialMotion>
  );
}
