import { LogoLoop, type LogoItem } from "./LogoLoop";
import { PARTNER_LOGOS } from "./partners.config";
import styles from "./Partners.module.css";

const logoAsset = (filename: string) => `/media/Logos/LOGOS/${encodeURIComponent(filename)}`;

// Pair each source with its dimensions; fixed slots reserve stable space for marks with different theme ratios.
const logos: LogoItem[] = PARTNER_LOGOS.map((logo) => ({
  src: logoAsset(logo.filename),
  darkSrc: logo.darkVariant ? logoAsset(logo.darkVariant.filename) : undefined,
  darkWidth: logo.darkVariant?.width,
  darkHeight: logo.darkVariant?.height,
  darkScale: logo.darkVariant?.scale,
  lightSrc: logo.lightVariant ? logoAsset(logo.lightVariant.filename) : undefined,
  lightWidth: logo.lightVariant?.width,
  lightHeight: logo.lightVariant?.height,
  lightScale: logo.lightVariant?.scale,
  displayScale: logo.displayScale,
  slotWidth: logo.slotWidth,
  darkBlend: logo.darkBlend,
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
    <section className={styles.partners} id="partners" aria-labelledby="partners-heading">
      <h2 className={styles.heading} id="partners-heading" data-reveal="fade-down">
        Brands &amp; organizations we’ve worked with
      </h2>
      <div className={styles.loop} data-reveal="soft">
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
