"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PageMotion.module.css";

type PageMotionProps = {
  children: ReactNode;
  transition?: boolean;
  className?: string;
};

/** Opt-in reveals keep each section's composition and existing motion independent. */
export function PageMotion({ children, transition = true, className }: PageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let refreshFrame = 0;
    let disposed = false;

    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        if (transition && curtainRef.current) {
          gsap.fromTo(
            curtainRef.current,
            { visibility: "visible", clipPath: "inset(0 0 0% 0)" },
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.65,
              ease: "power3.inOut",
              onComplete: () => {
                if (curtainRef.current) curtainRef.current.style.visibility = "hidden";
              },
            }
          );
        }

        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          const variant = element.dataset.reveal;
          const markedChildren = Array.from(
            element.querySelectorAll<HTMLElement>("[data-reveal-child]")
          );
          const targets =
            variant === "stagger" && markedChildren.length > 0 ? markedChildren : element;

          const from: gsap.TweenVars =
            variant === "mask"
              ? { clipPath: "inset(0 0 100% 0)" }
              : variant === "line"
                ? { clipPath: "inset(0 100% 0 0)" }
                : { opacity: 0, y: variant === "stagger" ? 28 : 22 };

          gsap.fromTo(targets, from, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0 0)",
            duration: variant === "mask" ? 1.05 : 0.8,
            stagger: variant === "stagger" ? 0.09 : 0,
            ease: variant === "mask" ? "power3.inOut" : "power3.out",
            clearProps: "transform,transformOrigin,opacity,clipPath",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          });
        });
      }, root);

      return () => context.revert();
    });

    // Image decoding and webfont metrics can change a trigger's final position.
    root.addEventListener("load", refresh, true);
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(root);
    document.fonts.ready.then(refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      root.removeEventListener("load", refresh, true);
      resizeObserver.disconnect();
      media.revert();
    };
  }, [pathname, transition]);

  return (
    <div ref={rootRef} className={className}>
      {transition && <div ref={curtainRef} className={styles.curtain} aria-hidden="true" />}
      {children}
    </div>
  );
}
