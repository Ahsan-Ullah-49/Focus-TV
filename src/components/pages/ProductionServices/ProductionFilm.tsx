"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProductionFilm.module.css";

// Notify the other film cards so only the newly selected embed stays open.
const PLAY_EVENT = "production-film-play";

type ProductionFilmProps = {
  id: string;
  title: string;
  poster: string;
  videoId: string;
  videoHash: string;
};

export function ProductionFilm({ id, title, poster, videoId, videoHash }: ProductionFilmProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const stopOtherFilms = (event: Event) => {
      if (event instanceof CustomEvent && event.detail !== id) setPlaying(false);
    };
    window.addEventListener(PLAY_EVENT, stopOtherFilms);
    return () => window.removeEventListener(PLAY_EVENT, stopOtherFilms);
  }, [id]);

  return (
    <div
      className={styles.film}
      data-native-cursor-zone
      data-production-target={id}
      data-film-playing={playing}
    >
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=${videoHash}&autoplay=1&playsinline=1&color=cb840a&title=0&byline=0&portrait=0&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          data-native-cursor
        />
      ) : (
        <button
          type="button"
          className={styles.poster}
          aria-label={`Play ${title}`}
          data-cursor="interactive"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
            setPlaying(true);
          }}
        >
          <Image src={poster} alt="" fill sizes="(max-width: 850px) 92vw, 66vw" />
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M9 5.5 19 12 9 18.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
