import { LogoLoop } from "./LogoLoop";
import { PARTNER_LOGOS, toLogoItem } from "./partners.config";
import styles from "./Partners.module.css";

const logos = PARTNER_LOGOS.map(toLogoItem);

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
