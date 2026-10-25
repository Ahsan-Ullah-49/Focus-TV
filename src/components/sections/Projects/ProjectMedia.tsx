"use client";

import { useState } from "react";
import Image from "next/image";
import type { StudioProject } from "./projects.config";
import { VimeoProjectPlayer } from "./VimeoProjectPlayer";
import styles from "./Projects.module.css";

export function ProjectMedia({ project, index }: { project: StudioProject; index: number }) {
  const [playing, setPlaying] = useState(false);
  const { video } = project;

  if (video?.kind === "vimeo") {
    return <VimeoProjectPlayer title={project.title} video={video} />;
  }

  if (playing && video) {
    return (
      <div className={styles.media}>
        <video className={styles.player} controls autoPlay playsInline poster={project.poster}>
          <source src={video.src} type={video.type} />
          Your browser cannot play this film. <a href={video.src}>Open the video</a>.
        </video>
      </div>
    );
  }

  const preview = (
    <>
      {project.poster ? (
        <Image
          src={project.poster}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className={styles.poster}
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.frameLabel}>FocusTV / Documentary</span>
          <span className={styles.subject}>{project.subject}</span>
          <span className={styles.frameNumber}>{String(index + 1).padStart(2, "0")}</span>
        </div>
      )}
      {video ? (
        <span className={styles.play}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="m9 5 11 7-11 7Z" />
          </svg>
          <span>Watch film</span>
        </span>
      ) : (
        <span className={styles.availability}>Preview coming soon</span>
      )}
    </>
  );

  return video ? (
    <button
      className={`${styles.media} ${styles.playable}`}
      onClick={() => setPlaying(true)}
      aria-label={`Watch ${project.title}`}
      data-cursor="interactive"
      type="button"
    >
      {preview}
    </button>
  ) : (
    <div className={styles.media}>{preview}</div>
  );
}
