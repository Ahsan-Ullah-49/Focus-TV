"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import styles from "./CustomCursor.module.css";

// ─── Constants ────────────────────────────────────────────────────────────────

// Ring lag: significantly reduced lerp so it follows with a smooth lag instead
// of being rigidly attached.
const RING_LERP = 0.25;

// Trail constants
const TRAIL_COUNT = 8;
const TRAIL_HISTORY = 16; // history buffer length
const TRAIL_LERP = 0.4;
// Offsets to sample from history, tighter spacing for a faster/shorter trail
const TRAIL_OFFSETS = [1, 2, 4, 6, 8, 10, 12, 14] as const;

// Arrow tip offset. Because the SVG scales and has a stroke, we shift the DOM
// element slightly so the visual tip aligns perfectly with the pointer hotspot.
const ARROW_TIP_OFFSET = 1.5;

const emptySubscribe = () => () => {};

// ─── Interactive-element check ────────────────────────────────────────────────
function isInteractive(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return !!(
    target.closest("a") ||
    target.closest("button") ||
    target.closest("input") ||
    target.closest("textarea") ||
    target.closest('[role="button"]') ||
    target.closest("[data-cursor='interactive']")
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CustomCursor() {
  // Prevent SSR/hydration mismatch — render nothing on the server.
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isMounted) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bail on touch/coarse-pointer.
    if (!hasFinePointer) return;

    const arrow = arrowRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const container = containerRef.current;
    if (!arrow || !dot || !ring || !container) return;

    let isActive = false;

    let mouseX = -400;
    let mouseY = -400;
    let ringX = -400;
    let ringY = -400;

    // Ring-buffer for trail history
    const history: { x: number; y: number }[] = Array.from({ length: TRAIL_HISTORY }, () => ({
      x: -400,
      y: -400,
    }));
    let historyHead = 0;
    const trailPos = Array.from({ length: TRAIL_COUNT }, () => ({
      x: -400,
      y: -400,
    }));

    // ── Positioning helpers ────────────────────────────────────────────────────

    const setTransform = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    };

    // Arrow is top-left aligned (minus a small offset for stroke/scale)
    const positionArrow = (x: number, y: number, offset: number) => {
      arrow.style.transform = `translate3d(${x - offset}px,${y - offset}px,0)`;
    };

    const historyAt = (age: number) => {
      const idx = (historyHead - age + TRAIL_HISTORY) % TRAIL_HISTORY;
      return history[idx];
    };

    // ── Event listeners ───────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isActive) {
        ringX = mouseX;
        ringY = mouseY;
        for (let i = 0; i < TRAIL_HISTORY; i++) {
          history[i].x = mouseX;
          history[i].y = mouseY;
        }
        for (let i = 0; i < TRAIL_COUNT; i++) {
          trailPos[i].x = mouseX;
          trailPos[i].y = mouseY;
        }
        isActive = true;
        container.style.opacity = "1";
      }

      // Arrow snaps to the exact pointer position immediately.
      // The tip offset is used for the arrow since its hotpot is top-left.
      positionArrow(mouseX, mouseY, ARROW_TIP_OFFSET);
    };

    const onMouseLeave = () => {
      isActive = false;
      container.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (isActive) container.style.opacity = "1";
    };

    // Hover-state for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        ring.classList.add(styles.ringInteractive);
        container.classList.add(styles.isInteractive);
      } else {
        ring.classList.remove(styles.ringInteractive);
        container.classList.remove(styles.isInteractive);
      }
    };

    // ── rAF render loop ───────────────────────────────────────────────────────
    let animId: number;

    const render = () => {
      if (isActive) {
        // 1. Ring interpolates independently
        const currentRingLerp = prefersReducedMotion ? 0.8 : RING_LERP;
        ringX += (mouseX - ringX) * currentRingLerp;
        ringY += (mouseY - ringY) * currentRingLerp;
        setTransform(ring, ringX, ringY);

        // Dot stays firmly fixed inside the ring's center
        setTransform(dot, ringX, ringY);

        // 2. History buffer for trail
        historyHead = (historyHead + 1) % TRAIL_HISTORY;
        history[historyHead].x = mouseX;
        history[historyHead].y = mouseY;

        // 3. Trail dots
        if (!prefersReducedMotion) {
          for (let i = 0; i < TRAIL_COUNT; i++) {
            const sample = historyAt(TRAIL_OFFSETS[i]);
            trailPos[i].x += (sample.x - trailPos[i].x) * TRAIL_LERP;
            trailPos[i].y += (sample.y - trailPos[i].y) * TRAIL_LERP;

            const el = trailRefs.current[i];
            if (el) {
              setTransform(el, trailPos[i].x, trailPos[i].y);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className={styles.cursorContainer} style={{ opacity: 0 }}>
      {/* Trail dots (z-index: 1) */}
      {Array.from({ length: TRAIL_COUNT }, (_, rev) => {
        const i = TRAIL_COUNT - 1 - rev; // Oldest first in DOM
        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className={styles.trailDot}
            style={{ "--trail-i": i } as React.CSSProperties}
          />
        );
      })}

      {/* Ring (z-index: 2) */}
      <div ref={ringRef} className={styles.cursorRing} />

      {/* Center Dot (z-index: 3) */}
      <div ref={dotRef} className={styles.cursorDot} />

      {/* Vectors (z-index: 4) */}
      <div ref={arrowRef} className={styles.cursorArrow}>
        {/* Normal Arrow (larger 1.35x scale) */}
        <svg
          className={styles.arrowSvg}
          width="30"
          height="38"
          viewBox="0 0 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          style={{ overflow: "visible" }}
        >
          <path
            d="M0 0 L0 17 L4.5 13 L7.5 20.5 L10.5 19.2 L7.5 11.8 L13.5 11.8 Z"
            fill="#b8bfc8"
            stroke="#BF8B25"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Interactive Hand Pointer (same visual scale) */}
        <svg
          className={styles.handSvg}
          width="30"
          height="38"
          viewBox="-5 -2 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          style={{ overflow: "visible" }}
        >
          <path
            d="M0,0 C0,-1.5 2,-1.5 2,0 L2,5.5 C2.8,5.1 4.2,5.5 4.2,6.7 L4.2,7.2 C5,6.8 6.4,7.2 6.4,8.4 L6.4,8.9 C7.2,8.7 8.5,9.2 8.5,10.4 L8.5,14.5 C8.5,17.5 5.5,19.5 2.5,19.5 C-1.5,19.5 -3.5,16.5 -3.5,13.5 L-3.5,5.5 C-3.5,4 -1.5,4 -1.5,5.5 L-1.5,8 L0,8 Z"
            fill="#b8bfc8"
            stroke="#BF8B25"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
