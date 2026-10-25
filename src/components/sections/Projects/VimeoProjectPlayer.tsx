"use client";

import { useEffect, useRef } from "react";
import type { ProjectVideo } from "./projects.config";
import styles from "./Projects.module.css";

const VIMEO_ORIGIN = "https://player.vimeo.com";
const VIMEO_ACCENT_COLOR = "BF8B25"; // Keep in sync with the site brand token.
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
export function VimeoProjectPlayer({ title, video }: { title: string; video: VimeoVideo }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inViewRef = useRef(false);
  const playerReadyRef = useRef(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    const media = mediaRef.current;
    if (!iframe || !media) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playWhenAllowed = () => {
      if (
        playerReadyRef.current &&
        inViewRef.current &&
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

      if (!isRecord(message) || typeof message.event !== "string") return;

      if (message.event === "ready") {
        playerReadyRef.current = true;
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
          playWhenAllowed();
        } else if (playerReadyRef.current) {
          postVimeoCommand(iframe, "pause");
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

    window.addEventListener("message", handleMessage);
    reducedMotion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    observer.observe(media);

    return () => {
      observer.disconnect();
      window.removeEventListener("message", handleMessage);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      postVimeoCommand(iframe, "pause");
    };
  }, [video.id]);

  return (
    <div className={styles.media} ref={mediaRef} data-native-cursor-zone>
      <iframe
        ref={iframeRef}
        className={styles.player}
        src={buildVimeoEmbedUrl(video, `project-${video.id}`)}
        title={`${title} documentary`}
        width="640"
        height="360"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        data-native-cursor
      />
    </div>
  );
}
