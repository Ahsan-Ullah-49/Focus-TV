"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Staggered reveal for text
      tl.to(`.${styles.label}`, { opacity: 1, duration: 0.8 }, 0.2)
        .to(`.${styles.headlineLine}`, { y: "0%", opacity: 1, duration: 1, stagger: 0.15 }, 0.3)
        .to(`.${styles.supportCopy}`, { opacity: 1, duration: 1 }, 0.6)
        .to(`.${styles.actions}`, { opacity: 1, duration: 1 }, 0.8)
        .to(`.${styles.scrollIndicator}`, { opacity: 1, duration: 1 }, 1.2);

      // 2. Cinematic scroll effect: scale background down subtly, fade it slightly
      const media = document.querySelector(`.${styles.mediaContainer}`);
      if (media) {
        gsap.to(media, {
          scale: 1.05,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // We add a wrapper to hook our refs, but it inherits full height from CSS
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
}
