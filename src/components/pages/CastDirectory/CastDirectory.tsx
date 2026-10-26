"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CAST_CATEGORIES,
  DIRECTORY_CAST,
  type CastCategory,
  type DirectoryMember,
} from "./cast-directory.data";
import styles from "./CastDirectory.module.css";

export function CastDirectory() {
  const [category, setCategory] = useState<CastCategory>("All");
  const [selected, setSelected] = useState<DirectoryMember | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const visible = DIRECTORY_CAST.filter(
    (member) => category === "All" || member.category === category
  );

  useEffect(() => {
    if (!selected || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section aria-label="Explore the cast">
      <div className={styles.directoryBar} data-reveal="fade-down">
        <div className={styles.filters} role="group" aria-label="Filter cast by field">
          {CAST_CATEGORIES.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className={styles.count} aria-live="polite">
          {String(visible.length).padStart(2, "0")} <span>voices</span>
        </p>
      </div>
      <div
        className={styles.grid}
        key={category}
        data-reveal-group="fade-up"
        data-reveal-stagger="0.035"
      >
        {visible.map((member, index) => (
          <article
            key={member.id}
            className={`${styles.card} ${category === "All" && index < 2 ? styles.featured : ""}`}
          >
            <button
              className={styles.cardButton}
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelected(member);
              }}
              aria-label={`View profile: ${member.name}`}
              aria-haspopup="dialog"
            >
              <span className={styles.portrait}>
                <Image
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  fill
                  sizes={
                    category === "All" && index < 2
                      ? "(max-width: 700px) 45vw, (max-width: 1000px) 30vw, 46vw"
                      : "(max-width: 700px) 45vw, (max-width: 1000px) 30vw, 23vw"
                  }
                  preload={category === "All" && index < 2}
                />
                <span className={styles.profileAction} aria-hidden="true">
                  Explore <span>↗</span>
                </span>
              </span>
              <span className={styles.cardMeta}>
                <span className={styles.name}>{member.name}</span>
                <span className={styles.role}>{member.title}</span>
              </span>
            </button>
          </article>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="cast-profile-name"
        aria-describedby="cast-profile-bio"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        data-lenis-prevent
      >
        {selected && (
          <div className={styles.dialogBody}>
            <button
              ref={closeRef}
              className={styles.close}
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close profile"
            >
              Close <span aria-hidden="true">×</span>
            </button>
            <div className={styles.dialogImage}>
              <Image
                src={selected.imageSrc}
                alt={selected.imageAlt}
                fill
                sizes="(max-width: 700px) 90vw, 42vw"
              />
            </div>
            <div className={styles.dialogCopy}>
              <p className={styles.kicker}>The Answer / {selected.category}</p>
              <h2 id="cast-profile-name">{selected.name}</h2>
              <p className={styles.dialogRole}>{selected.title}</p>
              <p id="cast-profile-bio">{selected.bio}</p>
              <span className={styles.profileEnd}>A conversation with FocusTV</span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
