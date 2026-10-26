import type { Metadata } from "next";
import { GalleryCollection } from "@/components/pages/Gallery/GalleryCollection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Watch selected FocusTV films and explore moments from The Answer documentary series.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <p className={styles.label} data-reveal="fade-down">
          FocusTV / Gallery
        </p>
        <div className={styles.introduction}>
          <h1 data-reveal="zoom-in">
            A closer
            <br />
            <em>look.</em>
          </h1>
          <div className={styles.description} data-reveal="fade-up">
            <p>
              People, ideas and the moments in between.
              <br />A selection of films and stills from The Answer.
            </p>
            <nav className={styles.collectionLinks} aria-label="Gallery collections">
              <a href="#films">
                Films <span aria-hidden="true">06 ↓</span>
              </a>
              <a href="#stills">
                Stills <span aria-hidden="true">06 ↓</span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      <GalleryCollection />
    </article>
  );
}
