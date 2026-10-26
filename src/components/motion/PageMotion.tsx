"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initReveal, setupScrollReveals } from "./scrollReveal";
import styles from "./PageMotion.module.css";

type PageMotionProps = {
  children: ReactNode;
  className?: string;
};

/** Keep reference-style reveals scoped to the page content that owns them. */
export function PageMotion({ children, className }: PageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(root);
    motion.add("(prefers-reduced-motion: no-preference)", () => setupScrollReveals(root));
    motion.add("(prefers-reduced-motion: reduce)", () => setupScrollReveals(root));

    let stopFallbackReveals = initReveal(root);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const refreshFallbackReveals = () => {
      stopFallbackReveals();
      stopFallbackReveals = initReveal(root);
    };
    motionPreference.addEventListener("change", refreshFallbackReveals);
    let refreshFrame = 0;
    let disposed = false;

    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // Image decoding and webfont metrics can shift reveal trigger positions after mount.
    root.addEventListener("load", refresh, true);
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(root);
    document.fonts.ready.then(refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      stopFallbackReveals();
      motionPreference.removeEventListener("change", refreshFallbackReveals);
      root.removeEventListener("load", refresh, true);
      resizeObserver.disconnect();
      motion.revert();
    };
  }, [pathname]);

  return (
    <div ref={rootRef} className={[styles.motionRoot, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
