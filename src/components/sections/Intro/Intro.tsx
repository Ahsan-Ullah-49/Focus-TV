"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Intro.module.css";

// ── Story copy — edit this object to update copy without touching markup ──────
// Use <strong> semantics via the `bold` spans rendered below.
const STORY = {
  headingLine1: "The Answer",
  headingLine2: "to Creation",
  host: {
    prefix: "Hosted by",
    name: "Hammad Chaudhry",
  },
  paragraphs: [
    {
      // Segments: { text, bold? }
      segments: [
        { text: "The Answer is a six-part documentary series following host Hammad Chaudhry on a journey across the world, meeting " },
        { text: "inspiring innovators, entrepreneurs, billionaires, philanthropists, technology visionaries, and gaming legends", bold: true },
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
        { text: ", shape the world around them, and help others become masters of their own destiny." },
      ],
    },
  ],
  pullQuote: "Turning thoughts into reality.",
  // Intro section image — the warm golden Bugatti sketch
  imageSrc: "/media/hero/focustv-Intro-poster.webp",
  imageAlt: "Hand sketching a luxury automobile — the creative journey at the heart of The Answer",
};

// ── Segment renderer — outputs inline <strong> where marked ──────────────────
function RichParagraph({
  segments,
  className,
  dataReveal,
}: {
  segments: { text: string; bold?: boolean }[];
  className: string;
  dataReveal?: string;
}) {
  return (
    <p className={className} data-reveal={dataReveal}>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className={styles.paraEmphasis}>
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── GSAP ScrollTrigger entrance animations ────────────────────────────────
  // Progressive enhancement: all elements start visible (opacity:1 in CSS).
  // GSAP overrides only when environment supports motion.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // 1. Heading line 1 clips upward — cinematic word entrance
      gsap.from("[data-reveal='h-line-1']", {
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        y: 72,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });

      // 2. Heading line 2 follows with slight offset
      gsap.from("[data-reveal='h-line-2']", {
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        y: 56,
        opacity: 0,
        duration: 1.0,
        delay: 0.1,
        ease: "power4.out",
      });

      // 4. Gold rule scales from left
      gsap.from("[data-reveal='rule']", {
        scrollTrigger: {
          trigger: "[data-reveal='rule']",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "expo.out",
      });

      // 5. Host credit fades in
      gsap.from("[data-reveal='host']", {
        scrollTrigger: {
          trigger: "[data-reveal='host']",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 12,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // 6. Paragraphs stagger in
      gsap.from("[data-reveal='para']", {
        scrollTrigger: {
          trigger: "[data-reveal='narrative']",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.14,
      });

      // 7. Pull quote rises from below
      gsap.from("[data-reveal='pullquote']", {
        scrollTrigger: {
          trigger: "[data-reveal='pullquote']",
          start: "top 96%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });

      // 8. Image panel: subtle fade entrance without scaling
      gsap.from("[data-reveal='image-panel']", {
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      id="the-story"
      aria-labelledby="story-heading"
    >
      {/*
        ── Layout architecture ───────────────────────────────────────────────────
        .stage is a full-width grid: text column (left) | image panel (right).
        The image panel bleeds to the section edges.
        The text column holds all editorial content.
        No container box — the background treatment is seamless.
      */}
      <div className={styles.stage}>

        {/* ── Left: Text column ──────────────────────────────────────────────── */}
        <div className={styles.textColumn}>



          {/*
            Main headline: two-line typographic composition.
            Line 1 = large italic Cormorant serif (cinematic authority).
            Line 2 = Manrope tracked caps (contemporary precision).
            Both lines carry a warm gold–champagne–ivory text gradient.
            The clip containers prevent GSAP y-translate overflow.
          */}
          <div className={styles.headingWrap}>
            <div className={styles.headingClip}>
              <h2
                id="story-heading"
                className={styles.headingLine1}
                data-reveal="h-line-1"
              >
                {STORY.headingLine1}
              </h2>
            </div>
            <div className={styles.headingClip}>
              <p
                className={styles.headingLine2}
                data-reveal="h-line-2"
                aria-hidden="true" /* decorative; h2 above is the accessible label */
              >
                {STORY.headingLine2}
              </p>
            </div>
          </div>

          {/* Thin gold rule — structural divider */}
          <div className={styles.goldRule} data-reveal="rule" aria-hidden="true" />

          {/* Host credit — refined editorial treatment */}
          <p className={styles.hostCredit} data-reveal="host">
            <span className={styles.hostPrefix}>{STORY.host.prefix}</span>
            <span className={styles.hostName}>{STORY.host.name}</span>
          </p>

          {/* Narrative paragraphs with selective bold emphasis */}
          <div className={styles.narrative} data-reveal="narrative">
            {STORY.paragraphs.map((para, i) => (
              <RichParagraph
                key={i}
                segments={para.segments}
                className={styles.para}
                dataReveal="para"
              />
            ))}
          </div>

          {/* Pull quote — signature closing statement */}
          <blockquote className={styles.pullQuote} data-reveal="pullquote">
            <span className={styles.pullAccentLine} aria-hidden="true" />
            <p className={styles.pullText}>{STORY.pullQuote}</p>
          </blockquote>

        </div>
        {/* ── end text column ─────────────────────────────────────────────── */}

        {/*
          ── Right: Image panel ─────────────────────────────────────────────────
          The image bleeds to the top, right, and bottom edges of the section.
          Multiple gradient layers create a seamless transition from the text
          background into the photograph — no hard edge, no visible box.

          Layer order (lowest to highest z-index):
            0 – Next/Image (object-fit: cover)
            1 – .imageFeatherLeft   (background → transparent, L→R)
            2 – .imageFeatherRight  (background → transparent, R→L)
            3 – .imageFeatherTop    (transparent top edge)
            4 – .imageFeatherBottom (transparent bottom edge)
            5 – .imageTone          (subtle theme-aware dark/light tint)
        */}
        <div
          className={styles.imagePanel}
          data-reveal="image-panel"
          aria-hidden="true"
        >
          <Image
            src={STORY.imageSrc}
            alt={STORY.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 48vw"
            className={styles.image}
            priority={false}
          />

          {/* Left feather: transitions text area into image */}
          <div className={styles.imageFeatherLeft} />

          {/* Right feather: eliminates sharp outer container edge on wide screens */}
          <div className={styles.imageFeatherRight} />

          {/* Top feather: softens the image's top edge */}
          <div className={styles.imageFeatherTop} />

          {/* Bottom feather: transitions into the next section */}
          <div className={styles.imageFeatherBottom} />

          {/* Tone layer: darkens image slightly for visual harmony with text */}
          <div className={styles.imageTone} />
        </div>
        {/* ── end image panel ──────────────────────────────────────────────── */}

      </div>
    </section>
  );
}
