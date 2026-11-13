import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme, type PagePalette } from "@/components/providers/ThemeProvider";

export function useProductionPalette(root: RefObject<HTMLDivElement | null>) {
  const { setPagePalette, preferredTheme } = useTheme();
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    gsap.registerPlugin(ScrollTrigger);
    const chapters = Array.from(scope.querySelectorAll<HTMLElement>("[data-production-chapter]"));
    const exit = scope.querySelector<HTMLElement>("[data-production-exit]");
    const backdrop = scope.querySelector<HTMLElement>("[data-production-background]");
    const backgroundColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
    let backgroundFrom = backgroundColor();
    let fade: gsap.core.Tween | null = null;
    let points: { at: number; palette: PagePalette }[] = [];
    let selected: PagePalette | null = null;
    let disposed = false;
    const base: PagePalette = preferredTheme === "dark" ? "dark" : "paper";
    const contrast: PagePalette = preferredTheme === "dark" ? "paper" : "dark";
    const measure = () => {
      const lead = window.innerHeight * 0.55;
      points = chapters.map((chapter) => ({
        at: chapter.getBoundingClientRect().top + window.scrollY - lead,
        palette:
          chapter.dataset.palette === "green"
            ? "green"
            : chapter.dataset.palette === "gold"
              ? "gold"
              : contrast,
      }));
      if (exit)
        points.push({
          at: exit.getBoundingClientRect().top + window.scrollY - lead,
          palette: base,
        });
    };
    const update = () => {
      let next: PagePalette = base;
      for (const point of points) if (window.scrollY >= point.at) next = point.palette;
      if (next !== selected) {
        const initialized = selected !== null;
        const remaining = backdrop ? Number(gsap.getProperty(backdrop, "opacity")) : 0;
        const visibleBackground = gsap.utils.interpolate(
          backgroundFrom,
          backgroundColor(),
          1 - remaining
        );
        selected = next;
        fade?.kill();
        setPagePalette(next);
        backgroundFrom = visibleBackground;
        // Crossfade two viewport-sized surfaces instead of repainting a tall document.
        if (backdrop && initialized) {
          gsap.set(backdrop, { backgroundColor: backgroundFrom, opacity: 1 });
          fade = gsap.to(backdrop, {
            opacity: 0,
            duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6,
            ease: "power2.out",
          });
        }
      }
    };
    measure();
    update();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: update,
      onRefresh: () => {
        measure();
        update();
      },
    });
    document.fonts.ready.then(() => {
      if (!disposed) {
        measure();
        update();
      }
    });
    return () => {
      disposed = true;
      trigger.kill();
      fade?.kill();
      setPagePalette(null);
    };
  }, [root, setPagePalette, preferredTheme]);
}
