"use client";

import Image from "next/image";
import type { StudioProject } from "./projects.config";
import { VimeoProjectPlayer } from "./VimeoProjectPlayer";
import styles from "./Projects.module.css";

export function ProjectMedia({ project, index }: { project: StudioProject; index: number }) {
  const { video } = project;

  if (video?.kind === "vimeo") {
    return <VimeoProjectPlayer title={project.title} video={video} poster={project.poster} />;
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
    </>
  );

  return <div className={styles.media}>{preview}</div>;
}
