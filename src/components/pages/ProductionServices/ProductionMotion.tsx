"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProductionMotion.module.css";
import { useProductionPalette } from "./useProductionPalette";

type FlightFilm = { id: string; poster: string };
type Bounds = { left: number; top: number; width: number; height: number };
type Interval = { start: number; end: number };
type Flight = {
  id: string;
  element: HTMLElement;
  origin: HTMLElement;
  target: HTMLElement;
  copy: HTMLElement;
  from: Bounds;
  to: Bounds;
  text: Bounds;
  obstacles: Bounds[];
  dockAt: number;
  dockFrom: number;
  lastPosterOpacity: number;
};

const FILM_ASPECT_RATIO = 16 / 9;
const DOCK_VIEWPORT_LINE = 0.52;
const COPY_GAP = 24;
const VIEWPORT_GAP = 16;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const centerX = (bounds: Bounds) => bounds.left + bounds.width / 2;
const centerY = (bounds: Bounds) => bounds.top + bounds.height / 2;
const documentBounds = (element: HTMLElement): Bounds => {
  const box = element.getBoundingClientRect();
  return { left: box.left, top: box.top + window.scrollY, width: box.width, height: box.height };
};

function nearestFree(value: number, min: number, max: number, blocked: Interval[]) {
  if (max < min) return null;
  const ranges = blocked
    .filter((r) => r.end > min && r.start < max)
    .sort((a, b) => a.start - b.start);
  let cursor = min;
  let nearest: number | null = null;
  const consider = (start: number, end: number) => {
    if (end < start) return;
    const candidate = Math.max(start, Math.min(end, value));
    if (nearest === null || Math.abs(candidate - value) < Math.abs(nearest - value))
      nearest = candidate;
  };
  for (const range of ranges) {
    consider(cursor, Math.min(max, range.start));
    cursor = Math.max(cursor, range.end);
  }
  consider(cursor, max);
  return nearest;
}

function clearObstacles(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  boxes: Bounds[],
  scroll: number,
  viewportWidth: number,
  viewportHeight: number,
  headerHeight: number
) {
  const rows = boxes.filter(
    (box) =>
      y + halfHeight + COPY_GAP > box.top - scroll &&
      y - halfHeight - COPY_GAP < box.top + box.height - scroll
  );
  const safeX = nearestFree(
    x,
    VIEWPORT_GAP + halfWidth,
    viewportWidth - VIEWPORT_GAP - halfWidth,
    rows.map((box) => ({
      start: box.left - halfWidth - COPY_GAP,
      end: box.left + box.width + halfWidth + COPY_GAP,
    }))
  );
  if (safeX !== null) return { x: safeX, y };

  // A narrow screen can be entirely occupied by copy. Continue the image below
  // that reading block instead of clipping it against the text or fading it out.
  const columnX = Math.max(halfWidth, Math.min(viewportWidth - halfWidth, x));
  const columns = boxes.filter(
    (box) =>
      columnX + halfWidth + COPY_GAP > box.left &&
      columnX - halfWidth - COPY_GAP < box.left + box.width
  );
  const blockedRows = columns.map((box) => ({
    start: box.top - scroll - halfHeight - COPY_GAP,
    end: box.top + box.height - scroll + halfHeight + COPY_GAP,
  }));
  const minY = headerHeight + VIEWPORT_GAP + halfHeight;
  const safeY = nearestFree(y, minY, viewportHeight - VIEWPORT_GAP - halfHeight, blockedRows);
  return {
    x: columnX,
    // If the viewport is full, use the next complete free lane below it. Checking
    // the whole interval union also prevents entering the following copy block.
    y: safeY ?? nearestFree(y, minY, Infinity, blockedRows) ?? y,
  };
}

function intersects(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  box: Bounds,
  scroll: number
) {
  return (
    x + halfWidth > box.left &&
    x - halfWidth < box.left + box.width &&
    y + halfHeight > box.top - scroll &&
    y - halfHeight < box.top + box.height - scroll
  );
}

