"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const VIDEO_SRC =
  "/media/hero/THE%20ANSWER%20-%20The%20Birth%20Of%20The%20Automobile%20%28Pilot%29.mp4";
const POSTER_SRC = "/media/hero/focustv-hero-poster.webp";

// ─── Helper: format seconds as m:ss ──────────────────────────────────────────
function fmtTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function MuteIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 10h3.2L12 6.4v11.2L7.2 14H4v-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.2 20.8 14M20.8 9.2 16 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 10h3.2L12 6.4v11.2L7.2 14H4v-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15.4 9.2a3.6 3.6 0 0 1 0 5.6M17.8 7a6.4 6.4 0 0 1 0 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 6l10 6-10 6V6Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 19h4V5H6v14ZM14 5v14h4V5h-4Z" fill="currentColor" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Video state
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0–1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);

  // Whether we're actively dragging the scrubber
  const isDragging = useRef(false);
  // Whether a click on the video layer should toggle play (not on controls)
  const clickFromControls = useRef(false);

  // ── Autoplay on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0.8;

    const attempt = async () => {
      try {
        await video.play();
        // play() resolved → autoplay succeeded
      } catch {
        // Autoplay was blocked — show the play button overlay
        setAutoplayBlocked(true);
        setIsPaused(true);
      }
    };

    attempt();
  }, []);

  // ── Video event handlers ───────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle readyState if events already fired before mount
    if (video.readyState >= 1) { // HAVE_METADATA
      setDuration(video.duration ?? 0);
    }
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA
      setPosterVisible(false);
    }

    const onPlay = () => {
      setIsPaused(false);
      setAutoplayBlocked(false);
    };
    const onPause = () => setIsPaused(true);
    const onMuted = () => setIsMuted(video.muted);
    const onDurationChange = () => setDuration(video.duration ?? 0);
    const onLoadedMetadata = () => setDuration(video.duration ?? 0);
    const onCanPlay = () => setPosterVisible(false);
    const onTimeUpdate = () => {
      if (!isDragging.current) {
        const dur = video.duration;
        if (dur > 0 && isFinite(dur)) {
          setProgress(video.currentTime / dur);
          setCurrentTime(video.currentTime);
        }
      }
    };
    const onEnded = () => {
      setIsPaused(true);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("playing", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onMuted);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onMuted);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  // ── Controls: Play/Pause ───────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  // ── Controls: Mute ────────────────────────────────────────────────────────
  const handleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // ── Controls: Video layer click (not from controls) ────────────────────────
  const handleLayerClick = useCallback(() => {
    if (clickFromControls.current) {
      clickFromControls.current = false;
      return;
    }
    togglePlay();
  }, [togglePlay]);

  // ── Controls: Seek ────────────────────────────────────────────────────────

  /**
   * Calculate seek position from a pointer event on the progress bar.
   * Returns a value between 0 and 1.
   */
  const getSeekRatio = useCallback((clientX: number): number => {
    const bar = progressRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const seekTo = useCallback((ratio: number) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;
    const t = ratio * video.duration;
    video.currentTime = t;
    setProgress(ratio);
    setCurrentTime(t);
  }, []);

  // Mouse seek on the progress bar
  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      clickFromControls.current = true;
      isDragging.current = true;
      seekTo(getSeekRatio(e.clientX));

      const onMove = (ev: MouseEvent) => {
        seekTo(getSeekRatio(ev.clientX));
      };
      const onUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [getSeekRatio, seekTo]
  );

  // Touch seek on the progress bar
  const handleProgressTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      clickFromControls.current = true;
      isDragging.current = true;
      if (e.touches[0]) seekTo(getSeekRatio(e.touches[0].clientX));

      const onMove = (ev: TouchEvent) => {
        if (ev.touches[0]) seekTo(getSeekRatio(ev.touches[0].clientX));
      };
      const onEnd = () => {
        isDragging.current = false;
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onEnd);
    },
    [getSeekRatio, seekTo]
  );

  // Prevent the play-button click from propagating to the layer
  const handleControlBarClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    clickFromControls.current = true;
  }, []);

  const handlePlayButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      clickFromControls.current = true;
      togglePlay();
    },
    [togglePlay]
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={styles.frame}>

      {/* ── Native video element ── */}
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        muted
        playsInline
        loop
        preload="metadata"
        aria-label="The Answer — The Birth of the Automobile"
        tabIndex={-1}
      />

      {/* ── Poster image (fades out once video plays) ── */}
      <Image
        src={POSTER_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${styles.poster} ${posterVisible ? "" : styles.posterHidden}`}
      />

      {/* ── Click-to-toggle layer (sits above video, below controls) ── */}
      <div
        className={styles.clickLayer}
        onClick={handleLayerClick}
        aria-hidden="true"
      />

      {/* ── Mute/Unmute — centered below header ── */}
      <button
        type="button"
        className={styles.muteBtn}
        aria-label={isMuted ? "Unmute" : "Mute"}
        onClick={handleMute}
        data-cursor="interactive"
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      {/* ── Autoplay-blocked overlay ── */}
      {autoplayBlocked && (
        <div className={styles.blockedOverlay} aria-hidden="true">
          <button
            type="button"
            className={styles.blockedPlayBtn}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Play video"
            data-cursor="interactive"
          >
            <PlayIcon />
          </button>
        </div>
      )}

      {/* ── Bottom control bar ── */}
      <div
        className={styles.controlBar}
        onClick={handleControlBarClick}
        data-cursor="interactive"
      >
        {/* Play/Pause */}
        <button
          type="button"
          className={styles.playPauseBtn}
          aria-label={isPaused ? "Play" : "Pause"}
          onClick={handlePlayButtonClick}
          data-cursor="interactive"
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>

        {/* Time: current */}
        <span className={styles.timeLabel} aria-hidden="true">
          {fmtTime(currentTime)}
        </span>

        {/* Progress bar */}
        <div
          ref={progressRef}
          className={styles.progressTrack}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onMouseDown={handleProgressMouseDown}
          onTouchStart={handleProgressTouchStart}
          onKeyDown={(e) => {
            // Keyboard seek: left/right arrows ±5s
            const video = videoRef.current;
            if (!video) return;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              seekTo(Math.min(1, (video.currentTime + 5) / video.duration));
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              seekTo(Math.max(0, (video.currentTime - 5) / video.duration));
            }
          }}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
          {/* Thumb */}
          <div
            className={styles.progressThumb}
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        {/* Time: duration */}
        <span className={styles.timeLabel} aria-hidden="true">
          {fmtTime(duration)}
        </span>
      </div>
    </div>
  );
}

