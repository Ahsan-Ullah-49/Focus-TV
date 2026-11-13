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

    const getLocalCenter = (node: HTMLElement) => {
      let offset = node.offsetTop + node.offsetHeight / 2;
      let parent = node.offsetParent as HTMLElement | null;

      // The rail is positioned inside the timeline, so measure in its untransformed
      // local coordinate space rather than from transformed viewport bounds.
      while (parent && parent !== scope) {
        offset += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement | null;
      }

      return offset;
    };

    const measure = () => {
      const top = scope.getBoundingClientRect().top;
      documentTop = top + window.scrollY;
      centers = nodes.map((node) => getLocalCenter(node!));
      rail.style.top = `${centers[0]}px`;
      rail.style.height = `${Math.max(0, centers.at(-1)! - centers[0])}px`;
    };
    const update = () => {
      const current = window.scrollY + window.innerHeight * 0.55 - documentTop;
      const reduced = motionPreference.matches;
      const finalCenter = centers.at(-1)!;
      const progress = reduced
        ? 1
        : Math.max(0, Math.min(1, (current - centers[0]) / (finalCenter - centers[0])));
      // Start the dimensional motion with Chapter 01, then return it to a flat page
      // as the final chapter reaches the reading line.
      const curveProgress = reduced ? 1 : Math.max(0, Math.min(1, current / finalCenter));
      const curve = reduced ? 0 : Math.sin(Math.pow(curveProgress, 0.7) * Math.PI);
      scope.style.setProperty("--journey-progress", String(progress));
      scope.style.setProperty("--journey-rotation", `${curve * -4.75}deg`);
      scope.style.setProperty("--journey-scale", String(1 - curve * 0.055));
      scope.style.setProperty("--journey-shadow-opacity", String(curve * 0.8));
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
      scope.style.removeProperty("--journey-progress");
    };
  }, []);

  return (
    <div ref={root} className={`${styles.timeline} ${className}`}>
      <div className={styles.rail} data-journey-rail aria-hidden="true" />
      {children}
    </div>
  );
}
