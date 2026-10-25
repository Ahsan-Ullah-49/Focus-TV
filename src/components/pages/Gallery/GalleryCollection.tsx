"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MediaDialog, type MediaItem } from "@/components/pages/Media/MediaDialog";
import { galleryFilms, galleryStills } from "./gallery.data";
import styles from "./GalleryCollection.module.css";

const allMedia = [...galleryFilms, ...galleryStills];

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 5 11 7-11 7Z" />
    </svg>
  );
}

export function GalleryCollection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : allMedia[activeIndex];
  const open = (item: MediaItem) =>
    setActiveIndex(allMedia.findIndex((media) => media.id === item.id));
  const move = (direction: number) =>
    setActiveIndex((current) =>
      current === null ? null : (current + direction + allMedia.length) % allMedia.length
    );

  return (
    <>
      <section id="films" className={styles.collection} aria-labelledby="films-heading">
        <div className={styles.collectionHeading} data-reveal="rise">
          <h2 id="films-heading">Selected films</h2>
          <span>01 — 06</span>
        </div>
        <div className={styles.filmGrid}>
          {galleryFilms.map((film, index) => (
            <article
              key={film.id}
              className={index === 0 ? styles.featuredFilm : styles.film}
              data-reveal="mask"
            >
              <button
                className={styles.filmButton}
                type="button"
                onClick={() => open(film)}
                aria-label={`Play ${film.title}`}
                data-cursor="interactive"
              >
                <span className={styles.filmImage}>
                  <Image
                    src={film.src}
                    alt={film.alt}
                    fill
                    preload={index === 0}
                    sizes={
                      index === 0
                        ? "(max-width: 1440px) 100vw, 1440px"
                        : "(max-width: 700px) 100vw, 50vw"
                    }
                  />
                  <span className={styles.play}>
                    <PlayMark />
                  </span>
                  <span className={styles.duration}>{film.duration}</span>
                  {index === 0 && (
                    <span className={styles.featuredLabel}>The Answer / Film preview</span>
                  )}
                </span>
                <span className={styles.filmCaption}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.filmTitle}>{film.title}</span>
                  <span className={styles.filmArrow} aria-hidden="true">
                    ↗
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>
      <section
        id="stills"
        className={`${styles.collection} ${styles.stillsCollection}`}
        aria-labelledby="stills-heading"
      >
        <header className={styles.stillsHeading} data-reveal="stagger">
          <h2 id="stills-heading" data-reveal-child>
            In <em>conversation.</em>
          </h2>
          <p data-reveal-child>
            A moment with the people
            <br />
            behind the ideas.
          </p>
        </header>
        <div className={styles.stillGrid}>
          {galleryStills.map((still, index) => (
            <figure key={still.id} className={styles.still} data-reveal="mask">
              <button
                type="button"
                className={styles.stillButton}
                onClick={() => open(still)}
                aria-label={`View ${still.title} still`}
                data-cursor="interactive"
              >
                <Image src={still.src} alt={still.alt} fill sizes="(max-width: 900px) 50vw, 33vw" />
                <span className={styles.expand} aria-hidden="true">
                  ↗
                </span>
              </button>
              <figcaption>
                <span>{still.title}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link className={styles.castLink} href="/cast">
          Meet the people behind these moments{" "}
          <span>
            Explore the cast <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </section>
      <MediaDialog
        item={activeItem ?? null}
        onClose={() => setActiveIndex(null)}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
        position={activeIndex === null ? "" : `${activeIndex + 1} / ${allMedia.length}`}
      />
    </>
  );
}
