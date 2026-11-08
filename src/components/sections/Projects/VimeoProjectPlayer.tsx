"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "./projects.config";
import styles from "./Projects.module.css";

const VIMEO_ORIGIN = "https://player.vimeo.com";
const VIMEO_ACCENT_COLOR = "CB840A"; // Keep in sync with the site brand token.
const MIN_VISIBLE_RATIO = 0.3; // Avoid starting playback when only a small edge is visible.
const PLAYER_EVENTS = ["play", "pause"] as const;
// Keep a viewer's manual pause across offscreen pauses and route changes until refresh.
const manuallyPausedVideos = new Set<string>();

type VimeoVideo = Extract<ProjectVideo, { kind: "vimeo" }>;

function postVimeoCommand(iframe: HTMLIFrameElement | null, method: string, value?: unknown) {
  if (!iframe?.contentWindow) return;

  const message: Record<string, unknown> = { method };
  if (value !== undefined) message.value = value;
  iframe.contentWindow.postMessage(JSON.stringify(message), VIMEO_ORIGIN);
}

function buildVimeoEmbedUrl(video: VimeoVideo, playerId: string) {
  // Native Vimeo controls preserve the provider's working seek bar and keyboard behavior.
  const params = new URLSearchParams({
    ...(video.hash ? { h: video.hash } : {}),
    api: "1",
    app_id: "58479",
    player_id: playerId,
    autoplay: "0",
    autopause: "0",
    controls: "1",
    color: VIMEO_ACCENT_COLOR,
    muted: "1",
    preload: "auto",
    playsinline: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    vimeo_logo: "0",
    unmute_button: "0",
    dnt: "1",
  });

  return `${VIMEO_ORIGIN}/video/${encodeURIComponent(video.id)}?${params.toString()}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Keep the native Vimeo player interactive while managing scroll-based playback. */
export function VimeoProjectPlayer({
  title,
  video,
  poster,
}: {
  title: string;
  video: VimeoVideo;
  poster?: string;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inViewRef = useRef(false);
  const playerReadyRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [readyAttempt, setReadyAttempt] = useState<number | null>(null);
  const showPoster = poster && readyAttempt !== attempt;

  useEffect(() => {
    const iframe = iframeRef.current;
    const media = mediaRef.current;
    if (!iframe || !media) return;

    playerReadyRef.current = false;
    let fallbackTimer: number | null = null;
    const clearFallbackTimer = () => {
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playWhenAllowed = () => {
      if (
        playerReadyRef.current &&
        inViewRef.current &&
        !document.hidden &&
        !reducedMotion.matches &&
        !manuallyPausedVideos.has(video.id)
      ) {
        postVimeoCommand(iframe, "play");
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN || event.source !== iframe.contentWindow) return;

      let message: unknown;
      try {
        message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (!isRecord(message)) return;

      if ((message.event === "ready" || message.method === "ping") && !playerReadyRef.current) {
        playerReadyRef.current = true;
        clearFallbackTimer();
        setReadyAttempt(attempt);
        setShowFallback(false);
        for (const playerEvent of PLAYER_EVENTS) {
          postVimeoCommand(iframe, "addEventListener", playerEvent);
        }
        postVimeoCommand(iframe, "setVolume", 0);
        playWhenAllowed();
        return;
      }

      if (message.event === "play") {
        hasPlayedRef.current = true;
      }

      if (
        message.event === "pause" &&
        hasPlayedRef.current &&
        inViewRef.current &&
        !document.hidden &&
        !reducedMotion.matches
      ) {
        // A manual pause must remain paused after scrolling away and back.
        manuallyPausedVideos.add(video.id);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio >= MIN_VISIBLE_RATIO;
        if (inViewRef.current) {
          if (!playerReadyRef.current && fallbackTimer === null) {
            fallbackTimer = window.setTimeout(() => {
              fallbackTimer = null;
              if (!playerReadyRef.current && inViewRef.current) setShowFallback(true);
            }, 10000);
          }
          playWhenAllowed();
        } else {
          clearFallbackTimer();
          if (playerReadyRef.current) postVimeoCommand(iframe, "pause");
        }
      },
      { threshold: [0, 0.3] }
    );

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        postVimeoCommand(iframe, "pause");
      } else {
        playWhenAllowed();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        postVimeoCommand(iframe, "pause");
      } else {
        playWhenAllowed();
      }
    };

    // Recover when the iframe becomes ready before React subscribes, including
    // browser-lazy iframes that finish loading after the initial effect.
    const handleLoad = () => postVimeoCommand(iframe, "ping");
    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", handleLoad);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    observer.observe(media);
    postVimeoCommand(iframe, "ping");

    return () => {
      observer.disconnect();
      clearFallbackTimer();
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", handleLoad);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (playerReadyRef.current) {
        postVimeoCommand(iframe, "pause");
      }
    };
  }, [video.id, attempt]);

  return (
    <>
      <div
        className={`${styles.media} ${showFallback ? styles.mediaUnavailable : ""}`}
        ref={mediaRef}
        data-native-cursor-zone
      >
        <iframe
          key={attempt}
          ref={iframeRef}
          className={styles.player}
          src={buildVimeoEmbedUrl(video, `project-${video.id}`)}
          loading="lazy"
          title={`${title} film`}
          width="640"
          height="360"
          tabIndex={showPoster ? -1 : undefined}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          data-native-cursor
        />
        {showPoster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 820px) 92vw, (max-width: 1440px) 57vw, 800px"
            className={styles.loadingPoster}
          />
        )}
      </div>
      {showFallback && (
        <p className={styles.playerFallback} role="status">
          Having trouble loading the film?{" "}
          <button
            type="button"
            onClick={() => {
              setShowFallback(false);
              setAttempt((value) => value + 1);
            }}
          >
            Try again
          </button>{" "}
          or{" "}
          <a
            href={`https://vimeo.com/${video.id}${video.hash ? `/${video.hash}` : ""}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            watch on Vimeo <span aria-hidden="true">↗</span>
          </a>
          .
        </p>
      )}
    </>
  );
}
