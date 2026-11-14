"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaDialog } from "@/components/pages/Media/MediaDialog";
import { galleryBtsRows, galleryPhotos, galleryStills, type GalleryPhoto } from "./gallery.data";
import styles from "./GalleryCollection.module.css";

export function GalleryCollection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visible = galleryPhotos;
  const move = (direction: number) =>
    setActiveIndex((current) =>
      current === null ? null : (current + direction + visible.length) % visible.length
    );

  const renderPhoto = (photo: GalleryPhoto, index: number, behindScenes = false) => (
    <button
      className={styles.photo}
      data-layout={photo.layout}
      data-editorial-reveal={behindScenes ? undefined : "image"}
      data-editorial-delay={behindScenes ? undefined : (index % 3) * 0.04}
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
        quality={behindScenes ? 95 : 90}
        // Keep the approved small interview stills on their original delivery path.
        unoptimized={photo.unoptimized}
        sizes={
          behindScenes
            ? photo.layout === "wide"
              ? "(max-width: 600px) 92vw, 60vw"
              : "(max-width: 600px) 92vw, 36vw"
            : "(max-width: 700px) 46vw, 33vw"
        }
        preload={index === 0}
      />
    </button>
  );

  return (
    <>
      <div className={styles.grid} data-gallery-stills>
        {galleryStills.map((photo, index) => renderPhoto(photo, index))}
      </div>
      <div className={styles.bts} data-gallery-bts>
        {galleryBtsRows.map((row) => (
          <div
            className={styles.btsRow}
            data-row-layout={row.layout}
            data-editorial-reveal="image"
            key={row.photos[0].id}
          >
            {row.photos.map((photo) => renderPhoto(photo, visible.indexOf(photo), true))}
          </div>
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
