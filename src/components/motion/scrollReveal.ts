import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealOptions = {
  duration: number;
  delay: number;
  stagger: number;
  ease: string;
};

const getRevealFromVars = (type: string): gsap.TweenVars => {
  switch (type) {
    case "fade-left":
      return { opacity: 0, x: -72, y: 0, scale: 1, filter: "blur(8px)" };
    case "fade-right":
      return { opacity: 0, x: 72, y: 0, scale: 1, filter: "blur(8px)" };
    case "fade-down":
      return { opacity: 0, x: 0, y: -56, scale: 1, filter: "blur(8px)" };
    case "zoom-in":
      return { opacity: 0, x: 0, y: 24, scale: 0.92, filter: "blur(10px)" };
    case "zoom-out":
      return { opacity: 0, x: 0, y: 16, scale: 1.08, filter: "blur(10px)" };
    case "soft":
      return { opacity: 0, x: 0, y: 0, scale: 1, filter: "blur(12px)" };
    case "fade-up":
    default:
      return { opacity: 0, x: 0, y: 56, scale: 1, filter: "blur(8px)" };
  }
};

const readSeconds = (element: HTMLElement, attribute: string, fallback: number) => {
  const value = element.dataset[attribute];
  if (!value) return fallback;

  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : fallback;
};

const reveal = (
  targets: HTMLElement[],
  trigger: HTMLElement,
  from: gsap.TweenVars,
  options: RevealOptions
) => {
  if (targets.length === 0) return;

  gsap.fromTo(targets, from, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: options.duration,
    delay: options.delay,
    stagger: options.stagger,
    ease: options.ease,
    // Remove transient inline values after entry so the component's CSS stays in control.
    clearProps: "transform,transformOrigin,opacity,filter",
    scrollTrigger: {
      trigger,
      start: "top 86%",
      end: "top 58%",
      // Reveals finish once and cannot disappear when visitors scroll back up.
      once: true,
      fastScrollEnd: 1400,
    },
  });
};

/** Set up the same directional, blurred reveals used by the Wasam reference site. */
export const setupScrollReveals = (scope: HTMLElement) => {
  gsap.registerPlugin(ScrollTrigger);

  const canReveal = (element: HTMLElement) =>
    !element.closest(".hero-section") && !element.closest("[data-motion-exempt]");
  const targets = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
    canReveal
  );
  const groups = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal-group]")).filter(
    canReveal
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const groupChildren = groups.flatMap((group) =>
      Array.from(group.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement
      )
    );
    gsap.set([...targets, ...groupChildren], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "none",
      clearProps: "transform,transformOrigin,opacity,filter",
    });
    return;
  }

  targets.forEach((element) => {
    const type = element.dataset.reveal || "fade-up";
    reveal([element], element, getRevealFromVars(type), {
      duration: readSeconds(element, "revealDuration", 0.68),
      delay: readSeconds(element, "revealDelay", 0),
      stagger: 0,
      ease: "power3.out",
    });
  });

  groups.forEach((group) => {
    const children = Array.from(group.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
    const type = group.dataset.revealGroup || "fade-up";
    const requestedStagger = readSeconds(group, "revealStagger", 0.1);
    // Bound the total stagger so larger lists still enter promptly.
    const stagger =
      children.length > 1 ? Math.min(requestedStagger, 0.28 / (children.length - 1)) : 0;

    reveal(children, group, getRevealFromVars(type), {
      duration: readSeconds(group, "revealDuration", 0.68),
      delay: readSeconds(group, "revealDelay", 0),
      stagger,
      ease: "power3.out",
    });
  });
};

/** IntersectionObserver fallback for the simple reveal classes used by secondary links. */
export const initReveal = (scope: HTMLElement) => {
  const elements = Array.from(scope.querySelectorAll<HTMLElement>(".reveal, .reveal-on-scroll"));
  if (elements.length === 0) return () => {};

  const revealImmediately = () => elements.forEach((element) => element.classList.add("visible"));
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof IntersectionObserver === "undefined"
  ) {
    revealImmediately();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target as HTMLElement;
        const delay = element.style.getPropertyValue("--card-delay");
        if (delay) element.style.transitionDelay = delay;
        element.classList.add("visible");
        observer.unobserve(element);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
};
