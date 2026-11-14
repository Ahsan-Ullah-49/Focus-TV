"use client";

import { getImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HomeContact.module.css";

const PHOTO_SCROLL_SPEED = 0.4;

const { props: desktopPhoto } = getImageProps({
  src: "/media/backgrounds/contact-desktop.webp",
  alt: "",
  fill: true,
  sizes: "(max-width: 1920px) 1920px, 100vw",
});

const {
  props: { srcSet: portraitSrcSet, sizes: portraitSizes },
} = getImageProps({
  src: "/media/backgrounds/contact-mobile.webp",
  alt: "",
  fill: true,
  sizes: "(max-width: 420px) 420px, 100vw",
});

export function HomeContactBackdrop() {
  const frameRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const photo = photoRef.current;
    if (!frame || !photo) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const photoTravel = () => -parseFloat(getComputedStyle(photo).insetBlockEnd);
      const scrollDistance = () => photoTravel() / (1 - PHOTO_SCROLL_SPEED);

      gsap.fromTo(
        photo,
        { y: () => -photoTravel() },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            // Start part of the range before the fixed header so the effect is visible on entry.
            start: () => {
              const header = parseFloat(
                getComputedStyle(frame).getPropertyValue("--header-height")
              );
              return `top ${header + scrollDistance() / 5}px`;
            },
            end: () => `+=${scrollDistance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => motion.revert();
  }, []);

  return (
    <div ref={frameRef} className={styles.backdrop} aria-hidden="true">
      <div ref={photoRef} className={styles.backdropPhoto}>
        <picture>
          <source
            media="(max-width: 600px) and (orientation: portrait)"
            srcSet={portraitSrcSet}
            sizes={portraitSizes}
          />
          <img {...desktopPhoto} alt="" className={styles.backdropImage} />
        </picture>
      </div>
    </div>
  );
}
