import { pageMetadata } from "@/config/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import { GalleryCollection } from "@/components/pages/Gallery/GalleryCollection";
import { EditorialMotion } from "@/components/motion/EditorialMotion";
import styles from "./page.module.css";

export const metadata = pageMetadata("/gallery");

export default function GalleryPage() {
  return (
    <EditorialMotion>
      <PageStructuredData path="/gallery" />
      <article className={styles.page}>
        <header className={styles.header}>
          <h1 data-editorial-reveal="heading">Gallery</h1>
        </header>
        <GalleryCollection />
      </article>
    </EditorialMotion>
  );
}
