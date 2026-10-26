"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button/Button";
import { CAST, type CastMember } from "./cast.config";
import styles from "./Cast.module.css";

interface CastCardProps {
  member: CastMember;
}

interface ExploreCastButtonProps {
  className: string;
}

function ExploreCastButton({ className }: ExploreCastButtonProps) {
  return (
    <Button href="/cast" variant="primary" className={`${styles.exploreButton} ${className}`}>
      Explore Full Cast
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M3 8h9M8 4l4 4-4 4" />
      </svg>
    </Button>
  );
}

function CastCard({ member }: CastCardProps) {
  return (
    <li className={styles.card} data-cast-card>
      <article className={styles.portrait} aria-labelledby={`cast-${member.id}`}>
        <Image
          src={member.imageSrc}
          alt={member.imageAlt}
          fill
          sizes="(min-width: 1440px) 44vw, (min-width: 1100px) 48vw, 100vw"
          className={styles.portraitImage}
          loading="lazy"
        />
        <div className={styles.caption} data-card-caption>
          <div className={styles.captionText}>
            <h3 id={`cast-${member.id}`} className={styles.name}>
              {member.name}
            </h3>
            <p className={styles.title}>{member.title}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export function Cast() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cardList = cardsRef.current;

    if (
      !section ||
      !track ||
      !cardList ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = Array.from(cardList.querySelectorAll<HTMLElement>("[data-cast-card]"));
      const desktopDeck = window.matchMedia(
        "(min-width: 1100px) and (prefers-reduced-motion: no-preference)"
      ).matches;

      // Keep the desktop deck's scroll-linked card sequence separate from its shared entrance reveal.
      if (desktopDeck) {
        gsap.set(cards, {
          y: 0,
          yPercent: 0,
          scale: 0.94,
          autoAlpha: 0,
          zIndex: 0,
        });
        gsap.set(cards[0], { y: 0, scale: 1, autoAlpha: 1, zIndex: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });

        const cardBeat = 1.45;

        cards.slice(1).forEach((card, step) => {
          const activeIndex = step + 1;
          const transitionStart = (step + 1) * cardBeat;

          timeline.fromTo(
            card,
            { y: () => cardList.clientWidth * 1.18, scale: 0.94, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              zIndex: activeIndex + 1,
              duration: 1,
              ease: "power2.out",
            },
            transitionStart
          );

          for (let previousIndex = 0; previousIndex < activeIndex; previousIndex += 1) {
            const depth = activeIndex - previousIndex;
            const previousCaption =
              cards[previousIndex].querySelector<HTMLElement>("[data-card-caption]");

            timeline.to(
              cards[previousIndex],
              {
                y: depth * -30,
                scale: Math.max(0.82, 1 - depth * 0.045),
                autoAlpha: depth < 4 ? 1 - depth * 0.16 : 0,
                duration: 1,
                ease: "power2.out",
              },
              transitionStart
            );

            if (previousCaption) {
              timeline.to(
                previousCaption,
                { y: 12, autoAlpha: 0, duration: 0.55, ease: "power2.out" },
                transitionStart
              );
            }
          }
        });

        if (progressRef.current) {
          const deckDuration = timeline.duration();
          timeline.fromTo(
            progressRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: deckDuration, ease: "none" },
            0
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.cast}
      id="meet-the-cast"
      aria-labelledby="cast-heading"
    >
      <div className={styles.topRule} data-reveal="fade-right" aria-hidden="true" />
      <div ref={trackRef} className={styles.storyTrack}>
        <header
          className={styles.introduction}
          data-reveal-group="fade-up"
          data-reveal-stagger="0.08"
        >
          <h2 id="cast-heading" className={styles.heading} aria-label="Our Proud Cast">
            <span>Our Proud</span>
            <em>Cast</em>
          </h2>
          <p className={styles.description}>
            From technology and automotive design to gaming, entrepreneurship and creative culture,
            these voices bring different worlds into one conversation.
          </p>
          <ExploreCastButton className={styles.exploreButtonDesktop} />
        </header>

        <div className={styles.deckColumn}>
          <div className={styles.deckStage} data-reveal="fade-up">
            <ol ref={cardsRef} className={styles.cards} aria-label="Selected FocusTV cast">
              {CAST.map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </ol>
            <div className={styles.progressRail} aria-hidden="true">
              <span ref={progressRef} className={styles.progressFill} />
            </div>
          </div>

          <ol className={styles.scrollSteps} aria-hidden="true">
            {CAST.map((member) => (
              <li key={member.id} />
            ))}
          </ol>
        </div>

        <ExploreCastButton className={styles.exploreButtonResponsive} />
      </div>
    </section>
  );
}
