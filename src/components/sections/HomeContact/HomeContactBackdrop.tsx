"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HomeContact.module.css";

const CONTACT_PHOTO = "/media/story/main%20image.webp";
const PHOTO_SCROLL_SPEED = 0.4;

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
        <Image
          className={styles.backdropImage}
          src={CONTACT_PHOTO}
          alt=""
          fill
          sizes="(max-width: 1920px) 1920px, 100vw"
        />
      </div>
    </div>
  );
}