export function ProductionMotion({
  children,
  films,
}: {
  children: ReactNode;
  films: FlightFilm[];
}) {
  const root = useRef<HTMLDivElement>(null);
  useProductionPalette(root);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia(scope);
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const scene = scope.querySelector<HTMLElement>("[data-production-hero-scene]");
      const heroCopy = scope.querySelector<HTMLElement>("[data-production-copy]");
      if (!scene || !heroCopy) return;
      const flights: Flight[] = [];
      for (const film of films) {
        const element = scope.querySelector<HTMLElement>(`[data-flight-flyer="${film.id}"]`);
        const origin = scope.querySelector<HTMLElement>(`[data-flight-origin="${film.id}"]`);
        const target = scope.querySelector<HTMLElement>(`[data-production-target="${film.id}"]`);
        const copy = target
          ?.closest("[data-production-chapter]")
          ?.querySelector<HTMLElement>("[data-production-copy]");
        if (!element || !origin || !target || !copy) continue;
        flights.push({
          id: film.id,
          element,
          origin,
          target,
          copy,
          from: documentBounds(origin),
          to: documentBounds(target),
          text: documentBounds(copy),
          obstacles: [],
          dockAt: 0,
          dockFrom: 0,
          lastPosterOpacity: 1,
        });
      }
      if (flights.length !== films.length) return;
      const copyElements = Array.from(
        scope.querySelectorAll<HTMLElement>("[data-production-copy]")
      );
      let protectedCopy: Bounds[] = [];
      let heroBounds = documentBounds(scene);
      let heroText = documentBounds(heroCopy);
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      let headerHeight = 88;
      let launch = 0;
      let compact = false;
      let disposed = false;
      let refreshFrame = 0;

      const measure = () => {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        headerHeight =
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--header-height")
          ) || 88;
        compact = viewportWidth <= 850;
        heroBounds = documentBounds(scene);
        heroText = documentBounds(heroCopy);
        protectedCopy = copyElements.map((element) => {
          if (element.tagName !== "H2") return documentBounds(element);
          const range = document.createRange();
          range.selectNodeContents(element);
          const box = range.getBoundingClientRect();
          return {
            left: box.left,
            top: box.top + window.scrollY,
            width: box.width,
            height: box.height,
          };
        });
        launch = Math.max(0, heroBounds.top + heroBounds.height * 0.18 - viewportHeight * 0.4);
        for (const flight of flights) {
          flight.from = documentBounds(flight.origin);
          flight.to = documentBounds(flight.target);
          flight.text = documentBounds(flight.copy);
          flight.dockAt = Math.max(
            launch + 1,
            centerY(flight.to) - viewportHeight * DOCK_VIEWPORT_LINE
          );
          flight.dockFrom =
            flight.dockAt - Math.min(viewportHeight * 0.55, (flight.dockAt - launch) * 0.33);
          flight.element.style.width = `${flight.from.width}px`;
        }
        for (const flight of flights) {
          // Leave every other player's full frame clear, including its outer bezel.
          flight.obstacles = protectedCopy.concat(
            flights.filter((other) => other !== flight).map((other) => other.to)
          );
        }
      };

      const render = () => {
        if (disposed) return;
        const scroll = window.scrollY;
        const first = flights[0];
        const depart = ease(
          (scroll - launch) /
            Math.max(1, Math.min(viewportHeight * 0.5, (first.dockAt - launch) * 0.36))
        );
        let railX = centerX(heroBounds);
        for (let i = 0; i < flights.length; i++) {
          const previousCopy = i === 0 ? heroText : flights[i - 1].text;
          const fromX = i === 0 ? centerX(heroBounds) : centerX(flights[i - 1].to);
          const clearAt = Math.max(launch, previousCopy.top + previousCopy.height - headerHeight);
          if (scroll < clearAt) break;
          const progress = ease((scroll - clearAt) / Math.max(1, flights[i].dockAt - clearAt));
          railX = mix(fromX, centerX(flights[i].to), progress);
          if (progress < 1) break;
        }
        const radiusX = compact
          ? Math.min(78, viewportWidth * 0.2)
          : Math.min(160, first.to.width * 0.27);
        const radiusY = compact ? 56 : 82;
        const travellingWidth = compact
          ? Math.min(190, viewportWidth * 0.48)
          : Math.min(290, first.to.width * 0.48);

        flights.forEach((flight, index) => {
          const dock = ease(
            (scroll - flight.dockFrom) / Math.max(1, flight.dockAt - flight.dockFrom)
          );
          const phase =
            ((scroll - launch) / viewportHeight) * Math.PI * 1.45 +
            (index * Math.PI * 2) / films.length;
          const depth = Math.cos(phase);
          const orbitWidth = travellingWidth * (0.87 + 0.16 * depth);
          let x = mix(
            mix(centerX(flight.from), railX + Math.sin(phase) * radiusX, depart),
            centerX(flight.to),
            dock
          );
          let y = mix(
            mix(centerY(flight.from) - scroll, viewportHeight * 0.48 + depth * radiusY, depart),
            centerY(flight.to) - scroll,
            dock
          );
          const width = mix(mix(flight.from.width, orbitWidth, depart), flight.to.width, dock);
          const height = width / FILM_ASPECT_RATIO;
          const turnY = mix(
            mix(index === 0 ? -8 : index === 1 ? 12 : -15, Math.sin(phase) * 32, depart),
            0,
            dock
          );
          const turnX = mix(Math.sin(phase + 0.5) * 12 * depart, 0, dock);
          const turnZ = mix(Math.sin(phase) * 9 * depart, 0, dock);
          const bank = Math.abs(Math.sin((turnZ * Math.PI) / 180));
          const halfWidth = width / 2 + (height * bank) / 2 + width * 0.05 * (1 - dock);
          const halfHeight = height / 2 + (width * bank) / 2 + height * 0.07 * (1 - dock);
          if (depart > 0.005 && dock < 1)
            ({ x, y } = clearObstacles(
              x,
              y,
              halfWidth,
              halfHeight,
              flight.obstacles,
              scroll,
              viewportWidth,
              viewportHeight,
              headerHeight
            ));
          const handoff = ease((dock - 0.96) / 0.04);
          const opacity = scroll >= flight.dockAt ? 0 : 1 - handoff;
          const clearOfOtherFilms = flights.every(
            (other) =>
              other.id === flight.id || !intersects(x, y, halfWidth, halfHeight, other.to, scroll)
          );
          const dockingAboveFrame = dock > 0.3 && clearOfOtherFilms;
          const scale = width / flight.from.width;
          flight.element.style.transform = `translate3d(${x - flight.from.width / 2}px, ${y - flight.from.width / FILM_ASPECT_RATIO / 2}px, 0) perspective(1400px) rotateY(${turnY}deg) rotateX(${turnX}deg) rotateZ(${turnZ}deg) scale(${scale})`;
          flight.element.style.opacity = String(opacity);
          // Every player is above the travelling stills. Only its own still may
          // rise above that layer during the final, geometrically matched handoff.
          flight.element.style.zIndex = String(
            dockingAboveFrame ? 7 : depart < 0.1 ? 4 - index : 2 + Math.round(depth + 1)
          );
          flight.element.dataset.flightPhase =
            scroll >= flight.dockAt
              ? "docked"
              : dock > 0
                ? "docking"
                : depart > 0
                  ? "orbit"
                  : "hero";
          const posterOpacity = dockingAboveFrame
            ? 1 - ease((dock - 0.55) / 0.2) * (1 - handoff) * opacity
            : 1;
          if (Math.abs(flight.lastPosterOpacity - posterOpacity) > 0.005) {
            flight.target.style.setProperty("--production-poster-opacity", String(posterOpacity));
            flight.lastPosterOpacity = posterOpacity;
          }
        });
      };
      measure();
      scope.dataset.orbitReady = "true";
      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: render,
        onRefresh: () => {
          measure();
          render();
        },
      });
      render();
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };
      const resize = new ResizeObserver(refresh);
      resize.observe(scope);
      document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        resize.disconnect();
        trigger.kill();
        delete scope.dataset.orbitReady;
        for (const flight of flights) {
          flight.element.style.cssText = "";
          delete flight.element.dataset.flightPhase;
          flight.target.style.removeProperty("--production-poster-opacity");
        }
      };
    });
    return () => motion.revert();
  }, [films]);

  return (
    <div ref={root} className={styles.root}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropBase} />
        <div className={styles.backdropFade} data-production-background />
      </div>
      {children}
      <div className={styles.orbitLayer} aria-hidden="true">
        {films.map((film) => (
          <div className={styles.flyer} key={film.id} data-flight-flyer={film.id}>
            <Image src={film.poster} alt="" fill sizes="(max-width: 850px) 80vw, 44vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
