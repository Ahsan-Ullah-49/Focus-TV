"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Media.module.css";

export type MediaItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  kind: "film" | "still";
  vimeoId?: string;
  vimeoHash?: string;
  duration?: string;
};

type MediaDialogProps = {
  item: MediaItem | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  position?: string;
};

export function MediaDialog({ item, onClose, onPrevious, onNext, position }: MediaDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = item !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="media-dialog-title"
      data-lenis-prevent
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && onPrevious) {
          event.preventDefault();
          onPrevious();
        }
        if (event.key === "ArrowRight" && onNext) {
          event.preventDefault();
          onNext();
        }
      }}
    >
      {item && (
        <div className={styles.dialogContent}>
          <header className={styles.dialogHeader}>
            <div>
              <span className={styles.dialogLabel}>
                {item.kind === "film" ? "FocusTV Films" : "The Answer / Stills"}
              </span>
              <h2 id="media-dialog-title">{item.title}</h2>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              autoFocus
              aria-label="Close media viewer"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className={item.kind === "film" ? styles.videoFrame : styles.imageFrame}>
            {item.kind === "film" && item.vimeoId ? (
              <iframe
                key={item.id}
                src={`https://player.vimeo.com/video/${item.vimeoId}?h=${item.vimeoHash ?? ""}&autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
                title={item.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 94vw, 84vw"
                className={styles.fullImage}
              />
            )}
          </div>

          <div className={styles.dialogFooter}>
            {onPrevious && onNext ? (
              <div className={styles.viewerNavigation}>
                <button type="button" onClick={onPrevious} aria-label="Previous media">
                  ←
                </button>
                <span aria-live="polite">{position}</span>
                <button type="button" onClick={onNext} aria-label="Next media">
                  →
                </button>
              </div>
            ) : (
              <span>The Answer — a FocusTV documentary series</span>
            )}
            {item.kind === "film" && item.vimeoId && (
              <a
                href={`https://vimeo.com/${item.vimeoId}/${item.vimeoHash ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on Vimeo <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
