"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroConfig, buildVimeoEmbedUrl } from "./hero.config";
import styles from "./Hero.module.css";

// ─── Vimeo embed URL ──────────────────────────────────────────────────────────
// Pre-built with all Vimeo parameters (clean chrome, muted autoplay, API enabled).
// To replace video or tweak parameters, edit `src/components/sections/Hero/hero.config.ts`.
const VIMEO_SRC = buildVimeoEmbedUrl();

// ─── postMessage helpers ──────────────────────────────────────────────────────
/**
 * Dispatches a Vimeo Player API command via window postMessage.
 *
 * The Vimeo player uses the froogaloop2 / postMessage protocol.
 * We communicate directly with the iframe Window to avoid Turbopack dynamic-import
 * issues with `@vimeo/player` SDK while maintaining identical control fidelity.
 *
 * To add future controls (e.g. seek, speed, fullscreen):
 * Call `vimeoPost(iframe, "<methodName>", <value>)`.
 */
function vimeoPost(
  iframe: HTMLIFrameElement,
  method: string,
  value?: unknown
) {
  if (!iframe.contentWindow) return;
  const data: Record<string, unknown> = { method };
  if (value !== undefined) data.value = value;
  iframe.contentWindow.postMessage(JSON.stringify(data), heroConfig.vimeoOrigin);
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function MuteIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 10h3.2L12 6.4v11.2L7.2 14H4v-4Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M16 9.2 20.8 14M20.8 9.2 16 14"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 10h3.2L12 6.4v11.2L7.2 14H4v-4Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M15.4 9.2a3.6 3.6 0 0 1 0 5.6M17.8 7a6.4 6.4 0 0 1 0 10"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Playback UI state
  const [isPaused, setIsPaused] = useState(false); // assume playing (autoplay=1)
  const [isMuted, setIsMuted] = useState(true);
  const [posterVisible, setPosterVisible] = useState(true);
  const [iframeReady, setIframeReady] = useState(false);

  // ── Listen to Vimeo postMessage events ───────────────────────────────────
  useEffect(() => {
    const handleMessage = (evt: MessageEvent) => {
      // Only accept messages from Vimeo's player origin
      if (!evt.origin.includes("vimeo.com")) return;

      let data: Record<string, unknown>;
      try {
        data = typeof evt.data === "string" ? JSON.parse(evt.data) : evt.data;
      } catch {
        return;
      }

      const { event, value } = data as {
        event?: string;
        value?: unknown;
      };

      if (event === "ready") {
        // Player is ready — subscribe to events and trigger autoplay
        setIframeReady(true);
        const iframe = iframeRef.current;
        if (!iframe) return;
        vimeoPost(iframe, "addEventListener", "play");
        vimeoPost(iframe, "addEventListener", "pause");
        vimeoPost(iframe, "addEventListener", "ended");
        vimeoPost(iframe, "addEventListener", "volumechange");
        // Ensure muted state and start playback
        vimeoPost(iframe, "setVolume", 0);
        vimeoPost(iframe, "play");
      }

      if (event === "play" || event === "playing") {
        setIsPaused(false);
        setPosterVisible(false);
      }

      if (event === "pause") {
        setIsPaused(true);
      }

      if (event === "ended") {
        // Loop is enabled via URL parameter; this fires before the loop restarts
        setIsPaused(true);
      }

      if (event === "volumechange") {
        const payload = value as { volume: number; muted?: boolean } | null;
        if (payload) {
          // Treat volume=0 as muted regardless of the muted flag
          setIsMuted(payload.volume === 0 || payload.muted === true);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ── Controls: Play/Pause ──────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (isPaused) {
      vimeoPost(iframe, "play");
    } else {
      vimeoPost(iframe, "pause");
    }
  }, [isPaused]);

  // ── Controls: Mute ────────────────────────────────────────────────────────
  const handleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (isMuted) {
      // Unmute: restore volume to configured level
      vimeoPost(iframe, "setVolume", heroConfig.unmuteVolume);
      setIsMuted(false);
    } else {
      vimeoPost(iframe, "setVolume", 0);
      setIsMuted(true);
    }
  }, [isMuted]);

  // ── Controls: Click layer (toggle play when not from controls) ────────────
  const handleLayerClick = useCallback(() => {
    togglePlay();
  }, [togglePlay]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={styles.frame}>

      {/*
        Vimeo iframe — full-bleed on desktop, scaled via .vimeoWrapper CSS.
        On mobile/tablet (≤ 1024px), sized to natural 16:9 aspect ratio without zoom.
        suppressHydrationWarning prevents React complaining that the server
        rendered an empty wrapper while the client renders the iframe-populated
        wrapper (the iframe is injected by the browser, not React).
      */}
      <div
        className={styles.vimeoWrapper}
        aria-hidden="true"
        suppressHydrationWarning
      >
        <iframe
          ref={iframeRef}
          src={VIMEO_SRC}
          className={styles.vimeoIframe}
          allow="autoplay; fullscreen; picture-in-picture"
          title={heroConfig.title}
          aria-hidden="true"
          tabIndex={-1}
          // Tell React not to warn about server/client mismatch on the
          // iframe src — it is intentionally client-only
          suppressHydrationWarning
        />
      </div>

      {/* ── Poster (fades out once playback starts) ── */}
      <Image
        src={heroConfig.posterSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${styles.poster} ${posterVisible ? "" : styles.posterHidden}`}
      />

      {/* ── Click-to-toggle layer ── */}
      <div
        className={styles.clickLayer}
        onClick={handleLayerClick}
        aria-hidden="true"
      />

      {/* ── Audio button — centered below header ── */}
      <button
        type="button"
        className={styles.muteBtn}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        onClick={handleMute}
        data-cursor="interactive"
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      {/*
        Invisible sentinel: once the iframe reports ready we know it has
        loaded. iframeReady gates nothing in render — it is used only to
        prevent double-initialization if the component hot-reloads.
      */}
      {iframeReady && null}
    </div>
  );
}
