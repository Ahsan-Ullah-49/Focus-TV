"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaDialog, type MediaItem } from "./MediaDialog";
import styles from "./Media.module.css";

export function FilmPlayer({ film, priority = false }: { film: MediaItem; priority?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.filmPoster}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Play ${film.title}`}
        data-cursor="interactive"
      >
        <Image
          src={film.src}
          alt={film.alt}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          preload={priority}
          className={styles.posterImage}
        />
        <span className={styles.playIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m9 5 11 7-11 7Z" />
          </svg>
        </span>
        <span className={styles.posterCaption}>
          <span>Watch the film</span>
          <span>{film.title}</span>
        </span>
      </button>
      <MediaDialog item={isOpen ? film : null} onClose={() => setIsOpen(false)} />
    </>
  );
}
