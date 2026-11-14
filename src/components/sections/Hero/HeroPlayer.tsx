"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { preconnect } from "react-dom";
import Image from "next/image";
import { heroConfig, buildVimeoEmbedUrl } from "./hero.config";
import styles from "./Hero.module.css";

const VIMEO_SRC = buildVimeoEmbedUrl();
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
const SOUND_FALLBACK_DELAY = 1800;

function subscribeToMotionPreference(callback: () => void) {
  const preference = window.matchMedia(MOTION_QUERY);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function prefersMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function HeroPoster({ hidden = false }: { hidden?: boolean }) {
  return (
    <Image
      src={heroConfig.posterSrc}
      alt=""
      fill
      loading="eager"
      fetchPriority="high"
      sizes="100vw"
      className={`${styles.poster} ${hidden ? styles.posterHidden : ""}`}
    />
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h3.2L12 6.4v11.2L7.2 14H4v-4Z" />
      {muted ? (
        <path d="m16 9.2 4.8 4.8m0-4.8L16 14" />
      ) : (
        <path d="M15.4 9.2a3.6 3.6 0 0 1 0 5.6m2.5-8.2a6.4 6.4 0 0 1 0 10" />
      )}
    </svg>
  );
}

function VimeoBackdrop() {
  preconnect(heroConfig.vimeoOrigin);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const toggleAudioRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hasPicture, setHasPicture] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    const wrapper = wrapperRef.current;
    if (!iframe || !wrapper) return;

    let playerReady = false;
    let inView = false;
    let playing = false;
    let audioMuted = false;
    let fallbackTimer: number | undefined;

    const post = (method: string, value?: string | boolean) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ method, value }), heroConfig.vimeoOrigin);
    };
    const isVisible = () => inView && !document.hidden;
    const cancelFallback = () => window.clearTimeout(fallbackTimer);

    const requestMute = (nextMuted: boolean) => {
      audioMuted = nextMuted;
      setMuted(nextMuted);
      post("setMuted", nextMuted);
    };

    const playMutedIfBlocked = () => {
      cancelFallback();
      if (!isVisible() || playing || audioMuted) return;

      // Audible autoplay depends on the visitor's browser permission.
      requestMute(true);
      post("play");
    };

    const syncPlayback = () => {
      if (!playerReady) return;
      cancelFallback();

      if (!isVisible()) {
        playing = false;
        post("pause");
        return;
      }

      post("play");
      if (!playing && !audioMuted) {
        fallbackTimer = window.setTimeout(playMutedIfBlocked, SOUND_FALLBACK_DELAY);
      }
    };

    toggleAudioRef.current = () => {
      if (!playerReady) return;
      requestMute(!audioMuted);
      if (!playing || !audioMuted) syncPlayback();
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== heroConfig.vimeoOrigin || event.source !== iframe.contentWindow) return;

      let message: unknown;
      try {
        message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (!isRecord(message)) return;

      if (!playerReady && (message.event === "ready" || message.method === "ping")) {
        playerReady = true;
        for (const name of ["play", "playing", "pause", "volumechange", "error"]) {
          post("addEventListener", name);
        }
        setReady(true);
        post("getMuted");
        syncPlayback();
        return;
      }

      const detail = isRecord(message.data) ? message.data : undefined;
      if (message.event === "play" || message.event === "playing") {
        if (!isVisible()) {
          post("pause");
          return;
        }

        playing = true;
        cancelFallback();
        if (message.event === "playing") setHasPicture(true);
      }

      if (message.event === "pause") {
        playing = false;
        // Some mobile browsers pause a running clip if unmuting is blocked.
        if (isVisible() && !audioMuted) {
          cancelFallback();
          fallbackTimer = window.setTimeout(playMutedIfBlocked, SOUND_FALLBACK_DELAY);
        }
      }

      if (message.event === "error" && detail?.method === "play") playMutedIfBlocked();

      const observedMute =
        message.method === "getMuted"
          ? message.value
          : message.event === "volumechange"
            ? detail?.muted
            : undefined;
      if (typeof observedMute === "boolean") {
        audioMuted = observedMute;
        setMuted(audioMuted);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    const handleLoad = () => post("ping");
    window.addEventListener("message", handleMessage);
    document.addEventListener("visibilitychange", syncPlayback);
    iframe.addEventListener("load", handleLoad);
    // Observe the clipped hero, since the video canvas extends beyond its edges.
    observer.observe(wrapper.parentElement ?? wrapper);
    post("ping");

    return () => {
      observer.disconnect();
      cancelFallback();
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("visibilitychange", syncPlayback);
      iframe.removeEventListener("load", handleLoad);
      toggleAudioRef.current = null;
      if (playerReady) post("pause");
    };
  }, []);

  return (
    <>
      <div ref={wrapperRef} className={styles.vimeoWrapper} aria-hidden="true">
        <iframe
          ref={iframeRef}
          src={VIMEO_SRC}
          className={styles.vimeoIframe}
          allow="autoplay; fullscreen; picture-in-picture"
          title={heroConfig.title}
          tabIndex={-1}
        />
      </div>
      <HeroPoster hidden={hasPicture} />
      {ready && (
        <button
          type="button"
          className={styles.muteBtn}
          aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={() => toggleAudioRef.current?.()}
          data-cursor="interactive"
        >
          <SpeakerIcon muted={muted} />
        </button>
      )}
    </>
  );
}

export function HeroPlayer({ children }: { children: ReactNode }) {
  const motion = useSyncExternalStore(subscribeToMotionPreference, prefersMotion, () => false);

  return (
    <div className={styles.frame}>
      {motion ? <VimeoBackdrop /> : <HeroPoster />}
      <div className={styles.presentation}>{children}</div>
    </div>
  );
}
