"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EditorialMotion.module.css";

type RevealPose = { x: number; y: number; scale: number; rotationX: number };

function poseFor(kind: string | undefined, direction: number, compact: boolean): RevealPose {
  const distance = compact ? 24 : 48;
  if (kind === "left") return { x: -distance, y: 14 * direction, scale: 1, rotationX: 0 };
  if (kind === "right") return { x: distance, y: 14 * direction, scale: 1, rotationX: 0 };
  if (kind === "image") return { x: 0, y: 30 * direction, scale: 0.95, rotationX: 3 * direction };
  if (kind === "heading") return { x: 0, y: 28 * direction, scale: 1, rotationX: 7 * direction };
  return { x: 0, y: 40 * direction, scale: kind === "card" ? 0.97 : 1, rotationX: 0 };
}

/** Repeat reveals only after the complete block leaves the screen, in either direction. */
export function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(scope);
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const compact = window.innerWidth <= 760;
      const targets = Array.from(scope.querySelectorAll<HTMLElement>("[data-editorial-reveal]"));
      targets.forEach((element) => {
        const show = (direction: number) => {
          gsap.killTweensOf(element);
          gsap.fromTo(
            element,
            {
              ...poseFor(element.dataset.editorialReveal, direction, compact),
              autoAlpha: 0,
              transformPerspective: 1200,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotationX: 0,
              autoAlpha: 1,
              duration: element.dataset.editorialReveal === "heading" ? 0.8 : 0.7,
              delay: Math.min(Number(element.dataset.editorialDelay) || 0, 0.15),
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        };
        const hide = () => {
          gsap.killTweensOf(element);
          gsap.set(element, { autoAlpha: 0 });
        };
        gsap.set(element, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: element,
          start: "top 99%",
          end: "bottom top",
          onEnter: () => show(1),
          onEnterBack: () => show(-1),
          onLeave: hide,
          onLeaveBack: hide,
        });
      });

      scope.querySelectorAll<HTMLElement>("[data-editorial-hero]").forEach((scene) => {
        // Mobile keeps the source's full landscape framing rather than cropping it for parallax.
        if (compact) return;
        const frame = scene.querySelector<HTMLElement>("[data-editorial-window]");
        const photo = scene.querySelector<HTMLElement>("[data-editorial-photo]");
        if (!frame || !photo) return;
        gsap.fromTo(
          photo,
          { yPercent: -6, scale: 1.09 },
          {
            yPercent: 6,
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.7 },
          }
        );
        gsap.fromTo(
          frame,
          { clipPath: `inset(${compact ? 3 : 5}% 4% round 20px)` },
          {
            clipPath: "inset(0% 0% round 4px)",
            ease: "none",
            scrollTrigger: { trigger: scene, start: "top 80%", end: "top 10%", scrub: 0.7 },
          }
        );
      });
      const focus = (event: FocusEvent) => {
        const element =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>("[data-editorial-reveal]")
            : null;
        if (element && scope.contains(element)) {
          gsap.killTweensOf(element);
          gsap.set(element, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationX: 0 });
        }
      };
      scope.addEventListener("focusin", focus);
      return () => scope.removeEventListener("focusin", focus);
    });
    return () => motion.revert();
  }, []);
  return (
    <div ref={root} className={styles.root} data-motion-exempt>
      {children}
    </div>
  );
}
