"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./Footer.module.css";

export function FooterInvitation() {
  const areaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const arrow = arrowRef.current;
    if (!area || !arrow) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const moveX = gsap.quickTo(arrow, "x", { duration: 0.38, ease: "power3.out" });
    const moveY = gsap.quickTo(arrow, "y", { duration: 0.38, ease: "power3.out" });

    const moveTowardPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;

      const areaBounds = area.getBoundingClientRect();
      const arrowBounds = arrow.getBoundingClientRect();
      const halfWidth = arrow.offsetWidth / 2;
      const halfHeight = arrow.offsetHeight / 2;
      // Keep the moving CTA inside its banner and let it settle back on exit.
      const pointerX = Math.max(
        halfWidth,
        Math.min(areaBounds.width - halfWidth, event.clientX - areaBounds.left)
      );
      const pointerY = Math.max(
        halfHeight,
        Math.min(areaBounds.height - halfHeight, event.clientY - areaBounds.top)
      );
      const translateX = Number(gsap.getProperty(arrow, "x")) || 0;
      const translateY = Number(gsap.getProperty(arrow, "y")) || 0;
      const originX = arrowBounds.left - areaBounds.left + halfWidth - translateX;
      const originY = arrowBounds.top - areaBounds.top + halfHeight - translateY;

      moveX(pointerX - originX);
      moveY(pointerY - originY);
    };

    const returnToRest = () => {
      moveX(0);
      moveY(0);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        gsap.killTweensOf(arrow);
        gsap.set(arrow, { x: 0, y: 0 });
      }
    };

    area.addEventListener("pointermove", moveTowardPointer, { passive: true });
    area.addEventListener("pointerleave", returnToRest);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      area.removeEventListener("pointermove", moveTowardPointer);
      area.removeEventListener("pointerleave", returnToRest);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      gsap.killTweensOf(arrow);
      gsap.set(arrow, { clearProps: "transform" });
    };
  }, []);

  return (
    <div ref={areaRef} className={styles.invitation} data-reveal="stagger">
      <h2 data-reveal-child>
        Every story starts
        <br />
        with <em>a conversation.</em>
      </h2>
      <div className={styles.contactGroup} data-reveal-child>
        <Link href="/contact" className={styles.contactText} data-cursor="interactive">
          Let’s talk
        </Link>
        <Link
          ref={arrowRef}
          href="/contact"
          className={styles.contactArrow}
          aria-label="Let’s talk with FocusTV"
          data-cursor="interactive"
        >
          <span className={styles.contactArrowIcon}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 19 19 5M5 5h14v14"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
