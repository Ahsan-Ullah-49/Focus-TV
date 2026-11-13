"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutTimeline.module.css";

export function AboutTimeline({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const chapters = Array.from(scope.querySelectorAll<HTMLElement>("[data-journey-chapter]"));
    const nodes = chapters.map((chapter) =>
      chapter.querySelector<HTMLElement>("[data-journey-node]")
    );
    const rail = scope.querySelector<HTMLElement>("[data-journey-rail]");
    if (!chapters.length || !rail) return;
    gsap.registerPlugin(ScrollTrigger);
    let centers: number[] = [];
    let documentTop = 0;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const top = scope.getBoundingClientRect().top;
      documentTop = top + window.scrollY;
      centers = nodes.map((node) => {
        const rect = node!.getBoundingClientRect();
        return rect.top + rect.height / 2 - top;
      });
      rail.style.top = `${centers[0]}px`;
      rail.style.height = `${centers.at(-1)! - centers[0]}px`;
    };
    const update = () => {
      const current = window.scrollY + window.innerHeight * 0.55 - documentTop;
      const reduced = motionPreference.matches;
      const progress = reduced
        ? 1
        : Math.max(0, Math.min(1, (current - centers[0]) / (centers.at(-1)! - centers[0])));
      const curve = reduced ? 0 : Math.sin(progress * Math.PI);
      scope.style.setProperty("--journey-progress", String(progress));
      // The curve peaks only through the middle of the journey, leaving its start and end flat.
      scope.style.setProperty("--journey-rotation", `${curve * -1.25}deg`);
      scope.style.setProperty("--journey-scale", String(1 - curve * 0.012));
      scope.style.setProperty("--journey-shadow-opacity", String(curve * 0.65));
      chapters.forEach((chapter, index) => {
        const active = String(reduced || current >= centers[index]);
        if (chapter.dataset.journeyActive !== active) chapter.dataset.journeyActive = active;
      });
    };
    measure();
    const trigger = ScrollTrigger.create({
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      onUpdate: update,
      onRefresh: () => {
        measure();
        update();
      },
    });
    const resize = new ResizeObserver(() => {
      measure();
      update();
    });
    resize.observe(scope);
    update();
    return () => {
      resize.disconnect();
      trigger.kill();
      scope.style.removeProperty("--journey-rotation");
      scope.style.removeProperty("--journey-scale");
      scope.style.removeProperty("--journey-shadow-opacity");
    };
  }, []);

  return (
    <div ref={root} className={`${styles.timeline} ${className}`}>
      <div className={styles.rail} data-journey-rail aria-hidden="true" />
      {children}
    </div>
  );
}
