"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Intro.module.css";

type StorySegment = {
  text: string;
  bold?: boolean;
};

const STORY = {
  headingLine1: "The Answer",
  headingLine2: "to Creation",
  host: {
    prefix: "Hosted by",
    name: "Hammad Chaudhry",
  },
  paragraphs: [
    {
      segments: [
        {
          text: "The Answer is a six-part documentary series following host Hammad Chaudhry on a journey across the world, meeting ",
        },
        {
          text: "inspiring innovators, entrepreneurs, billionaires, philanthropists, technology visionaries, and gaming legends",
          bold: true,
        },
        { text: "." },
      ],
    },
    {
      segments: [
        { text: "Through their stories, the series explores " },
        { text: "the journeys, decisions, and ideas behind their success", bold: true },
        { text: " — tracing how world-defining companies, inventions, and movements came to be." },
      ],
    },
    {
      segments: [
        { text: "More than a docuseries, The Answer explores how people " },
        { text: "turn thoughts into reality", bold: true },
        {
          text: ", shape the world around them, and help others become masters of their own destiny.",
        },
      ],
    },
  ],
  pullQuote: "Turning thoughts into reality.",
  imageSrc: "/media/hero/focustv-Intro-poster.webp",
  imageAlt:
    "A hand sketching a luxury automobile, representing the creative journey at the heart of The Answer",
};

function RichParagraph({ segments }: { segments: StorySegment[] }) {
  return (
    <p className={styles.para}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className={styles.paraEmphasis}>
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </p>
  );
}

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("[data-story-reveal='heading']");
      const detail = section.querySelector<HTMLElement>("[data-story-reveal='detail']");
      const image = section.querySelector<HTMLElement>("[data-story-reveal='image']");

      if (heading) {
        gsap.from(heading, {
          y: 24,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            toggleActions: "play none none none",
          },
        });
      }

      if (detail) {
        gsap.from(detail, {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detail,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      }

      if (image) {
        gsap.from(image, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: image,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      id="the-story"
      aria-labelledby="story-heading"
    >
      <div className={styles.inner}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLabel}>The Story</span>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span className={styles.brandLabel}>FocusTV</span>
        </div>

        <div className={styles.headingRegion} data-story-reveal="heading">
          <h2 id="story-heading" className={styles.heading}>
            <span className={styles.headingLine1}>{STORY.headingLine1}</span>
            <em className={styles.headingLine2}>{STORY.headingLine2}</em>
          </h2>

          <aside
            className={styles.storyDetails}
            data-story-reveal="detail"
            aria-label="Series details"
          >
            <div className={styles.seriesFact}>
              <span className={styles.seriesNumber}>Six</span>
              <span className={styles.seriesLabel}>parts of a documentary series</span>
            </div>
            <p className={styles.hostCredit}>
              <span className={styles.hostPrefix}>{STORY.host.prefix}</span>
              <span className={styles.hostName}>{STORY.host.name}</span>
            </p>
          </aside>
        </div>

        <div className={styles.contentGrid}>
          <figure className={styles.imagePanel} data-story-reveal="image">
            <Image
              src={STORY.imageSrc}
              alt={STORY.imageAlt}
              fill
              sizes="(max-width: 960px) 100vw, 54vw"
              className={styles.image}
            />
          </figure>

          <div className={styles.storyContent}>
            <div className={styles.narrative}>
              {STORY.paragraphs.map((paragraph, index) => (
                <RichParagraph key={index} segments={paragraph.segments} />
              ))}
            </div>

            <blockquote className={styles.pullQuote}>
              <span className={styles.pullAccentLine} aria-hidden="true" />
              <p className={styles.pullText}>{STORY.pullQuote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
