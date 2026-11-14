"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { FeaturedVoice } from "./featured-voices.data";
import styles from "./CastGallery.module.css";

type CastPortrait = Pick<FeaturedVoice, "id" | "name" | "title"> & { imageSrc?: string };

const DRIFT_SPEED = 54; // Pixels per second at full speed.

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

export function CastGallery({ members, label }: { members: CastPortrait[]; label: string }) {
  const id = useId();
  const railRef = useRef<HTMLUListElement>(null);
  const stepRef = useRef<((direction: number) => void) | null>(null);
  const canLoop = members.length >= 3;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !canLoop) return;

    const cards = Array.from(rail.querySelectorAll<HTMLLIElement>("li"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let visible = false;
    let pointer: { id: number; x: number } | null = null;
    let halfWidth = 0;
    let radius = 0;
    let pitch = 0;
    let position = 0;
    let queuedStep = 0;
    let velocity = 0;
    let frame = 0;
    let lastTime = 0;

    const draw = () => {
      const halfTrack = cards.length / 2;
      for (const [index, card] of cards.entries()) {
        // Two copies move the wrap point beyond the clipped edges of the visible arc.
        const x = (wrap(index - position + halfTrack, cards.length) - halfTrack) * pitch;
        const reach = Math.min(Math.abs(x), halfWidth);
        const drop = radius - Math.sqrt(radius * radius - reach * reach);
        const tangent = Math.sign(x) * Math.asin(reach / radius);
        card.style.transform = `translate(${x.toFixed(2)}px, ${drop.toFixed(2)}px) rotate(${tangent.toFixed(4)}rad)`;
      }
    };

    const canDrift = () => pointer === null && queuedStep === 0;

    const sync = () => {
      if (enabled && visible && !document.hidden && (canDrift() || queuedStep !== 0)) {
        if (!frame) frame = requestAnimationFrame(tick);
        return;
      }

      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      velocity = 0;
    };

    const tick = (time: number) => {
      frame = 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 40) : 0;
      lastTime = time;
      const ease = 1 - Math.exp(-elapsed / 100);
      velocity = canDrift() ? velocity + (DRIFT_SPEED - velocity) * ease : 0;
      const advance = Math.abs(queuedStep) < 0.002 ? queuedStep : queuedStep * ease;
      queuedStep -= advance;
      position = wrap(position + advance + (velocity * elapsed) / (1000 * pitch), cards.length);
      draw();
      sync();
    };

    const measure = () => {
      if (motion.matches) {
        enabled = false;
        queuedStep = 0;
        rail.removeAttribute("data-animated");
        rail.removeAttribute("data-cursor");
        for (const card of cards) card.style.removeProperty("transform");
        sync();
        return;
      }

      const width = rail.clientWidth;
      const cardWidth = cards[0].offsetWidth;
      if (!width || !cardWidth) return;

      pitch = cardWidth + parseFloat(getComputedStyle(rail).columnGap);
      halfWidth = width / 2;
      const depth = Math.min(42, Math.max(15, width * 0.035));
      // The circle's chord spans the viewport. Its sagitta sets the bend at the edges.
      radius = (halfWidth * halfWidth + depth * depth) / (2 * depth);

      if (!enabled) {
        position = (width - cardWidth) / (2 * pitch) - 0.12;
        rail.scrollLeft = 0;
        rail.dataset.animated = "";
        rail.dataset.cursor = "interactive";
        enabled = true;
      }

      draw();
      sync();
    };

    const pointerDown = (event: PointerEvent) => {
      if (!enabled || !event.isPrimary || event.button !== 0) return;
      pointer = { id: event.pointerId, x: event.clientX };
      queuedStep = 0;
      rail.setPointerCapture(event.pointerId);
      sync();
    };

    const pointerMove = (event: PointerEvent) => {
      if (!enabled || !pointer || pointer.id !== event.pointerId) return;
      position = wrap(position + (pointer.x - event.clientX) / pitch, cards.length);
      pointer.x = event.clientX;
      draw();
    };

    const pointerEnd = (event: PointerEvent) => {
      if (pointer?.id !== event.pointerId) return;
      pointer = null;
      sync();
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      rail.toggleAttribute("data-in-view", visible);
      sync();
    });
    const resize = new ResizeObserver(measure);
    stepRef.current = (direction) => {
      queuedStep += direction;
      sync();
    };

    measure();
    intersection.observe(rail);
    resize.observe(rail);
    motion.addEventListener("change", measure);
    document.addEventListener("visibilitychange", sync);
    rail.addEventListener("pointerdown", pointerDown);
    rail.addEventListener("pointermove", pointerMove);
    rail.addEventListener("lostpointercapture", pointerEnd);

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      motion.removeEventListener("change", measure);
      document.removeEventListener("visibilitychange", sync);
      rail.removeEventListener("pointerdown", pointerDown);
      rail.removeEventListener("pointermove", pointerMove);
      rail.removeEventListener("lostpointercapture", pointerEnd);
      rail.removeAttribute("data-animated");
      rail.removeAttribute("data-cursor");
      rail.removeAttribute("data-in-view");
      for (const card of cards) card.style.removeProperty("transform");
      stepRef.current = null;
    };
  }, [canLoop, members.length]);

  const entries = canLoop ? [...members, ...members] : members;

  return (
    <div className={styles.gallery}>
      <ul id={id} ref={railRef} className={styles.rail} role="list" aria-label={label}>
        {entries.map((member, index) => {
          const copy = index >= members.length;
          return (
            <li
              className={styles.card}
              key={`${member.id}-${copy ? "copy" : "original"}`}
              data-copy={copy ? "" : undefined}
              aria-hidden={copy ? true : undefined}
            >
              <div className={styles.portrait}>
                {member.imageSrc && (
                  <Image
                    src={member.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 660px) 152px, (max-width: 1180px) 23vw, 272px"
                    draggable={false}
                  />
                )}
              </div>
              <div className={styles.caption}>
                <p className={styles.name}>{member.name}</p>
                <p className={styles.role}>{member.title}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {canLoop && (
        <div className={styles.controls} aria-label={`${label} controls`} role="group">
          <button
            type="button"
            aria-label="Previous cast member"
            aria-controls={id}
            onClick={() => stepRef.current?.(-1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M20 12H4m7-7-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next cast member"
            aria-controls={id}
            onClick={() => stepRef.current?.(1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
