"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaDialog } from "@/components/pages/Media/MediaDialog";
import { galleryPhotos } from "./gallery.data";
import styles from "./GalleryCollection.module.css";

export function GalleryCollection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visible = galleryPhotos;
  const move = (direction: number) =>
    setActiveIndex((current) =>
      current === null ? null : (current + direction + visible.length) % visible.length
    );
  return (
    <>
      <div className={styles.grid}>
        {visible.map((photo, index) => (
          <button
            className={styles.photo}
            data-layout={photo.layout}
            data-editorial-reveal="image"
            data-editorial-delay={(index % 3) * 0.04}
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${photo.alt}`}
            data-cursor="interactive"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              quality={90}
              // The supplied interview stills are already small WebP assets.
              // Serving them directly avoids another runtime encoding step.
              unoptimized={photo.unoptimized}
              sizes={
                photo.layout === "wide"
                  ? "(max-width: 700px) 92vw, 66vw"
                  : "(max-width: 700px) 46vw, 33vw"
              }
              preload={index === 0}
            />
            <span className={styles.expand} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
      <MediaDialog
        item={activeIndex === null ? null : visible[activeIndex]}
        label="Gallery"
        onClose={() => setActiveIndex(null)}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
        position={activeIndex === null ? "" : `${activeIndex + 1} / ${visible.length}`}
      />
    </>
  );
}
