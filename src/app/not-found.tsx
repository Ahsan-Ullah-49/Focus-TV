import { Button } from "@/components/ui/Button/Button";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <p className={styles.label}>404 / Page not found</p>
      <h1 className={styles.title}>A different story awaits.</h1>
      <p className={styles.copy}>
        We couldn’t find this page. Discover our films or return to the beginning.
      </p>
      <div className={styles.actions}>
        <Button href="/">Back to home</Button>
        <Button href="/gallery" variant="text">
          Explore our films ↗
        </Button>
      </div>
    </section>
  );
}
