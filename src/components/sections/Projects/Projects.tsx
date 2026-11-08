import Image from "next/image";
import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { LogoLoop } from "@/components/sections/Partners/LogoLoop";
import { toLogoItem } from "@/components/sections/Partners/partners.config";
import partnerStyles from "@/components/sections/Partners/Partners.module.css";
import { CastGallery } from "./CastGallery";
import { ProjectMedia } from "./ProjectMedia";
import { STUDIO_PROJECTS, type HomepageProject } from "./projects.config";
import styles from "./Projects.module.css";

function ProjectMarks({ project }: { project: HomepageProject }) {
  const logos = project.logos.map((logo) =>
    toLogoItem({
      ...logo,
      lowContrast: logo.name === "LifeAfter" ? "light" : logo.lowContrast,
      displayScale: undefined,
      slotWidth: undefined,
    })
  );
  const label = `Logos related to ${project.title}`;

  return (
    <div className={styles.logoTrail}>
      <div className={`${partnerStyles.loop} ${styles.animatedTrail}`}>
        <LogoLoop
          logos={logos}
          ariaLabel={label}
          speed={66}
          direction="left"
          logoHeight={72}
          gap={56}
          intro={false}
          fadeOut
          fadeOutWidth={0.08}
          draggable
          pauseOnHover
          scaleOnHover
        />
      </div>
      <ul className={styles.staticMarks} role="list" aria-label={label}>
        {logos.map((logo) => (
          <li key={logo.src} data-pale-mark={logo.lowContrast === "light" ? "" : undefined}>
            <Image
              src={logo.lightSrc ?? logo.src}
              alt={logo.alt ?? ""}
              width={logo.lightWidth ?? logo.width ?? 144}
              height={logo.lightHeight ?? logo.height ?? 72}
              sizes="144px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="projects-heading">
      <Container>
        <header className={styles.introduction}>
          <h2 id="projects-heading">
            OUR PROUD <em>PROJECTS</em>
          </h2>
        </header>
      </Container>

      {STUDIO_PROJECTS.map((project, index) => (
        <article
          className={styles.project}
          data-project={project.id}
          key={project.id}
          aria-labelledby={`${project.id}-title`}
        >
          <Container>
            <div className={styles.projectTop}>
              <h3 className={styles.projectTitle} id={`${project.id}-title`}>
                {project.title.endsWith(" Legends") ? (
                  <>
                    {project.title.replace(/ Legends$/, "")} <em>Legends</em>
                  </>
                ) : (
                  project.title
                )}
              </h3>

              <div className={styles.film}>
                <div className={styles.screen}>
                  <ProjectMedia project={project} index={index} />
                </div>
              </div>

              <div className={styles.description}>
                {project.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {project.cast.length > 0 && (
              <div className={styles.people}>
                <div className={styles.subheading}>
                  <h4>Featured voices</h4>
                  <Button href="/cast" variant="primary" className={styles.castButton}>
                    Explore the cast <span aria-hidden="true">↗</span>
                  </Button>
                </div>
                <CastGallery members={project.cast} label={`${project.title} cast`} />
              </div>
            )}

            {project.logos.length > 0 && <ProjectMarks project={project} />}
          </Container>
        </article>
      ))}
    </section>
  );
}
