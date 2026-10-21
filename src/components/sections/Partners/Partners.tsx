import { LogoLoop, type LogoItem } from "./LogoLoop";
import { PARTNER_LOGOS } from "./partners.config";
import styles from "./Partners.module.css";

const logos: LogoItem[] = PARTNER_LOGOS.map((logo) => ({
  src: `/media/Logos/normalized/${encodeURIComponent(logo.filename)}`,
  alt: logo.name,
  title: logo.name,
  width: logo.width,
  height: logo.height,
  lowContrast: logo.lowContrast,
  outlineOnLight: logo.outlineOnLight,
  outlineOnDark: logo.outlineOnDark,
}));

export function Partners() {
  return (
    <section className={styles.partners} id="partners" aria-labelledby="partners-label">
      <p className={styles.label} id="partners-label">
        Partners &amp; Media — left to right
      </p>
      <div className={styles.loop}>
        <LogoLoop
          logos={logos}
          speed={70}
          intro={false}
          direction="left"
          logoHeight={64}
          gap={64}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutWidth={0.12}
          scaleOnHover={true}
        />
      </div>
    </section>
  );
}
