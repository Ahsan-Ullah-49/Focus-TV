"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const configureScrolling = () => {
      dispose();
      dispose = () => {};

      if (motionPreference.matches) return;

      // CSS smooth scrolling would compete with Lenis and delay route scroll restoration.
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      const lenis = new Lenis({
        duration: 1.2,
        easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        syncTouch: false,
        infinite: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        prevent: () => document.body.classList.contains("no-scroll"),
      });
      lenisRef.current = lenis;

      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);

      // Dialogs and the mobile menu must also stop momentum already in flight.
      const syncScrollLock = () => {
        const locked =
          document.body.classList.contains("no-scroll") ||
          document.body.style.overflow === "hidden";
        if (locked) lenis.stop();
        else lenis.start();
      };
      const scrollLockObserver = new MutationObserver(syncScrollLock);
      scrollLockObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      syncScrollLock();

      dispose = () => {
        scrollLockObserver.disconnect();
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenisRef.current = null;
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      };
    };

    configureScrolling();
    motionPreference.addEventListener("change", configureScrolling);

    return () => {
      motionPreference.removeEventListener("change", configureScrolling);
      dispose();
    };
  }, []);

  useEffect(() => {
    // Next owns route/hash/back-button positioning; only resync the scroll dimensions here.
    const frame = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
