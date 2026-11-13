import type { Metadata } from "next";
import { GalleryCollection } from "@/components/pages/Gallery/GalleryCollection";
import { EditorialMotion } from "@/components/motion/EditorialMotion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description: "BTS, Aubrey, NetEase — Focus TV.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <EditorialMotion>
      <article className={styles.page}>
        <header className={styles.header}>
          <h1 data-editorial-reveal="heading">Gallery</h1>
        </header>
        <GalleryCollection />
      </article>
    </EditorialMotion>
  );
}
